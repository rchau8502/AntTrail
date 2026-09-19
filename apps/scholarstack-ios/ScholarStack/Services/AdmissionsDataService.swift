import Foundation

public final class AdmissionsDataService: AdmissionsDataServiceProtocol, @unchecked Sendable {
    public static let shared = AdmissionsDataService()
    
    private var cachedProfiles: [CampusAdmissionProfile]?
    private var cachedInstitutions: [Institution]?
    
    public init() {}
    
    public func loadCampuses() async throws -> [CampusAdmissionProfile] {
        if let cached = cachedProfiles {
            return cached
        }
        
        let loaded = loadBundledProfiles()
        self.cachedProfiles = loaded
        return loaded
    }
    
    public func loadAdmissionProfiles() async throws -> [String: CampusAdmissionProfile] {
        let list = try await loadCampuses()
        return Dictionary(uniqueKeysWithValues: list.map { ($0.name, $0) })
    }
    
    public func loadInstitutions() async throws -> [Institution] {
        if let cached = cachedInstitutions {
            return cached
        }
        
        let loaded = loadBundledInstitutions()
        self.cachedInstitutions = loaded
        return loaded
    }
    
    public func searchInstitutions(
        query: String,
        state: String? = nil,
        control: String? = nil,
        limit: Int = 50
    ) async throws -> [Institution] {
        let all = try await loadInstitutions()
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        
        return all.filter { inst in
            let matchesQuery = trimmed.isEmpty ||
                inst.name.lowercased().contains(trimmed) ||
                (inst.city?.lowercased().contains(trimmed) ?? false)
            
            let matchesState = state == nil || state?.isEmpty == true || inst.state?.lowercased() == state?.lowercased()
            let matchesControl = control == nil || control?.isEmpty == true || inst.control?.lowercased() == control?.lowercased()
            
            return matchesQuery && matchesState && matchesControl
        }
    }
    
    public func loadPresetPortfolios() -> [PresetPortfolio] {
        return [
            PresetPortfolio(
                id: "comprehensive_uc",
                title: "UC Systemwide Balanced",
                subtitle: "Flagships, mid-tier targets, and guaranteed TAG options",
                campuses: ["UC Berkeley", "UCLA", "UC San Diego", "UC Irvine", "UC Davis", "UC Santa Barbara"]
            ),
            PresetPortfolio(
                id: "top_tech_stem",
                title: "California Tech & STEM",
                subtitle: "Top software and engineering pipelines across UC and CSU",
                campuses: ["UC Berkeley", "UCLA", "UC San Diego", "UC Irvine", "Cal Poly San Luis Obispo", "San Jose State University"]
            ),
            PresetPortfolio(
                id: "csu_career_poly",
                title: "Top CSU Career & Poly",
                subtitle: "High-ROI polytechnics and top state universities",
                campuses: ["Cal Poly San Luis Obispo", "San Diego State University", "San Jose State University", "Cal Poly Pomona", "Cal State Long Beach"]
            ),
            PresetPortfolio(
                id: "socal_publics",
                title: "Southern California Hub",
                subtitle: "Top commuting and residential universities in greater SoCal",
                campuses: ["UCLA", "UC Irvine", "UC San Diego", "Cal State Long Beach", "Cal Poly Pomona", "Cal State Fullerton"]
            ),
            PresetPortfolio(
                id: "norcal_corridor",
                title: "Northern California Corridor",
                subtitle: "Silicon Valley and Bay Area tech and research engines",
                campuses: ["UC Berkeley", "UC Davis", "UC Santa Cruz", "San Jose State University"]
            )
        ]
    }
    
