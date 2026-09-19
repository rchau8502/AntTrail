import SwiftUI

public struct CourseRowView: View {
    public let course: ParsedCourse
    
    public init(course: ParsedCourse) {
        self.course = course
    }
    
    public var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(course.code)
                        .font(.headline)
                        .foregroundStyle(.primary)
                    
                    Text(course.category.displayName)
                        .font(.system(size: 9, weight: .semibold))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(categoryBackgroundColor)
                        .foregroundStyle(categoryForegroundColor)
                        .clipShape(.capsule)
                }
                
                Text(course.title)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
            
            Spacer()
            
            VStack(alignment: .trailing, spacing: 2) {
                Text(course.grade)
                    .font(.headline.bold())
                    .foregroundStyle(gradeColor)
                
                Text("\(String(format: "%.1f", course.units)) units")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
    
    private var gradeColor: Color {
        if ["A+", "A", "A-"].contains(course.grade) { return .green }
        if ["B+", "B", "B-"].contains(course.grade) { return .blue }
        if ["C+", "C"].contains(course.grade) { return .orange }
        return .red
    }
    
    private var categoryBackgroundColor: Color {
        switch course.category {
        case .math: return Color.purple.opacity(0.12)
        case .english, .criticalThinking, .oralComm: return Color.blue.opacity(0.12)
        case .physicalBiological: return Color.green.opacity(0.12)
        case .artsHumanities, .socialSciences: return Color.orange.opacity(0.12)
        case .other: return Color.secondary.opacity(0.12)
        }
    }
    
    private var categoryForegroundColor: Color {
        switch course.category {
        case .math: return .purple
        case .english, .criticalThinking, .oralComm: return .blue
        case .physicalBiological: return .green
        case .artsHumanities, .socialSciences: return .orange
        case .other: return .secondary
        }
    }
}
