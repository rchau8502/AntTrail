import Foundation

public struct Institution: Identifiable, Codable, Hashable, Sendable {
    public var id: String { externalId }
    public let externalId: String
    public let source: String
    public let name: String
    public let city: String?
    public let state: String?
    public let zip: String?
    public let control: String?
    public let locale: String?
    public let carnegieBasic: String?
    public let highestDegree: String?
    public let website: String?
    public let priceCalculatorUrl: String?
    public let studentSize: Int?
    public let admissionRate: Double?
    public let satAverage: Int?
    public let actMidpoint: Int?
    public let avgNetPrice: Int?
    public let tuitionInState: Int?
    public let tuitionOutOfState: Int?
    public let federalAidRate: Double?
    public let completionRate: Double?
    public let retentionRate: Double?
    public let medianEarnings10yr: Int?
    public let latitude: Double?
    public let longitude: Double?
    
    enum CodingKeys: String, CodingKey {
        case externalId = "external_id"
        case source
        case name
        case city
        case state
        case zip
        case control
        case locale
        case carnegieBasic = "carnegie_basic"
        case highestDegree = "highest_degree"
        case website
        case priceCalculatorUrl = "price_calculator_url"
        case studentSize = "student_size"
        case admissionRate = "admission_rate"
        case satAverage = "sat_average"
        case actMidpoint = "act_midpoint"
        case avgNetPrice = "avg_net_price"
        case tuitionInState = "tuition_in_state"
        case tuitionOutOfState = "tuition_out_of_state"
        case federalAidRate = "federal_aid_rate"
        case completionRate = "completion_rate"
        case retentionRate = "retention_rate"
        case medianEarnings10yr = "median_earnings_10yr"
        case latitude
        case longitude
    }
    
    public init(
        externalId: String,
        source: String = "college_scorecard",
        name: String,
        city: String? = nil,
        state: String? = nil,
        zip: String? = nil,
        control: String? = nil,
        locale: String? = nil,
        carnegieBasic: String? = nil,
        highestDegree: String? = nil,
        website: String? = nil,
        priceCalculatorUrl: String? = nil,
        studentSize: Int? = nil,
        admissionRate: Double? = nil,
        satAverage: Int? = nil,
        actMidpoint: Int? = nil,
        avgNetPrice: Int? = nil,
        tuitionInState: Int? = nil,
        tuitionOutOfState: Int? = nil,
        federalAidRate: Double? = nil,
        completionRate: Double? = nil,
        retentionRate: Double? = nil,
        medianEarnings10yr: Int? = nil,
        latitude: Double? = nil,
        longitude: Double? = nil
    ) {
        self.externalId = externalId
        self.source = source
        self.name = name
        self.city = city
        self.state = state
        self.zip = zip
        self.control = control
        self.locale = locale
        self.carnegieBasic = carnegieBasic
        self.highestDegree = highestDegree
        self.website = website
        self.priceCalculatorUrl = priceCalculatorUrl
        self.studentSize = studentSize
        self.admissionRate = admissionRate
        self.satAverage = satAverage
        self.actMidpoint = actMidpoint
        self.avgNetPrice = avgNetPrice
        self.tuitionInState = tuitionInState
        self.tuitionOutOfState = tuitionOutOfState
        self.federalAidRate = federalAidRate
        self.completionRate = completionRate
        self.retentionRate = retentionRate
        self.medianEarnings10yr = medianEarnings10yr
        self.latitude = latitude
        self.longitude = longitude
    }
}
