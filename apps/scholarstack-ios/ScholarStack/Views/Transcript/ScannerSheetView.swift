import SwiftUI
import PhotosUI

public struct ScannerSheetView: View {
    @Environment(\.dismiss) private var dismiss
    public let onTextExtracted: (String) -> Void
    
    @State private var selectedPhotoItem: PhotosPickerItem?
    @State private var isProcessing = false
    @State private var manualText = ""
    @State private var statusMessage: String?
    
    public init(onTextExtracted: @escaping (String) -> Void) {
        self.onTextExtracted = onTextExtracted
    }
    
    public var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // Top header
                VStack(spacing: 6) {
                    Image(systemName: "doc.text.viewfinder")
                        .font(.system(size: 48))
                        .foregroundStyle(.blue)
                        .padding(.top, 16)
                    
                    Text("OCR Document Scanner")
                        .font(.headline)
                    
                    Text("Select a photo of your transcript or paste the raw course text below.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                
                // Photo Picker Button
                PhotosPicker(selection: $selectedPhotoItem, matching: .images) {
                    HStack(spacing: 8) {
                        Image(systemName: "photo.on.rectangle.angled")
                        Text("Choose Transcript Photo")
                            .font(.subheadline.bold())
                    }
                    .frame(maxWidth: .infinity)
                    .padding(14)
                    .background(Color.blue)
                    .foregroundStyle(.white)
                    .clipShape(.rect(cornerRadius: 12))
                }
                .padding(.horizontal, 20)
                .onChange(of: selectedPhotoItem) { _, newItem in
                    guard let item = newItem else { return }
                    Task {
                        await processPhotoItem(item)
                    }
                }
                
                if isProcessing {
                    HStack(spacing: 8) {
                        ProgressView()
                        Text("Running VisionKit Text Recognition...")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 8)
                }
                
                if let msg = statusMessage {
                    Text(msg)
                        .font(.caption)
                        .foregroundStyle(.blue)
                }
                
                Divider()
                    .padding(.horizontal, 20)
                
                // Manual Text Editor fallback
                VStack(alignment: .leading, spacing: 8) {
                    Text("Or paste transcript text:")
                        .font(.caption.bold())
                        .foregroundStyle(.secondary)
                    
                    TextEditor(text: $manualText)
                        .font(.system(.caption, design: .monospaced))
                        .padding(8)
                        .background(Color.appFieldBackground)
                        .clipShape(.rect(cornerRadius: 10))
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(Color.primary.opacity(0.08), lineWidth: 1)
                        )
                }
                .padding(.horizontal, 20)
                
                Spacer()
            }
            .navigationTitle("Scan Transcript")
            .appInlineTitleDisplayMode()
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Apply") {
                        if !manualText.isEmpty {
                            onTextExtracted(manualText)
                        }
                        dismiss()
                    }
                    .bold()
                    .disabled(manualText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                }
            }
        }
    }
    
    private func processPhotoItem(_ item: PhotosPickerItem) async {
        #if canImport(UIKit)
        isProcessing = true
        defer { isProcessing = false }
        
        do {
            guard let data = try await item.loadTransferable(type: Data.self),
                  let uiImage = UIImage(data: data) else {
                statusMessage = "Could not load selected photo data."
                return
            }
            
            let recognized = try await DocumentScannerService.shared.recognizeText(from: uiImage)
            self.manualText = recognized
            statusMessage = "Successfully recognized text from photo."
        } catch {
            statusMessage = "Recognition error: \(error.localizedDescription)"
        }
        #endif
    }
}