    public func loadDeadlines() -> [ApplicationDeadline] {
        return [
            ApplicationDeadline(
                id: "tag_submission",
                title: "UC TAG Application Filing Window",
                dateDisplay: "September 1 – 30",
                deadlineMonth: 9,
                deadlineDay: 30,
                appliesTo: "transfer",
                critical: true,
                description: "Submit your online Transfer Admission Guarantee (TAG) application for ONE participating UC campus.",
                actionItem: "Pick your preferred TAG campus and confirm GPA + 30 transferable units requirement."
            ),
            ApplicationDeadline(
                id: "uc_app_filing",
                title: "UC Priority Filing Window",
                dateDisplay: "October 1 – November 30",
                deadlineMonth: 11,
                deadlineDay: 30,
                appliesTo: "both",
                critical: true,
                description: "Official filing period for undergraduate admission to all nine UC undergraduate campuses.",
                actionItem: "Finalize personal insight questions (PIQs) and submit applications."
            ),
            ApplicationDeadline(
                id: "csu_apply_filing",
                title: "Cal State Apply Priority Window",
                dateDisplay: "October 1 – November 30",
                deadlineMonth: 11,
                deadlineDay: 30,
                appliesTo: "both",
                critical: true,
                description: "Priority application filing period across all 23 California State University campuses.",
                actionItem: "Ensure ADT status is declared if completing an AA-T or AS-T degree."
            ),
            ApplicationDeadline(
                id: "transfer_academic_update",
                title: "UC Transfer Academic Update (TAU)",
                dateDisplay: "January 8 – January 31",
                deadlineMonth: 1,
                deadlineDay: 31,
                appliesTo: "transfer",
                critical: true,
                description: "Mandatory update logging official fall grades and verifying in-progress spring coursework.",
                actionItem: "Log in to your UC application and submit final fall term grades before Jan 31."
            ),
            ApplicationDeadline(
                id: "financial_aid_priority",
                title: "FAFSA & California Dream Act Priority",
                dateDisplay: "March 2 Priority Deadline",
                deadlineMonth: 3,
                deadlineDay: 2,
                appliesTo: "both",
                critical: true,
                description: "Priority deadline to guarantee Cal Grant, UC Blue and Gold Plan, and Middle Class Scholarship.",
                actionItem: "Submit FAFSA or CADAA and ensure CCC verified Cal Grant GPA."
            ),
            ApplicationDeadline(
                id: "transfer_decision_window",
                title: "Transfer Decisions Released",
                dateDisplay: "April 1 – April 30",
                deadlineMonth: 4,
                deadlineDay: 30,
                appliesTo: "transfer",
                critical: false,
                description: "UC and CSU transfer admission decisions released rolling throughout the month of April.",
                actionItem: "Review portal admission letters and track any conditional admission requirements."
            ),
            ApplicationDeadline(
                id: "transfer_sir_deadline",
                title: "Transfer Statement of Intent to Register (SIR)",
                dateDisplay: "June 1",
                deadlineMonth: 6,
                deadlineDay: 1,
                appliesTo: "transfer",
                critical: true,
                description: "Final deadline for transfer admits to accept their offer and commit to their university.",
                actionItem: "Accept offer, pay deposit, and register for transfer orientation."
            )
        ]
    }
    
    public func loadTransferMajors() -> [String] {
        return [
            "Computer Science",
            "Mathematics",
            "Data Science",
            "Biology",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Business Administration",
            "Economics",
            "Psychology",
            "Political Science",
            "Sociology",
            "English",
            "History",
            "Chemistry",
            "Public Health",
            "Civil Engineering",
            "Communications"
        ]
    }
    
    public func loadSourceSchools() -> [String] {
        return [
            "De Anza College",
            "Santa Monica College",
            "Diablo Valley College",
            "Pasadena City College",
            "Orange Coast College",
            "Irvine Valley College",
            "Foothill College",
            "Mt. San Antonio College",
            "Saddleback College",
            "Fullerton College",
            "Riverside City College",
            "San Diego Mesa College"
        ]
    }
    
