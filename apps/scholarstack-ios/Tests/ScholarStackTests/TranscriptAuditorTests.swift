import Testing
@testable import ScholarStack

@Suite("Transcript Auditor Engine Tests")
struct TranscriptAuditorTests {
    
    @Test("Calculates GPA and units correctly from standard transcript")
    func testGpaAndUnitsCalculation() {
        let text = """
        MATH 1A Calculus I 5.0 A
        ENGL 1A Reading and Comp 5.0 B
        CIS 22A Computer Science I 4.5 A
        """
        
        let result = TranscriptAuditorService.shared.audit(text: text)
        
        #expect(result.courses.count == 3)
        #expect(result.totalUnits == 14.5)
        #expect(result.gradedUnits == 14.5)
        
        // (5*4.0 + 5*3.0 + 4.5*4.0) = 20 + 15 + 18 = 53.0 / 14.5 = ~3.655 -> 3.66
        #expect(result.gpa >= 3.65 && result.gpa <= 3.67)
    }
    
    @Test("Correctly verifies UC 7-Course Pattern requirements")
    func testUCSevenCoursePattern() {
        // Satisfied transcript
        let satisfiedTranscript = """
        ENGL 1A Reading and Comp 4.0 A
        ENGL 1B Critical Thinking 4.0 A
        MATH 1A Calculus I 4.0 A
        HIST 17A US History 3.0 A
        PSYC 1 General Psychology 3.0 A
        BIOL 10 General Biology 4.0 A
        ART 1 Art History 3.0 A
        """
        
        let result = TranscriptAuditorService.shared.audit(text: satisfiedTranscript)
        
        #expect(result.ucSevenCoursePattern.englishComp.isSatisfied == true)
        #expect(result.ucSevenCoursePattern.mathQuant.isSatisfied == true)
        #expect(result.ucSevenCoursePattern.breadthAreas.isSatisfied == true)
        #expect(result.ucSevenCoursePattern.isSatisfied == true)
        
        // Incomplete transcript (missing 2nd English)
        let incompleteTranscript = """
        ENGL 1A Reading and Comp 4.0 A
        MATH 1A Calculus I 4.0 A
        HIST 17A US History 3.0 A
        """
        let incompleteResult = TranscriptAuditorService.shared.audit(text: incompleteTranscript)
        #expect(incompleteResult.ucSevenCoursePattern.englishComp.isSatisfied == false)
        #expect(incompleteResult.ucSevenCoursePattern.isSatisfied == false)
    }
    
    @Test("Correctly verifies CSU Golden Four requirements")
    func testCSUGoldenFour() {
        let goldenFourTranscript = """
        COMM 1 Public Speaking 3.0 A
        ENGL 1A English Composition 3.0 A
        PHIL 1 Critical Thinking 3.0 A
        MATH 10 Elementary Statistics 4.0 A
        """
        
        let result = TranscriptAuditorService.shared.audit(text: goldenFourTranscript)
        
        #expect(result.csuGoldenFour.a1OralComm.isSatisfied == true)
        #expect(result.csuGoldenFour.a2WrittenComm.isSatisfied == true)
        #expect(result.csuGoldenFour.a3CriticalThinking.isSatisfied == true)
        #expect(result.csuGoldenFour.b4MathQuant.isSatisfied == true)
        #expect(result.csuGoldenFour.isSatisfied == true)
    }
    
    @Test("Correctly calculates Pass/No Pass, Credit, and Withdrawal grades")
    func testPassNoPassAndWithdrawalHandling() {
        let text = """
        MATH 1A Calculus I 4.0 A
        ENGL 1A English Composition 4.0 A
        KINE 1 Aerobics 1.0 P
        GUID 200 College Success 1.0 CR
        ART 1 Introduction to Art 3.0 NP
        HIST 17A US History 3.0 W
        """
        
        let result = TranscriptAuditorService.shared.audit(text: text)
        
        // 6 courses parsed
        #expect(result.courses.count == 6)
        
        // Passing units should include A (4+4) and P/CR (1+1) = 10 units
        // NP and W do not add completed units
        #expect(result.totalUnits == 10.0)
        
        // Only graded courses (A) count toward GPA: 8.0 graded units with 32.0 points -> 4.00 GPA
        #expect(result.gradedUnits == 8.0)
        #expect(result.gpa == 4.00)
    }
    
    @Test("Correctly tracks 60-unit milestone progress across quarter and semester loads")
    func testQuarterUnitProgress() {
        let text = """
        MATH 1A Calculus 5.0 A
        MATH 1B Calculus 5.0 A
        MATH 1C Calculus 5.0 A
        MATH 1D Vector Calculus 5.0 A
        PHYS 4A Mechanics 6.0 A
        PHYS 4B Electricity & Magnetism 6.0 A
        PHYS 4C Optics & Waves 6.0 A
        ENGL 1A Composition 5.0 A
        ENGL 2 Critical Thinking 5.0 A
        COMM 1 Public Speaking 5.0 A
        PHIL 1 Introduction to Philosophy 4.0 A
        PSYC 1 General Psychology 4.0 A
        """
        
        let result = TranscriptAuditorService.shared.audit(text: text)
        
        // Total units = 5*4 + 6*3 + 5*3 + 4*2 = 20 + 18 + 15 + 8 = 61.0 units
        #expect(result.totalUnits >= 60.0)
        #expect(result.progress60Units == 1.0)
        #expect(result.ucSevenCoursePattern.isSatisfied == true)
        #expect(result.csuGoldenFour.isSatisfied == true)
    }
}
