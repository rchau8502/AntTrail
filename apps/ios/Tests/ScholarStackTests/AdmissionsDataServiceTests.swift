import Testing
@testable import ScholarStack

@Suite("Admissions Data Service Tests")
struct AdmissionsDataServiceTests {
    
    @Test("Loads campuses and verifies flagship institutions exist")
    func testLoadCampuses() async throws {
        let service = AdmissionsDataService.shared
        let campuses = try await service.loadCampuses()
        
        #expect(!campuses.isEmpty)
        #expect(campuses.contains(where: { $0.name == "UC Berkeley" }))
        #expect(campuses.contains(where: { $0.name == "UCLA" }))
        #expect(campuses.contains(where: { $0.name == "Cal Poly San Luis Obispo" }))
    }
    
    @Test("Searches institutions by name and filters by state")
    func testSearchInstitutions() async throws {
        let service = AdmissionsDataService.shared
        let results = try await service.searchInstitutions(query: "Berkeley", state: "CA")
        
        #expect(!results.isEmpty)
        #expect(results.first?.name.contains("Berkeley") == true)
    }
    
    @Test("Fetches metrics with official citations")
    func testFetchMetricsWithCitations() async throws {
        let service = AdmissionsDataService.shared
        let metrics = try await service.fetchMetrics(campus: "UC Berkeley", cohort: "transfer", major: "Computer Science")
        
        #expect(!metrics.isEmpty)
        let first = try #require(metrics.first)
        #expect(!first.citations.isEmpty)
        #expect(first.citations.first?.publisher.isEmpty == false)
    }
}
