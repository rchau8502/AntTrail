import SwiftUI

public struct CollegeDirectoryView: View {
    @State private var viewModel = DirectoryViewModel()
    
    public init() {}
    
    public var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.filteredInstitutions) { inst in
                    NavigationLink(value: inst) {
                        VStack(alignment: .leading, spacing: 6) {
                            HStack(alignment: .top) {
                                Text(inst.name)
                                    .font(.headline)
                                    .foregroundStyle(.primary)
                                    .lineLimit(2)
                                
                                Spacer()
                                
                                if let state = inst.state {
                                    Text(state)
                                        .font(.caption2.bold())
                                        .padding(.horizontal, 6)
                                        .padding(.vertical, 2)
                                        .background(Color.secondary.opacity(0.12))
                                        .foregroundStyle(.secondary)
                                        .clipShape(.capsule)
                                }
                            }
                            
                            HStack(spacing: 8) {
                                if let control = inst.control {
                                    Text(control)
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                
                                if let rate = inst.admissionRate {
                                    Text("•  \(Int(rate * 100))% Admit")
                                        .font(.caption.bold())
                                        .foregroundStyle(.green)
                                }
                                
                                if let price = inst.avgNetPrice {
                                    Text("•  $\(price.formatted())/yr")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                            }
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .appGroupedListStyle()
            .navigationTitle("College Directory")
            .appInlineTitleDisplayMode()
            .searchable(text: $viewModel.searchQuery, prompt: "Search colleges, cities...")
            .navigationDestination(for: Institution.self) { inst in
                CollegeDetailView(institution: inst)
            }
            .overlay {
                if viewModel.filteredInstitutions.isEmpty && !viewModel.isLoading {
                    EmptyStateView(
                        icon: "magnifyingglass",
                        title: "No Institutions Found",
                        subtitle: "Try adjusting your search query or filters."
                    )
                }
            }
            .task {
                await viewModel.loadData()
            }
        }
    }
}
