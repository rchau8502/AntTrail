import SwiftUI

public struct CollegeDetailView: View {
    public let institution: Institution
    
    public init(institution: Institution) {
        self.institution = institution
    }
    
    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Header card
                GlassCard {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text(institution.control?.uppercased() ?? "UNIVERSITY")
                                .font(.caption.bold())
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(Color.blue.opacity(0.12))
                                .foregroundStyle(.blue)
                                .clipShape(.capsule)
                            
                            Spacer()
                            
                            if let state = institution.state {
                                Text(state)
                                    .font(.caption.bold())
                                    .foregroundStyle(.secondary)
                            }
                        }
                        
                        Text(institution.name)
                            .font(.title2.bold())
                            .foregroundStyle(.primary)
                        
                        if let city = institution.city, let state = institution.state {
                            HStack(spacing: 4) {
                                Image(systemName: "mappin.and.ellipse")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                Text("\(city), \(state) \(institution.zip ?? "")")
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        
                        if let carnegie = institution.carnegieBasic {
                            Text(carnegie)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .padding(.top, 4)
                        }
                    }
                }
                
                // Key Metrics Grid
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    if let rate = institution.admissionRate {
                        StatBadge(
                            title: "ADMISSION RATE",
                            value: "\(Int(rate * 100))%",
                            icon: "percent",
                            color: .green
                        )
                    }
                    
                    if let price = institution.avgNetPrice {
                        StatBadge(
                            title: "AVG NET PRICE",
                            value: "$\(price.formatted())/yr",
                            icon: "dollarsign.circle.fill",
                            color: .orange
                        )
                    }
                    
                    if let earnings = institution.medianEarnings10yr {
                        StatBadge(
                            title: "MEDIAN EARNINGS (10Y)",
                            value: "$\(earnings.formatted())/yr",
                            icon: "chart.line.uptrend.xyaxis",
                            color: .blue
                        )
                    }
                    
                    if let completion = institution.completionRate {
                        StatBadge(
                            title: "COMPLETION RATE",
                            value: "\(Int(completion * 100))%",
                            icon: "graduationcap.fill",
                            color: .purple
                        )
                    }
                }
                
                // Tuition & Cost Details
                GlassCard {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Tuition & Student Body")
                            .font(.headline)
                        
                        if let inState = institution.tuitionInState {
                            detailItem(label: "In-State Tuition", value: "$\(inState.formatted())")
                        }
                        
                        if let outState = institution.tuitionOutOfState {
                            detailItem(label: "Out-of-State Tuition", value: "$\(outState.formatted())")
                        }
                        
                        if let size = institution.studentSize {
                            detailItem(label: "Undergraduate Enrollment", value: size.formatted())
                        }
                        
                        if let retention = institution.retentionRate {
                            detailItem(label: "First-Year Retention Rate", value: "\(Int(retention * 100))%")
                        }
                    }
                }
                
                // Official Links
                VStack(spacing: 10) {
                    if let website = institution.website, let url = URL(string: website.hasPrefix("http") ? website : "https://\(website)") {
                        Link(destination: url) {
                            HStack {
                                Image(systemName: "globe")
                                Text("Visit Official Website")
                                    .bold()
                                Spacer()
                                Image(systemName: "arrow.up.right")
                            }
                            .padding(14)
                            .background(Color.blue)
                            .foregroundStyle(.white)
                            .clipShape(.rect(cornerRadius: 12))
                        }
                    }
                    
                    if let calc = institution.priceCalculatorUrl, let url = URL(string: calc.hasPrefix("http") ? calc : "https://\(calc)") {
                        Link(destination: url) {
                            HStack {
                                Image(systemName: "calculator")
                                Text("Net Price Calculator")
                                    .bold()
                                Spacer()
                                Image(systemName: "arrow.up.right")
                            }
                            .padding(14)
                            .background(Color.appCardBackground)
                            .foregroundStyle(.primary)
                            .clipShape(.rect(cornerRadius: 12))
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.primary.opacity(0.08), lineWidth: 1)
                            )
                        }
                    }
                }
            }
            .padding(16)
        }
        .navigationTitle(institution.name)
        .appInlineTitleDisplayMode()
    }
    
    private func detailItem(label: String, value: String) -> some View {
        HStack {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Spacer()
            Text(value)
                .font(.subheadline.bold())
                .foregroundStyle(.primary)
        }
    }
}
