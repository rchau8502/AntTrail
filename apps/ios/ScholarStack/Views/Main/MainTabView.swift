import SwiftUI

public struct MainTabView: View {
    @State private var selectedTab: Int = 0
    
    public init() {}
    
    public var body: some View {
        TabView(selection: $selectedTab) {
            PlannerView()
                .tabItem {
                    Label("Planner", systemImage: "chart.bar.fill")
                }
                .tag(0)
            
            PortfolioView()
                .tabItem {
                    Label("Portfolio", systemImage: "shield.lefthalf.filled")
                }
                .tag(1)
            
            TranscriptAuditorView()
                .tabItem {
                    Label("Audit", systemImage: "doc.text.magnifyingglass")
                }
                .tag(2)
            
            CollegeDirectoryView()
                .tabItem {
                    Label("Colleges", systemImage: "building.columns.fill")
                }
                .tag(3)
        }
        .tint(.blue)
    }
}

#Preview {
    MainTabView()
}
