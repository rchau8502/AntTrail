import Foundation

public enum CampusSegment: String, Codable, CaseIterable, Sendable {
    case uc = "UC"
    case csu = "CSU"
    case `private` = "Private"
    case communityCollege = "CommunityCollege"
    
    public var displayName: String {
        switch self {
        case .uc: return "University of California"
        case .csu: return "California State University"
        case .private: return "Private / Independent"
        case .communityCollege: return "California Community College"
        }
    }
}

public enum Cohort: String, Codable, CaseIterable, Sendable {
    case transfer = "transfer"
    case freshman = "freshman"
    
    public var title: String {
        switch self {
        case .transfer: return "Transfer (CCC to 4-Year)"
        case .freshman: return "First-Year (High School)"
        }
    }
}

public struct CampusAdmissionProfile: Identifiable, Codable, Hashable, Sendable {
    public var id: String { name }
    public let name: String
    public let segment: CampusSegment
    public let transferAdmitRate: Double
    public let transferGpaP25: Double
    public let transferGpaP75: Double
    public let freshmanAdmitRate: Double
    public let freshmanGpaP25: Double
    public let freshmanGpaP75: Double
    public let avgNetPrice: Int
    public let medianEarnings: Int
    public let website: String
    public let sourceBase: String
    
    public init(
        name: String,
        segment: CampusSegment,
        transferAdmitRate: Double,
        transferGpaP25: Double,
        transferGpaP75: Double,
        freshmanAdmitRate: Double,
        freshmanGpaP25: Double,
        freshmanGpaP75: Double,
        avgNetPrice: Int,
        medianEarnings: Int,
        website: String = "",
        sourceBase: String = ""
    ) {
        self.name = name
        self.segment = segment
        self.transferAdmitRate = transferAdmitRate
        self.transferGpaP25 = transferGpaP25
        self.transferGpaP75 = transferGpaP75
        self.freshmanAdmitRate = freshmanAdmitRate
        self.freshmanGpaP25 = freshmanGpaP25
        self.freshmanGpaP75 = freshmanGpaP75
        self.avgNetPrice = avgNetPrice
        self.medianEarnings = medianEarnings
        self.website = website
        self.sourceBase = sourceBase
    }
}
