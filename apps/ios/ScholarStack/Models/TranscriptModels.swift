import Foundation

public enum CourseCategory: String, Codable, CaseIterable, Sendable {
    case english = "english"
    case math = "math"
    case artsHumanities = "arts_humanities"
    case socialSciences = "social_sciences"
    case physicalBiological = "physical_biological"
    case oralComm = "oral_comm"
    case criticalThinking = "critical_thinking"
    case other = "other"
    
    public var displayName: String {
        switch self {
        case .english: return "English Composition"
        case .math: return "Math & Quantitative"
        case .artsHumanities: return "Arts & Humanities"
        case .socialSciences: return "Social & Behavioral Sciences"
        case .physicalBiological: return "Physical & Biological Sciences"
        case .oralComm: return "Oral Communication"
        case .criticalThinking: return "Critical Thinking"
        case .other: return "Electives / Other"
        }
    }
}

public struct ParsedCourse: Identifiable, Codable, Hashable, Sendable {
    public var id: String { "\(subject)_\(courseNumber)_\(raw.hashValue)" }
    public let raw: String
    public let subject: String
    public let courseNumber: String
    public let code: String
    public let title: String
    public let units: Double
    public let grade: String
    public let gradePoints: Double?
    public let countsInGpa: Bool
    public let isPassing: Bool
    public let category: CourseCategory
    
    public init(
        raw: String,
        subject: String,
        courseNumber: String,
        code: String,
        title: String,
        units: Double,
        grade: String,
        gradePoints: Double?,
        countsInGpa: Bool,
        isPassing: Bool,
        category: CourseCategory = .other
    ) {
        self.raw = raw
        self.subject = subject
        self.courseNumber = courseNumber
        self.code = code
        self.title = title
        self.units = units
        self.grade = grade
        self.gradePoints = gradePoints
        self.countsInGpa = countsInGpa
        self.isPassing = isPassing
        self.category = category
    }
}

public struct GeRequirementStatus: Codable, Hashable, Sendable {
    public let name: String
    public let required: Int
    public let completed: Int
    public let isSatisfied: Bool
    public let matchingCourses: [String]
    
    public init(
        name: String,
        required: Int,
        completed: Int,
        isSatisfied: Bool,
        matchingCourses: [String]
    ) {
        self.name = name
        self.required = required
        self.completed = completed
        self.isSatisfied = isSatisfied
        self.matchingCourses = matchingCourses
    }
}

public struct UCSevenCoursePattern: Codable, Hashable, Sendable {
    public let englishComp: GeRequirementStatus
    public let mathQuant: GeRequirementStatus
    public let breadthAreas: GeRequirementStatus
    public let isSatisfied: Bool
}

public struct CSUGoldenFour: Codable, Hashable, Sendable {
    public let a1OralComm: GeRequirementStatus
    public let a2WrittenComm: GeRequirementStatus
    public let a3CriticalThinking: GeRequirementStatus
    public let b4MathQuant: GeRequirementStatus
    public let isSatisfied: Bool
}

public struct TranscriptAuditResult: Codable, Hashable, Sendable {
    public let courses: [ParsedCourse]
    public let totalUnits: Double
    public let gradedUnits: Double
    public let totalGradePoints: Double
    public let gpa: Double
    public let progress60Units: Double
    public let detectedSchool: String?
    public let ucSevenCoursePattern: UCSevenCoursePattern
    public let csuGoldenFour: CSUGoldenFour
    
    public static var empty: TranscriptAuditResult {
        TranscriptAuditResult(
            courses: [],
            totalUnits: 0,
            gradedUnits: 0,
            totalGradePoints: 0,
            gpa: 0.0,
            progress60Units: 0,
            detectedSchool: nil,
            ucSevenCoursePattern: UCSevenCoursePattern(
                englishComp: GeRequirementStatus(name: "2 English Composition", required: 2, completed: 0, isSatisfied: false, matchingCourses: []),
                mathQuant: GeRequirementStatus(name: "1 Math / Quantitative Reasoning", required: 1, completed: 0, isSatisfied: false, matchingCourses: []),
                breadthAreas: GeRequirementStatus(name: "4 Breadth Courses", required: 4, completed: 0, isSatisfied: false, matchingCourses: []),
                isSatisfied: false
            ),
            csuGoldenFour: CSUGoldenFour(
                a1OralComm: GeRequirementStatus(name: "A1 Oral Communication", required: 1, completed: 0, isSatisfied: false, matchingCourses: []),
                a2WrittenComm: GeRequirementStatus(name: "A2 Written Communication", required: 1, completed: 0, isSatisfied: false, matchingCourses: []),
                a3CriticalThinking: GeRequirementStatus(name: "A3 Critical Thinking", required: 1, completed: 0, isSatisfied: false, matchingCourses: []),
                b4MathQuant: GeRequirementStatus(name: "B4 Quantitative Reasoning", required: 1, completed: 0, isSatisfied: false, matchingCourses: []),
                isSatisfied: false
            )
        )
    }
}
