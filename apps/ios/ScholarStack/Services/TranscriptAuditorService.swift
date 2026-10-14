import Foundation

public final class TranscriptAuditorService: Sendable {
    public static let shared = TranscriptAuditorService()
    
    private let gradePointsMap: [String: Double] = [
        "A+": 4.0, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "D-": 0.7,
        "F": 0.0
    ]
    
    public init() {}
    
    public func audit(text: String) -> TranscriptAuditResult {
        let lines = text.components(separatedBy: .newlines)
        var parsedCourses: [ParsedCourse] = []
        var detectedSchool: String?
        
        for line in lines {
            let trimmed = line.trimmingCharacters(in: .whitespacesAndNewlines)
            if trimmed.isEmpty { continue }
            
            if detectedSchool == nil {
                if trimmed.localizedCaseInsensitiveContains("college") ||
                   trimmed.localizedCaseInsensitiveContains("university") {
                    detectedSchool = trimmed
                }
            }
            
            if let course = parseLine(trimmed) {
                parsedCourses.append(course)
            }
        }
        
        var totalUnits = 0.0
        var gradedUnits = 0.0
        var totalPoints = 0.0
        
        for course in parsedCourses {
            if course.isPassing || course.gradePoints != nil {
                totalUnits += course.units
            }
            if course.countsInGpa, let pts = course.gradePoints {
                gradedUnits += course.units
                totalPoints += pts * course.units
            }
        }
        
        let gpa = gradedUnits > 0 ? (totalPoints / gradedUnits) : 0.0
        let progress60 = min(1.0, totalUnits / 60.0)
        
        let passingCourses = parsedCourses.filter { $0.isPassing }
        
        // UC 7-Course Pattern evaluation
        // English comp can be satisfied by pure English or 2nd semester critical thinking in English/Writing
        let ucEnglishCourses = passingCourses.filter {
            $0.category == .english || ($0.category == .criticalThinking && ["ENGL", "ENGLISH", "WRIT"].contains($0.subject))
        }
        let mathCourses = passingCourses.filter { $0.category == .math }
        let artsCourses = passingCourses.filter { $0.category == .artsHumanities }
        let socialCourses = passingCourses.filter { $0.category == .socialSciences }
        let scienceCourses = passingCourses.filter { $0.category == .physicalBiological }
        
        let totalBreadth = artsCourses.count + socialCourses.count + scienceCourses.count
        var distinctAreas = 0
        if !artsCourses.isEmpty { distinctAreas += 1 }
        if !socialCourses.isEmpty { distinctAreas += 1 }
        if !scienceCourses.isEmpty { distinctAreas += 1 }
        
        let ucEnglishSatisfied = ucEnglishCourses.count >= 2
        let ucMathSatisfied = mathCourses.count >= 1
        let ucBreadthSatisfied = totalBreadth >= 4 && distinctAreas >= 2
        let ucTotalSatisfied = ucEnglishSatisfied && ucMathSatisfied && ucBreadthSatisfied
        
        let ucPattern = UCSevenCoursePattern(
            englishComp: GeRequirementStatus(
                name: "2 English Composition",
                required: 2,
                completed: min(2, ucEnglishCourses.count),
                isSatisfied: ucEnglishSatisfied,
                matchingCourses: ucEnglishCourses.map { "\($0.code) (\($0.grade))" }
            ),
            mathQuant: GeRequirementStatus(
                name: "1 Mathematical Concepts",
                required: 1,
                completed: min(1, mathCourses.count),
                isSatisfied: ucMathSatisfied,
                matchingCourses: mathCourses.map { "\($0.code) (\($0.grade))" }
            ),
            breadthAreas: GeRequirementStatus(
                name: "4 Breadth Courses (Arts, Social, Science)",
                required: 4,
                completed: min(4, totalBreadth),
                isSatisfied: ucBreadthSatisfied,
                matchingCourses: (artsCourses + socialCourses + scienceCourses).map { "\($0.code) (\($0.grade))" }
            ),
            isSatisfied: ucTotalSatisfied
        )
        
        // CSU Golden Four evaluation
        let oralCourses = passingCourses.filter { $0.category == .oralComm }
        let csuWrittenCourses = passingCourses.filter { $0.category == .english }
        let critCourses = passingCourses.filter { $0.category == .criticalThinking }
        
        let csuA1 = oralCourses.count >= 1
        let csuA2 = csuWrittenCourses.count >= 1
        let csuA3 = critCourses.count >= 1
        let csuB4 = mathCourses.count >= 1
        let csuSatisfied = csuA1 && csuA2 && csuA3 && csuB4
        
        let csuGoldenFour = CSUGoldenFour(
            a1OralComm: GeRequirementStatus(
                name: "A1 Oral Communication",
                required: 1,
                completed: min(1, oralCourses.count),
                isSatisfied: csuA1,
                matchingCourses: oralCourses.map { "\($0.code) (\($0.grade))" }
            ),
            a2WrittenComm: GeRequirementStatus(
                name: "A2 Written Communication",
                required: 1,
                completed: min(1, csuWrittenCourses.count),
                isSatisfied: csuA2,
                matchingCourses: csuWrittenCourses.map { "\($0.code) (\($0.grade))" }
            ),
            a3CriticalThinking: GeRequirementStatus(
                name: "A3 Critical Thinking",
                required: 1,
                completed: min(1, critCourses.count),
                isSatisfied: csuA3,
                matchingCourses: critCourses.map { "\($0.code) (\($0.grade))" }
            ),
            b4MathQuant: GeRequirementStatus(
                name: "B4 Quantitative Reasoning",
                required: 1,
                completed: min(1, mathCourses.count),
                isSatisfied: csuB4,
                matchingCourses: mathCourses.map { "\($0.code) (\($0.grade))" }
            ),
            isSatisfied: csuSatisfied
        )
        
        return TranscriptAuditResult(
            courses: parsedCourses,
            totalUnits: totalUnits,
            gradedUnits: gradedUnits,
            totalGradePoints: totalPoints,
            gpa: (gpa * 100).rounded() / 100,
            progress60Units: progress60,
            detectedSchool: detectedSchool,
            ucSevenCoursePattern: ucPattern,
            csuGoldenFour: csuGoldenFour
        )
    }
    
