import Foundation
import Observation

@Observable
@MainActor
public final class PlannerViewModel {
    public var selectedCampus: String = "UC Berkeley"
    public var selectedCohort: Cohort = .transfer
    public var selectedMajor: String = "Computer Science"
    public var selectedSourceSchool: String = "De Anza College"
    
    public var campuses: [CampusAdmissionProfile] = []
    public var availableMajors: [String] = []
    public var availableSourceSchools: [String] = []
    public var metrics: [Metric] = []
    public var isLoading: Bool = false
    public var selectedCitation: Citation?
    public var isEvidencePresented: Bool = false
    
    private let dataService: AdmissionsDataServiceProtocol
    
    public init(dataService: AdmissionsDataServiceProtocol = AdmissionsDataService.shared) {
        self.dataService = dataService
    }
    
    public var currentProfile: CampusAdmissionProfile? {
        campuses.first(where: { $0.name == selectedCampus })
    }
    
    public var currentAdmitRate: Double {
        guard let p = currentProfile else { return 25.0 }
        return selectedCohort == .transfer ? p.transferAdmitRate : p.freshmanAdmitRate
    }
    
    public var currentGpaP25: Double {
        guard let p = currentProfile else { return 3.5 }
        return selectedCohort == .transfer ? p.transferGpaP25 : p.freshmanGpaP25
    }
    
    public var currentGpaP75: Double {
        guard let p = currentProfile else { return 3.9 }
        return selectedCohort == .transfer ? p.transferGpaP75 : p.freshmanGpaP75
    }
    
    public func loadInitialData() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            self.campuses = try await dataService.loadCampuses()
            self.availableMajors = dataService.loadTransferMajors()
            self.availableSourceSchools = dataService.loadSourceSchools()
            await refreshMetrics()
        } catch {
            print("Error loading planner data: \(error)")
        }
    }
    
    public func refreshMetrics() async {
        do {
            self.metrics = try await dataService.fetchMetrics(
                campus: selectedCampus,
                cohort: selectedCohort.rawValue,
                major: selectedMajor,
                limit: 10
            )
        } catch {
            print("Error refreshing metrics: \(error)")
        }
    }
    
    public func showEvidence(for citation: Citation) {
        self.selectedCitation = citation
        self.isEvidencePresented = true
    }
}
