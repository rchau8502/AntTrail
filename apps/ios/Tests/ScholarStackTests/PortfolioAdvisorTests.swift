import Testing
@testable import ScholarStack

@Suite("Portfolio Advisor & Chancing Engine Tests")
struct PortfolioAdvisorTests {
    
    @Test("Correctly qualifies UC TAG transfer guarantee")
    func testUCTAGQualification() {
        let advisor = PortfolioAdvisorService.shared
        let ucDavis = CampusAdmissionProfile(
            name: "UC Davis",
            segment: .uc,
            transferAdmitRate: 56.5,
            transferGpaP25: 3.45,
            transferGpaP75: 3.88,
            freshmanAdmitRate: 41.9,
            freshmanGpaP25: 3.65,
            freshmanGpaP75: 4.0,
            avgNetPrice: 16100,
            medianEarnings: 75200
        )
        
        // 3.5 GPA in non-excluded major -> Guaranteed TAG
        let evalGuaranteed = advisor.evaluateCampus(
            profile: ucDavis,
            studentGpa: 3.50,
            cohort: .transfer,
            focus: "Economics"
        )
        #expect(evalGuaranteed.tier == .guaranteed)
        #expect(evalGuaranteed.tagInfo?.eligible == true)
        
        // 3.5 GPA in Computer Science -> Excluded from TAG -> Evaluated by normal chancing
        let evalExcluded = advisor.evaluateCampus(
            profile: ucDavis,
            studentGpa: 3.50,
            cohort: .transfer,
            focus: "Computer Science"
        )
        #expect(evalExcluded.tier != .guaranteed)
    }
    
    @Test("Calculates portfolio balance health score correctly")
    func testPortfolioHealthScoring() {
        let advisor = PortfolioAdvisorService.shared
        
        let emptyHealth = advisor.calculateHealth(evaluations: [])
        #expect(emptyHealth.status == .empty)
        #expect(emptyHealth.balanceScore == 0)
        
        // Balanced portfolio with 1 TAG, 2 Targets, 2 Reaches
        let berkeley = CampusAdmissionProfile(name: "UC Berkeley", segment: .uc, transferAdmitRate: 25.0, transferGpaP25: 3.82, transferGpaP75: 4.0, freshmanAdmitRate: 11.6, freshmanGpaP25: 3.89, freshmanGpaP75: 4.0, avgNetPrice: 18450, medianEarnings: 86400)
        let ucla = CampusAdmissionProfile(name: "UCLA", segment: .uc, transferAdmitRate: 24.0, transferGpaP25: 3.83, transferGpaP75: 4.0, freshmanAdmitRate: 8.8, freshmanGpaP25: 3.9, freshmanGpaP75: 4.0, avgNetPrice: 15724, medianEarnings: 82500)
        let davis = CampusAdmissionProfile(name: "UC Davis", segment: .uc, transferAdmitRate: 56.5, transferGpaP25: 3.45, transferGpaP75: 3.88, freshmanAdmitRate: 41.9, freshmanGpaP25: 3.65, freshmanGpaP75: 4.0, avgNetPrice: 16100, medianEarnings: 75200)
        let sjsu = CampusAdmissionProfile(name: "San Jose State University", segment: .csu, transferAdmitRate: 64.0, transferGpaP25: 3.15, transferGpaP75: 3.7, freshmanAdmitRate: 75.0, freshmanGpaP25: 3.25, freshmanGpaP75: 3.8, avgNetPrice: 15200, medianEarnings: 79800)
        
        let evals = [
            advisor.evaluateCampus(profile: berkeley, studentGpa: 3.75, cohort: .transfer, focus: "Mathematics"),
            advisor.evaluateCampus(profile: ucla, studentGpa: 3.75, cohort: .transfer, focus: "Mathematics"),
            advisor.evaluateCampus(profile: davis, studentGpa: 3.75, cohort: .transfer, focus: "Mathematics"),
            advisor.evaluateCampus(profile: sjsu, studentGpa: 3.75, cohort: .transfer, focus: "Mathematics")
        ]
        
        let health = advisor.calculateHealth(evaluations: evals)
        #expect(health.status == .balanced)
        #expect(health.balanceScore >= 85)
        #expect(health.guaranteedCount >= 1)
    }
    
