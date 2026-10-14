import Foundation

public final class PortfolioAdvisorService: Sendable {
    public static let shared = PortfolioAdvisorService()
    
    public init() {}
    
    public func evaluateCampus(
        profile: CampusAdmissionProfile,
        studentGpa: Double?,
        cohort: Cohort,
        focus: String = ""
    ) -> CampusAdmissionEvaluation {
        let admitRate = cohort == .transfer ? profile.transferAdmitRate : profile.freshmanAdmitRate
        let gpaP25 = cohort == .transfer ? profile.transferGpaP25 : profile.freshmanGpaP25
        let gpaP75 = cohort == .transfer ? profile.transferGpaP75 : profile.freshmanGpaP75
        
        let tagInfo = cohort == .transfer ? getTransferGuarantee(campus: profile.name, focus: focus) : nil
        
        var gpaDelta: Double?
        var gpaPosition = "unspecified"
        
        if let gpa = studentGpa, gpa > 0 {
            let midGpa = (gpaP25 + gpaP75) / 2.0
            gpaDelta = ((gpa - midGpa) * 100).rounded() / 100
            
            if gpa < gpaP25 {
                gpaPosition = "below_25"
            } else if gpa > gpaP75 {
                gpaPosition = "above_75"
            } else {
                gpaPosition = "mid_50"
            }
        }
        
        var tier: ChancingTier = .target
        var summary = ""
        var keyAdvice = ""
        
        // 1. Guaranteed check (TAG for CCC transfers)
        if cohort == .transfer,
           let tag = tagInfo,
           tag.eligible,
           tag.type == "TAG",
           let gpa = studentGpa,
           let minGpa = tag.minGpa,
           gpa >= minGpa {
            tier = .guaranteed
            summary = "Guaranteed transfer admission locked in with your \(String(format: "%.2f", gpa)) GPA (minimum required: \(String(format: "%.1f", minGpa)))."
            keyAdvice = "Submit your TAG application in September (Sept 1–30) and maintain above \(String(format: "%.1f", minGpa)) GPA through spring."
        } else if cohort == .transfer, let tag = tagInfo, tag.type == "ADT" {
            // CSU ADT pathway
            if let gpa = studentGpa, gpa >= gpaP75, admitRate >= 45.0 {
                tier = .safety
                summary = "High probability of admission with your \(String(format: "%.2f", gpa)) GPA and CSU Associate Degree for Transfer advantage."
                keyAdvice = "Declare your ADT on Cal State Apply and complete your 60 semester units by end of spring."
            } else if let gpa = studentGpa, gpa >= gpaP25 {
                tier = .target
                summary = "Competitive candidate within the admit band. ADT provides a 0.1-0.2 GPA boost for local consideration."
                keyAdvice = "Finish the Golden Four and ensure your CCC certifies your degree completion by spring."
            } else {
                tier = .reach
                summary = "Impacted campus. Your GPA is below the typical middle 50% admit range (\(String(format: "%.2f", gpaP25)) - \(String(format: "%.2f", gpaP75)))."
                keyAdvice = "Maximize spring grades and consider alternative local CSU options with lower impaction thresholds."
            }
        } else {
            let isUltraSelective = admitRate < 15.0 || ["UC Berkeley", "UCLA", "Stanford University"].contains(profile.name)
            
            if let gpa = studentGpa, gpa > 0 {
                if gpa < gpaP25 || isUltraSelective {
                    tier = .reach
                    summary = isUltraSelective
                        ? "\(profile.name) conducts holistic review with an admit rate of \(String(format: "%.1f", admitRate))%. Even top GPAs face competitive pools."
                        : "Your \(String(format: "%.2f", gpa)) GPA is currently below the 25th percentile admit threshold (\(String(format: "%.2f", gpaP25)))."
                    keyAdvice = isUltraSelective
                        ? "Focus on distinctive personal insights / essays, rigor, and strong major preparation to stand out."
                        : "Strengthen prerequisite grades this semester and apply broadly to target and guaranteed campuses."
                } else if gpa >= gpaP75 && admitRate >= 45.0 {
                    tier = .safety
                    summary = "Your \(String(format: "%.2f", gpa)) GPA is above the 75th percentile (\(String(format: "%.2f", gpaP75))) with a favorable \(String(format: "%.1f", admitRate))% admit rate."
                    keyAdvice = "Ensure all basic general education and core major prep requirements are completed on schedule."
                } else {
                    tier = .target
                    summary = "Your \(String(format: "%.2f", gpa)) GPA lands comfortably inside the middle 50% admit band (\(String(format: "%.2f", gpaP25)) - \(String(format: "%.2f", gpaP75)))."
                    keyAdvice = "Keep major prerequisite course grades strong and submit a comprehensive application."
                }
            } else {
                if isUltraSelective {
                    tier = .reach
                    summary = "\(profile.name) is highly selective at \(String(format: "%.1f", admitRate))% acceptance rate."
                    keyAdvice = "Enter your GPA or audit your transcript to see your personalized positioning."
                } else if admitRate >= 60.0 {
                    tier = .safety
                    summary = "\(profile.name) offers accessible pathways with a \(String(format: "%.1f", admitRate))% acceptance rate."
                    keyAdvice = "Enter your GPA to confirm your placement above the 75th percentile."
                } else {
                    tier = .target
                    summary = "Typical admit GPA range is \(String(format: "%.2f", gpaP25)) - \(String(format: "%.2f", gpaP75)) with a \(String(format: "%.1f", admitRate))% admit rate."
                    keyAdvice = "Enter your GPA or audit your transcript to check your standing."
                }
            }
        }
        
        return CampusAdmissionEvaluation(
            campus: profile.name,
            segment: profile.segment,
            cohort: cohort,
            tier: tier,
            tierLabel: tier.label,
            admitRate: admitRate,
            gpaP25: gpaP25,
            gpaP75: gpaP75,
            studentGpa: studentGpa,
            gpaDelta: gpaDelta,
            gpaPosition: gpaPosition,
            tagInfo: tagInfo,
            netPrice: profile.avgNetPrice,
            medianEarnings: profile.medianEarnings,
            summary: summary,
            keyAdvice: keyAdvice
        )
    }
    
