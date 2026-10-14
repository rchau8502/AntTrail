import Foundation

public enum ChancingTier: String, Codable, CaseIterable, Sendable {
    case guaranteed = "guaranteed"
    case safety = "safety"
    case target = "target"
    case reach = "reach"
    
    public var label: String {
        switch self {
        case .guaranteed: return "Guaranteed (TAG)"
        case .safety: return "Likely / Safety"
        case .target: return "Target"
        case .reach: return "Reach"
        }
    }
}

public struct TransferGuaranteeInfo: Codable, Hashable, Sendable {
    public let type: String // "TAG" or "ADT"
    public let eligible: Bool
    public let minGpa: Double?
    public let termsOffered: [String]
    public let notes: String
    
    public init(
        type: String,
        eligible: Bool,
        minGpa: Double?,
        termsOffered: [String] = ["Fall"],
        notes: String
    ) {
        self.type = type
        self.eligible = eligible
        self.minGpa = minGpa
        self.termsOffered = termsOffered
        self.notes = notes
    }
}

public struct CampusAdmissionEvaluation: Identifiable, Codable, Hashable, Sendable {
    public var id: String { campus }
    public let campus: String
    public let segment: CampusSegment
    public let cohort: Cohort
    public let tier: ChancingTier
    public let tierLabel: String
    public let admitRate: Double
    public let gpaP25: Double
    public let gpaP75: Double
    public let studentGpa: Double?
    public let gpaDelta: Double?
    public let gpaPosition: String // "below_25", "mid_50", "above_75", "unspecified"
    public let tagInfo: TransferGuaranteeInfo?
    public let netPrice: Int?
    public let medianEarnings: Int?
    public let summary: String
    public let keyAdvice: String
}

public enum PortfolioStatus: String, Codable, CaseIterable, Sendable {
    case balanced = "balanced"
    case topHeavy = "top_heavy"
    case conservative = "conservative"
    case underDiversified = "under_diversified"
    case empty = "empty"
    
    public var label: String {
        switch self {
        case .balanced: return "Well-Balanced Portfolio"
        case .topHeavy: return "Top-Heavy Risk"
        case .conservative: return "Conservative"
        case .underDiversified: return "Under-Diversified"
        case .empty: return "Empty Portfolio"
        }
    }
}

public struct PortfolioHealth: Codable, Hashable, Sendable {
    public let totalCount: Int
    public let guaranteedCount: Int
    public let safetyCount: Int
    public let targetCount: Int
    public let reachCount: Int
    public let balanceScore: Int
    public let status: PortfolioStatus
    public let statusLabel: String
    public let summary: String
    public let recommendations: [String]
}

public struct PresetPortfolio: Identifiable, Codable, Hashable, Sendable {
    public let id: String
    public let title: String
    public let subtitle: String
    public let campuses: [String]
}
