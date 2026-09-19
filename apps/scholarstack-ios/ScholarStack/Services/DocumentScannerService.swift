import Foundation
import Vision
#if canImport(UIKit)
import UIKit
#endif

public final class DocumentScannerService: Sendable {
    public static let shared = DocumentScannerService()
    
    public init() {}
    
    #if canImport(UIKit)
    public func recognizeText(from image: UIImage) async throws -> String {
        guard let cgImage = image.cgImage else {
            throw ScannerError.invalidImage
        }
        
        return try await withCheckedThrowingContinuation { continuation in
            let request = VNRecognizeTextRequest { request, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }
                
                guard let observations = request.results as? [VNRecognizedTextObservation] else {
                    continuation.resume(returning: "")
                    return
                }
                
                let lines = observations.compactMap { observation in
                    observation.topCandidates(1).first?.string
                }
                
                continuation.resume(returning: lines.joined(separator: "\n"))
            }
            
            request.recognitionLevel = .accurate
            request.usesLanguageCorrection = false // preserve exact course codes like MATH 1A
            
            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            do {
                try handler.perform([request])
            } catch {
                continuation.resume(throwing: error)
            }
        }
    }
    #endif
}

public enum ScannerError: LocalizedError, Sendable {
    case invalidImage
    
    public var errorDescription: String? {
        switch self {
        case .invalidImage:
            return "Unable to extract image bitmap for OCR scanning."
        }
    }
}
