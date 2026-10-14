import Foundation
import Observation

@Observable
@MainActor
public final class PortfolioViewModel {
    public var studentGpaString: String = "3.75"
    public var selectedCohort: Cohort = .transfer
    public var selectedFocus: String = "Computer Science"
    public var selectedCampusNames: [String] = [
        "UC Berkeley", "UCLA", "UC San Diego", "UC Irvine", "UC Davis", "San Jose State University"
    ]
    
    public var allProfiles: [String: CampusAdmissionProfile] = [:]
    public var presetPortfolios: [PresetPortfolio] = []
    public var deadlines: [ApplicationDeadline] = []
    public var isLoading: Bool = false
    
    private let dataService: AdmissionsDataServiceProtocol
    private let advisorService: PortfolioAdvisorService
    
    public init(
        dataService: AdmissionsDataServiceProtocol = AdmissionsDataService.shared,
        advisorService: PortfolioAdvisorService = PortfolioAdvisorService.shared
    ) {
        self.dataService = dataService
        self.advisorService = advisorService
        self.presetPortfolios = dataService.loadPresetPortfolios()
        self.deadlines = dataService.loadDeadlines()
    }
    
    public var studentGpa: Double? {
        Double(studentGpaString.replacingOccurrences(of: ",", with: "."))
    }
    
    public var evaluations: [CampusAdmissionEvaluation] {
        selectedCampusNames.compactMap { name in
            guard let profile = allProfiles[name] else { return nil }
            return advisorService.evaluateCampus(
                profile: profile,
                studentGpa: studentGpa,
                cohort: selectedCohort,
                focus: selectedFocus
            )
        }
    }
    
    public var portfolioHealth: PortfolioHealth {
        advisorService.calculateHealth(evaluations: evaluations)
    }
    
    public func loadData() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            self.allProfiles = try await dataService.loadAdmissionProfiles()
        } catch {
            print("Error loading portfolio data: \(error)")
        }
    }
    
    public func applyPreset(_ preset: PresetPortfolio) {
        self.selectedCampusNames = preset.campuses
    }
    
    public func toggleCampus(_ campus: String) {
        if selectedCampusNames.contains(campus) {
            selectedCampusNames.removeAll { $0 == campus }
        } else {
            selectedCampusNames.append(campus)
        }
    }
    
    public func updateGpaFromAudit(_ gpa: Double) {
        if gpa > 0 {
            self.studentGpaString = String(format: "%.2f", gpa)
        }
    }
}
