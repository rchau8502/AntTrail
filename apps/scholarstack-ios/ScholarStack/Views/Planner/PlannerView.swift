import SwiftUI

public struct PlannerView: View {
    @State private var viewModel = PlannerViewModel()
    
    public init() {}
    
    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Campus Selector Card
                    GlassCard {
                        VStack(alignment: .leading, spacing: 14) {
                            Text("TARGET PATHWAY")
                                .font(.caption.bold())
                                .foregroundStyle(.secondary)
                            
                            // Cohort Picker
                            Picker("Cohort", selection: $viewModel.selectedCohort) {
                                ForEach(Cohort.allCases, id: \.self) { c in
                                    Text(c == .transfer ? "Transfer Pathway" : "First-Year Applicant").tag(c)
                                }
                            }
                            .pickerStyle(.segmented)
                            .sensoryFeedback(.selection, trigger: viewModel.selectedCohort)
                            
                            // Campus Menu
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Destination Campus")
                                    .font(.caption2.bold())
                                    .foregroundStyle(.secondary)
                                
                                Menu {
                                    ForEach(viewModel.campuses) { campus in
                                        Button(campus.name) {
                                            viewModel.selectedCampus = campus.name
                                            Task { await viewModel.refreshMetrics() }
                                        }
                                    }
                                } label: {
                                    HStack {
                                        Image(systemName: "building.columns.fill")
                                            .foregroundStyle(.blue)
                                        Text(viewModel.selectedCampus)
                                            .font(.headline)
                                            .foregroundStyle(.primary)
                                        Spacer()
                                        Image(systemName: "chevron.up.chevron.down")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                    .padding(12)
                                    .background(Color.appFieldBackground)
                                    .clipShape(.rect(cornerRadius: 10))
                                }
                                .sensoryFeedback(.selection, trigger: viewModel.selectedCampus)
                            }
                            
                            // Major Picker
                            HStack(spacing: 12) {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Major / Discipline")
                                        .font(.caption2.bold())
                                        .foregroundStyle(.secondary)
                                    
                                    Menu {
                                        ForEach(viewModel.availableMajors, id: \.self) { major in
                                            Button(major) {
                                                viewModel.selectedMajor = major
                                                Task { await viewModel.refreshMetrics() }
                                            }
                                        }
                                    } label: {
                                        HStack {
                                            Text(viewModel.selectedMajor)
                                                .font(.subheadline)
                                                .foregroundStyle(.primary)
                                                .lineLimit(1)
                                            Spacer()
                                            Image(systemName: "chevron.up.chevron.down")
                                                .font(.caption2)
                                                .foregroundStyle(.secondary)
                                        }
                                        .padding(10)
                                        .background(Color.appFieldBackground)
                                        .clipShape(.rect(cornerRadius: 10))
                                    }
                                }
                                
                                if viewModel.selectedCohort == .transfer {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("Source College")
                                            .font(.caption2.bold())
                                            .foregroundStyle(.secondary)
                                        
                                        Menu {
                                            ForEach(viewModel.availableSourceSchools, id: \.self) { school in
                                                Button(school) {
                                                    viewModel.selectedSourceSchool = school
                                                    Task { await viewModel.refreshMetrics() }
                                                }
                                            }
                                        } label: {
                                            HStack {
                                                Text(viewModel.selectedSourceSchool)
                                                    .font(.subheadline)
                                                    .foregroundStyle(.primary)
                                                .lineLimit(1)
                                                Spacer()
                                                Image(systemName: "chevron.up.chevron.down")
                                                    .font(.caption2)
                                                    .foregroundStyle(.secondary)
                                            }
                                            .padding(10)
                                            .background(Color.appFieldBackground)
                                            .clipShape(.rect(cornerRadius: 10))
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    // Quick Stats Row
                    HStack(spacing: 12) {
                        StatBadge(
                            title: "ADMIT RATE",
                            value: "\(String(format: "%.1f", viewModel.currentAdmitRate))%",
                            icon: "percent",
                            color: .green
                        )
                        StatBadge(
                            title: "GPA 25TH–75TH",
                            value: "\(String(format: "%.2f", viewModel.currentGpaP25))–\(String(format: "%.2f", viewModel.currentGpaP75))",
                            icon: "graduationcap.fill",
                            color: .blue
                        )
                    }
                    
                    // Swift Charts Visualization
                    AdmissionsChartView(
                        profiles: viewModel.campuses,
                        selectedCampus: viewModel.selectedCampus,
                        cohort: viewModel.selectedCohort
                    )
                    
                    // KPI Cards with Provenance
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Official Institutional Metrics")
                                .font(.headline)
                            Spacer()
                            Text("\(viewModel.metrics.count) indicators")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        
                        ForEach(viewModel.metrics) { metric in
                            KPICardView(metric: metric) { citation in
                                viewModel.showEvidence(for: citation)
                            }
                        }
                    }
                    
                    // Non-Affiliation Disclaimer
                    VStack(spacing: 4) {
                        Text("Independent Educational Research Tool")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        Text("ScholarStack is not officially affiliated with the University of California, the California State University, or ASSIST. All metrics originate from verified public research databases.")
                            .font(.caption2)
                            .foregroundStyle(.tertiary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                }
                .padding(16)
            }
            .navigationTitle("Admissions Planner")
            .appInlineTitleDisplayMode()
            .sheet(isPresented: $viewModel.isEvidencePresented) {
                if let citation = viewModel.selectedCitation {
                    EvidenceSheetView(citation: citation)
                }
            }
            .task {
                await viewModel.loadInitialData()
            }
        }
    }
}

#Preview {
    PlannerView()
}
