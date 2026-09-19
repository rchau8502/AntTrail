import SwiftUI

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

extension Color {
    #if canImport(UIKit)
    public static let appBackground = Color(uiColor: .systemGroupedBackground)
    public static let appCardBackground = Color(uiColor: .secondarySystemGroupedBackground)
    public static let appFieldBackground = Color(uiColor: .tertiarySystemGroupedBackground)
    #elseif canImport(AppKit)
    public static let appBackground = Color(nsColor: .windowBackgroundColor)
    public static let appCardBackground = Color(nsColor: .controlBackgroundColor)
    public static let appFieldBackground = Color.secondary.opacity(0.12)
    #else
    public static let appBackground = Color.secondary.opacity(0.05)
    public static let appCardBackground = Color.secondary.opacity(0.1)
    public static let appFieldBackground = Color.secondary.opacity(0.15)
    #endif
}

extension View {
    @ViewBuilder
    public func appInlineTitleDisplayMode() -> some View {
        #if os(iOS)
        self.navigationBarTitleDisplayMode(.inline)
        #else
        self
        #endif
    }
}

extension View {
    @ViewBuilder
    public func appGroupedListStyle() -> some View {
        #if os(iOS)
        self.listStyle(.insetGrouped)
        #else
        self.listStyle(.inset)
        #endif
    }
}
