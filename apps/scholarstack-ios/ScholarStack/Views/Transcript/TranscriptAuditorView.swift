import SwiftUI

public struct TranscriptAuditorView: View {
    @State private var viewModel = TranscriptViewModel()
    @State private var showScanner = false
    
    public init() {}
    
    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Summary KPI Card
                    GlassCard {
                        VStack(alignment: .leading, spacing: 14) {
                            HStack(alignment: .center) {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("TRANSFER CUMULATIVE GPA")
                                        .font(.caption.bold())
                                        .foregroundStyle(.secondary)
                                    
                                    Text(String(format: "%.2f", viewModel.auditResult.gpa))
                                        .font(.system(size: 38, weight: .bold, design: .rounded))
                                        .foregroundStyle(gpaColor)
                                }
                                
                                Spacer()
                                
                                VStack(alignment: .trailing, spacing: 4) {
                                    Text("60-UNIT MILESTONE")
                                        .font(.caption.bold())
                                        .foregroundStyle(.secondary)
                                    
                                    HStack(spacing: 4) {
                                        Text("\(Int(viewModel.auditResult.totalUnits))")
                                            .font(.title2.bold())
                                            .foregroundStyle(.primary)
                                        Text("/ 60 units")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                }
                            }
                            
                            // Progress bar
                            ProgressView(value: viewModel.auditResult.progress60Units)
                                .tint(viewModel.auditResult.progress60Units >= 1.0 ? .green : .blue)
                            
                            HStack {
                                Text("\(viewModel.auditResult.courses.count) courses evaluated")
                                    .font(.caption2)
                                    .foregroundStyle(.secondary)
                                Spacer()
                                if let school = viewModel.auditResult.detectedSchool {
                                    Text(school)
                                        .font(.caption2.bold())
                                        .foregroundStyle(.blue)
                                        .lineLimit(1)
                                }
                            }
                        }
                    }
                    
                    // UC 7-Course Pattern Check
                    GlassCard {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("UC 7-Course Pattern")
                                    .font(.headline)
                                Spacer()
                                if viewModel.auditResult.ucSevenCoursePattern.isSatisfied {
                                    Text("SATISFIED")
                                        .font(.caption2.bold())
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 3)
                                        .background(Color.green.opacity(0.15))
                                        .foregroundStyle(.green)
                                        .clipShape(.capsule)
                                } else {
                                    Text("IN PROGRESS")
                                        .font(.caption2.bold())
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 3)
                                        .background(Color.orange.opacity(0.15))
                                        .foregroundStyle(.orange)
                                        .clipShape(.capsule)
                                }
                            }
                            
                            RequirementBadgeView(status: viewModel.auditResult.ucSevenCoursePattern.englishComp)
                            RequirementBadgeView(status: viewModel.auditResult.ucSevenCoursePattern.mathQuant)
                            RequirementBadgeView(status: viewModel.auditResult.ucSevenCoursePattern.breadthAreas)
                        }
                    }
                    
                    // CSU Golden Four Check
                    GlassCard {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("CSU Golden Four")
                                    .font(.headline)
                                Spacer()
                                if viewModel.auditResult.csuGoldenFour.isSatisfied {
                                    Text("SATISFIED")
                                        .font(.caption2.bold())
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 3)
                                        .background(Color.green.opacity(0.15))
                                        .foregroundStyle(.green)
                                        .clipShape(.capsule)
                                } else {
                                    Text("IN PROGRESS")
                                        .font(.caption2.bold())
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 3)
                                        .background(Color.orange.opacity(0.15))
                                        .foregroundStyle(.orange)
                                        .clipShape(.capsule)
                                }
                            }
                            
                            RequirementBadgeView(status: viewModel.auditResult.csuGoldenFour.a1OralComm)
                            RequirementBadgeView(status: viewModel.auditResult.csuGoldenFour.a2WrittenComm)
                            RequirementBadgeView(status: viewModel.auditResult.csuGoldenFour.a3CriticalThinking)
                            RequirementBadgeView(status: viewModel.auditResult.csuGoldenFour.b4MathQuant)
                        }
                    }
                    
                    // Course List
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text("Audited Courses")
                                .font(.headline)
                            Spacer()
                            Text("\(viewModel.auditResult.courses.count) courses")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        
                        if viewModel.auditResult.courses.isEmpty {
                            EmptyStateView(
                                icon: "doc.text.magnifyingglass",
                                title: "No Courses Audited",
                                subtitle: "Paste your transcript text or scan a document to audit your transfer eligibility."
                            )
                        } else {
                            ForEach(viewModel.auditResult.courses) { course in
                                GlassCard {
                                    CourseRowView(course: course)
                                }
                            }
                        }
                    }
                }
                .padding(16)
            }
            .navigationTitle("Transcript Auditor")
            .appInlineTitleDisplayMode()
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Menu {
                        Button {
                            viewModel.loadSampleTranscript()
                        } label: {
                            Label("Load Sample Transcript", systemImage: "doc.text.fill")
                        }
                        
                        Button(role: .destructive) {
                            viewModel.clearTranscript()
                        } label: {
                            Label("Clear All Courses", systemImage: "trash")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
                
                ToolbarItem(placement: .confirmationAction) {
                    Button {
                        showScanner = true
                    } label: {
                        Label("Scan", systemImage: "camera.viewfinder")
                    }
                }
            }
            .sheet(isPresented: $showScanner) {
                ScannerSheetView { text in
                    viewModel.rawText = text
                    viewModel.performAudit()
                }
            }
        }
    }
    
    private var gpaColor: Color {
        if viewModel.auditResult.gpa >= 3.6 { return .green }
        if viewModel.auditResult.gpa >= 3.0 { return .blue }
        return .orange
    }
}

#Preview {
    TranscriptAuditorView()
}