    public func fetchMetrics(campus: String, cohort: String, major: String?, limit: Int = 10) async throws -> [Metric] {
        let profiles = try await loadAdmissionProfiles()
        guard let p = profiles[campus] else { return [] }
        
        let admitRate = cohort == "transfer" ? p.transferAdmitRate : p.freshmanAdmitRate
        let gpaP25 = cohort == "transfer" ? p.transferGpaP25 : p.freshmanGpaP25
        let gpaP75 = cohort == "transfer" ? p.transferGpaP75 : p.freshmanGpaP75
        
        let citation = Citation(
            title: "\(campus) Official Admissions Statistics",
            publisher: p.segment == .uc ? "UC Information Center" : "CSU Data Center",
            year: 2024,
            sourceUrl: p.sourceBase,
            interpretationNote: "Verified official system-wide institutional research data."
        )
        
        return [
            Metric(
                id: 101,
                campus: campus,
                major: major,
                discipline: nil,
                sourceSchool: nil,
                schoolType: nil,
                cohort: cohort,
                statName: "Admit Rate",
                statValueNumeric: admitRate,
                statValueText: "\(String(format: "%.1f", admitRate))%",
                unit: "%",
                percentile: nil,
                year: 2024,
                term: "Fall",
                notes: "Overall selectivity percentage for \(cohort) cohort",
                citations: [citation]
            ),
            Metric(
                id: 102,
                campus: campus,
                major: major,
                discipline: nil,
                sourceSchool: nil,
                schoolType: nil,
                cohort: cohort,
                statName: "GPA 25th Percentile",
                statValueNumeric: gpaP25,
                statValueText: String(format: "%.2f", gpaP25),
                unit: "GPA",
                percentile: "25th",
                year: 2024,
                term: "Fall",
                notes: "25% of admitted students enrolled with a GPA at or below this value",
                citations: [citation]
            ),
            Metric(
                id: 103,
                campus: campus,
                major: major,
                discipline: nil,
                sourceSchool: nil,
                schoolType: nil,
                cohort: cohort,
                statName: "GPA 75th Percentile",
                statValueNumeric: gpaP75,
                statValueText: String(format: "%.2f", gpaP75),
                unit: "GPA",
                percentile: "75th",
                year: 2024,
                term: "Fall",
                notes: "Top quartile admit GPA threshold",
                citations: [citation]
            )
        ]
    }
    
    // MARK: - Internal Bundled Fallbacks
    
