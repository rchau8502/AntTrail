import Foundation
import Observation
#if canImport(UIKit)
import UIKit
#endif

@Observable
@MainActor
public final class TranscriptViewModel {
    public var rawText: String = ""
    public var auditResult: TranscriptAuditResult = .empty
    public var isProcessing: Bool = false
    public var isScannerPresented: Bool = false
    public var errorMessage: String?
    
    private let auditorService: TranscriptAuditorService
    private let scannerService: DocumentScannerService
    
    public init(
        auditorService: TranscriptAuditorService = TranscriptAuditorService.shared,
        scannerService: DocumentScannerService = DocumentScannerService.shared
    ) {
        self.auditorService = auditorService
        self.scannerService = scannerService
        loadSampleTranscript()
    }
    
    public func performAudit() {
        let textToAudit = rawText.trimmingCharacters(in: .whitespacesAndNewlines)
        if textToAudit.isEmpty {
            self.auditResult = .empty
            return
        }
        
        self.auditResult = auditorService.audit(text: textToAudit)
    }
    
    #if canImport(UIKit)
    public func processScannedImage(_ image: UIImage) async {
        isProcessing = true
        defer { isProcessing = false }
        
        do {
            let recognized = try await scannerService.recognizeText(from: image)
            self.rawText = recognized
            performAudit()
        } catch {
            self.errorMessage = "OCR Scan Failed: \(error.localizedDescription)"
        }
    }
    #endif
    
    public func loadSampleTranscript() {
        self.rawText = """
        De Anza College Official Transcript
        MATH 1A Calculus I 5.0 A
        MATH 1B Calculus II 5.0 A
        MATH 1C Multivariable Calculus 5.0 A-
        MATH 22 Discrete Mathematics 5.0 A
        CIS 22A Computer Science I: Java 4.5 A
        CIS 22B Computer Science II: Data Structures 4.5 A
        CIS 21JA Architecture & Assembly 4.5 A-
        PHYS 4A Physics: Mechanics with Lab 6.0 B+
        PHYS 4B Physics: Electricity & Magnetism 6.0 A-
        ENGL 1A Reading and Composition 5.0 A
        ENGL 2 Critical Reading, Writing and Thinking 5.0 A
        COMM 1 Public Speaking 5.0 A
        HIST 17A History of the United States 4.0 A
        PSYC 1 General Psychology 4.0 A
        """
        performAudit()
    }
    
    public func clearTranscript() {
        self.rawText = ""
        self.auditResult = .empty
    }
}
