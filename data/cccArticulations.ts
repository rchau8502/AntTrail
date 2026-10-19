/**
 * California Community College (CCC) Metadata & Preloaded Articulation Catalogs
 * Supports top feeder colleges into UC Irvine and the University of California system.
 */

export interface CccPresetCourse {
  code: string
  title: string
  units: number
  cIdEquivalent?: string
}

export interface CccCollege {
  id: string
  name: string
  district: string
  termSystem: 'semester' | 'quarter'
  popularCourses: CccPresetCourse[]
}

export const CCC_COLLEGES: CccCollege[] = [
  {
    id: 'ivc',
    name: 'Irvine Valley College (IVC)',
    district: 'South Orange County CCD',
    termSystem: 'semester',
    popularCourses: [
      { code: 'MATH 3A', title: 'Analytic Geometry and Calculus I', units: 5, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 3B', title: 'Analytic Geometry and Calculus II', units: 5, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 4A', title: 'Analytic Geometry and Calculus III', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 24', title: 'Elementary Differential Equations', units: 4, cIdEquivalent: 'C-ID MATH 240' },
      { code: 'MATH 26', title: 'Introduction to Linear Algebra', units: 4, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'CS 36', title: 'C++ Programming', units: 3, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS 37', title: 'C++ Data Structures', units: 3, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'CS 41', title: 'Python Programming', units: 3, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS 6B', title: 'Discrete Mathematics for Computer Science', units: 3, cIdEquivalent: 'C-ID COMP 152' },
      { code: 'PHYS 4A', title: 'General Physics: Mechanics', units: 4, cIdEquivalent: 'C-ID PHYS 205' },
      { code: 'PHYS 4B', title: 'General Physics: Electricity and Magnetism', units: 4, cIdEquivalent: 'C-ID PHYS 210' },
      { code: 'WR 1', title: 'College Writing 1', units: 4 },
      { code: 'WR 2', title: 'Critical Thinking and Writing', units: 4 },
      { code: 'ECON 1', title: 'Principles of Economics - Micro', units: 3, cIdEquivalent: 'C-ID ECON 202' },
      { code: 'ECON 2', title: 'Principles of Economics - Macro', units: 3, cIdEquivalent: 'C-ID ECON 201' },
      { code: 'ACCT 1A', title: 'Financial Accounting', units: 4, cIdEquivalent: 'C-ID ACCT 110' },
      { code: 'ACCT 1B', title: 'Managerial Accounting', units: 4, cIdEquivalent: 'C-ID ACCT 120' }
    ]
  },
  {
    id: 'occ',
    name: 'Orange Coast College (OCC)',
    district: 'Coast CCD',
    termSystem: 'semester',
    popularCourses: [
      { code: 'MATH A180', title: 'Calculus 1', units: 4, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH A185', title: 'Calculus 2', units: 4, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH A280', title: 'Calculus 3', units: 4, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH A285', title: 'Introduction to Linear Algebra and Differential Equations', units: 5, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'CS A150', title: 'C++ Programming 1', units: 4, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS A200', title: 'Data Structures and Algorithms', units: 4, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'CS A216', title: 'Computer Architecture', units: 4, cIdEquivalent: 'C-ID COMP 142' },
      { code: 'CS A220', title: 'Software Engineering', units: 4 },
      { code: 'PHYS A185', title: 'Calculus-Based Physics: Mechanics', units: 4, cIdEquivalent: 'C-ID PHYS 205' },
      { code: 'PHYS A280', title: 'Calculus-Based Physics: Electricity and Magnetism', units: 4, cIdEquivalent: 'C-ID PHYS 210' },
      { code: 'ENGL A100', title: 'Freshman Composition', units: 3 },
      { code: 'ECON A170', title: 'Microeconomics', units: 3, cIdEquivalent: 'C-ID ECON 202' },
      { code: 'ECON A175', title: 'Macroeconomics', units: 3, cIdEquivalent: 'C-ID ECON 201' }
    ]
  },
  {
    id: 'de-anza',
    name: 'De Anza College',
    district: 'Foothill-De Anza CCD',
    termSystem: 'quarter',
    popularCourses: [
      { code: 'MATH 1A', title: 'Calculus', units: 5, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 1B', title: 'Calculus', units: 5, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 1C', title: 'Calculus', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 1D', title: 'Calculus', units: 5 },
      { code: 'MATH 2A', title: 'Differential Equations', units: 5, cIdEquivalent: 'C-ID MATH 240' },
      { code: 'MATH 2B', title: 'Linear Algebra', units: 5, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'MATH 22', title: 'Discrete Mathematics', units: 5, cIdEquivalent: 'C-ID COMP 152' },
      { code: 'CIS 22A', title: 'Beginning Programming Methodologies in C++', units: 4.5, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CIS 22B', title: 'Intermediate Programming Methodologies in C++', units: 4.5, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CIS 22C', title: 'Data Abstraction and Structures', units: 4.5, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'CIS 21JA', title: 'Introduction to x86 Processor Assembly Language', units: 4.5, cIdEquivalent: 'C-ID COMP 142' },
      { code: 'PHYS 4A', title: 'Physics for Scientists and Engineers: Mechanics', units: 6, cIdEquivalent: 'C-ID PHYS 205' },
      { code: 'PHYS 4B', title: 'Physics for Scientists and Engineers: Electricity and Magnetism', units: 6, cIdEquivalent: 'C-ID PHYS 210' }
    ]
  },
  {
    id: 'smc',
    name: 'Santa Monica College (SMC)',
    district: 'Santa Monica CCD',
    termSystem: 'semester',
    popularCourses: [
      { code: 'MATH 7', title: 'Calculus 1', units: 5, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 8', title: 'Calculus 2', units: 5, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 11', title: 'Multivariable Calculus', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 13', title: 'Linear Algebra', units: 3, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'MATH 15', title: 'Ordinary Differential Equations', units: 3, cIdEquivalent: 'C-ID MATH 240' },
      { code: 'CS 50', title: 'C Programming', units: 3, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS 20A', title: 'Data Structures with C++', units: 3, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'CS 17', title: 'Assembly Language Programming', units: 3, cIdEquivalent: 'C-ID COMP 142' },
      { code: 'PHYSCS 21', title: 'Mechanics with Lab', units: 5, cIdEquivalent: 'C-ID PHYS 205' },
      { code: 'PHYSCS 22', title: 'Electricity and Magnetism with Lab', units: 5, cIdEquivalent: 'C-ID PHYS 210' },
      { code: 'ENGL 1', title: 'Reading and Composition 1', units: 3 }
    ]
  },
  {
    id: 'mtsac',
    name: 'Mt. San Antonio College (Mt. SAC)',
    district: 'Mt. San Antonio CCD',
    termSystem: 'semester',
    popularCourses: [
      { code: 'MATH 180', title: 'Calculus and Analytic Geometry', units: 4, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 181', title: 'Calculus and Analytic Geometry', units: 4, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 280', title: 'Calculus and Analytic Geometry III', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 260', title: 'Linear Algebra', units: 3, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'MATH 290', title: 'Differential Equations', units: 4, cIdEquivalent: 'C-ID MATH 240' },
      { code: 'CSCI 110', title: 'Fundamentals of Computer Science', units: 3.5, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CSCI 140', title: 'C++ Programming', units: 4, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CSCI 220', title: 'Data Structures and Algorithms', units: 3.5, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'PHYS 4A', title: 'Engineering Physics: Mechanics', units: 5, cIdEquivalent: 'C-ID PHYS 205' },
      { code: 'PHYS 4B', title: 'Engineering Physics: Electricity and Magnetism', units: 5, cIdEquivalent: 'C-ID PHYS 210' }
    ]
  },
  {
    id: 'foothill',
    name: 'Foothill College',
    district: 'Foothill-De Anza CCD',
    termSystem: 'quarter',
    popularCourses: [
      { code: 'MATH 1A', title: 'Calculus', units: 5, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 1B', title: 'Calculus', units: 5, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 1C', title: 'Calculus', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 2A', title: 'Differential Equations', units: 5, cIdEquivalent: 'C-ID MATH 240' },
      { code: 'MATH 2B', title: 'Linear Algebra', units: 5, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'CS 1A', title: 'Object-Oriented Programming Methodologies in Java', units: 4.5, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS 1B', title: 'Intermediate Software Design in Java', units: 4.5, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS 1C', title: 'Advanced Data Structures and Algorithms in Java', units: 4.5, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'CS 10', title: 'Computer Architecture & Organization', units: 4.5, cIdEquivalent: 'C-ID COMP 142' }
    ]
  },
  {
    id: 'dvc',
    name: 'Diablo Valley College (DVC)',
    district: 'Contra Costa CCD',
    termSystem: 'semester',
    popularCourses: [
      { code: 'MATH 192', title: 'Analytic Geometry and Calculus I', units: 5, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 193', title: 'Analytic Geometry and Calculus II', units: 5, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 292', title: 'Analytic Geometry and Calculus III', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 194', title: 'Linear Algebra', units: 3, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'MATH 294', title: 'Differential Equations', units: 5, cIdEquivalent: 'C-ID MATH 240' },
      { code: 'COMSC 110', title: 'Introduction to Programming', units: 4, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'COMSC 165', title: 'Advanced Programming with C and C++', units: 4, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'COMSC 210', title: 'Program Design and Data Structures', units: 4, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'COMSC 260', title: 'Assembly Language Programming/Computer Organization', units: 4, cIdEquivalent: 'C-ID COMP 142' },
      { code: 'PHYS 130', title: 'Physics for Engineers and Scientists A: Mechanics and Wave Motion', units: 4, cIdEquivalent: 'C-ID PHYS 205' }
    ]
  },
  {
    id: 'pcc',
    name: 'Pasadena City College (PCC)',
    district: 'Pasadena Area CCD',
    termSystem: 'semester',
    popularCourses: [
      { code: 'MATH 005A', title: 'Single Variable Calculus I', units: 5, cIdEquivalent: 'C-ID MATH 210' },
      { code: 'MATH 005B', title: 'Single Variable Calculus II', units: 5, cIdEquivalent: 'C-ID MATH 220' },
      { code: 'MATH 005C', title: 'Multivariable Calculus', units: 5, cIdEquivalent: 'C-ID MATH 230' },
      { code: 'MATH 010', title: 'Linear Algebra and Differential Equations', units: 5, cIdEquivalent: 'C-ID MATH 250' },
      { code: 'CS 002', title: 'Fundamentals of Computer Science I', units: 4, cIdEquivalent: 'C-ID COMP 122' },
      { code: 'CS 003A', title: 'Fundamentals of Computer Science II: Data Structures', units: 4, cIdEquivalent: 'C-ID COMP 132' },
      { code: 'CS 045', title: 'Computer Architecture and Organization', units: 4, cIdEquivalent: 'C-ID COMP 142' },
      { code: 'PHYS 001A', title: 'General Physics: Mechanics', units: 5, cIdEquivalent: 'C-ID PHYS 205' },
      { code: 'PHYS 001B', title: 'General Physics: Electricity and Magnetism', units: 5, cIdEquivalent: 'C-ID PHYS 210' }
    ]
  }
]
