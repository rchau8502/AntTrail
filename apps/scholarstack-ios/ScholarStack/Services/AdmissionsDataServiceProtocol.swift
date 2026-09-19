import Foundation

public protocol AdmissionsDataServiceProtocol: Sendable {
    func loadCampuses() async throws -> [CampusAdmissionProfile]
    func loadAdmissionProfiles() async throws -> [String: CampusAdmissionProfile]
    func loadInstitutions() async throws -> [Institution]
    func searchInstitutions(query: String, state: String?, control: String?, limit: Int) async throws -> [Institution]
    func loadPresetPortfolios() -> [PresetPortfolio]
    func loadDeadlines() -> [ApplicationDeadline]
    func loadTransferMajors() -> [String]
    func loadSourceSchools() -> [String]
    func fetchMetrics(campus: String, cohort: String, major: String?, limit: Int) async throws -> [Metric]
}
