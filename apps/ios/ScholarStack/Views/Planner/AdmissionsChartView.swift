import SwiftUI
import Charts

public struct AdmissionsChartView: View {
    public let profiles: [CampusAdmissionProfile]
    public let selectedCampus: String
    public let cohort: Cohort
    
    public init(profiles: [CampusAdmissionProfile], selectedCampus: String, cohort: Cohort) {
        self.profiles = profiles
        self.selectedCampus = selectedCampus
        self.cohort = cohort
    }
    
    private var chartData: [CampusAdmissionProfile] {
        let topCampuses = ["UC Berkeley", "UCLA", "UC San Diego", "UC Irvine", "UC Davis", "Cal Poly San Luis Obispo"]
        return profiles.filter { topCampuses.contains($0.name) }
    }
    
    public var body: some View {
        GlassCard {
            VStack(alignment: .leading, spacing: 14) {
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Admissions Selectivity & GPA Bands")
                            .font(.headline)
                        Text("Middle 50% Admitted GPA (25th to 75th percentile)")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
                    Image(systemName: "chart.bar.xaxis")
                        .foregroundStyle(.blue)
                }
                
                Chart {
                    ForEach(chartData) { item in
                        let p25 = cohort == .transfer ? item.transferGpaP25 : item.freshmanGpaP25
                        let p75 = cohort == .transfer ? item.transferGpaP75 : item.freshmanGpaP75
                        let isSelected = item.name == selectedCampus
                        
                        BarMark(
                            x: .value("Campus", item.name.replacingOccurrences(of: "University", with: "Univ")),
                            yStart: .value("GPA 25th", p25),
                            yEnd: .value("GPA 75th", p75)
                        )
                        .foregroundStyle(isSelected ? Color.blue : Color.secondary.opacity(0.35))
                        .cornerRadius(6)
                        .annotation(position: .top) {
                            if isSelected {
                                Text("\(String(format: "%.2f", p75))")
                                    .font(.system(size: 9, weight: .bold))
                                    .foregroundStyle(.blue)
                            }
                        }
                    }
                }
                .chartYScale(domain: 2.8...4.0)
                .chartYAxis {
                    AxisMarks(values: [3.0, 3.25, 3.5, 3.75, 4.0]) { val in
                        AxisGridLine()
                        AxisValueLabel {
                            if let doubleVal = val.as(Double.self) {
                                Text(String(format: "%.2f", doubleVal))
                                    .font(.caption2)
                            }
                        }
                    }
                }
                .chartXAxis {
                    AxisMarks { val in
                        AxisValueLabel {
                            if let name = val.as(String.self) {
                                Text(name)
                                    .font(.system(size: 8))
                                    .lineLimit(1)
                            }
                        }
                    }
                }
                .frame(height: 180)
                .accessibilityLabel("Admissions selectivity chart showing GPA 25th to 75th percentiles")
                
                HStack(spacing: 12) {
                    Circle()
                        .fill(Color.blue)
                        .frame(width: 8, height: 8)
                    Text("Selected Campus")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                    
                    Circle()
                        .fill(Color.secondary.opacity(0.4))
                        .frame(width: 8, height: 8)
                    Text("Peer Institutions")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }
}