    private func loadBundledProfiles() -> [CampusAdmissionProfile] {
        if let url = Bundle.main.url(forResource: "admission_profiles", withExtension: "json", subdirectory: "Data") ??
                     Bundle.main.url(forResource: "admission_profiles", withExtension: "json"),
           let data = try? Data(contentsOf: url),
           let list = try? JSONDecoder().decode([CampusAdmissionProfile].self, from: data) {
            return list
        }
        
        // Fallback hardcoded defaults if JSON isn't located
        return [
            CampusAdmissionProfile(name: "UC Berkeley", segment: .uc, transferAdmitRate: 25.0, transferGpaP25: 3.82, transferGpaP75: 4.0, freshmanAdmitRate: 11.6, freshmanGpaP25: 3.89, freshmanGpaP75: 4.0, avgNetPrice: 18450, medianEarnings: 86400, website: "https://berkeley.edu", sourceBase: "https://universityofcalifornia.edu"),
            CampusAdmissionProfile(name: "UCLA", segment: .uc, transferAdmitRate: 24.0, transferGpaP25: 3.83, transferGpaP75: 4.0, freshmanAdmitRate: 8.8, freshmanGpaP25: 3.9, freshmanGpaP75: 4.0, avgNetPrice: 15724, medianEarnings: 82500, website: "https://ucla.edu", sourceBase: "https://universityofcalifornia.edu"),
            CampusAdmissionProfile(name: "UC San Diego", segment: .uc, transferAdmitRate: 56.0, transferGpaP25: 3.56, transferGpaP75: 3.93, freshmanAdmitRate: 24.7, freshmanGpaP25: 3.8, freshmanGpaP75: 4.0, avgNetPrice: 16800, medianEarnings: 79200, website: "https://ucsd.edu", sourceBase: "https://universityofcalifornia.edu"),
            CampusAdmissionProfile(name: "UC Irvine", segment: .uc, transferAdmitRate: 43.5, transferGpaP25: 3.55, transferGpaP75: 3.92, freshmanAdmitRate: 21.0, freshmanGpaP25: 3.75, freshmanGpaP75: 4.0, avgNetPrice: 14200, medianEarnings: 74800, website: "https://uci.edu", sourceBase: "https://universityofcalifornia.edu"),
            CampusAdmissionProfile(name: "UC Davis", segment: .uc, transferAdmitRate: 56.5, transferGpaP25: 3.45, transferGpaP75: 3.88, freshmanAdmitRate: 41.9, freshmanGpaP25: 3.65, freshmanGpaP75: 4.0, avgNetPrice: 16100, medianEarnings: 75200, website: "https://ucdavis.edu", sourceBase: "https://universityofcalifornia.edu"),
            CampusAdmissionProfile(name: "Cal Poly San Luis Obispo", segment: .csu, transferAdmitRate: 16.5, transferGpaP25: 3.55, transferGpaP75: 3.95, freshmanAdmitRate: 29.0, freshmanGpaP25: 3.85, freshmanGpaP75: 4.0, avgNetPrice: 19800, medianEarnings: 82100, website: "https://calpoly.edu", sourceBase: "https://calstate.edu"),
            CampusAdmissionProfile(name: "San Jose State University", segment: .csu, transferAdmitRate: 64.0, transferGpaP25: 3.15, transferGpaP75: 3.70, freshmanAdmitRate: 75.0, freshmanGpaP25: 3.25, freshmanGpaP75: 3.80, avgNetPrice: 15200, medianEarnings: 79800, website: "https://sjsu.edu", sourceBase: "https://calstate.edu"),
            CampusAdmissionProfile(name: "San Diego State University", segment: .csu, transferAdmitRate: 32.0, transferGpaP25: 3.35, transferGpaP75: 3.82, freshmanAdmitRate: 38.0, freshmanGpaP25: 3.55, freshmanGpaP75: 3.95, avgNetPrice: 14500, medianEarnings: 66900, website: "https://sdsu.edu", sourceBase: "https://calstate.edu"),
            CampusAdmissionProfile(name: "Stanford University", segment: .private, transferAdmitRate: 2.1, transferGpaP25: 3.92, transferGpaP75: 4.0, freshmanAdmitRate: 3.9, freshmanGpaP25: 3.95, freshmanGpaP75: 4.0, avgNetPrice: 19500, medianEarnings: 112000, website: "https://stanford.edu", sourceBase: "https://stanford.edu"),
            CampusAdmissionProfile(name: "University of Southern California", segment: .private, transferAdmitRate: 23.5, transferGpaP25: 3.72, transferGpaP75: 3.98, freshmanAdmitRate: 9.9, freshmanGpaP25: 3.85, freshmanGpaP75: 4.0, avgNetPrice: 38500, medianEarnings: 89500, website: "https://usc.edu", sourceBase: "https://usc.edu")
        ]
    }
    
    private func loadBundledInstitutions() -> [Institution] {
        if let url = Bundle.main.url(forResource: "institutions", withExtension: "json", subdirectory: "Data") ??
                     Bundle.main.url(forResource: "institutions", withExtension: "json"),
           let data = try? Data(contentsOf: url),
           let list = try? JSONDecoder().decode([Institution].self, from: data) {
            return list
        }
        
        return [
            Institution(
                externalId: "110635",
                name: "University of California, Berkeley",
                city: "Berkeley",
                state: "CA",
                zip: "94720",
                control: "Public",
                studentSize: 32831,
                admissionRate: 0.11,
                satAverage: 1440,
                actMidpoint: 33,
                avgNetPrice: 18450,
                tuitionInState: 14850,
                tuitionOutOfState: 44624,
                completionRate: 0.93,
                medianEarnings10yr: 86400
            ),
            Institution(
                externalId: "110662",
                name: "University of California, Los Angeles",
                city: "Los Angeles",
                state: "CA",
                zip: "90095",
                control: "Public",
                studentSize: 32423,
                admissionRate: 0.09,
                satAverage: 1435,
                actMidpoint: 33,
                avgNetPrice: 15724,
                tuitionInState: 14114,
                tuitionOutOfState: 43888,
                completionRate: 0.92,
                medianEarnings10yr: 82500
            )
        ]
    }
}
