import Foundation

public struct ApplicationDeadline: Identifiable, Codable, Hashable, Sendable {
    public let id: String
    public let title: String
    public let dateDisplay: String
    public let deadlineMonth: Int
    public let deadlineDay: Int
    public let appliesTo: String // "transfer", "freshman", "both"
    public let critical: Bool
    public let description: String
    public let actionItem: String
}
