# ScholarStack for iOS

Native Apple iOS application adhering to strict industry standards:
- **Language & Runtime**: Swift 6.0 with Strict Concurrency Checking (`Sendable`, `@MainActor`, structured `Task`).
- **UI Framework**: SwiftUI (iOS 17.0+ / 18.0+) with Apple Human Interface Guidelines (HIG).
- **State Management**: Observation framework (`@Observable` macro), private `@State` property wrappers, `@Bindable`.
- **Data Visualization**: Apple Swift Charts (`import Charts`) with accessibility-ready GPA range marks and selectivity bands.
- **Hardware & Native Frameworks**: Apple Vision (`VNRecognizeTextRequest`) and PhotosUI for on-device transcript OCR scanning.
- **Testing**: Modern Apple Swift Testing framework (`@Suite`, `@Test`, `#expect`).
- **Architecture**: Offline-first MVVM with clean separation of Models, Protocols, Services, ViewModels, and Views.

---

## Application Structure

```
apps/scholarstack-ios/
├── Package.swift                  # Swift Package Manager manifest
├── ScholarStack.xcodeproj         # Native Xcode project bundle
├── generate_xcodeproj.py          # Project file generator
├── ScholarStack/
│   ├── App/
│   │   └── ScholarStackApp.swift  # App entry point with @main
│   ├── Models/                    # Domain models (Codable, Sendable, Identifiable)
│   │   ├── CampusAdmissionProfile.swift
│   │   ├── Institution.swift
│   │   ├── Metric.swift & Citation.swift
│   │   ├── TranscriptModels.swift
│   │   ├── PortfolioModels.swift
│   │   └── ApplicationDeadline.swift
│   ├── Services/                  # Business logic & hardware integrations
│   │   ├── AdmissionsDataService.swift
│   │   ├── AdmissionsDataServiceProtocol.swift
│   │   ├── TranscriptAuditorService.swift
│   │   ├── PortfolioAdvisorService.swift
│   │   └── DocumentScannerService.swift
│   ├── ViewModels/                # @Observable @MainActor State Holders
│   │   ├── PlannerViewModel.swift
│   │   ├── PortfolioViewModel.swift
│   │   ├── TranscriptViewModel.swift
│   │   └── DirectoryViewModel.swift
│   ├── Views/                     # Composable SwiftUI Views
│   │   ├── Main/                  # MainTabView (4 primary tabs)
│   │   ├── Planner/               # PlannerView, KPICards, AdmissionsChart, EvidenceSheet
│   │   ├── Portfolio/             # PortfolioView, HealthScoreCard, Timeline
│   │   ├── Transcript/            # TranscriptAuditorView, ScannerSheet, CourseRow
│   │   ├── Directory/             # CollegeDirectoryView, CollegeDetailView
│   │   └── Components/            # GlassCard, TierBadge, StatBadge, PlatformAdapters
│   ├── Resources/
│   │   ├── Assets.xcassets        # AppIcon and AccentColor
│   │   ├── Data/                  # Pre-bundled JSON catalogs (Campuses, Profiles, Scorecard)
│   │   └── Info.plist             # Camera & Photo Library privacy declarations
│   └── Info.plist
└── Tests/
    └── ScholarStackTests/
        ├── TranscriptAuditorTests.swift
        ├── PortfolioAdvisorTests.swift
        └── AdmissionsDataServiceTests.swift
```

---

## Developer Commands

### Running Swift Tests
```bash
make ios-test
# or
cd apps/scholarstack-ios && swift test
```

### Building for iOS Simulator via Command Line
```bash
make ios-build
# or
xcodebuild -project apps/scholarstack-ios/ScholarStack.xcodeproj \
  -scheme ScholarStack \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO build
```

### Opening in Xcode
Double-click `apps/scholarstack-ios/ScholarStack.xcodeproj` or run:
```bash
open apps/scholarstack-ios/ScholarStack.xcodeproj
```

Select any iOS Simulator (e.g., iPhone 17 Pro, iPhone 18 Pro) and press `Cmd + R` to run.
