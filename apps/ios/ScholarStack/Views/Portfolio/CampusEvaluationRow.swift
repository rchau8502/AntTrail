import SwiftUI

public struct CampusEvaluationRow: View {
    public let evaluation: CampusAdmissionEvaluation
    public let onRemove: () -> Void
    
    public init(evaluation: CampusAdmissionEvaluation, onRemove: @escaping () -> Void) {
        self.evaluation = evaluation
        self.onRemove = onRemove
    }
    
    public var body: some View {
        GlassCard {
            VStack(alignment: .leading, spacing: 10) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack(spacing: 6) {
                            Text(evaluation.campus)
                                .font(.headline)
                                .foregroundStyle(.primary)
                            
                            Text(evaluation.segment.rawValue)
                                .font(.system(size: 9, weight: .bold))
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Color.secondary.opacity(0.15))
                                .foregroundStyle(.secondary)
                                .clipShape(.capsule)
                        }
                        
                        Text("Admit Rate: \(String(format: "%.1f", evaluation.admitRate))%  •  Middle 50%: \(String(format: "%.2f", evaluation.gpaP25))–\(String(format: "%.2f", evaluation.gpaP75))")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    
                    Spacer()
                    
                    TierBadge(tier: evaluation.tier)
                }
                
                Text(evaluation.summary)
                    .font(.subheadline)
                    .foregroundStyle(.primary)
                
                HStack(alignment: .top, spacing: 6) {
                    Image(systemName: "lightbulb.fill")
                        .font(.caption2)
                        .foregroundStyle(.orange)
                        .padding(.top, 2)
                    Text(evaluation.keyAdvice)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.appFieldBackground)
                .clipShape(.rect(cornerRadius: 8))
            }
        }
    }
}

public struct DeadlinesTimelineView: View {
    public let deadlines: [ApplicationDeadline]
    @Environment(\.dismiss) private var dismiss
    
    public init(deadlines: [ApplicationDeadline]) {
        self.deadlines = deadlines
    }
    
    public var body: some View {
        NavigationStack {
            List(deadlines) { deadline in
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Text(deadline.dateDisplay)
                            .font(.caption.bold())
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(deadline.critical ? Color.red.opacity(0.15) : Color.blue.opacity(0.15))
                            .foregroundStyle(deadline.critical ? .red : .blue)
                            .clipShape(.capsule)
                        
                        Spacer()
                        
                        Text(deadline.appliesTo.uppercased())
                            .font(.system(size: 9, weight: .semibold))
                            .foregroundStyle(.secondary)
                    }
                    
                    Text(deadline.title)
                        .font(.headline)
                    
                    Text(deadline.description)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    
                    HStack(alignment: .top, spacing: 4) {
                        Image(systemName: "arrow.right.circle.fill")
                            .font(.caption2)
                            .foregroundStyle(.blue)
                        Text(deadline.actionItem)
                            .font(.caption)
                            .foregroundStyle(.primary)
                    }
                    .padding(.top, 4)
                }
                .padding(.vertical, 4)
            }
            .navigationTitle("Admissions Timeline")
            .appInlineTitleDisplayMode()
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        dismiss()
                    }
                    .bold()
                }
            }
        }
    }
}
