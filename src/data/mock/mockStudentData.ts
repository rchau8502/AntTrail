import { StudentProfile } from '../../academic-engine/types'

export interface StudentPersona {
  id: string
  name: string
  tagline: string
  profile: StudentProfile
}

export const STUDENT_PERSONAS: StudentPersona[] = [
  {
    id: 'freshman',
    name: 'Incoming Freshman (Peter Anteater)',
    tagline: 'Brand new to UCI with 0 college units. Starting fresh with introductory programming and calculus.',
    profile: {
      studentId: 'UCI-FRESHMAN-01',
      major: 'Computer Science B.S.',
      catalogYear: '2026-27',
      classStanding: 'Freshman',
      completedUnits: 0,
      courseHistory: []
    }
  },
  {
    id: 'sophomore_cs',
    name: 'Continuing CS Sophomore',
    tagline: 'Completed Python series (ICS 31-33) and Calculus (MATH 2A-2B). Preparing for C++ and Data Structures.',
    profile: {
      studentId: 'UCI-CS-SOPH-02',
      major: 'Computer Science B.S.',
      catalogYear: '2026-27',
      classStanding: 'Sophomore',
      completedUnits: 48,
      courseHistory: [
        { id: '1', courseCode: 'ICS 31', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '2', courseCode: 'MATH 2A', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A-', status: 'COMPLETED' },
        { id: '3', courseCode: 'ICS 32', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'B+', status: 'COMPLETED' },
        { id: '4', courseCode: 'MATH 2B', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '5', courseCode: 'ICS 33', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '6', courseCode: 'STATS 67', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'B', status: 'COMPLETED' }
      ]
    }
  },
  {
    id: 'transfer_mtsac',
    name: 'Transfer Student (Mt. SAC)',
    tagline: 'Transferred with articulated Calculus series, Linear Algebra (MATH 260), and C++ programming.',
    profile: {
      studentId: 'TRANSFER-MTSAC-03',
      major: 'Computer Science B.S.',
      catalogYear: '2026-27',
      classStanding: 'Junior',
      completedUnits: 90,
      courseHistory: [
        { id: 't1', courseCode: 'MATH 180', institution: 'Mt. San Antonio College', term: 'Fall 2024', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 't2', courseCode: 'MATH 181', institution: 'Mt. San Antonio College', term: 'Spring 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 't3', courseCode: 'MATH 260', institution: 'Mt. San Antonio College', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 't4', courseCode: 'CSCI 110', institution: 'Mt. San Antonio College', term: 'Fall 2024', units: 3.5, grade: 'A', status: 'COMPLETED' },
        { id: 't5', courseCode: 'CSCI 140', institution: 'Mt. San Antonio College', term: 'Spring 2025', units: 3.5, grade: 'B+', status: 'COMPLETED' },
        { id: 't6', courseCode: 'CSCI 220', institution: 'Mt. San Antonio College', term: 'Spring 2026', units: 3.5, grade: 'A', status: 'COMPLETED' }
      ]
    }
  },
  {
    id: 'math_junior',
    name: 'Mathematics Junior',
    tagline: 'Completed Multivariable Calculus, Linear Algebra, and Intro to Proofs (MATH 13). Ready for Real Analysis.',
    profile: {
      studentId: 'UCI-MATH-JR-04',
      major: 'Mathematics B.S.',
      catalogYear: '2026-27',
      classStanding: 'Junior',
      completedUnits: 92,
      courseHistory: [
        { id: 'm1', courseCode: 'MATH 2A', institution: 'UCI', term: 'Fall 2024', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'm2', courseCode: 'MATH 2B', institution: 'UCI', term: 'Winter 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'm3', courseCode: 'MATH 2D', institution: 'UCI', term: 'Spring 2025', units: 4, grade: 'A-', status: 'COMPLETED' },
        { id: 'm4', courseCode: 'MATH 3A', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'm5', courseCode: 'MATH 13', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'm6', courseCode: 'ICS 31', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'B+', status: 'COMPLETED' }
      ]
    }
  },
  {
    id: 'se_junior',
    name: 'Software Engineering Junior',
    tagline: 'Completed Intro SE (IN4MATX 43), Discrete Math, and C++ Data Structures. Starting SWE Core and Capstone.',
    profile: {
      studentId: 'UCI-SE-JR-05',
      major: 'Software Engineering B.S.',
      catalogYear: '2026-27',
      classStanding: 'Junior',
      completedUnits: 96,
      courseHistory: [
        { id: 'se1', courseCode: 'ICS 31', institution: 'UCI', term: 'Fall 2024', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se2', courseCode: 'MATH 2A', institution: 'UCI', term: 'Fall 2024', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se3', courseCode: 'ICS 32', institution: 'UCI', term: 'Winter 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se4', courseCode: 'MATH 2B', institution: 'UCI', term: 'Winter 2025', units: 4, grade: 'A-', status: 'COMPLETED' },
        { id: 'se5', courseCode: 'ICS 33', institution: 'UCI', term: 'Spring 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se6', courseCode: 'ICS 6B', institution: 'UCI', term: 'Spring 2025', units: 4, grade: 'B+', status: 'COMPLETED' },
        { id: 'se7', courseCode: 'IN4MATX 43', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se8', courseCode: 'ICS 45C', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se9', courseCode: 'ICS 6D', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'B', status: 'COMPLETED' },
        { id: 'se10', courseCode: 'ICS 46', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'se11', courseCode: 'STATS 67', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'B+', status: 'COMPLETED' }
      ]
    }
  },
  {
    id: 'ds_sophomore',
    name: 'Data Science Sophomore',
    tagline: 'Completed Python series and Multivariable Calculus. Preparing for STATS 120A-C sequence and Machine Learning.',
    profile: {
      studentId: 'UCI-DS-SOPH-06',
      major: 'Data Science B.S.',
      catalogYear: '2026-27',
      classStanding: 'Sophomore',
      completedUnits: 52,
      courseHistory: [
        { id: 'ds1', courseCode: 'ICS 31', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'ds2', courseCode: 'MATH 2A', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'ds3', courseCode: 'ICS 32', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A-', status: 'COMPLETED' },
        { id: 'ds4', courseCode: 'MATH 2B', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'ds5', courseCode: 'ICS 33', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: 'ds6', courseCode: 'MATH 2D', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'B+', status: 'COMPLETED' },
        { id: 'ds7', courseCode: 'STATS 67', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'A', status: 'COMPLETED' }
      ]
    }
  }
]
