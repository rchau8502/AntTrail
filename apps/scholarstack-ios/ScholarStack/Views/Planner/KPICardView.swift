import SwiftUI

public struct KPICardView: View {
    public let metric: Metric
    public let onCitationTap: (Citation) -> Void
    
    public init(metric: Metric, onCitationTap: @escaping (Citation) -> Void) {
        self.metric = metric
        self.onCitationTap = onCitationTap
    }
    
    public var body: some View {
        GlassCard {
            VStack(alignment: .leading, spacing: 12) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(metric.statName.uppercased())
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        
                        Text(metric.statValueText ?? "\(metric.statValueNumeric ?? 0)")
                            .font(.system(.title, design: .rounded).bold())
                            .foregroundStyle(.primary)
                    }
                    
                    Spacer()
                    
                    if let citation = metric.citations.first {
                        Button {
                            onCitationTap(citation)
                        } label: {
                            HStack(spacing: 4) {
                                Image(systemName: "checkmark.seal.fill")
                                    .font(.caption2)
                                Text("Verified")
                                    .font(.caption2.bold())
                            }
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.blue.opacity(0.12))
                            .foregroundStyle(.blue)
                            .clipShape(.capsule)
                        }
                        .buttonStyle(.plain)
                    }
                }
                
                if let notes = metric.notes {
                    Text(notes)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
                
                HStack {
                    Text("\(metric.term) \(metric.year)")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                    Spacer()
                    if let firstCitation = metric.citations.first {
                        Text(firstCitation.publisher)
                            .font(.caption2.bold())
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
    }
}