    @Test("Correctly evaluates CSU ADT pathway with priority GPA advantage")
    func testCSUADTPathwayAndSafety() {
        let advisor = PortfolioAdvisorService.shared
        let sjsu = CampusAdmissionProfile(
            name: "San Jose State University",
            segment: .csu,
            transferAdmitRate: 64.0,
            transferGpaP25: 3.15,
            transferGpaP75: 3.70,
            freshmanAdmitRate: 75.0,
            freshmanGpaP25: 3.25,
            freshmanGpaP75: 3.80,
            avgNetPrice: 15200,
            medianEarnings: 79800
        )
        
        // High GPA candidate with ADT -> Safety tier
        let evalHigh = advisor.evaluateCampus(profile: sjsu, studentGpa: 3.85, cohort: .transfer, focus: "Business")
        #expect(evalHigh.tagInfo?.type == "ADT")
        #expect(evalHigh.tier == .safety)
        
        // Mid-range candidate with ADT -> Target tier
        let evalMid = advisor.evaluateCampus(profile: sjsu, studentGpa: 3.30, cohort: .transfer, focus: "Business")
        #expect(evalMid.tier == .target)
        
        // Below 25th percentile candidate -> Reach tier
        let evalLow = advisor.evaluateCampus(profile: sjsu, studentGpa: 2.90, cohort: .transfer, focus: "Business")
        #expect(evalLow.tier == .reach)
    }
    
    @Test("Detects top-heavy portfolio risk and issues warning recommendation")
    func testTopHeavyPortfolioAlert() {
        let advisor = PortfolioAdvisorService.shared
        let berkeley = CampusAdmissionProfile(name: "UC Berkeley", segment: .uc, transferAdmitRate: 25.0, transferGpaP25: 3.82, transferGpaP75: 4.0, freshmanAdmitRate: 11.6, freshmanGpaP25: 3.89, freshmanGpaP75: 4.0, avgNetPrice: 18450, medianEarnings: 86400)
        let ucla = CampusAdmissionProfile(name: "UCLA", segment: .uc, transferAdmitRate: 24.0, transferGpaP25: 3.83, transferGpaP75: 4.0, freshmanAdmitRate: 8.8, freshmanGpaP25: 3.9, freshmanGpaP75: 4.0, avgNetPrice: 15724, medianEarnings: 82500)
        let stanford = CampusAdmissionProfile(name: "Stanford University", segment: .private, transferAdmitRate: 2.0, transferGpaP25: 3.90, transferGpaP75: 4.0, freshmanAdmitRate: 3.9, freshmanGpaP25: 3.95, freshmanGpaP75: 4.0, avgNetPrice: 19500, medianEarnings: 104000)
        
        let allReaches = [
            advisor.evaluateCampus(profile: berkeley, studentGpa: 3.50, cohort: .transfer, focus: "Computer Science"),
            advisor.evaluateCampus(profile: ucla, studentGpa: 3.50, cohort: .transfer, focus: "Computer Science"),
            advisor.evaluateCampus(profile: stanford, studentGpa: 3.50, cohort: .transfer, focus: "Computer Science")
        ]
        
        let health = advisor.calculateHealth(evaluations: allReaches)
        #expect(health.status == .topHeavy)
        #expect(health.balanceScore <= 60)
        #expect(health.recommendations.contains { $0.contains("Target") || $0.contains("TAG") || $0.contains("Likely") })
    }
    
    @Test("Accurately identifies campus-specific TAG excluded majors")
    func testTAGExcludedMajorEdgeCases() {
        let advisor = PortfolioAdvisorService.shared
        let uci = CampusAdmissionProfile(name: "UC Irvine", segment: .uc, transferAdmitRate: 40.8, transferGpaP25: 3.61, transferGpaP75: 4.0, freshmanAdmitRate: 21.0, freshmanGpaP25: 3.75, freshmanGpaP75: 4.0, avgNetPrice: 14200, medianEarnings: 74200)
        let ucsb = CampusAdmissionProfile(name: "UC Santa Barbara", segment: .uc, transferAdmitRate: 58.0, transferGpaP25: 3.55, transferGpaP75: 3.92, freshmanAdmitRate: 25.8, freshmanGpaP25: 3.7, freshmanGpaP75: 4.0, avgNetPrice: 17200, medianEarnings: 72100)
        
        // UCI: Business Administration is excluded from TAG
        let uciBusiness = advisor.evaluateCampus(profile: uci, studentGpa: 3.90, cohort: .transfer, focus: "Business Administration")
        #expect(uciBusiness.tagInfo?.eligible == false)
        #expect(uciBusiness.tier != .guaranteed)
        
        // UCI: Mathematics is eligible for TAG (min 3.4)
        let uciMath = advisor.evaluateCampus(profile: uci, studentGpa: 3.50, cohort: .transfer, focus: "Mathematics")
        #expect(uciMath.tagInfo?.eligible == true)
        #expect(uciMath.tier == .guaranteed)
        
        // UCSB: Computer Science is excluded from TAG
        let ucsbCS = advisor.evaluateCampus(profile: ucsb, studentGpa: 3.85, cohort: .transfer, focus: "Computer Science")
        #expect(ucsbCS.tagInfo?.eligible == false)
        #expect(ucsbCS.tier != .guaranteed)
    }
}