    public func calculateHealth(evaluations: [CampusAdmissionEvaluation]) -> PortfolioHealth {
        let totalCount = evaluations.lengthOrCount
        
        if totalCount == 0 {
            return PortfolioHealth(
                totalCount: 0,
                guaranteedCount: 0,
                safetyCount: 0,
                targetCount: 0,
                reachCount: 0,
                balanceScore: 0,
                status: .empty,
                statusLabel: "Empty Portfolio",
                summary: "Add at least 3 to 6 campuses to evaluate your portfolio balance.",
                recommendations: ["Select target campuses or choose a preset template to begin building your list."]
            )
        }
        
        let guaranteedCount = evaluations.filter { $0.tier == .guaranteed }.count
        let safetyCount = evaluations.filter { $0.tier == .safety }.count
        let targetCount = evaluations.filter { $0.tier == .target }.count
        let reachCount = evaluations.filter { $0.tier == .reach }.count
        let secureCount = guaranteedCount + safetyCount
        
        var recommendations: [String] = []
        var balanceScore = 50
        var status: PortfolioStatus = .balanced
        var summary = ""
        
        if totalCount < 3 {
            status = .underDiversified
            balanceScore = 40
            summary = "You currently have \(totalCount) campus\(totalCount == 1 ? "" : "es") selected. Admissions counselors strongly advise applying to 4–8 campuses."
            recommendations.append("Add more campuses across different selectivity tiers to protect against variance.")
        } else if reachCount == totalCount {
            status = .topHeavy
            balanceScore = 25
            summary = "All \(totalCount) selected campuses are Reaches. Without a Target or Guaranteed safety net, you face substantial rejection risk."
            recommendations.append("Urgent: Add at least 1 UC TAG campus (e.g. UC Davis, Irvine, Santa Barbara) or a solid Likely/Safety.")
            recommendations.append("Include 2 Target campuses where your GPA is solidly in the middle 50% admit band.")
        } else if Double(reachCount) >= Double(totalCount) * 0.7 && secureCount == 0 {
            status = .topHeavy
            balanceScore = 45
            summary = "Over 70% of your list is in the Reach category with zero guaranteed or high-probability safeties."
            recommendations.append("Add a guaranteed UC TAG campus or a high-acceptance CSU campus to secure your transition.")
        } else if Double(secureCount) >= Double(totalCount) * 0.8 && reachCount == 0 {
            status = .conservative
            balanceScore = 70
            summary = "You have strong safety coverage with high odds, but you have no Reach or stretch campuses."
            recommendations.append("Consider adding 1 or 2 aspirational Reach campuses (e.g. UCLA, Berkeley, or UCSD) to test your ceiling.")
        } else {
            status = .balanced
            balanceScore = 90
            
            if guaranteedCount > 0 {
                balanceScore = 98
                summary = "Excellent portfolio architecture. You have \(guaranteedCount) Guaranteed TAG, \(targetCount) Target, and \(reachCount) Reach campus\(reachCount == 1 ? "" : "es")."
                recommendations.append("Your guaranteed TAG covers your downside while your target and reach applications maximize opportunity.")
            } else {
                summary = "Good tier diversification with \(safetyCount) Likely, \(targetCount) Target, and \(reachCount) Reach options."
                recommendations.append("If eligible for UC TAG, lock in one guaranteed campus in September to raise your certainty.")
            }
            
            if totalCount >= 4 && totalCount <= 8 {
                recommendations.append("Your portfolio size (\(totalCount) campuses) fits the ideal sweet spot for focused, high-quality applications.")
            }
        }
        
        return PortfolioHealth(
            totalCount: totalCount,
            guaranteedCount: guaranteedCount,
            safetyCount: safetyCount,
            targetCount: targetCount,
            reachCount: reachCount,
            balanceScore: min(100, max(0, balanceScore)),
            status: status,
            statusLabel: status.label,
            summary: summary,
            recommendations: recommendations
        )
    }
    
