/**
 * Realistic sample unofficial academic records from UCI StudentAccess and DegreeWorks.
 * Used for parser verification and user interactive demos.
 */

export const SAMPLE_STUDENT_ACCESS_TRANSCRIPT = `
UNIVERSITY OF CALIFORNIA, IRVINE
OFFICE OF THE REGISTRAR
UNOFFICIAL ACADEMIC RECORD

STUDENT ID: 88492019   NAME: PETER ANTEATER
COLLEGE: DONALD BREN SCHOOL OF INFORMATION AND COMPUTER SCIENCES
MAJOR: COMPUTER SCIENCE, B.S.

FALL QUARTER 2025
COURSE          TITLE                              UNITS   GRADE   PTS
COMPSCI ICS 31  INTRO TO PROGRAMMING I             4.00    A       16.00
MATH 2A         SINGLE VARIABLE CALCULUS I         4.00    A-      14.80
WRITING 39A     ACADEMIC WRITING                   4.00    P        0.00
Quarter Units: 12.00   Quarter GPA: 3.85   Cumulative GPA: 3.85

WINTER QUARTER 2026
COURSE          TITLE                              UNITS   GRADE   PTS
COMPSCI ICS 32  PROG W/ SOFTWARE LIBS              4.00    B+      13.20
MATH 2B         SINGLE VARIABLE CALCULUS II        4.00    B       12.00
STATS 67        STATS FOR COMPUTER SCIENCE         4.00    A       16.00
Quarter Units: 12.00   Quarter GPA: 3.42   Cumulative GPA: 3.63

SPRING QUARTER 2026
COURSE          TITLE                              UNITS   GRADE   PTS
COMPSCI ICS 33  INTERMEDIATE PROGRAMMING           4.00    A       16.00
MATH 3A         INTRO TO LINEAR ALGEBRA            4.00    A       16.00
Quarter Units: 8.00    Quarter GPA: 4.00   Cumulative GPA: 3.73

TRANSFER CREDIT
INSTITUTION: MT. SAN ANTONIO COLLEGE
MATH 260        CALC & ANALYTIC GEOMETRY           5.00    TA
(Articulation: UCI MATH 2A)
CSCI 220        PROGRAMMING IN C++                 4.00    TB
(Articulation: UCI ICS 45C)
`.trim()

export const SAMPLE_DEGREE_WORKS_AUDIT = `
Degree in Bachelor of Science
Major: Computer Science B.S.
Catalog Year: 2026-2027
Student: Anteater, Peter (ID: 99482103)

Lower Division Requirements
[X] Introduction to Programming
    Applied: Fall 2025  ICS 31  Intro to Programming I  4  A
[X] Programming with Software Libraries
    Applied: Winter 2026  ICS 32  Prog w/ Software Libs  4  B+
[X] Intermediate Programming
    Applied: Spring 2026  ICS 33  Intermediate Programming  4  A
[ ] Data Structure Implementation
    Still Needed: 1 Class in ICS 46
[X] Single-Variable Calculus I
    Applied: Fall 2025  MATH 2A  Calculus I  4  A-
[X] Single-Variable Calculus II
    Applied: Winter 2026  MATH 2B  Calculus II  4  B
[X] Introduction to Linear Algebra
    Applied: Spring 2026  MATH 3A  Linear Algebra  4  A
[X] Statistics for Computer Science
    Applied: Winter 2026  STATS 67  Intro to Probability and Stats  4  A
`.trim()

export const SAMPLE_GENERIC_COURSE_LIST = `
ICS 31 - A (4 units) - Fall 2025
ICS 32 - B+ (4 units) - Winter 2026
MATH 2A - A (4 units) - Fall 2025
MATH 2B - A- (4 units) - Winter 2026
MATH 3A - B (4 units) - Spring 2026
STATS 67 - A (4 units) - Spring 2026
`.trim()
