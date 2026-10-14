export interface AiHomeworkGuidance {
  plainSummary: string;
  keyActionItems: string[];
  conceptTips: string[];
  rubricAdvice: string;
}

export async function explainAssignmentWithGemini(
  assignmentName: string,
  assignmentDescription: string,
  geminiApiKey: string
): Promise<AiHomeworkGuidance> {
  const cleanDescription = assignmentDescription.replace(/<[^>]*>?/gm, "").slice(0, 2000);

  const prompt = `You are a helpful UCI academic peer tutor. Analyze this university assignment prompt.
Provide:
1. A concise plain-English 2-sentence summary.
2. 3-4 concrete action items to finish it efficiently.
3. 2 key concept tips or pitfalls to avoid.
4. 1 sentence on maximizing rubric points.

Assignment Name: ${assignmentName}
Details:
${cleanDescription}

Respond strictly in valid JSON with keys: "plainSummary", "keyActionItems" (array of strings), "conceptTips" (array of strings), "rubricAdvice" (string).`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini.");
  }

  return JSON.parse(text) as AiHomeworkGuidance;
}
