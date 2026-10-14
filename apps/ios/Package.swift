// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "ScholarStack",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "ScholarStack",
            targets: ["ScholarStack"]
        )
    ],
    targets: [
        .target(
            name: "ScholarStack",
            path: "ScholarStack",
            exclude: ["Info.plist", "App/ScholarStackApp.swift"],
            resources: [
                .process("Resources/Data"),
                .process("Resources/Assets.xcassets")
            ]
        ),
        .testTarget(
            name: "ScholarStackTests",
            dependencies: ["ScholarStack"],
            path: "Tests/ScholarStackTests"
        )
    ]
)