    private func parseLine(_ line: String) -> ParsedCourse? {
        let pattern = #"^([A-Za-z]{2,8})\s*([0-9]{1,4}[A-Za-z]?)\s+(.*?)\s+([0-9]+(?:\.[0-9]+)?)\s+([A-Fa-f][+-]?|[Pp]|[Nn][Pp]|[Cc][Rr]|[Ww])\s*$"#
        
        guard let regex = try? NSRegularExpression(pattern: pattern, options: []) else {
            return nil
        }
        
        let nsString = line as NSString
        guard let match = regex.firstMatch(in: line, options: [], range: NSRange(location: 0, length: nsString.length)) else {
            return nil
        }
        
        let subject = nsString.substring(with: match.range(at: 1)).uppercased()
        let number = nsString.substring(with: match.range(at: 2)).uppercased()
        let title = nsString.substring(with: match.range(at: 3)).trimmingCharacters(in: .whitespaces)
        let unitsString = nsString.substring(with: match.range(at: 4))
        let grade = nsString.substring(with: match.range(at: 5)).uppercased()
        
        let units = Double(unitsString) ?? 3.0
        let code = "\(subject) \(number)"
        
        let gradePoints = gradePointsMap[grade]
        let countsInGpa = gradePoints != nil
        let isPassing = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "P", "CR"].contains(grade)
        let category = detectCategory(subject: subject, courseNumber: number, title: title)
        
        return ParsedCourse(
            raw: line,
            subject: subject,
            courseNumber: number,
            code: code,
            title: title.isEmpty ? code : title,
            units: units,
            grade: grade,
            gradePoints: gradePoints,
            countsInGpa: countsInGpa,
            isPassing: isPassing,
            category: category
        )
    }
    
    private func detectCategory(subject: String, courseNumber: String, title: String) -> CourseCategory {
        let s = subject.uppercased()
        let num = courseNumber.uppercased()
        let t = title.lowercased()
        
        // Explicit Critical Thinking in title
        if t.contains("critical thinking") || t.contains("logic") {
            return .criticalThinking
        }
        
        // Oral Comm
        if ["COMM", "SPEECH"].contains(s) && ["1", "01", "1A", "3", "03", "4", "11"].contains(where: { num.hasPrefix($0) }) {
            return .oralComm
        }
        
        // Critical Thinking courses
        if (s == "ENGL" && ["1B", "1C", "2", "02", "4", "7"].contains(where: { num.hasPrefix($0) })) ||
           (s == "PHIL" && ["1", "01", "2", "02", "3", "03", "4", "04", "106", "110", "12", "20", "8", "9"].contains(where: { num.hasPrefix($0) })) {
            return .criticalThinking
        }
        
        // English
        if ["ENGL", "ENGLISH", "WRIT", "ESL"].contains(s) {
            return .english
        }
        
        // Math / Stats
        if ["MATH", "MATHEMATICS", "STAT", "STATISTICS", "MATHS"].contains(s) {
            return .math
        }
        
        // Arts & Humanities
        if ["HIST", "HISTORY", "PHIL", "PHILOSOPHY", "HUM", "HUMANITIES", "ART", "ARTH", "MUSIC", "THEA", "SPAN", "FREN", "JAPN", "CHIN", "LIT"].contains(s) {
            return .artsHumanities
        }
        
        // Social & Behavioral
        if ["PSYC", "PSYCHOLOGY", "SOC", "SOCIOLOGY", "POLI", "POLS", "ECON", "ECONOMICS", "ANTH", "GEOG"].contains(s) {
            return .socialSciences
        }
        
        // Physical & Biological
        if ["BIOL", "BIOLOGY", "CHEM", "CHEMISTRY", "PHYS", "PHYSICS", "ASTR", "GEOL", "ANAT", "MICRO"].contains(s) {
            return .physicalBiological
        }
        
        return .other
    }
}
