import { LanguageCode } from '@/types/language';

export interface DegreePlanningTranslations {
  workstationTitle: string;
  workstationSubtitle: string;
  catalogStatsBadge: string;
  modeWorkstation: string;
  modeGuide: string;
  tabEligibility: string;
  tabPlanner: string;
  tabDegreeAudit: string;
  tabGpa: string;
  majorSelectorTitle: string;
  majorSelectorSubtitle: string;
  primaryMajorLabel: string;
  secondaryMajorLabel: string;
  minorLabel: string;
  noneSingleMajor: string;
  noneMinor: string;
  demoPersonasTitle: string;
  demoPersonasSub: string;
  unitsDone: string;
  advisingSheetBtn: string;
  auditGeBreadthBtn: string;
  statusCompleted: string;
  statusPlanned: string;
  statusUnsatisfied: string;
  schoolGroupLabel: string;
}

export const DEGREE_PLANNING_TRANSLATIONS: Record<LanguageCode, DegreePlanningTranslations> = {
  // 1. English
  en: {
    workstationTitle: 'UCI Degree & Prerequisite Workstation',
    workstationSubtitle: 'Interactive 4-year schedule solver, prerequisite chain validator, and official degree requirements.',
    catalogStatsBadge: '85 Undergraduate Programs (13 Schools) • GE Breadth Core (Cat I–VIII)',
    modeWorkstation: 'Interactive Workstation',
    modeGuide: 'Planning Guide & Rules',
    tabEligibility: 'Course Eligibility',
    tabPlanner: 'Quarter Planner',
    tabDegreeAudit: 'Degree Audit',
    tabGpa: 'GPA Calculator',
    majorSelectorTitle: 'UCI Degree Goal & Major Selection',
    majorSelectorSubtitle: 'Configure your Primary Major, Double Major, and Minor from the complete UC Irvine catalog, or test with pre-loaded student records.',
    primaryMajorLabel: 'Primary Major (85 Programs)',
    secondaryMajorLabel: 'Secondary Major (Optional Double Major)',
    minorLabel: 'Minor (Optional)',
    noneSingleMajor: 'None (Single Major)',
    noneMinor: 'None',
    demoPersonasTitle: 'Or Load Demo Student Persona',
    demoPersonasSub: 'Loads pre-populated course records & community college transfers',
    unitsDone: 'Units Done',
    advisingSheetBtn: 'Print Advising Sheet',
    auditGeBreadthBtn: 'Audit GE Breadth',
    statusCompleted: 'COMPLETED',
    statusPlanned: 'PLANNED',
    statusUnsatisfied: 'UNSATISFIED',
    schoolGroupLabel: 'School',
  },

  // 2. Simplified Chinese
  'zh-CN': {
    workstationTitle: 'UCI 学位与先修课规划工作台',
    workstationSubtitle: '交互式大学四年排课求解器、先修课布尔校验引擎与官方毕业要求审核。',
    catalogStatsBadge: '全校 85 个官方本科专业（13 所学院）• 通识教育核心 (GE I–VIII)',
    modeWorkstation: '交互式工作台',
    modeGuide: '排课指南与规则',
    tabEligibility: '选课资格判定',
    tabPlanner: '学期排课计划',
    tabDegreeAudit: '毕业资格审核',
    tabGpa: 'GPA 计算器',
    majorSelectorTitle: 'UCI 学位目标与专业规划',
    majorSelectorSubtitle: '从官方全量专业库配置你的主修专业、双专业（Double Major）及辅修（Minor），或加载预设学生成绩单一键测试。',
    primaryMajorLabel: '主修专业（全部 85 个专业）',
    secondaryMajorLabel: '第二专业（可选双专业）',
    minorLabel: '辅修专业（可选）',
    noneSingleMajor: '无（单专业）',
    noneMinor: '无辅修',
    demoPersonasTitle: '或载入演示学生档案预设',
    demoPersonasSub: '一键加载包含加州社区大学学分互认与 UCI 实修课表的真实测试档案',
    unitsDone: '已修学分',
    advisingSheetBtn: '打印/导出学术规划单 (Advising Sheet)',
    auditGeBreadthBtn: '一键审核通识教育 (GE Breadth)',
    statusCompleted: '已满足',
    statusPlanned: '规划中',
    statusUnsatisfied: '未满足',
    schoolGroupLabel: '学院',
  },

  // 3. Spanish
  es: {
    workstationTitle: 'Estación de Trabajo de Título y Prerrequisitos de UCI',
    workstationSubtitle: 'Planificador interactivo de 4 años, validador de prerrequisitos y requisitos oficiales de grado.',
    catalogStatsBadge: '85 Programas de Grado (13 Escuelas) • Troncal GE (Cat I–VIII)',
    modeWorkstation: 'Estación Interactiva',
    modeGuide: 'Guía de Planificación y Reglas',
    tabEligibility: 'Elegibilidad de Cursos',
    tabPlanner: 'Planificador de Trimestre',
    tabDegreeAudit: 'Auditoría de Grado',
    tabGpa: 'Calculadora de GPA',
    majorSelectorTitle: 'Meta de Grado y Selección de Especialidad',
    majorSelectorSubtitle: 'Configura tu Especialidad Primaria, Doble Titulación y Subespecialidad del catálogo completo de UCI.',
    primaryMajorLabel: 'Especialidad Primaria (85 Programas)',
    secondaryMajorLabel: 'Segunda Especialidad (Doble Grado Opcional)',
    minorLabel: 'Subespecialidad / Minor (Opcional)',
    noneSingleMajor: 'Ninguna (Especialidad Única)',
    noneMinor: 'Ninguno',
    demoPersonasTitle: 'O Cargar Perfil de Demostración',
    demoPersonasSub: 'Carga registros de cursos previos y transferencias de colegios comunitarios',
    unitsDone: 'Unidades Listas',
    advisingSheetBtn: 'Imprimir Hoja de Asesoramiento',
    auditGeBreadthBtn: 'Auditar GE Breadth',
    statusCompleted: 'COMPLETADO',
    statusPlanned: 'PLANIFICADO',
    statusUnsatisfied: 'NO SATISFECHO',
    schoolGroupLabel: 'Escuela',
  },

  // 4. Vietnamese
  vi: {
    workstationTitle: 'Bàn Làm Việc Kế Hoạch Tốt Nghiệp & Điều Kiện Tiên Quyết UCI',
    workstationSubtitle: 'Công cụ lập lịch trình 4 năm tương tác, kiểm tra chuỗi tiên quyết và yêu cầu tốt nghiệp chính thức.',
    catalogStatsBadge: '85 Chương Trình Đại Học (13 Trường) • Khung Giáo Dục Đại Cương GE (Cat I–VIII)',
    modeWorkstation: 'Bàn Làm Việc Tương Tác',
    modeGuide: 'Hướng Dẫn & Quy Tắc Kế Hoạch',
    tabEligibility: 'Điều Kiện Đăng Ký Môn',
    tabPlanner: 'Kế Hoạch Học Kỳ (Quarter)',
    tabDegreeAudit: 'Kiểm Tra Tốt Nghiệp',
    tabGpa: 'Máy Tính Điểm GPA',
    majorSelectorTitle: 'Mục Tiêu Tốt Nghiệp & Chọn Ngành Học UCI',
    majorSelectorSubtitle: 'Thiết lập Ngành Chính, Bằng Kép (Double Major) và Ngành Phụ (Minor) từ danh mục UCI đầy đủ.',
    primaryMajorLabel: 'Ngành Học Chính (85 Chương Trình)',
    secondaryMajorLabel: 'Ngành Học Thứ Hai (Bằng Kép Tùy Chọn)',
    minorLabel: 'Ngành Phụ / Minor (Tùy Chọn)',
    noneSingleMajor: 'Không (Chuyên Ngành Đơn)',
    noneMinor: 'Không',
    demoPersonasTitle: 'Hoặc Tải Hồ Sơ Sinh Viên Mẫu',
    demoPersonasSub: 'Tải sẵn các môn học và tín chỉ chuyển tiếp từ đại học cộng đồng',
    unitsDone: 'Tín Chỉ Đã Hoàn Thành',
    advisingSheetBtn: 'In Bảng Kế Hoạch Tư Vấn (Advising Sheet)',
    auditGeBreadthBtn: 'Kiểm Tra Giáo Dục Đại Cương GE',
    statusCompleted: 'ĐÃ ĐẠT',
    statusPlanned: 'ĐÃ LÊN KẾ HOẠCH',
    statusUnsatisfied: 'CHƯA ĐẠT',
    schoolGroupLabel: 'Trường Đại Học',
  },

  // 5. Korean
  ko: {
    workstationTitle: 'UCI 졸업 요건 & 선수과목 플래너 워크스테이션',
    workstationSubtitle: '인터랙티브 4년 수강 계획 솔버, 선수과목 체인 검증 엔진 및 공식 졸업 요건 심사.',
    catalogStatsBadge: '전교 85개 공식 학사 전공 (13개 단과대학) • 교양 필수 GE (Cat I–VIII)',
    modeWorkstation: '인터랙티브 워크스테이션',
    modeGuide: '수강 가이드 & 규칙',
    tabEligibility: '수강 자격 판정',
    tabPlanner: '쿼터 수강 계획',
    tabDegreeAudit: '졸업 자격 심사 (Degree Audit)',
    tabGpa: 'GPA 계산기',
    majorSelectorTitle: 'UCI 학위 목표 & 전공 선택',
    majorSelectorSubtitle: '공식 UCI 카탈로그에서 주전공, 복수전공(Double Major) 및 부전공(Minor)을 설정하거나 샘플 프로필을 불러오세요.',
    primaryMajorLabel: '주전공 (85개 학부 프로그램)',
    secondaryMajorLabel: '제2전공 (선택 복수전공)',
    minorLabel: '부전공 (선택)',
    noneSingleMajor: '없음 (단일 전공)',
    noneMinor: '부전공 없음',
    demoPersonasTitle: '또는 샘플 학생 프로필 불러오기',
    demoPersonasSub: '캘리포니아 커뮤니티 컬리지 학점 인정 내역 및 기수강 기록이 포함된 데모',
    unitsDone: '이수 완료 학점',
    advisingSheetBtn: '학업 상담 계획서 인쇄/PDF 저장',
    auditGeBreadthBtn: '교양 GE Breadth 즉시 심사',
    statusCompleted: '완료됨',
    statusPlanned: '계획 중',
    statusUnsatisfied: '미충족',
    schoolGroupLabel: '단과대학',
  },

  // 6. Traditional Chinese
  'zh-TW': {
    workstationTitle: 'UCI 學位與先修課規劃工作台',
    workstationSubtitle: '互動式大學四年排課求解器、先修課布林校驗引擎與官方畢業要求審核。',
    catalogStatsBadge: '全校 85 個官方學士專業（13 所學院）• 通識教育核心 (GE I–VIII)',
    modeWorkstation: '互動式工作台',
    modeGuide: '排課指南與規則',
    tabEligibility: '選課資格判定',
    tabPlanner: '學期排課計劃',
    tabDegreeAudit: '畢業資格審核',
    tabGpa: 'GPA 計算器',
    majorSelectorTitle: 'UCI 學位目標與專業規劃',
    majorSelectorSubtitle: '從官方全量專業庫配置你的主修專業、雙主修（Double Major）及輔系（Minor），或載入預設學生成績單一鍵測試。',
    primaryMajorLabel: '主修專業（全部 85 個專業）',
    secondaryMajorLabel: '第二專業（可選雙主修）',
    minorLabel: '輔系專業（可選）',
    noneSingleMajor: '無（單主修）',
    noneMinor: '無輔系',
    demoPersonasTitle: '或載入演示學生成績單預設',
    demoPersonasSub: '一鍵載入包含加州社區大學學分抵免與 UCI 實修課表的真實測試檔案',
    unitsDone: '已修學分',
    advisingSheetBtn: '列印/匯出學術規劃單 (Advising Sheet)',
    auditGeBreadthBtn: '一鍵審核通識教育 (GE Breadth)',
    statusCompleted: '已滿足',
    statusPlanned: '規劃中',
    statusUnsatisfied: '未滿足',
    schoolGroupLabel: '學院',
  },

  // 7. Tagalog / Filipino
  tl: {
    workstationTitle: 'UCI Degree & Prerequisite Workstation',
    workstationSubtitle: 'Interactive 4-year schedule solver, prerequisite chain validator, at opisyal na degree requirements.',
    catalogStatsBadge: '85 Undergraduate Programs (13 Schools) • GE Breadth Core (Cat I–VIII)',
    modeWorkstation: 'Interactive Workstation',
    modeGuide: 'Gabay sa Pagpaplano at Patakaran',
    tabEligibility: 'Kwalipikasyon sa Kurso',
    tabPlanner: 'Plano sa Quarter',
    tabDegreeAudit: 'Degree Audit',
    tabGpa: 'GPA Calculator',
    majorSelectorTitle: 'Hangarin sa Titulo at Pagpili ng Major',
    majorSelectorSubtitle: 'I-configure ang Primary Major, Double Major, at Minor mula sa kumpletong UCI catalog.',
    primaryMajorLabel: 'Primary Major (85 Programa)',
    secondaryMajorLabel: 'Pangalawang Major (Opsyonal na Double Major)',
    minorLabel: 'Minor (Opsyonal)',
    noneSingleMajor: 'Wala (Isang Major Lamang)',
    noneMinor: 'Wala',
    demoPersonasTitle: 'O Mag-load ng Demo Student Profile',
    demoPersonasSub: 'Naglalaman ng mga nakumpletong kurso at transfer credits mula sa community college',
    unitsDone: 'Natapos na Units',
    advisingSheetBtn: 'I-print ang Advising Sheet',
    auditGeBreadthBtn: 'Suriin ang GE Breadth',
    statusCompleted: 'KUMPLETO',
    statusPlanned: 'NAKAPLANO',
    statusUnsatisfied: 'HINDI PA NAKAPASA',
    schoolGroupLabel: 'Kolehiyo',
  },

  // 8. Japanese
  ja: {
    workstationTitle: 'UCI 学位要件・履修前提プランナー',
    workstationSubtitle: 'インタラクティブな4年制履修計画ソルバー、前提条件チェーン検証、および公式卒業要件監査。',
    catalogStatsBadge: '全85公式学士プログラム（13学部）• 一般教養コア (GE I–VIII)',
    modeWorkstation: 'インタラクティブワークステーション',
    modeGuide: '履修ガイドと規則',
    tabEligibility: '履修資格判定',
    tabPlanner: 'クォーター履修計画',
    tabDegreeAudit: '卒業要件監査 (Degree Audit)',
    tabGpa: 'GPA 計算機',
    majorSelectorTitle: 'UCI 学位目標と専攻選択',
    majorSelectorSubtitle: '公式 UCI カタログから主専攻、副専攻（Double Major）、およびマイナー（Minor）を設定できます。',
    primaryMajorLabel: '主専攻（85プログラム）',
    secondaryMajorLabel: '第2専攻（選択制ダブルメジャー）',
    minorLabel: 'マイナー / 副専攻（選択制）',
    noneSingleMajor: 'なし（単一専攻）',
    noneMinor: 'なし',
    demoPersonasTitle: 'またはデモ学生プロファイルを読み込む',
    demoPersonasSub: 'コミュニティカレッジからの単位互換と既修得単位を含むテスト記録',
    unitsDone: '修得済み単位',
    advisingSheetBtn: 'アカデミック計画シートを印刷/保存',
    auditGeBreadthBtn: '一般教養 GE Breadth を即座に監査',
    statusCompleted: '要件達成',
    statusPlanned: '計画中',
    statusUnsatisfied: '未達成',
    schoolGroupLabel: '学部・カレッジ',
  },
};
