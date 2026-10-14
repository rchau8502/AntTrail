import SwiftUI

public struct RequirementBadgeView: View {
    public let status: GeRequirementStatus
    
    public init(status: GeRequirementStatus) {
        self.status = status
    }
    
    public var body: some View {
        HStack(spacing: 8) {
            Image(systemName: status.isSatisfied ? "checkmark.circle.fill" : "circle.dashed")
                .font(.subheadline)
                .foregroundStyle(status.isSatisfied ? .green : .secondary)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(status.name)
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.primary)
                
                if !status.matchingCourses.isEmpty {
                    Text(status.matchingCourses.joined(separator: ", "))
                        .font(.system(size: 10))
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
            
            Spacer()
            
            Text("\(status.completed)/\(status.required)")
                .font(.caption2.bold())
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(status.isSatisfied ? Color.green.opacity(0.12) : Color.secondary.opacity(0.12))
                .foregroundStyle(status.isSatisfied ? .green : .secondary)
                .clipShape(.capsule)
        }
        .padding(10)
        .background(Color.appFieldBackground)
        .clipShape(.rect(cornerRadius: 8))
    }
}
