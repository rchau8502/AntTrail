import SwiftUI

public struct HealthScoreCardView: View {
    public let health: PortfolioHealth
    
    public init(health: PortfolioHealth) {
        self.health = health
    }
    
    public var body: some View {
        GlassCard {
            VStack(alignment: .leading, spacing: 16) {
                HStack(alignment: .center) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("PORTFOLIO HEALTH SCORE")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        
                        HStack(alignment: .firstTextBaseline, spacing: 4) {
                            Text("\(health.balanceScore)")
                                .font(.system(size: 38, weight: .bold, design: .rounded))
                                .foregroundStyle(scoreColor)
                            Text("/100")
                                .font(.headline)
                                .foregroundStyle(.secondary)
                        }
                    }
                    
                    Spacer()
                    
                    Text(health.statusLabel)
                        .font(.caption.bold())
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(statusBackgroundColor)
                        .foregroundStyle(statusForegroundColor)
                        .clipShape(.capsule)
                }
                
                // Tier distribution pills
                HStack(spacing: 8) {
                    tierPill(title: "Guaranteed", count: health.guaranteedCount, color: .green)
                    tierPill(title: "Likely", count: health.safetyCount, color: .blue)
                    tierPill(title: "Target", count: health.targetCount, color: .orange)
                    tierPill(title: "Reach", count: health.reachCount, color: .red)
                }
                
                Text(health.summary)
                    .font(.subheadline)
                    .foregroundStyle(.primary)
                
                if !health.recommendations.isEmpty {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Strategic Recommendations:")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        
                        ForEach(health.recommendations, id: \.self) { rec in
                            HStack(alignment: .top, spacing: 6) {
                                Image(systemName: "checkmark.circle.fill")
                                    .font(.caption2)
                                    .foregroundStyle(.blue)
                                    .padding(.top, 2)
                                Text(rec)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                    .padding(12)
                    .background(Color.appFieldBackground)
                    .clipShape(.rect(cornerRadius: 10))
                }
            }
        }
    }
    
    private func tierPill(title: String, count: Int, color: Color) -> some View {
        VStack(spacing: 2) {
            Text("\(count)")
                .font(.subheadline.bold())
                .foregroundStyle(count > 0 ? color : .secondary)
            Text(title)
                .font(.system(size: 9))
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 6)
        .background(Color.appFieldBackground)
        .clipShape(.rect(cornerRadius: 8))
    }
    
    private var scoreColor: Color {
        if health.balanceScore >= 80 { return .green }
        if health.balanceScore >= 50 { return .orange }
        return .red
    }
    
    private var statusBackgroundColor: Color {
        switch health.status {
        case .balanced: return Color.green.opacity(0.15)
        case .conservative, .underDiversified: return Color.orange.opacity(0.15)
        case .topHeavy, .empty: return Color.red.opacity(0.15)
        }
    }
    
    private var statusForegroundColor: Color {
        switch health.status {
        case .balanced: return .green
        case .conservative, .underDiversified: return .orange
        case .topHeavy, .empty: return .red
        }
    }
}
