import Foundation

public struct Citation: Identifiable, Codable, Hashable, Sendable {
    public var id: String { "\(publisher)-\(title)-\(year)" }
    public let title: String
    public let publisher: String
    public let year: Int
    public let sourceUrl: String
    public let interpretationNote: String?
    
    enum CodingKeys: String, CodingKey {
        case title
        case publisher
        case year
        case sourceUrl = "source_url"
        case interpretationNote = "interpretation_note"
    }
    
    public init(
        title: String,
        publisher: String,
        year: Int,
        sourceUrl: String,
        interpretationNote: String? = nil
    ) {
        self.title = title
        self.publisher = publisher
        self.year = year
        self.sourceUrl = sourceUrl
        self.interpretationNote = interpretationNote
    }
}

public struct Metric: Identifiable, Codable, Hashable, Sendable {
    public let id: Int
    public let campus: String
    public let major: String?
    public let discipline: String?
    public let sourceSchool: String?
    public let schoolType: String?
    public let cohort: String
    public let statName: String
    public let statValueNumeric: Double?
    public let statValueText: String?
    public let unit: String?
    public let percentile: String?
    public let year: Int
    public let term: String
    public let notes: String?
    public let citations: [Citation]
    
    enum CodingKeys: String, CodingKey {
        case id
        case campus
        case major
        case discipline
        case sourceSchool = "source_school"
        case schoolType = "school_type"
        case cohort
        case statName = "stat_name"
        case statValueNumeric = "stat_value_numeric"
        case statValueText = "stat_value_text"
        case unit
        case percentile
        case year
        case term
        case notes
        case citations
    }
}
