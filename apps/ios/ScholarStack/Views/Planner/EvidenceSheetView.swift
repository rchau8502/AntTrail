import SwiftUI

public struct EvidenceSheetView: View {
    public let citation: Citation
    @Environment(\.dismiss) private var dismiss
    
    public init(citation: Citation) {
        self.citation = citation
    }
    
    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    HStack(spacing: 12) {
                        Image(systemName: "checkmark.seal.fill")
                            .font(.system(size: 36))
                            .foregroundStyle(.blue)
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Official Provenance")
                                .font(.headline)
                            Text("Reporting Body & Data Integrity")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .padding(.top, 8)
                    
                    Divider()
                    
                    VStack(alignment: .leading, spacing: 16) {
                        detailRow(title: "Title", value: citation.title, icon: "doc.text.fill")
                        detailRow(title: "Publisher / Agency", value: citation.publisher, icon: "building.2.fill")
                        detailRow(title: "Reporting Year", value: "\(citation.year)", icon: "calendar")
                        
                        if let note = citation.interpretationNote {
                            detailRow(title: "Interpretation Note", value: note, icon: "info.circle.fill")
                        }
                        
                        VStack(alignment: .leading, spacing: 6) {
                            HStack(spacing: 6) {
                                Image(systemName: "link")
                                    .font(.caption)
                                    .foregroundStyle(.blue)
                                Text("SOURCE URL")
                                    .font(.caption.bold())
                                    .foregroundStyle(.secondary)
                            }
                            
                            if let url = URL(string: citation.sourceUrl) {
                                Link(citation.sourceUrl, destination: url)
                                    .font(.footnote)
                                    .foregroundStyle(.blue)
                                    .lineLimit(2)
                            } else {
                                Text(citation.sourceUrl)
                                    .font(.footnote)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .padding(14)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color.appFieldBackground)
                        .clipShape(.rect(cornerRadius: 12))
                    }
                    
                    Spacer()
                }
                .padding(20)
            }
            .navigationTitle("Evidence & Citation")
            .appInlineTitleDisplayMode()
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        dismiss()
                    }
                    .bold()
                }
            }
        }
    }
    
    private func detailRow(title: String, value: String, icon: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Text(title.uppercased())
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
            }
            Text(value)
                .font(.body)
                .foregroundStyle(.primary)
        }
    }
}