    private func getTransferGuarantee(campus: String, focus: String) -> TransferGuaranteeInfo? {
        let tagRequirements: [String: (minGpa: Double, excluded: [String])] = [
            "UC Davis": (3.2, ["Computer Science"]),
            "UC Irvine": (3.4, ["Computer Science", "Business Administration", "Dance", "Music", "Nursing"]),
            "UC Santa Barbara": (3.4, ["Computer Science", "Dance", "Music", "Theater"]),
            "UC Santa Cruz": (3.0, ["Computer Science"]),
            "UC Riverside": (2.8, []),
            "UC Merced": (2.8, [])
        ]
        
        if let req = tagRequirements[campus] {
            let isExcluded = req.excluded.contains(where: { focus.localizedCaseInsensitiveContains($0) })
            if isExcluded {
                return TransferGuaranteeInfo(
                    type: "TAG",
                    eligible: false,
                    minGpa: req.minGpa,
                    notes: "\(focus) is excluded from TAG at \(campus)."
                )
            } else {
                return TransferGuaranteeInfo(
                    type: "TAG",
                    eligible: true,
                    minGpa: req.minGpa,
                    notes: "Guaranteed admission with \(req.minGpa) cumulative GPA & 30 transferable semester units."
                )
            }
        }
        
        if ["Cal Poly San Luis Obispo", "San Diego State University", "San Jose State University", "Cal Poly Pomona", "Cal State Long Beach", "Cal State Fullerton"].contains(campus) {
            return TransferGuaranteeInfo(
                type: "ADT",
                eligible: true,
                minGpa: 2.0,
                notes: "Associate Degree for Transfer (ADT) grants a 0.1–0.2 GPA advantage and priority consideration for similar majors."
            )
        }
        
        return nil
    }
}

private extension Array {
    var lengthOrCount: Int { count }
}
