import SwiftUI

public struct PortfolioView: View {
    @State private var viewModel = PortfolioViewModel()
    @State private var showDeadlinesSheet = false
    @State private var showAddCampusSheet = false
    
    public init() {}
    
    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Student Input Card
                    GlassCard {
                        VStack(alignment: .leading, spacing: 14) {
                            Text("YOUR ACADEMIC PROFILE")
                                .font(.caption.bold())
                                .foregroundStyle(.secondary)
                            
                            HStack(spacing: 16) {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Cumulative GPA")
                                        .font(.caption2.bold())
                                        .foregroundStyle(.secondary)
                                    
                                    HStack {
                                        Image(systemName: "graduationcap")
                                            .foregroundStyle(.blue)
                                        TextField("GPA", text: $viewModel.studentGpaString)
                                            .font(.headline.weight(.bold))
                                    }
                                    .padding(10)
                                    .background(Color.appFieldBackground)
                                    .clipShape(.rect(cornerRadius: 10))
                                }
                                
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Target Major")
                                        .font(.caption2.bold())
                                        .foregroundStyle(.secondary)
                                    
                                    HStack {
                                        Image(systemName: "books.vertical.fill")
                                            .foregroundStyle(.blue)
                                        TextField("Major", text: $viewModel.selectedFocus)
                                            .font(.headline)
                                    }
                                    .padding(10)
                                    .background(Color.appFieldBackground)
                                    .clipShape(.rect(cornerRadius: 10))
                                }
                            }
                        }
                    }
                    
                    // Preset Templates
                    VStack(alignment: .leading, spacing: 8) {
                        Text("PRESET PORTFOLIO ARCHITECTURES")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                            .padding(.horizontal, 4)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                ForEach(viewModel.presetPortfolios) { preset in
                                    Button {
                                        viewModel.applyPreset(preset)
                                    } label: {
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text(preset.title)
                                                .font(.caption.bold())
                                                .foregroundStyle(.primary)
                                            Text("\(preset.campuses.count) campuses")
                                                .font(.caption2)
                                                .foregroundStyle(.secondary)
                                        }
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 8)
                                        .background(Color.appCardBackground)
                                        .clipShape(.rect(cornerRadius: 10))
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 10)
                                                .stroke(Color.primary.opacity(0.06), lineWidth: 1)
                                        )
                                    }
                                    .buttonStyle(.plain)
                                }
                            }
                        }
                    }
                    
                    // Portfolio Health Assessment
                    HealthScoreCardView(health: viewModel.portfolioHealth)
                    
                    // Campus Evaluations List
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Campus Chancing & Strategy")
                                .font(.headline)
                            Spacer()
                            Button {
                                showAddCampusSheet = true
                            } label: {
                                Label("Add Campus", systemImage: "plus.circle.fill")
                                    .font(.subheadline.bold())
                            }
                        }
                        
                        if viewModel.evaluations.isEmpty {
                            EmptyStateView(
                                icon: "building.columns",
                                title: "No Campuses Added",
                                subtitle: "Select a preset above or tap Add Campus to evaluate your transfer portfolio."
                            )
                        } else {
                            ForEach(viewModel.evaluations) { eval in
                                CampusEvaluationRow(evaluation: eval) {
                                    viewModel.toggleCampus(eval.campus)
                                }
                            }
                        }
                    }
                }
                .padding(16)
            }
            .navigationTitle("Portfolio Strategy")
            .appInlineTitleDisplayMode()
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button {
                        showDeadlinesSheet = true
                    } label: {
                        Image(systemName: "calendar")
                    }
                }
            }
            .sheet(isPresented: $showDeadlinesSheet) {
                DeadlinesTimelineView(deadlines: viewModel.deadlines)
            }
            .sheet(isPresented: $showAddCampusSheet) {
                NavigationStack {
                    List {
                        ForEach(Array(viewModel.allProfiles.keys.sorted()), id: \.self) { name in
                            HStack {
                                Text(name)
                                Spacer()
                                if viewModel.selectedCampusNames.contains(name) {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundStyle(.blue)
                                }
                            }
                            .contentShape(Rectangle())
                            .onTapGesture {
                                viewModel.toggleCampus(name)
                            }
                        }
                    }
                    .navigationTitle("Add Campuses")
                    .appInlineTitleDisplayMode()
                    .toolbar {
                        ToolbarItem(placement: .confirmationAction) {
                            Button("Done") { showAddCampusSheet = false }
                        }
                    }
                }
            }
            .task {
                await viewModel.loadData()
            }
        }
    }
}

#Preview {
    PortfolioView()
}
