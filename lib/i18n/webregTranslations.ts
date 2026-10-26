import { LanguageCode } from '@/types/language';

export interface WebRegTranslations {
  badge: string;
  title: string;
  subtitle: string;
  radarTitle: string;
  radarSubtitle: string;
  searchPlaceholder: string;
  allDepts: string;
  activeWatchlist: string;
  simulateDrop: string;
  openStatus: string;
  waitlistStatus: string;
  fullStatus: string;
  audioToggle: string;
  notificationToggle: string;
  bookmarkletTitle: string;
  bookmarkletDesc: string;
  copyBookmarklet: string;
  dragBookmarklet: string;
  waitlistTitle: string;
  waitlistDesc: string;
  admissionOdds: string;
  countdownTitle: string;
  downloadCalendar: string;
}

export const WEBREG_TRANSLATIONS: Record<LanguageCode, WebRegTranslations> = {
  // 1. English
  en: {
    badge: 'Anteater WebReg Tactical Suite',
    title: 'UCI WebReg Tactical Command',
    subtitle: 'WebSoc seat sniper, 1-click auto-filler bookmarklet, Markov waitlist probability calculator, and enrollment countdown.',
    radarTitle: 'WebSoc Live Seat Radar',
    radarSubtitle: 'Simulated high-frequency polling with audio alerts and webhooks when students drop courses.',
    searchPlaceholder: 'Search by 5-digit code, course name, department, or instructor...',
    allDepts: 'All Departments',
    activeWatchlist: 'Active Watchlist',
    simulateDrop: 'Simulate 1-Seat Drop',
    openStatus: 'OPEN',
    waitlistStatus: 'Waitlist',
    fullStatus: 'FULL',
    audioToggle: 'Audio Alert',
    notificationToggle: 'Browser Alert',
    bookmarkletTitle: '1-Click Fast WebReg Bookmarklet',
    bookmarkletDesc: 'Auto-fills your 5-digit course codes into WebReg input boxes in under 5 milliseconds.',
    copyBookmarklet: 'Copy Bookmarklet Script',
    dragBookmarklet: 'Drag to Bookmarks Bar',
    waitlistTitle: 'Markov Waitlist Admission Probability',
    waitlistDesc: 'Empirical Bayesian model calibrated on historical UCI drop rates and fee deadlines.',
    admissionOdds: 'Estimated Admission Odds',
    countdownTitle: 'Enrollment Window Countdown',
    downloadCalendar: 'Export to Calendar (.ics)',
  },

  // 2. Simplified Chinese
  'zh-CN': {
    badge: 'Anteater WebReg 战术选课套件',
    title: 'UCI WebReg 战术选课作战指挥中心',
    subtitle: 'WebSoc 实时捡漏雷达、秒级一键选课书签小工具、马尔可夫链候补排队转正概率计算器与选课窗口倒计时。',
    radarTitle: 'WebSoc 实时开课与余位雷达',
    radarSubtitle: '模拟高频轮询监控全校各系班级余位，支持退课音效蜂鸣提醒与 Discord Webhook 推送。',
    searchPlaceholder: '按 5 位选课码、课程名、系所或授课教授搜索...',
    allDepts: '全部系所',
    activeWatchlist: '正在监控的课程',
    simulateDrop: '测试模拟空位掉落',
    openStatus: '有空位',
    waitlistStatus: '排队中',
    fullStatus: '已满员',
    audioToggle: '声音提醒',
    notificationToggle: '浏览器弹窗通知',
    bookmarkletTitle: 'WebReg 秒填抢课书签小工具',
    bookmarkletDesc: '在 WebReg 开放瞬间，5 毫秒内自动将全部 5 位选课码填入选课输入框，彻底告别手动敲代码的延迟。',
    copyBookmarklet: '复制书签代码',
    dragBookmarklet: '拖拽到书签栏',
    waitlistTitle: '马尔可夫链候补转正概率计算',
    waitlistDesc: '基于各系历年历史退课率、缴费截止日退课潮及班级容量数据测算的候补转正概率。',
    admissionOdds: '预计转正获录取概率',
    countdownTitle: '选课窗口倒计时与准备清单',
    downloadCalendar: '导出至日历 (.ics)',
  },

  // 3. Spanish
  es: {
    badge: 'Suite Táctica WebReg Anteater',
    title: 'Comando Táctico WebReg UCI',
    subtitle: 'Radar de asientos WebSoc, marcador de llenado automático, calculadora de lista de espera y cuenta regresiva.',
    radarTitle: 'Radar de Asientos en Vivo WebSoc',
    radarSubtitle: 'Monitoreo simulado de alta frecuencia con alertas sonoras cuando se liberan asientos.',
    searchPlaceholder: 'Buscar por código de 5 dígitos, nombre de curso, departamento o profesor...',
    allDepts: 'Todos los Departamentos',
    activeWatchlist: 'Lista de Seguimiento Activa',
    simulateDrop: 'Simular Liberación de Asiento',
    openStatus: 'ABIERTO',
    waitlistStatus: 'Lista de Espera',
    fullStatus: 'LLENO',
    audioToggle: 'Alerta Sonora',
    notificationToggle: 'Notificación del Navegador',
    bookmarkletTitle: 'Marcador Rápido de 1 Clic WebReg',
    bookmarkletDesc: 'Autocompleta los códigos de curso de 5 dígitos en WebReg en menos de 5 milisegundos.',
    copyBookmarklet: 'Copiar Código del Marcador',
    dragBookmarklet: 'Arrastrar a Barra de Marcadores',
    waitlistTitle: 'Probabilidad de Admisión en Lista de Espera',
    waitlistDesc: 'Modelo bayesiano empírico calibrado con tasas históricas de abandono y fechas límite de UCI.',
    admissionOdds: 'Probabilidad Estimada de Admisión',
    countdownTitle: 'Cuenta Regresiva de Ventana de Inscripción',
    downloadCalendar: 'Exportar al Calendario (.ics)',
  },

  // 4. Vietnamese
  vi: {
    badge: 'Bộ Công Cụ Tác Chiến WebReg',
    title: 'Trung Tâm Tác Chiến WebReg UCI',
    subtitle: 'Radar bắt chỗ trống WebSoc, bookmarklet tự điền 1-click, máy tính xác suất waitlist và đếm ngược mở cổng.',
    radarTitle: 'Radar Chỗ Trống Trực Tiếp WebSoc',
    radarSubtitle: 'Mô phỏng quét tần suất cao kèm âm thanh cảnh báo khi có sinh viên nhả lớp.',
    searchPlaceholder: 'Tìm theo mã 5 số, tên môn, khoa hoặc giảng viên...',
    allDepts: 'Tất Cả Các Khoa',
    activeWatchlist: 'Danh Sách Đang Theo Dõi',
    simulateDrop: 'Thử Nghiệm Nhả 1 Chỗ',
    openStatus: 'CÒN CHỖ',
    waitlistStatus: 'Danh Sách Chờ',
    fullStatus: 'ĐÃ HẾT CHỖ',
    audioToggle: 'Bật Âm Thanh Báo',
    notificationToggle: 'Thông Báo Trình Duyệt',
    bookmarkletTitle: 'Bookmarklet Tự Điền Nhanh 1-Click',
    bookmarkletDesc: 'Tự động điền các mã môn học 5 số vào WebReg chỉ trong dưới 5 mili giây.',
    copyBookmarklet: 'Sao Chép Đoạn Mã Bookmarklet',
    dragBookmarklet: 'Kéo Vào Thanh Dấu Trang',
    waitlistTitle: 'Xác Suất Được Nhận Từ Danh Sách Chờ',
    waitlistDesc: 'Mô hình Bayesian dựa trên tỷ lệ nhả lớp lịch sử và hạn đóng học phí tại UCI.',
    admissionOdds: 'Tỷ Lệ Nhận Lớp Ước Tính',
    countdownTitle: 'Đếm Ngược Mở Cổng Đăng Ký',
    downloadCalendar: 'Xuất Ra Lịch (.ics)',
  },

  // 5. Korean
  ko: {
    badge: 'Anteater WebReg 전술 수강신청 툴킷',
    title: 'UCI WebReg 전술 수강신청 사령탑',
    subtitle: 'WebSoc 빈자리 저격 레이더, 1초 자동입력 북마클릿, 대기열 합격 확률 계산기 및 수강신청 창 카운트다운.',
    radarTitle: 'WebSoc 실시간 빈자리 레이더',
    radarSubtitle: '수강 취소 발생 시 비프음 알림 및 디스코드 웹훅 연동 실시간 모니터링.',
    searchPlaceholder: '5자리 과목 코드, 강의명, 학과, 교수명으로 검색...',
    allDepts: '모든 학과',
    activeWatchlist: '모니터링 중인 강좌',
    simulateDrop: '빈자리 발생 모의 테스트',
    openStatus: '신청 가능',
    waitlistStatus: '대기열 접수',
    fullStatus: '마감됨',
    audioToggle: '사운드 알림',
    notificationToggle: '브라우저 알림',
    bookmarkletTitle: 'WebReg 1초 자동입력 북마클릿',
    bookmarkletDesc: 'WebReg 수강신청 창에서 5자리 코드를 5밀리초 만에 자동 채워줍니다.',
    copyBookmarklet: '북마클릿 코드 복사',
    dragBookmarklet: '북마크바로 드래그',
    waitlistTitle: '마르코프 체인 대기열 합격 확률',
    waitlistDesc: 'UCI 학과별 수강 취소율 및 등록금 납부 마감 데이터를 학습한 확률 분석 모델.',
    admissionOdds: '예상 수강 합격률',
    countdownTitle: '수강신청 오픈 카운트다운',
    downloadCalendar: '캘린더로 내보내기 (.ics)',
  },

  // 6. Traditional Chinese
  'zh-TW': {
    badge: 'Anteater WebReg 戰術選課套件',
    title: 'UCI WebReg 戰術選課作戰指揮中心',
    subtitle: 'WebSoc 即時撿漏雷達、秒級一鍵選課書籤小工具、馬可夫鏈候補排隊轉正機率計算器與選課窗口倒數計時。',
    radarTitle: 'WebSoc 即時開課與餘位雷達',
    radarSubtitle: '模擬高頻輪詢監控全校各系班級餘位，支援退課音效蜂鳴提醒與 Discord Webhook 推播。',
    searchPlaceholder: '按 5 位選課碼、課程名、系所或授課教授搜尋...',
    allDepts: '全部系所',
    activeWatchlist: '正在監控的課程',
    simulateDrop: '測試模擬空位釋出',
    openStatus: '有空位',
    waitlistStatus: '排隊中',
    fullStatus: '已滿員',
    audioToggle: '聲音提醒',
    notificationToggle: '瀏覽器彈窗通知',
    bookmarkletTitle: 'WebReg 秒填搶課書籤小工具',
    bookmarkletDesc: '在 WebReg 開放瞬間，5 毫秒內自動將全部 5 位選課碼填入選課輸入框，徹底告別手動輸入的延遲。',
    copyBookmarklet: '複製書籤代碼',
    dragBookmarklet: '拖曳到書籤列',
    waitlistTitle: '馬可夫鏈候補轉正機率計算',
    waitlistDesc: '基於各系歷年歷史退課率、繳費截止日退課潮及班級容量數據測算的候補轉正機率。',
    admissionOdds: '預計轉正獲錄取機率',
    countdownTitle: '選課窗口倒數計時與準備清單',
    downloadCalendar: '匯出至行事曆 (.ics)',
  },

  // 7. Tagalog
  tl: {
    badge: 'Anteater WebReg Tactical Suite',
    title: 'UCI WebReg Tactical Command',
    subtitle: 'WebSoc seat sniper, 1-click auto-filler bookmarklet, Markov waitlist probability calculator, at enrollment countdown.',
    radarTitle: 'WebSoc Live Seat Radar',
    radarSubtitle: 'Mataas na dalas na pagsubaybay na may audio alert kapag nag-drop ang mga estudyante.',
    searchPlaceholder: 'Maghanap ayon sa 5-digit code, pangalan ng kurso, departamento, o propesor...',
    allDepts: 'Lahat ng Kagawaran',
    activeWatchlist: 'Aktibong Watchlist',
    simulateDrop: 'Subukan ang Pag-drop ng Upuan',
    openStatus: 'BUKAS',
    waitlistStatus: 'Waitlist',
    fullStatus: 'PUNO',
    audioToggle: 'Tunog na Alerto',
    notificationToggle: 'Alerto sa Browser',
    bookmarkletTitle: '1-Click Mabilis na WebReg Bookmarklet',
    bookmarkletDesc: 'Awtomatikong pinupunan ang iyong mga 5-digit na code sa WebReg sa ilalim ng 5 millisecond.',
    copyBookmarklet: 'Kopyahin ang Script',
    dragBookmarklet: 'I-drag sa Bookmarks Bar',
    waitlistTitle: 'Probabilidad ng Pagpasok sa Waitlist',
    waitlistDesc: 'Modelong batay sa kasaysayan ng drop rate at mga deadline sa UCI.',
    admissionOdds: 'Tinatayang Pagkakataon na Makapasok',
    countdownTitle: 'Countdown ng Window ng Enrollment',
    downloadCalendar: 'I-export sa Kalendaryo (.ics)',
  },

  // 8. Japanese
  ja: {
    badge: 'Anteater WebReg 戦術的履修登録スイート',
    title: 'UCI WebReg 戦術作戦コマンド',
    subtitle: 'WebSoc 空席スナイパー、ワンクリック自動入力ブックマークレット、マルコフ連鎖待機列合格率計算機、登録開始カウントダウン。',
    radarTitle: 'WebSoc リアルタイム空席レーダー',
    radarSubtitle: '学生が履修取消した際のアラート音声およびDiscord Webhook連携を備えた高頻度ポーリング監視。',
    searchPlaceholder: '5桁の科目コード、講義名、学科、教授名で検索...',
    allDepts: 'すべての学科',
    activeWatchlist: '監視中の科目リスト',
    simulateDrop: '空席発生テスト実行',
    openStatus: '空席あり',
    waitlistStatus: '待機列受付中',
    fullStatus: '満員',
    audioToggle: '音声通知',
    notificationToggle: 'ブラウザ通知',
    bookmarkletTitle: 'WebReg 1クリック高速入力ブックマークレット',
    bookmarkletDesc: 'WebReg入力欄に5桁のコードを5ミリ秒以内に自動補完します。',
    copyBookmarklet: 'ブックマークレットをコピー',
    dragBookmarklet: 'ブックマークバーにドラッグ',
    waitlistTitle: 'マルコフ連鎖 待機列合格確率計算機',
    waitlistDesc: 'UCI各学科の過去の履修取消率および学費納入期限データを基に算出した繰上合格確率。',
    admissionOdds: '繰上合格予想確率',
    countdownTitle: '履修登録ウィンドウ カウントダウン',
    downloadCalendar: 'カレンダーへ出力 (.ics)',
  },
};
