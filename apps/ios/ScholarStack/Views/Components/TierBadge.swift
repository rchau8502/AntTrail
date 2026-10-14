import SwiftUI

public struct TierBadge: View {
    public let tier: ChancingTier
    
    public init(tier: ChancingTier) {
        self.tier = tier
    }
    
    public var body: some View {
        HStack(spacing: 4) {
            Image(systemName: iconName)
                .font(.caption2.bold())
            Text(tier.label)
                .font(.caption.bold())
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .background(backgroundColor)
        .foregroundStyle(foregroundColor)
        .clipShape(.capsule)
    }
    
    private var iconName: String {
        switch tier {
        case .guaranteed: return "checkmark.seal.fill"
        case .safety: return "shield.lefthalf.filled"
        case .target: return "target"
        case .reach: return "arrow.up.forward.app.fill"
        }
    }
    
    private var backgroundColor: Color {
        switch tier {
        case .guaranteed: return Color.emerald.opacity(0.15)
        case .safety: return Color.blue.opacity(0.15)
        case .target: return Color.orange.opacity(0.15)
        case .reach: return Color.pink.opacity(0.15)
        }
    }
    
    private var foregroundColor: Color {
        switch tier {
        case .guaranteed: return Color.green
        case .safety: return Color.blue
        case .target: return Color.orange
        case .reach: return Color.red
        }
    }
}

private extension Color {
    static let emerald = Color(red: 16/255, green: 185/255, blue: 129/255)
}

#Preview {
    HStack {
        TierBadge(tier: .guaranteed)
        TierBadge(tier: .safety)
        TierBadge(tier: .target)
        TierBadge(tier: .reach)
    }
    .padding()
}
