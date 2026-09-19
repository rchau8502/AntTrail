import Foundation
import Observation

@Observable
@MainActor
public final class DirectoryViewModel {
    public var searchQuery: String = ""
    public var selectedState: String? = "CA"
    public var selectedControl: String?
    public var institutions: [Institution] = []
    public var isLoading: Bool = false
    public var selectedInstitution: Institution?
    
    private let dataService: AdmissionsDataServiceProtocol
    
    public init(dataService: AdmissionsDataServiceProtocol = AdmissionsDataService.shared) {
        self.dataService = dataService
    }
    
    public var filteredInstitutions: [Institution] {
        institutions.filter { inst in
            let q = searchQuery.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
            let matchesQuery = q.isEmpty ||
                inst.name.lowercased().contains(q) ||
                (inst.city?.lowercased().contains(q) ?? false)
            
            let matchesState = selectedState == nil || selectedState?.isEmpty == true || inst.state?.lowercased() == selectedState?.lowercased()
            let matchesControl = selectedControl == nil || selectedControl?.isEmpty == true || inst.control?.lowercased() == selectedControl?.lowercased()
            
            return matchesQuery && matchesState && matchesControl
        }
    }
    
    public func loadData() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            self.institutions = try await dataService.loadInstitutions()
        } catch {
            print("Error loading directory data: \(error)")
        }
    }
}
