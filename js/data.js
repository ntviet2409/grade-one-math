// ══════════════════════════════════════════
//  MATH LEARNING HUB — COMPLETE CONTENT
//  Grade 1, CTST + Singapore Math + US Common Core
//  All UI in Vietnamese
// ══════════════════════════════════════════

const GAME_CONFIG = {
  xpPerCorrect: 10, xpPerTryIt: 5, xpPerBoss: 50, xpPerBrainGame: 15,
  xpPerLevel: 200, star1Pct: 60, star2Pct: 80, star3Pct: 100,
};

const BADGES = [
  { id: 'shape_master', name: 'Bậc Thầy Hình Học', icon: '🔺', desc: 'Hoàn thành Thế giới 1', world: 'world1' },
  { id: 'number_ninja', name: 'Ninja Số Học', icon: '🔢', desc: 'Hoàn thành Thế giới 2', world: 'world2' },
  { id: 'math_hero', name: 'Siêu Nhân Cộng Trừ', icon: '🦸', desc: 'Hoàn thành Thế giới 3', world: 'world3' },
  { id: 'clock_master', name: 'Bạn Của Đồng Hồ', icon: '🕐', desc: 'Hoàn thành Thế giới 4', world: 'world4' },
  { id: 'century', name: 'Chinh Phục 100', icon: '💯', desc: 'Hoàn thành Thế giới 5', world: 'world5' },
  { id: 'perfect', name: 'Hoàn Hảo', icon: '💎', desc: 'Đạt 3 sao trong 1 bài kiểm tra', type: 'achievement' },
  { id: 'streak7', name: 'Chăm Chỉ 7 Ngày', icon: '🔥', desc: 'Học 7 ngày liên tiếp', type: 'achievement' },
  { id: 'brain_champ', name: 'Nhà Tư Duy', icon: '🧠', desc: 'Hoàn thành 10 trò chơi tư duy', type: 'achievement' },
  { id: 'speed_demon', name: 'Nhanh Như Chớp', icon: '⚡', desc: 'Hoàn thành quiz dưới 60 giây', type: 'achievement' },
];

// Helper: generate simple arithmetic questions
function genAdd(a, b) { return { type:'fillBlank', question: a + ' + ' + b + ' = ?', answer: a+b, explain: a + ' + ' + b + ' = ' + (a+b) }; }
function genSub(a, b) { return { type:'fillBlank', question: a + ' − ' + b + ' = ?', answer: a-b, explain: a + ' − ' + b + ' = ' + (a-b) }; }
function genMissAdd(a, b) { return { type:'fillBlank', question: a + ' + ___ = ' + (a+b), answer: b, explain: a + ' + ' + b + ' = ' + (a+b) }; }
function genMissSub(a, b) { return { type:'fillBlank', question: a + ' − ___ = ' + (a-b), answer: b, explain: a + ' − ' + b + ' = ' + (a-b) }; }

// ══════════════════════════════════════════
//  WORLD 1: LÀM QUEN VỚI HÌNH (Shapes)
// ══════════════════════════════════════════
const WORLD1 = {
  id: 'world1', name: 'Làm Quen Với Hình', icon: '🔺', color: '#f59e0b',
  desc: 'Học về vị trí, hình khối 3D và hình phẳng 2D',
  units: [
    {
      id: 'w1u1', name: 'Vị Trí', icon: '📍',
      lesson: { title: 'Vị trí', steps: [
        { type:'intro', title:'Học về vị trí', text:'Hôm nay chúng ta sẽ học cách nói về vị trí của các vật!', visual:'🏠🌳🚗' },
        { type:'concept', title:'Trên — Dưới', text:'Máy bay ở TRÊN. Ô tô ở DƯỚI.', layout:'vertical', items:[{emoji:'✈️',label:'Trên',pos:'top'},{emoji:'🚗',label:'Dưới',pos:'bottom'}] },
        { type:'concept', title:'Trái — Phải', text:'Con mèo ở bên TRÁI. Con chó ở bên PHẢI.', layout:'horizontal', items:[{emoji:'🐱',label:'Trái',pos:'left'},{emoji:'🐶',label:'Phải',pos:'right'}] },
        { type:'concept', title:'Trước — Sau — Ở giữa', text:'An đứng TRƯỚC. Chi đứng SAU. Bình ở GIỮA.', layout:'horizontal', items:[{emoji:'👦',label:'Trước'},{emoji:'👧',label:'Ở giữa'},{emoji:'👦',label:'Sau'}] },
        { type:'summary', title:'Nhớ nhé!', points:['Trên ↑ — Dưới ↓','Trái ← — Phải →','Trước — Sau','Ở giữa = giữa hai vật'] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'✈️ bay trên trời, 🚗 chạy dưới đất. ✈️ ở đâu so với 🚗?', options:['Trên','Dưới','Trái','Phải'], correct:0 },
        { type:'multipleChoice', question:'🐱 🐔 🐶 — Con gà ở đâu?', options:['Bên trái','Ở giữa','Bên phải'], correct:1 },
        { type:'multipleChoice', question:'🍎 🍌 — Quả táo ở bên nào?', options:['Bên trái','Bên phải'], correct:0 },
      ],
      quiz: [
        { type:'multipleChoice', question:'🌙 ở đâu so với 🏠?', options:['Trên','Dưới','Trái'], correct:0, explain:'Mặt trăng ở trên nhà' },
        { type:'multipleChoice', question:'🐟 ở đâu so với 🚢?', options:['Trên','Dưới','Trái'], correct:1, explain:'Cá ở dưới tàu' },
        { type:'multipleChoice', question:'🍎 🍌 🍊 — 🍌 ở đâu?', options:['Bên trái','Ở giữa','Bên phải'], correct:1, explain:'Chuối ở giữa táo và cam' },
        { type:'multipleChoice', question:'🚗 🚌 🚕 — 🚗 ở đâu?', options:['Bên trái','Bên phải','Ở giữa'], correct:0, explain:'Ô tô ở bên trái' },
        { type:'trueFalse', question:'🌳 ở DƯỚI ☁️?', answer:true, explain:'Cây ở dưới mây' },
        { type:'multipleChoice', question:'🐕 🐈 🐇 🐓 — 🐈 ở vị trí thứ mấy từ trái?', options:['Thứ 1','Thứ 2','Thứ 3','Thứ 4'], correct:1, explain:'Mèo ở vị trí thứ 2' },
        { type:'multipleChoice', question:'☀️ thường ở đâu so với chúng ta?', options:['Trên','Dưới','Phía sau'], correct:0, explain:'Mặt trời ở trên' },
        { type:'multipleChoice', question:'🐛 bò trên mặt đất. 🦅 bay trên trời. Ai ở DƯỚI?', options:['🐛 Sâu','🦅 Đại bàng'], correct:0, explain:'Sâu bò dưới đất' },
      ]
    },
    {
      id: 'w1u2', name: 'Khối Hộp & Khối Lập Phương', icon: '📦',
      lesson: { title: 'Hình khối 3D', steps: [
        { type:'intro', title:'Hình khối 3D', text:'Hình 3D là hình con CẦM được — có chiều dài, rộng, và CAO!', visual:'📦🎲' },
        { type:'concept', title:'Khối hộp chữ nhật', text:'Giống hộp giày, tủ lạnh. Có 6 mặt hình chữ nhật.', shape:'box', examples:['📦 Hộp giày','🧱 Gạch','📱 Điện thoại'] },
        { type:'concept', title:'Khối lập phương', text:'Giống xúc xắc. 6 mặt VUÔNG bằng nhau.', shape:'cube', examples:['🎲 Xúc xắc','🧊 Đá viên','🎁 Hộp quà vuông'] },
        { type:'compare', title:'Khác nhau?', text:'Lập phương: 6 mặt vuông bằng nhau. Hộp chữ nhật: các mặt có thể khác kích thước.', left:{name:'Khối lập phương',icon:'🎲',note:'6 mặt vuông bằng nhau'}, right:{name:'Khối hộp chữ nhật',icon:'📦',note:'6 mặt, khác kích thước'} },
        { type:'summary', title:'Nhớ nhé!', points:['Hình 3D = cầm được','Khối hộp: 6 mặt chữ nhật','Khối lập phương: 6 mặt vuông bằng nhau'] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'🎲 Xúc xắc là hình gì?', options:['Khối hộp chữ nhật','Khối lập phương','Hình tròn'], correct:1 },
        { type:'multipleChoice', question:'📦 Hộp giày là hình gì?', options:['Khối hộp chữ nhật','Khối lập phương'], correct:0 },
        { type:'multipleChoice', question:'Khối lập phương có mấy mặt?', options:['4','5','6','8'], correct:2 },
      ],
      quiz: [
        { type:'multipleChoice', question:'🧊 Viên đá hình gì?', options:['Khối hộp chữ nhật','Khối lập phương','Hình tròn'], correct:1, explain:'Vuông đều — khối lập phương' },
        { type:'multipleChoice', question:'🧱 Viên gạch là hình gì?', options:['Khối hộp chữ nhật','Khối lập phương'], correct:0, explain:'Dài hơn rộng — khối hộp chữ nhật' },
        { type:'trueFalse', question:'Khối lập phương có tất cả mặt bằng nhau?', answer:true, explain:'6 mặt vuông bằng nhau' },
        { type:'trueFalse', question:'Tủ lạnh là khối lập phương?', answer:false, explain:'Tủ lạnh cao hơn rộng — khối hộp chữ nhật' },
        { type:'multipleChoice', question:'Vật nào KHÔNG phải 3D?', options:['🎲 Xúc xắc','📦 Hộp','⭕ Vòng tròn trên giấy'], correct:2, explain:'Vòng tròn trên giấy là hình 2D' },
        { type:'multipleChoice', question:'Mặt của khối lập phương là hình gì?', options:['Chữ nhật','Vuông','Tam giác','Tròn'], correct:1, explain:'6 mặt đều hình vuông' },
        { type:'counting', question:'Đếm khối lập phương: 🎲🎲📦🎲📦🎲', items:['🎲','🎲','📦','🎲','📦','🎲'], countTarget:'🎲', answer:4, explain:'4 khối lập phương' },
        { type:'multipleChoice', question:'Cả hộp chữ nhật và lập phương đều có mấy mặt?', options:['4','5','6'], correct:2, explain:'Đều có 6 mặt' },
      ]
    },
    {
      id: 'w1u3', name: 'Hình Phẳng 2D', icon: '🔵',
      lesson: { title: 'Hình phẳng 2D', steps: [
        { type:'intro', title:'Hình phẳng 2D', text:'Hình 2D là hình phẳng, vẽ được trên giấy.', visual:'⭕🔺🟦' },
        { type:'concept', title:'Hình tròn', text:'KHÔNG có cạnh, KHÔNG có góc. Tròn đều.', shape:'circle', props:{sides:0,corners:0} },
        { type:'concept', title:'Hình tam giác', text:'Có 3 cạnh và 3 góc. "Tam" = 3.', shape:'triangle', props:{sides:3,corners:3} },
        { type:'concept', title:'Hình vuông', text:'4 cạnh BẰNG NHAU, 4 góc vuông.', shape:'square', props:{sides:4,corners:4,note:'4 cạnh bằng nhau'} },
        { type:'concept', title:'Hình chữ nhật', text:'4 cạnh (2 dài, 2 ngắn), 4 góc vuông.', shape:'rectangle', props:{sides:4,corners:4,note:'2 dài + 2 ngắn'} },
        { type:'summary', title:'Bảng tóm tắt', table:[['Hình','Cạnh','Góc'],['⭕ Tròn','0','0'],['🔺 Tam giác','3','3'],['🟦 Vuông','4 (bằng nhau)','4'],['🟩 Chữ nhật','4 (2 dài 2 ngắn)','4']] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'Hình nào có 3 cạnh?', options:['⭕ Tròn','🔺 Tam giác','🟦 Vuông'], correct:1 },
        { type:'multipleChoice', question:'Hình tròn có mấy cạnh?', options:['0','1','2','4'], correct:0 },
        { type:'multipleChoice', question:'Hình vuông khác chữ nhật ở điểm nào?', options:['Nhiều góc hơn','4 cạnh bằng nhau','Không có góc'], correct:1 },
      ],
      quiz: [
        { type:'multipleChoice', question:'Hình tam giác có mấy góc?', options:['2','3','4'], correct:1, explain:'Tam = 3 góc' },
        { type:'multipleChoice', question:'Hình nào KHÔNG có góc?', options:['🔺 Tam giác','🟦 Vuông','⭕ Tròn'], correct:2, explain:'Tròn không có góc' },
        { type:'multipleChoice', question:'Bảng đen hình gì?', options:['Tròn','Vuông','Chữ nhật','Tam giác'], correct:2, explain:'2 cạnh dài, 2 cạnh ngắn' },
        { type:'trueFalse', question:'Hình chữ nhật có 4 góc vuông?', answer:true, explain:'Cả vuông và chữ nhật đều 4 góc vuông' },
        { type:'counting', question:'Đếm tam giác: 🔺⭕🔺🟦🔺⭕🔺', items:['🔺','⭕','🔺','🟦','🔺','⭕','🔺'], countTarget:'🔺', answer:4, explain:'4 tam giác' },
        { type:'multipleChoice', question:'Bánh xe hình gì?', options:['Tam giác','Tròn','Vuông'], correct:1, explain:'Bánh xe tròn' },
        { type:'counting', question:'Đếm hình 4 cạnh: 🔺🟦🟩⭕🟦🔺🟩', items:['🔺','🟦','🟩','⭕','🟦','🔺','🟩'], countTarget:['🟦','🟩'], answer:4, explain:'2 vuông + 2 chữ nhật = 4' },
        { type:'trueFalse', question:'Hình vuông cũng là hình chữ nhật?', answer:true, explain:'Vuông là chữ nhật đặc biệt (4 cạnh bằng nhau)' },
      ]
    },
    {
      id: 'w1u4', name: 'Quy Luật & Xếp Hình', icon: '🧩',
      lesson: { title: 'Quy luật', steps: [
        { type:'intro', title:'Tìm quy luật', text:'Quy luật = lặp lại theo trật tự. Tìm nhóm lặp → đoán tiếp theo!', visual:'🔴🔵🔴🔵🔴❓' },
        { type:'concept', title:'Quy luật 2 hình', text:'🔴🔵🔴🔵🔴❓ → Tiếp: 🔵! Đỏ-xanh lặp lại.' },
        { type:'concept', title:'Quy luật 3 hình', text:'🔺⭕🟦🔺⭕🟦🔺❓❓ → Tiếp: ⭕🟦! Nhóm 3 lặp lại.' },
        { type:'concept', title:'Ghép hình', text:'2 tam giác → 1 vuông. 2 vuông → 1 chữ nhật. Ghép hình nhỏ thành hình lớn!' },
        { type:'summary', title:'Nhớ nhé!', points:['Tìm nhóm lặp lại','Đoán hình tiếp theo','Hình nhỏ ghép thành hình lớn'] }
      ]},
      tryIt: [
        { type:'pattern', question:'🔴🔵🔴🔵🔴❓', sequence:['🔴','🔵','🔴','🔵','🔴'], options:['🔴','🔵','🟢'], correct:1 },
        { type:'pattern', question:'🔺🔺⭕🔺🔺⭕🔺🔺❓', sequence:['🔺','🔺','⭕','🔺','🔺','⭕','🔺','🔺'], options:['🔺','⭕','🟦'], correct:1 },
        { type:'multipleChoice', question:'2 tam giác 🔺🔻 ghép thành?', options:['Tròn','Vuông','Chữ nhật'], correct:1 },
      ],
      quiz: [
        { type:'pattern', question:'🟦⭕🟦⭕🟦❓', sequence:['🟦','⭕','🟦','⭕','🟦'], options:['🟦','⭕','🔺'], correct:1, explain:'Vuông-tròn lặp lại' },
        { type:'pattern', question:'🔺🔺🟦🔺🔺🟦🔺🔺❓', sequence:['🔺','🔺','🟦','🔺','🔺','🟦','🔺','🔺'], options:['🔺','🟦','⭕'], correct:1, explain:'🔺🔺🟦 lặp lại' },
        { type:'pattern', question:'🔴🔵🟢🔴🔵🟢🔴❓❓', sequence:['🔴','🔵','🟢','🔴','🔵','🟢','🔴'], options:['🔵🟢','🔴🔵','🟢🔴'], correct:0, explain:'3 màu lặp lại' },
        { type:'multipleChoice', question:'Hình nào KHÔNG thuộc quy luật: ⭕🔺⭕🔺⭕🟦', options:['⭕','🔺','🟦'], correct:2, explain:'🟦 phá vỡ quy luật' },
        { type:'pattern', question:'🟩🟩🔺🟩🟩🔺🟩🟩❓', sequence:['🟩','🟩','🔺','🟩','🟩','🔺','🟩','🟩'], options:['🟩','🔺','⭕'], correct:1, explain:'🟩🟩🔺 lặp lại' },
        { type:'multipleChoice', question:'Gấp chữ nhật làm đôi được gì?', options:['2 tam giác','2 vuông','2 chữ nhật nhỏ'], correct:2, explain:'Gấp đôi chữ nhật → 2 chữ nhật nhỏ' },
        { type:'multipleChoice', question:'Quy luật nào đúng?', options:['🔴🔵🔴🔴🔵','🔴🔵🔴🔵🔴','🔴🔴🔵🔴🔵'], correct:1, explain:'🔴🔵 lặp đều đặn' },
        { type:'counting', question:'Đếm ⭕ trong: 🔺⭕🔺🟦⭕🔺⭕🔺', items:['🔺','⭕','🔺','🟦','⭕','🔺','⭕','🔺'], countTarget:'⭕', answer:3, explain:'3 hình tròn' },
      ]
    },
  ],
  boss: { name:'Thử Thách Hình Học', questions: [
    { type:'multipleChoice', question:'Hộp sữa hình gì?', options:['Khối hộp chữ nhật','Khối lập phương','Tròn'], correct:0 },
    { type:'multipleChoice', question:'Hình nào có 3 cạnh?', options:['⭕','🔺','🟦'], correct:1 },
    { type:'multipleChoice', question:'🌙 ở đâu so với 🏔️?', options:['Dưới','Trên','Trái'], correct:1 },
    { type:'pattern', question:'⭕🔺🟦⭕🔺🟦⭕❓❓', sequence:['⭕','🔺','🟦','⭕','🔺','🟦','⭕'], options:['🔺🟦','⭕🔺','🟦⭕'], correct:0 },
    { type:'trueFalse', question:'Khối lập phương có 6 mặt vuông bằng nhau?', answer:true },
    { type:'counting', question:'Đếm hình 4 cạnh: 🔺🟦⭕🟩🔺🟦🟩⭕🟦', items:['🔺','🟦','⭕','🟩','🔺','🟦','🟩','⭕','🟦'], countTarget:['🟦','🟩'], answer:5 },
    { type:'multipleChoice', question:'🐱🐶🐔🐸 — 🐔 thứ mấy từ trái?', options:['1','2','3','4'], correct:2 },
    { type:'multipleChoice', question:'Tròn khác vuông ở điểm nào?', options:['Tròn không có cạnh','Tròn có 4 cạnh'], correct:0 },
    { type:'multipleChoice', question:'Quả bóng hình gì?', options:['Vuông','Tròn','Tam giác'], correct:1 },
    { type:'pattern', question:'🟢🟡🟢🟡🟢🟡❓', sequence:['🟢','🟡','🟢','🟡','🟢','🟡'], options:['🟡','🟢','🔴'], correct:1 },
  ]},
  brainGames: [
    { id:'bg_shape_count', name:'Đếm Hình Ẩn', icon:'🔍', source:'Singapore Math', desc:'Đếm hình trong hình phức tạp',
      questions:[
        { type:'multipleChoice', question:'Vuông lớn chia 4 ô. Tổng cộng bao nhiêu hình vuông?', options:['4','5','6'], correct:1, explain:'4 nhỏ + 1 lớn = 5' },
        { type:'multipleChoice', question:'Tam giác lớn chia đôi. Bao nhiêu tam giác?', options:['2','3','4'], correct:1, explain:'2 nhỏ + 1 lớn = 3' },
        { type:'multipleChoice', question:'Chữ nhật chia 2 ô. Bao nhiêu chữ nhật?', options:['2','3','4'], correct:1, explain:'2 nhỏ + 1 lớn = 3' },
        { type:'multipleChoice', question:'Vuông lớn chia 9 ô (3×3). Tổng hình vuông? (nhỏ + vừa + lớn)', options:['9','13','14'], correct:2, explain:'9 ô 1×1 + 4 ô 2×2 + 1 ô 3×3 = 14!' },
        { type:'multipleChoice', question:'Tam giác lớn có 2 đường chia. Bao nhiêu tam giác?', options:['4','5','6'], correct:2, explain:'3 nhỏ + 2 ghép + 1 lớn = 6' },
      ]
    },
    { id:'bg_odd_out', name:'Tìm Kẻ Khác Biệt', icon:'👀', source:'Logic Enrichment', desc:'Tìm vật không cùng nhóm',
      questions:[
        { type:'multipleChoice', question:'🔺🔺🔺⭕🔺 — Hình nào khác?', options:['🔺 đầu','⭕ thứ 4','🔺 cuối'], correct:1, explain:'⭕ không phải tam giác' },
        { type:'multipleChoice', question:'⚽🏀🎲🏐 — Vật nào không tròn?', options:['⚽','🏀','🎲','🏐'], correct:2, explain:'🎲 là khối vuông' },
        { type:'multipleChoice', question:'🟦🟦🟩🟦🟦 — Hình nào khác?', options:['🟦 đầu','🟩 thứ 3','🟦 cuối'], correct:1, explain:'🟩 là chữ nhật, còn lại vuông' },
        { type:'multipleChoice', question:'📦🎲📦📦 — Vật nào khác?', options:['📦 đầu','🎲 thứ 2','📦 cuối'], correct:1, explain:'🎲 là lập phương, còn lại hộp chữ nhật' },
        { type:'multipleChoice', question:'🔴🔴🔴🔵🔴🔴 — Tìm kẻ khác biệt', options:['🔴 thứ 1','🔵 thứ 4','🔴 thứ 6'], correct:1, explain:'🔵 khác màu' },
      ]
    },
    { id:'bg_spatial', name:'Tư Duy Không Gian', icon:'🧩', source:'Singapore Math', desc:'Xoay, lật, ghép hình',
      questions:[
        { type:'multipleChoice', question:'Xoay 🔺 ngược → ?', options:['🔻 tam giác ngược','⭕ tròn','🟦 vuông'], correct:0, explain:'Vẫn là tam giác, chỉ đổi hướng' },
        { type:'multipleChoice', question:'2 vuông cạnh nhau → ?', options:['Vuông lớn','Chữ nhật','Tam giác'], correct:1, explain:'2 vuông = 1 chữ nhật' },
        { type:'multipleChoice', question:'Gấp chéo vuông → ?', options:['Vuông nhỏ','Tam giác','Tròn'], correct:1, explain:'Gấp chéo vuông → tam giác' },
        { type:'multipleChoice', question:'Cắt tròn làm đôi → ?', options:['Tam giác','Bán nguyệt','Vuông'], correct:1, explain:'Nửa hình tròn = bán nguyệt' },
        { type:'multipleChoice', question:'4 tam giác giống nhau ghép lại có thể thành?', options:['Hình vuông','Hình tròn','Hình ngũ giác'], correct:0, explain:'4 tam giác vuông → 1 vuông' },
      ]
    },
    { id:'bg_compare_logic', name:'Suy Luận So Sánh', icon:'⚖️', source:'Logic Enrichment', desc:'Suy luận từ thông tin cho trước',
      questions:[
        { type:'multipleChoice', question:'A to hơn B. B to hơn C. Ai to nhất?', options:['A','B','C'], correct:0, explain:'A > B > C' },
        { type:'multipleChoice', question:'Cây A cao hơn B. Cây C thấp hơn B. Ai thấp nhất?', options:['A','B','C'], correct:2, explain:'A > B > C' },
        { type:'multipleChoice', question:'An trước Bình. Bình trước Chi. Ai cuối?', options:['An','Bình','Chi'], correct:2, explain:'An-Bình-Chi' },
        { type:'multipleChoice', question:'Vuông có 4 cạnh. Tam giác 3 cạnh. Ai nhiều cạnh hơn?', options:['Vuông','Tam giác','Bằng nhau'], correct:0, explain:'4 > 3' },
        { type:'multipleChoice', question:'Mai cao hơn Lan. Mai thấp hơn Hoa. Ai cao nhất?', options:['Mai','Lan','Hoa'], correct:2, explain:'Hoa > Mai > Lan' },
      ]
    },
  ]
};

// ══════════════════════════════════════════
//  WORLD 2: CÁC SỐ ĐẾN 10
// ══════════════════════════════════════════
const WORLD2 = {
  id: 'world2', name: 'Các Số Đến 10', icon: '🔢', color: '#3b82f6',
  desc: 'Đếm, viết số, so sánh, và khám phá Number Bonds',
  units: [
    {
      id: 'w2u1', name: 'Các Số 1, 2, 3, 4, 5', icon: '✋',
      lesson: { title: 'Đếm và viết số 1-5', steps: [
        { type:'intro', title:'Học đếm 1 đến 5', text:'Mỗi số đại diện cho MỘT SỐ LƯỢNG đồ vật!', visual:'1️⃣2️⃣3️⃣4️⃣5️⃣' },
        { type:'concept', title:'Số 1, 2, 3', text:'🍎 = 1 (một)   🍎🍎 = 2 (hai)   🍎🍎🍎 = 3 (ba)', layout:'counting' },
        { type:'concept', title:'Số 4, 5', text:'🍎🍎🍎🍎 = 4 (bốn)   🍎🍎🍎🍎🍎 = 5 (năm). 5 ngón trên 1 bàn tay! ✋', layout:'counting' },
        { type:'concept', title:'Thứ tự số', text:'1 → 2 → 3 → 4 → 5. Mỗi số tiếp theo NHIỀU HƠN 1.' },
        { type:'summary', title:'Nhớ nhé!', points:['Đếm = gán số cho mỗi vật','1,2,3,4,5 theo thứ tự tăng dần','5 ngón = 1 bàn tay'] }
      ]},
      tryIt: [
        { type:'counting', question:'Đếm sao: ⭐⭐⭐', items:['⭐','⭐','⭐'], countTarget:'⭐', answer:3 },
        { type:'counting', question:'Đếm trái tim: ❤️❤️❤️❤️❤️', items:['❤️','❤️','❤️','❤️','❤️'], countTarget:'❤️', answer:5 },
        { type:'multipleChoice', question:'Số nào đứng sau số 3?', options:['2','4','5'], correct:1 },
      ],
      quiz: [
        { type:'counting', question:'Đếm: 🐥🐥🐥🐥', items:['🐥','🐥','🐥','🐥'], countTarget:'🐥', answer:4, explain:'4 con gà con' },
        { type:'counting', question:'Đếm: 🌺🌺', items:['🌺','🌺'], countTarget:'🌺', answer:2, explain:'2 bông hoa' },
        { type:'multipleChoice', question:'Số nào đứng trước 5?', options:['3','4','6'], correct:1, explain:'4 đứng trước 5' },
        { type:'multipleChoice', question:'Số nào đứng sau 2?', options:['1','3','4'], correct:1, explain:'3 đứng sau 2' },
        { type:'fillBlank', question:'Đếm tiếp: 1, 2, 3, ___ ?', answer:4, explain:'4 đứng sau 3' },
        { type:'fillBlank', question:'Đếm tiếp: 3, 4, ___ ?', answer:5, explain:'5 đứng sau 4' },
        { type:'counting', question:'Đếm: 🍊🍊🍊🍊🍊', items:['🍊','🍊','🍊','🍊','🍊'], countTarget:'🍊', answer:5, explain:'5 quả cam' },
        { type:'multipleChoice', question:'1 bàn tay có mấy ngón?', options:['4','5','6'], correct:1, explain:'5 ngón tay' },
      ]
    },
    {
      id: 'w2u2', name: 'Các Số 6, 7, 8, 9, 10', icon: '🔟',
      lesson: { title: 'Đếm 6-10 và số 0', steps: [
        { type:'intro', title:'Tiếp tục đếm!', text:'Sau 5 là 6, 7, 8, 9, 10. Hai bàn tay = 10 ngón! 🤲', visual:'6️⃣7️⃣8️⃣9️⃣🔟' },
        { type:'concept', title:'Số 6, 7, 8', text:'5+1=6   5+2=7   5+3=8. Một bàn tay + thêm ngón!' },
        { type:'concept', title:'Số 9, 10', text:'5+4=9   5+5=10. Hai bàn tay = 10!' },
        { type:'concept', title:'Số 0', text:'KHÔNG có gì = 0 (không). Rổ trống = 0 quả. 0 đứng trước 1.' },
        { type:'summary', title:'Dãy số hoàn chỉnh', points:['0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10','0 = không có gì','10 = hai bàn tay'] }
      ]},
      tryIt: [
        { type:'counting', question:'Đếm: 🐟🐟🐟🐟🐟🐟🐟', items:['🐟','🐟','🐟','🐟','🐟','🐟','🐟'], countTarget:'🐟', answer:7 },
        { type:'fillBlank', question:'Đếm tiếp: 7, 8, 9, ___?', answer:10, explain:'10 sau 9' },
        { type:'multipleChoice', question:'Rổ trống có mấy quả?', options:['0','1','2'], correct:0 },
      ],
      quiz: [
        { type:'counting', question:'Đếm: 🦋🦋🦋🦋🦋🦋🦋🦋', items:['🦋','🦋','🦋','🦋','🦋','🦋','🦋','🦋'], countTarget:'🦋', answer:8, explain:'8 con bướm' },
        { type:'fillBlank', question:'5, 6, 7, ___, 9', answer:8, explain:'8 đứng giữa 7 và 9' },
        { type:'fillBlank', question:'Đếm ngược: 10, 9, 8, ___?', answer:7, explain:'7 đứng trước 8' },
        { type:'multipleChoice', question:'Số nào nhỏ nhất?', options:['1','0','5'], correct:1, explain:'0 nhỏ nhất' },
        { type:'multipleChoice', question:'Số nào lớn nhất trong dãy 0-10?', options:['9','10','8'], correct:1, explain:'10 lớn nhất' },
        { type:'counting', question:'Đếm: 🌟🌟🌟🌟🌟🌟', items:['🌟','🌟','🌟','🌟','🌟','🌟'], countTarget:'🌟', answer:6, explain:'6 ngôi sao' },
        { type:'fillBlank', question:'Đếm ngược: 5, 4, 3, 2, ___?', answer:1, explain:'1 đứng sau 2 khi đếm ngược' },
        { type:'multipleChoice', question:'2 bàn tay có tổng cộng mấy ngón?', options:['8','10','12'], correct:1, explain:'5 + 5 = 10 ngón' },
      ]
    },
    {
      id: 'w2u3', name: 'Tách – Gộp Số (Number Bonds)', icon: '🔗',
      lesson: { title: 'Number Bonds — Tách và Gộp', steps: [
        { type:'intro', title:'Tách – Gộp số', text:'Mỗi số có thể TÁCH thành 2 phần, và 2 phần GỘP lại thành số ban đầu. Đây là nền tảng quan trọng nhất!', visual:'5 = 2 + 3' },
        { type:'concept', title:'Ví dụ: Tách số 5', text:'5 có thể tách thành:\n5 = 1 + 4\n5 = 2 + 3\n5 = 3 + 2\n5 = 4 + 1\n5 = 0 + 5' },
        { type:'concept', title:'Number Bond (Liên kết số)', text:'Vẽ: số lớn ở trên, 2 số nhỏ ở dưới nối bằng đường.\n\n    5\n   / \\\n  2   3\n\nĐọc: 5 tách thành 2 và 3. Hoặc: 2 gộp 3 bằng 5.' },
        { type:'concept', title:'Tất cả bonds của 10', text:'10 = 1+9 = 2+8 = 3+7 = 4+6 = 5+5\nNhớ các cặp này sẽ giúp con tính cộng trừ rất nhanh!' },
        { type:'summary', title:'Tại sao quan trọng?', points:['Number Bond giúp hiểu cộng và trừ','5 = 2+3 nghĩa là 5−2=3 và 5−3=2','Nhớ bonds của 10 → tính nhẩm nhanh','Đây là kỹ năng #1 của Singapore Math!'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'5 = 2 + ___?', answer:3, explain:'5 = 2 + 3' },
        { type:'fillBlank', question:'7 = 3 + ___?', answer:4, explain:'7 = 3 + 4' },
        { type:'fillBlank', question:'10 = 6 + ___?', answer:4, explain:'10 = 6 + 4' },
      ],
      quiz: [
        { type:'fillBlank', question:'5 = 1 + ___?', answer:4, explain:'5 = 1 + 4' },
        { type:'fillBlank', question:'8 = 3 + ___?', answer:5, explain:'8 = 3 + 5' },
        { type:'fillBlank', question:'10 = 7 + ___?', answer:3, explain:'10 = 7 + 3' },
        { type:'fillBlank', question:'6 = ___ + 2?', answer:4, explain:'6 = 4 + 2' },
        { type:'fillBlank', question:'9 = 5 + ___?', answer:4, explain:'9 = 5 + 4' },
        { type:'fillBlank', question:'10 = ___ + 5?', answer:5, explain:'10 = 5 + 5' },
        { type:'fillBlank', question:'7 = ___ + 7?', answer:0, explain:'7 = 0 + 7' },
        { type:'multipleChoice', question:'Cặp nào KHÔNG gộp thành 10?', options:['3 và 7','4 và 6','5 và 4'], correct:2, explain:'5+4=9, không phải 10' },
      ]
    },
    {
      id: 'w2u4', name: 'So Sánh — Dấu =, >, <', icon: '⚖️',
      lesson: { title: 'So sánh số và dấu', steps: [
        { type:'intro', title:'So sánh', text:'Bằng nhau (=), Lớn hơn (>), Bé hơn (<). Ba dấu hiệu giúp so sánh!', visual:'3 < 5   7 > 4   6 = 6' },
        { type:'concept', title:'Dấu = (bằng)', text:'🍎🍎🍎 và 🍊🍊🍊 → 3 = 3. Hai bên bằng nhau.' },
        { type:'concept', title:'Dấu > (lớn hơn)', text:'🍎🍎🍎🍎🍎 và 🍊🍊 → 5 > 2. Miệng cá mở về phía số LỚN!\n\nMẹo: > giống miệng cá sấu, luôn há về phía nhiều hơn!' },
        { type:'concept', title:'Dấu < (bé hơn)', text:'🍊🍊 và 🍎🍎🍎🍎🍎 → 2 < 5. Đầu nhọn chỉ về số NHỎ.' },
        { type:'summary', title:'Nhớ nhé!', points:['= nghĩa là bằng nhau','> miệng há về số lớn','< đầu nhọn chỉ số nhỏ','Mẹo cá sấu: há miệng ăn số to!'] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'3 ○ 5 — Điền dấu?', options:['=','>','<'], correct:2 },
        { type:'multipleChoice', question:'7 ○ 4 — Điền dấu?', options:['=','>','<'], correct:1 },
        { type:'multipleChoice', question:'6 ○ 6 — Điền dấu?', options:['=','>','<'], correct:0 },
      ],
      quiz: [
        { type:'multipleChoice', question:'8 ○ 3', options:['=','>','<'], correct:1, explain:'8 > 3' },
        { type:'multipleChoice', question:'2 ○ 9', options:['=','>','<'], correct:2, explain:'2 < 9' },
        { type:'multipleChoice', question:'5 ○ 5', options:['=','>','<'], correct:0, explain:'5 = 5' },
        { type:'multipleChoice', question:'10 ○ 7', options:['=','>','<'], correct:1, explain:'10 > 7' },
        { type:'multipleChoice', question:'0 ○ 1', options:['=','>','<'], correct:2, explain:'0 < 1' },
        { type:'multipleChoice', question:'4 ○ 4', options:['=','>','<'], correct:0, explain:'4 = 4' },
        { type:'multipleChoice', question:'Số nào lớn nhất: 3, 8, 5?', options:['3','8','5'], correct:1, explain:'8 lớn nhất' },
        { type:'multipleChoice', question:'Sắp xếp tăng dần: 7, 2, 5', options:['2, 5, 7','7, 5, 2','5, 2, 7'], correct:0, explain:'Nhỏ → lớn: 2, 5, 7' },
      ]
    },
  ],
  boss: { name:'Thử Thách Số Học', questions: [
    { type:'counting', question:'Đếm: 🐸🐸🐸🐸🐸🐸🐸🐸🐸', items:['🐸','🐸','🐸','🐸','🐸','🐸','🐸','🐸','🐸'], countTarget:'🐸', answer:9 },
    { type:'fillBlank', question:'10 = 4 + ___?', answer:6 },
    { type:'multipleChoice', question:'6 ○ 9', options:['=','>','<'], correct:2 },
    { type:'fillBlank', question:'7 = ___ + 3?', answer:4 },
    { type:'fillBlank', question:'Đếm ngược: 10, 9, ___, 7', answer:8 },
    { type:'multipleChoice', question:'Sắp tăng dần: 9, 3, 6?', options:['3, 6, 9','9, 6, 3','6, 3, 9'], correct:0 },
    { type:'multipleChoice', question:'Cặp nào gộp thành 10?', options:['3 và 8','4 và 6','5 và 6'], correct:1 },
    { type:'fillBlank', question:'8 = 5 + ___?', answer:3 },
    { type:'multipleChoice', question:'Số nào nhỏ nhất: 4, 0, 7?', options:['4','0','7'], correct:1 },
    { type:'fillBlank', question:'___ + 6 = 10?', answer:4 },
  ]},
  brainGames: [
    { id:'bg_bonds_master', name:'Number Bonds Master', icon:'🔗', source:'Singapore Math', desc:'Tìm tất cả cách tách một số',
      questions:[
        { type:'multipleChoice', question:'Số 5 có thể tách thành bao nhiêu cặp (kể cả 0)?', options:['4 cặp','5 cặp','6 cặp'], correct:2, explain:'0+5, 1+4, 2+3, 3+2, 4+1, 5+0 = 6 cặp' },
        { type:'fillBlank', question:'10 = 3 + ___?', answer:7, explain:'10 = 3 + 7' },
        { type:'fillBlank', question:'10 = ___ + 2?', answer:8, explain:'10 = 8 + 2' },
        { type:'multipleChoice', question:'Bond nào SAI?', options:['7 = 3+4','8 = 5+4','9 = 4+5'], correct:1, explain:'5+4=9, không phải 8. 8=5+3' },
        { type:'fillBlank', question:'Nếu 6 = 2 + 4, thì 6 − 2 = ___?', answer:4, explain:'Biết bond → biết trừ!' },
        { type:'fillBlank', question:'10 = 1 + ___?', answer:9, explain:'10 = 1 + 9' },
      ]
    },
    { id:'bg_order_logic', name:'Sắp Xếp & Logic', icon:'📊', source:'US Common Core', desc:'Sắp xếp số và suy luận',
      questions:[
        { type:'multipleChoice', question:'Số nào nằm giữa 4 và 6?', options:['3','5','7'], correct:1, explain:'4, 5, 6' },
        { type:'multipleChoice', question:'Đếm cách 2: 2, 4, 6, ___?', options:['7','8','9'], correct:1, explain:'2, 4, 6, 8' },
        { type:'multipleChoice', question:'Số nào gần 7 nhất?', options:['4','6','9'], correct:1, explain:'6 cách 7 chỉ 1 đơn vị' },
        { type:'fillBlank', question:'Đếm cách 2: 1, 3, 5, 7, ___?', answer:9, explain:'Số lẻ: 1, 3, 5, 7, 9' },
        { type:'multipleChoice', question:'Tôi là số chẵn, lớn hơn 5, nhỏ hơn 9. Tôi là ai?', options:['6','7','8'], correct:0, explain:'6 là chẵn, 5<6<9. (8 cũng đúng nhưng 6 là đáp án đầu tiên)' },
      ]
    },
  ]
};

// ══════════════════════════════════════════
//  WORLD 3: CỘNG TRỪ TRONG 10
// ══════════════════════════════════════════
const WORLD3 = {
  id: 'world3', name: 'Cộng Trừ Trong 10', icon: '➕', color: '#22c55e',
  desc: 'Phép cộng, phép trừ, và chiến lược tính nhẩm',
  units: [
    {
      id: 'w3u1', name: 'Phép Cộng', icon: '➕',
      lesson: { title: 'Phép cộng', steps: [
        { type:'intro', title:'Phép cộng là gì?', text:'Cộng = GỘP hai nhóm lại. 3 quả táo + 2 quả táo = 5 quả táo!', visual:'🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎' },
        { type:'concept', title:'Dấu + và =', text:'3 + 2 = 5\nĐọc: "ba cộng hai bằng năm"\n+ nghĩa là "thêm vào"\n= nghĩa là "bằng, kết quả là"' },
        { type:'concept', title:'Đổi chỗ vẫn bằng nhau!', text:'3 + 2 = 5 và 2 + 3 = 5\nĐổi chỗ hai số → kết quả KHÔNG đổi!\n(Tính chất giao hoán)' },
        { type:'summary', title:'Nhớ nhé!', points:['Cộng = gộp lại, thêm vào','a + b = b + a (đổi chỗ được)','Cộng với 0: số nào + 0 = chính nó'] }
      ]},
      tryIt: [ genAdd(2,3), genAdd(4,1), genAdd(1,5) ],
      quiz: [ genAdd(3,2), genAdd(1,4), genAdd(5,0), genAdd(2,2), genAdd(3,4), genAdd(0,6), genAdd(4,3), genAdd(1,1) ]
    },
    {
      id: 'w3u2', name: 'Cộng Trong Phạm Vi 10', icon: '🔟',
      lesson: { title: 'Cộng trong phạm vi 10', steps: [
        { type:'intro', title:'Cộng đến 10', text:'Tất cả phép cộng có kết quả ≤ 10. Dùng ngón tay, dùng bond!', visual:'6 + 4 = 10' },
        { type:'concept', title:'Đếm thêm', text:'7 + 2 = ?\nBắt đầu từ 7, đếm thêm 2: 8, 9.\nVậy 7 + 2 = 9!' },
        { type:'concept', title:'Dùng Number Bond', text:'Biết 10 = 6 + 4 → tính 6 + 4 = 10 ngay!\nBiết 8 = 5 + 3 → tính 5 + 3 = 8 ngay!' },
        { type:'summary', title:'Mẹo', points:['Bắt đầu từ số LỚN hơn, đếm thêm số nhỏ','Nhớ bonds → tính nhanh hơn đếm','Cộng 0 = giữ nguyên, cộng 1 = số tiếp theo'] }
      ]},
      tryIt: [ genAdd(6,3), genAdd(5,5), genAdd(7,2) ],
      quiz: [ genAdd(4,5), genAdd(6,4), genAdd(8,2), genAdd(3,7), genAdd(9,1), genAdd(5,4), genMissAdd(3,5), genMissAdd(6,4) ]
    },
    {
      id: 'w3u3', name: 'Phép Trừ', icon: '➖',
      lesson: { title: 'Phép trừ', steps: [
        { type:'intro', title:'Phép trừ là gì?', text:'Trừ = BỚT đi. 5 quả, ăn 2, còn 3!', visual:'🍎🍎🍎🍎🍎 − 🍎🍎 = 🍎🍎🍎' },
        { type:'concept', title:'Dấu − và =', text:'5 − 2 = 3\nĐọc: "năm trừ hai bằng ba"\n− nghĩa là "bớt đi"' },
        { type:'concept', title:'Trừ và Bond liên quan!', text:'Nếu biết 5 = 2 + 3 thì:\n5 − 2 = 3 ✓\n5 − 3 = 2 ✓\nBiết cộng → biết trừ!' },
        { type:'summary', title:'Nhớ nhé!', points:['Trừ = bớt đi','Số trừ 0 = chính nó','Số trừ chính nó = 0','Biết bond → biết cả cộng lẫn trừ!'] }
      ]},
      tryIt: [ genSub(5,2), genSub(7,3), genSub(4,4) ],
      quiz: [ genSub(6,2), genSub(8,3), genSub(9,5), genSub(10,4), genSub(7,7), genSub(5,0), genMissSub(8,3), genMissSub(10,6) ]
    },
    {
      id: 'w3u4', name: 'Ôn Tập Cộng Trừ', icon: '🔄',
      lesson: { title: 'Ôn tập: Fact Families', steps: [
        { type:'intro', title:'Fact Family (Gia đình phép tính)', text:'3 số tạo thành 1 "gia đình" với 4 phép tính!', visual:'2, 3, 5 → 2+3=5, 3+2=5, 5-2=3, 5-3=2' },
        { type:'concept', title:'Ví dụ: Gia đình 3, 4, 7', text:'3 + 4 = 7\n4 + 3 = 7\n7 − 3 = 4\n7 − 4 = 3\n→ 4 phép tính từ 3 số!' },
        { type:'concept', title:'Tại sao hữu ích?', text:'Biết 1 phép tính → suy ra 3 phép còn lại!\nBiết 6+4=10 → biết ngay 10−6=4 và 10−4=6' },
        { type:'summary', title:'Tổng kết', points:['Mỗi bộ 3 số → 2 phép cộng + 2 phép trừ','Biết cộng ↔ biết trừ','Đây là "Fact Families" trong chương trình Singapore & Mỹ'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'3 + 5 = 8. Vậy 8 − 3 = ___?', answer:5, explain:'Fact family: 3, 5, 8' },
        { type:'fillBlank', question:'4 + 6 = 10. Vậy 10 − 4 = ___?', answer:6 },
        genMissAdd(2,7),
      ],
      quiz: [
        genAdd(6,3), genSub(9,4), genMissAdd(4,5), genMissSub(10,3),
        { type:'fillBlank', question:'2 + 6 = 8. Vậy 8 − 6 = ___?', answer:2, explain:'Fact family' },
        genAdd(7,3), genSub(8,5), genMissAdd(3,4),
      ]
    },
  ],
  boss: { name:'Thử Thách Cộng Trừ', questions: [
    genAdd(6,4), genSub(10,3), genMissAdd(5,4), genSub(9,9),
    { type:'fillBlank', question:'___ + 3 = 10?', answer:7 },
    genAdd(8,2), genSub(7,4),
    { type:'fillBlank', question:'3 + 4 = 7. Vậy 7 − 4 = ___?', answer:3 },
    genMissSub(10,6), genAdd(5,5),
  ]},
  brainGames: [
    { id:'bg_make10', name:'Chiến Lược "Làm 10"', icon:'🎯', source:'Singapore Math', desc:'Tách số để tạo 10 — kỹ năng tính nhẩm #1',
      questions:[
        { type:'multipleChoice', question:'8 + 5 = ?\nMẹo: 8 + 2 = 10, còn dư 3 → 10 + 3 = ?', options:['12','13','14'], correct:1, explain:'8+2=10, 5-2=3, 10+3=13' },
        { type:'multipleChoice', question:'9 + 4 = ?\nMẹo: 9 + 1 = 10, còn dư 3 → ?', options:['12','13','14'], correct:1, explain:'9+1=10, 4-1=3, 10+3=13' },
        { type:'multipleChoice', question:'7 + 5 = ?\nMẹo: 7 + 3 = 10, còn dư 2 → ?', options:['11','12','13'], correct:1, explain:'7+3=10, 5-3=2, 10+2=12' },
        { type:'multipleChoice', question:'6 + 7 = ?\nMẹo: 6 + 4 = 10, còn dư 3 → ?', options:['12','13','14'], correct:1, explain:'6+4=10, 7-4=3, 10+3=13' },
        { type:'multipleChoice', question:'8 + 7 = ?\nMẹo: 8 + 2 = 10, còn dư 5 → ?', options:['14','15','16'], correct:1, explain:'8+2=10, 7-2=5, 10+5=15' },
      ]
    },
    { id:'bg_doubles', name:'Doubles & Near Doubles', icon:'👯', source:'Singapore Math', desc:'Số đôi giúp tính nhanh',
      questions:[
        { type:'fillBlank', question:'3 + 3 = ___?', answer:6, explain:'Doubles: 3+3=6' },
        { type:'fillBlank', question:'5 + 5 = ___?', answer:10, explain:'Doubles: 5+5=10' },
        { type:'multipleChoice', question:'3+3=6. Vậy 3+4=?', options:['6','7','8'], correct:1, explain:'Near double: 3+4 = 3+3+1 = 7' },
        { type:'multipleChoice', question:'4+4=8. Vậy 4+5=?', options:['8','9','10'], correct:1, explain:'Near double: 4+5 = 4+4+1 = 9' },
        { type:'multipleChoice', question:'5+5=10. Vậy 5+6=?', options:['10','11','12'], correct:1, explain:'Near double: 5+6 = 5+5+1 = 11' },
      ]
    },
    { id:'bg_bar_model', name:'Bar Model (Mô Hình Thanh)', icon:'📊', source:'Singapore Math', desc:'Giải bài toán bằng hình vẽ thanh',
      questions:[
        { type:'fillBlank', question:'An có 3 kẹo. Bình cho thêm 4 kẹo. An có tất cả ___ kẹo?', answer:7, explain:'3 + 4 = 7 kẹo' },
        { type:'fillBlank', question:'Có 8 con chim. Bay đi 3 con. Còn ___ con?', answer:5, explain:'8 − 3 = 5 con' },
        { type:'fillBlank', question:'Trong rổ có táo và cam, tổng 10 quả. Có 6 táo. Có ___ cam?', answer:4, explain:'10 − 6 = 4 cam' },
        { type:'fillBlank', question:'Mai có 5 bút. Lan có 4 bút. Hai bạn có ___ bút?', answer:9, explain:'5 + 4 = 9 bút' },
        { type:'fillBlank', question:'Có 7 học sinh. 3 bạn nam. Có ___ bạn nữ?', answer:4, explain:'7 − 3 = 4 bạn nữ' },
      ]
    },
  ]
};

// ══════════════════════════════════════════
//  WORLD 4: CÁC SỐ ĐẾN 20
// ══════════════════════════════════════════
const WORLD4 = {
  id: 'world4', name: 'Các Số Đến 20', icon: '🕐', color: '#8b5cf6',
  desc: 'Số 11-20, cộng trừ qua 10, đọc đồng hồ',
  units: [
    {
      id: 'w4u1', name: 'Các Số Đến 20', icon: '2️⃣',
      lesson: { title: 'Số 11-20', steps: [
        { type:'intro', title:'Sau 10 là gì?', text:'11, 12, 13... đến 20! Mỗi số = 10 + mấy.', visual:'10 + 1 = 11, 10 + 5 = 15, 10 + 10 = 20' },
        { type:'concept', title:'Cấu tạo số', text:'11 = 10 + 1 (mười một)\n15 = 10 + 5 (mười lăm)\n20 = 10 + 10 = 2 chục (hai mươi)\n\nSố hàng chục + số hàng đơn vị!' },
        { type:'concept', title:'Đếm 11 đến 20', text:'11, 12, 13, 14, 15, 16, 17, 18, 19, 20\nMười một, mười hai... hai mươi' },
        { type:'summary', title:'Nhớ nhé!', points:['Số 2 chữ số = chục + đơn vị','15 = 1 chục 5 đơn vị','20 = 2 chục 0 đơn vị'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'10 + 3 = ___?', answer:13 },
        { type:'fillBlank', question:'10 + 8 = ___?', answer:18 },
        { type:'fillBlank', question:'15 = 10 + ___?', answer:5 },
      ],
      quiz: [
        { type:'fillBlank', question:'10 + 4 = ___?', answer:14, explain:'10+4=14' },
        { type:'fillBlank', question:'10 + 9 = ___?', answer:19, explain:'10+9=19' },
        { type:'fillBlank', question:'16 = 10 + ___?', answer:6, explain:'16=10+6' },
        { type:'fillBlank', question:'10 + 10 = ___?', answer:20, explain:'10+10=20' },
        { type:'multipleChoice', question:'Số nào đứng sau 17?', options:['16','18','19'], correct:1, explain:'18 sau 17' },
        { type:'multipleChoice', question:'Số nào đứng trước 20?', options:['18','19','21'], correct:1, explain:'19 trước 20' },
        { type:'multipleChoice', question:'14 ○ 17?', options:['=','>','<'], correct:2, explain:'14 < 17' },
        { type:'fillBlank', question:'Đếm ngược: 20, 19, 18, ___?', answer:17, explain:'17 sau 18 khi đếm ngược' },
      ]
    },
    {
      id: 'w4u2', name: 'Cộng Trừ Dạng 10+4, 14−4', icon: '🔟',
      lesson: { title: 'Cộng trừ với 10', steps: [
        { type:'intro', title:'Cộng/trừ với 10', text:'Cộng 10 = thêm 1 chục. Trừ hàng đơn vị = quay về 10!', visual:'10+4=14, 14−4=10' },
        { type:'concept', title:'10 + n = 1n', text:'10 + 1 = 11\n10 + 5 = 15\n10 + 9 = 19\nCộng 10 = ghép "1" trước số!' },
        { type:'concept', title:'1n − n = 10', text:'14 − 4 = 10\n17 − 7 = 10\n19 − 9 = 10\nBỏ đơn vị = còn 10!' },
        { type:'summary', title:'Quy luật', points:['10 + a = 1a (ghép thêm hàng chục)','1a − a = 10 (bỏ đơn vị)','Đây là nền tảng place value!'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'10 + 7 = ___?', answer:17 },
        { type:'fillBlank', question:'16 − 6 = ___?', answer:10 },
        { type:'fillBlank', question:'10 + ___ = 13?', answer:3 },
      ],
      quiz: [
        { type:'fillBlank', question:'10 + 6 = ___?', answer:16, explain:'10+6=16' },
        { type:'fillBlank', question:'18 − 8 = ___?', answer:10, explain:'18−8=10' },
        { type:'fillBlank', question:'10 + ___ = 15?', answer:5, explain:'10+5=15' },
        { type:'fillBlank', question:'___ − 3 = 10?', answer:13, explain:'13−3=10' },
        { type:'fillBlank', question:'10 + 2 = ___?', answer:12, explain:'10+2=12' },
        { type:'fillBlank', question:'20 − 10 = ___?', answer:10, explain:'20−10=10' },
        { type:'fillBlank', question:'11 − 1 = ___?', answer:10, explain:'11−1=10' },
        { type:'fillBlank', question:'10 + ___ = 20?', answer:10, explain:'10+10=20' },
      ]
    },
    {
      id: 'w4u3', name: 'Cộng Trừ Dạng 12+3, 15−3', icon: '📐',
      lesson: { title: 'Cộng trừ không qua 10', steps: [
        { type:'intro', title:'Cộng trừ số nhỏ', text:'12 + 3 = ? Giữ nguyên hàng chục, cộng hàng đơn vị!', visual:'12 + 3 = 15' },
        { type:'concept', title:'Cộng', text:'12 + 3 = 15\n→ 12 = 10 + 2\n→ 2 + 3 = 5\n→ 10 + 5 = 15\nChỉ cộng hàng đơn vị!' },
        { type:'concept', title:'Trừ', text:'15 − 3 = 12\n→ 15 = 10 + 5\n→ 5 − 3 = 2\n→ 10 + 2 = 12\nChỉ trừ hàng đơn vị!' },
        { type:'summary', title:'Mẹo', points:['Giữ nguyên hàng chục (10)','Chỉ cộng/trừ hàng đơn vị','Kết quả = 10 + (đơn vị mới)'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'12 + 3 = ___?', answer:15 },
        { type:'fillBlank', question:'17 − 5 = ___?', answer:12 },
        { type:'fillBlank', question:'14 + 3 = ___?', answer:17 },
      ],
      quiz: [
        { type:'fillBlank', question:'11 + 4 = ___?', answer:15, explain:'1+4=5, 10+5=15' },
        { type:'fillBlank', question:'16 − 3 = ___?', answer:13, explain:'6−3=3, 10+3=13' },
        { type:'fillBlank', question:'13 + 5 = ___?', answer:18, explain:'3+5=8, 10+8=18' },
        { type:'fillBlank', question:'19 − 7 = ___?', answer:12, explain:'9−7=2, 10+2=12' },
        { type:'fillBlank', question:'11 + 8 = ___?', answer:19, explain:'1+8=9, 10+9=19' },
        { type:'fillBlank', question:'18 − 6 = ___?', answer:12, explain:'8−6=2, 10+2=12' },
        { type:'fillBlank', question:'___ + 4 = 17?', answer:13, explain:'13+4=17' },
        { type:'fillBlank', question:'15 − ___ = 11?', answer:4, explain:'15−4=11' },
      ]
    },
    {
      id: 'w4u4', name: 'Đồng Hồ', icon: '🕐',
      lesson: { title: 'Đọc đồng hồ', steps: [
        { type:'intro', title:'Chiếc đồng hồ', text:'Đồng hồ có 2 kim: kim ngắn chỉ GIỜ, kim dài chỉ PHÚT.', visual:'🕐🕑🕒' },
        { type:'concept', title:'Giờ đúng', text:'Kim dài chỉ 12, kim ngắn chỉ số mấy → đó là mấy giờ.\n🕐 = 1 giờ  🕒 = 3 giờ  🕕 = 6 giờ' },
        { type:'concept', title:'Đọc giờ', text:'Kim ngắn chỉ 7, kim dài chỉ 12 → 7 giờ đúng\nKim ngắn chỉ 12, kim dài chỉ 12 → 12 giờ trưa/đêm' },
        { type:'summary', title:'Nhớ nhé!', points:['Kim NGẮN = giờ','Kim DÀI = phút','Kim dài ở 12 = giờ đúng','1 ngày = 24 giờ'] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'🕒 Kim ngắn chỉ 3, kim dài chỉ 12. Mấy giờ?', options:['2 giờ','3 giờ','12 giờ'], correct:1 },
        { type:'multipleChoice', question:'🕗 Mấy giờ?', options:['7 giờ','8 giờ','9 giờ'], correct:1 },
        { type:'multipleChoice', question:'Kim nào chỉ GIỜ?', options:['Kim ngắn','Kim dài'], correct:0 },
      ],
      quiz: [
        { type:'multipleChoice', question:'🕐 Mấy giờ?', options:['1 giờ','2 giờ','12 giờ'], correct:0, explain:'Kim ngắn chỉ 1' },
        { type:'multipleChoice', question:'🕕 Mấy giờ?', options:['5 giờ','6 giờ','7 giờ'], correct:1, explain:'Kim ngắn chỉ 6' },
        { type:'multipleChoice', question:'🕘 Mấy giờ?', options:['8 giờ','9 giờ','10 giờ'], correct:1, explain:'Kim ngắn chỉ 9' },
        { type:'multipleChoice', question:'🕛 Kim ngắn và dài đều chỉ 12. Mấy giờ?', options:['0 giờ','6 giờ','12 giờ'], correct:2, explain:'12 giờ' },
        { type:'multipleChoice', question:'Em ngủ dậy lúc 6 giờ sáng, đến trường lúc 7 giờ. Đi mất mấy giờ?', options:['1 giờ','2 giờ','3 giờ'], correct:0, explain:'7−6=1 giờ' },
        { type:'trueFalse', question:'Kim dài chỉ phút, kim ngắn chỉ giờ?', answer:true, explain:'Đúng!' },
        { type:'multipleChoice', question:'Sau 3 giờ là mấy giờ?', options:['2 giờ','4 giờ','5 giờ'], correct:1, explain:'3+1=4 giờ' },
        { type:'multipleChoice', question:'🕓 Mấy giờ?', options:['3 giờ','4 giờ','5 giờ'], correct:1, explain:'Kim ngắn chỉ 4' },
      ]
    },
  ],
  boss: { name:'Thử Thách Số Đến 20', questions: [
    { type:'fillBlank', question:'10 + 7 = ___?', answer:17 },
    { type:'fillBlank', question:'19 − 9 = ___?', answer:10 },
    { type:'fillBlank', question:'13 + 4 = ___?', answer:17 },
    { type:'fillBlank', question:'18 − 5 = ___?', answer:13 },
    { type:'multipleChoice', question:'🕕 Mấy giờ?', options:['5 giờ','6 giờ','7 giờ'], correct:1 },
    { type:'fillBlank', question:'___ + 6 = 16?', answer:10 },
    { type:'multipleChoice', question:'14 ○ 18?', options:['=','>','<'], correct:2 },
    { type:'fillBlank', question:'20 − 10 = ___?', answer:10 },
    { type:'fillBlank', question:'15 + 4 = ___?', answer:19 },
    { type:'fillBlank', question:'Đếm ngược: 20, 19, ___, 17?', answer:18 },
  ]},
  brainGames: [
    { id:'bg_bridge10', name:'Vượt Qua 10', icon:'🌉', source:'Singapore Math', desc:'Cộng qua 10 bằng cách "làm 10" trước',
      questions:[
        { type:'multipleChoice', question:'8 + 5 = ?\n8 cần thêm 2 để thành 10.\n10 + 3 = ?', options:['12','13','14'], correct:1, explain:'8+2=10, 5−2=3, 10+3=13' },
        { type:'multipleChoice', question:'9 + 6 = ?\n9 cần thêm 1 → 10 + 5 = ?', options:['14','15','16'], correct:1, explain:'9+1=10, 6−1=5, 10+5=15' },
        { type:'multipleChoice', question:'7 + 6 = ?\n7 cần thêm 3 → 10 + 3 = ?', options:['12','13','14'], correct:1, explain:'7+3=10, 6−3=3, 10+3=13' },
        { type:'multipleChoice', question:'8 + 8 = ?\n8+2=10, 8−2=6, 10+6 = ?', options:['14','15','16'], correct:2, explain:'8+2=10, 8−2=6, 10+6=16' },
        { type:'multipleChoice', question:'6 + 8 = ?\n6+4=10, 8−4=4, 10+4 = ?', options:['13','14','15'], correct:1, explain:'6+4=10, 8−4=4, 10+4=14' },
      ]
    },
    { id:'bg_place_value', name:'Hàng Chục & Đơn Vị', icon:'🏗️', source:'US Common Core', desc:'Hiểu cấu tạo số 2 chữ số',
      questions:[
        { type:'fillBlank', question:'15 có ___ hàng chục?', answer:1, explain:'15 = 1 chục 5 đơn vị' },
        { type:'fillBlank', question:'18 có ___ đơn vị?', answer:8, explain:'18 = 1 chục 8 đơn vị' },
        { type:'multipleChoice', question:'Số nào có 1 chục 7 đơn vị?', options:['7','17','71'], correct:1, explain:'1 chục 7 đơn vị = 17' },
        { type:'fillBlank', question:'20 = ___ chục?', answer:2, explain:'20 = 2 chục 0 đơn vị' },
        { type:'multipleChoice', question:'Trong số 14, chữ số 1 đại diện cho gì?', options:['1 đơn vị','1 chục','1 trăm'], correct:1, explain:'Chữ số 1 ở hàng chục = 10' },
      ]
    },
  ]
};

// ══════════════════════════════════════════
//  WORLD 5: CÁC SỐ ĐẾN 100
// ══════════════════════════════════════════
const WORLD5 = {
  id: 'world5', name: 'Các Số Đến 100', icon: '💯', color: '#ef4444',
  desc: 'Số tròn chục, hàng chục-đơn vị, cộng trừ 2 chữ số, đo độ dài',
  units: [
    {
      id: 'w5u1', name: 'Số Tròn Chục & Hàng Chục-Đơn Vị', icon: '🔟',
      lesson: { title: 'Chục và đơn vị', steps: [
        { type:'intro', title:'Số tròn chục', text:'10, 20, 30, 40, 50, 60, 70, 80, 90, 100. Các số chỉ có hàng chục, đơn vị = 0.', visual:'10 20 30 ... 100' },
        { type:'concept', title:'Chục – Đơn vị', text:'35 = 3 chục 5 đơn vị\n72 = 7 chục 2 đơn vị\n40 = 4 chục 0 đơn vị\n\nChữ số bên trái = chục, bên phải = đơn vị.' },
        { type:'concept', title:'Đếm đến 100', text:'Sau 10, 20, 30... mỗi chục thêm 1, 2... 9 đơn vị.\n41, 42, 43, 44, 45, 46, 47, 48, 49, 50...' },
        { type:'summary', title:'Nhớ nhé!', points:['Số 2 chữ số = chục + đơn vị','Số tròn chục: đơn vị = 0','100 = 10 chục'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'47 có mấy hàng chục?', answer:4 },
        { type:'fillBlank', question:'63 có mấy đơn vị?', answer:3 },
        { type:'multipleChoice', question:'Số nào là số tròn chục?', options:['35','40','42'], correct:1 },
      ],
      quiz: [
        { type:'fillBlank', question:'56 = ___ chục ___ đơn vị. Mấy chục?', answer:5, explain:'56 = 5 chục 6 đơn vị' },
        { type:'fillBlank', question:'89 có mấy đơn vị?', answer:9, explain:'89 = 8 chục 9 đơn vị' },
        { type:'multipleChoice', question:'3 chục 2 đơn vị = ?', options:['23','32','302'], correct:1, explain:'3 chục 2 đơn vị = 32' },
        { type:'fillBlank', question:'70 = ___ chục?', answer:7, explain:'70 = 7 chục' },
        { type:'multipleChoice', question:'Số nào lớn nhất?', options:['59','71','68'], correct:1, explain:'71 > 68 > 59' },
        { type:'multipleChoice', question:'Số nào nhỏ nhất?', options:['90','19','45'], correct:1, explain:'19 < 45 < 90' },
        { type:'fillBlank', question:'100 = ___ chục?', answer:10, explain:'100 = 10 chục' },
        { type:'fillBlank', question:'Đếm tiếp: 10, 20, 30, ___?', answer:40, explain:'Đếm theo chục' },
      ]
    },
    {
      id: 'w5u2', name: 'So Sánh Số Đến 100', icon: '⚖️',
      lesson: { title: 'So sánh số lớn', steps: [
        { type:'intro', title:'So sánh', text:'So sánh hàng CHỤC trước. Nếu bằng nhau, so hàng ĐƠN VỊ.', visual:'35 < 53 vì 3 chục < 5 chục' },
        { type:'concept', title:'Bước 1: So hàng chục', text:'45 ○ 62?\n4 chục < 6 chục → 45 < 62\n\nNếu hàng chục khác nhau, số có hàng chục lớn hơn sẽ lớn hơn.' },
        { type:'concept', title:'Bước 2: Hàng chục bằng nhau → so đơn vị', text:'73 ○ 78?\n7 chục = 7 chục → so đơn vị: 3 < 8 → 73 < 78' },
        { type:'summary', title:'Quy tắc', points:['So hàng chục trước','Chục bằng → so đơn vị','Nhiều chục hơn = lớn hơn'] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'34 ○ 67?', options:['=','>','<'], correct:2 },
        { type:'multipleChoice', question:'85 ○ 82?', options:['=','>','<'], correct:1 },
        { type:'multipleChoice', question:'50 ○ 50?', options:['=','>','<'], correct:0 },
      ],
      quiz: [
        { type:'multipleChoice', question:'45 ○ 54?', options:['=','>','<'], correct:2, explain:'4 chục < 5 chục' },
        { type:'multipleChoice', question:'91 ○ 89?', options:['=','>','<'], correct:1, explain:'9 chục > 8 chục' },
        { type:'multipleChoice', question:'76 ○ 76?', options:['=','>','<'], correct:0, explain:'Bằng nhau' },
        { type:'multipleChoice', question:'63 ○ 68?', options:['=','>','<'], correct:2, explain:'Cùng 6 chục, 3 < 8' },
        { type:'multipleChoice', question:'100 ○ 99?', options:['=','>','<'], correct:1, explain:'100 > 99' },
        { type:'multipleChoice', question:'Sắp tăng dần: 75, 28, 50?', options:['28, 50, 75','75, 50, 28','50, 28, 75'], correct:0, explain:'Nhỏ → lớn' },
        { type:'multipleChoice', question:'Số nào gần 50 nhất?', options:['35','48','62'], correct:1, explain:'48 cách 50 chỉ 2' },
        { type:'multipleChoice', question:'Sắp giảm dần: 43, 89, 67?', options:['43, 67, 89','89, 67, 43','67, 89, 43'], correct:1, explain:'Lớn → nhỏ' },
      ]
    },
    {
      id: 'w5u3', name: 'Cộng Trừ Dạng 34+23, 57−23', icon: '🧮',
      lesson: { title: 'Cộng trừ 2 chữ số', steps: [
        { type:'intro', title:'Cộng trừ số lớn', text:'Cộng/trừ từng hàng: chục với chục, đơn vị với đơn vị!', visual:'34 + 23 = 57' },
        { type:'concept', title:'Cộng 2 số', text:'34 + 23 = ?\nChục: 3 + 2 = 5\nĐơn vị: 4 + 3 = 7\n→ 57!' },
        { type:'concept', title:'Trừ 2 số', text:'57 − 23 = ?\nChục: 5 − 2 = 3\nĐơn vị: 7 − 3 = 4\n→ 34!' },
        { type:'summary', title:'Quy tắc', points:['Cộng/trừ hàng chục riêng','Cộng/trừ hàng đơn vị riêng','Ghép lại = kết quả'] }
      ]},
      tryIt: [
        { type:'fillBlank', question:'30 + 20 = ___?', answer:50 },
        { type:'fillBlank', question:'34 + 23 = ___?', answer:57 },
        { type:'fillBlank', question:'57 − 23 = ___?', answer:34 },
      ],
      quiz: [
        { type:'fillBlank', question:'40 + 30 = ___?', answer:70, explain:'4 chục + 3 chục = 7 chục' },
        { type:'fillBlank', question:'25 + 14 = ___?', answer:39, explain:'2+1=3 chục, 5+4=9' },
        { type:'fillBlank', question:'50 − 20 = ___?', answer:30, explain:'5 chục − 2 chục = 3 chục' },
        { type:'fillBlank', question:'68 − 35 = ___?', answer:33, explain:'6−3=3 chục, 8−5=3' },
        { type:'fillBlank', question:'43 + 26 = ___?', answer:69, explain:'4+2=6 chục, 3+6=9' },
        { type:'fillBlank', question:'87 − 54 = ___?', answer:33, explain:'8−5=3 chục, 7−4=3' },
        { type:'fillBlank', question:'___ + 32 = 65?', answer:33, explain:'65−32=33' },
        { type:'fillBlank', question:'78 − ___ = 45?', answer:33, explain:'78−45=33' },
      ]
    },
    {
      id: 'w5u4', name: 'Đo Độ Dài (cm)', icon: '📏',
      lesson: { title: 'Đo độ dài', steps: [
        { type:'intro', title:'Xăng-ti-mét', text:'Chúng ta đo độ dài bằng xăng-ti-mét (viết tắt: cm). 1 cm ≈ độ rộng ngón tay út!', visual:'📏 1cm 2cm 3cm...' },
        { type:'concept', title:'Cách đo', text:'Đặt thước, bắt đầu từ 0. Đầu kia của vật ở số mấy → đó là độ dài.\n\nBút chì dài 15 cm. Cục tẩy dài 3 cm.' },
        { type:'concept', title:'So sánh độ dài', text:'Dài hơn = số cm lớn hơn\nNgắn hơn = số cm nhỏ hơn\n15 cm > 3 cm → bút chì dài hơn tẩy.' },
        { type:'summary', title:'Nhớ nhé!', points:['cm = xăng-ti-mét','Đo từ 0 trên thước','So sánh: nhiều cm hơn = dài hơn'] }
      ]},
      tryIt: [
        { type:'multipleChoice', question:'Bút 15cm và tẩy 3cm. Cái nào dài hơn?', options:['Bút','Tẩy','Bằng nhau'], correct:0 },
        { type:'fillBlank', question:'Bút dài 12cm, tẩy dài 4cm. Bút dài hơn tẩy ___ cm?', answer:8 },
        { type:'multipleChoice', question:'Đo bắt đầu từ số mấy trên thước?', options:['0','1','10'], correct:0 },
      ],
      quiz: [
        { type:'multipleChoice', question:'Sợi dây 20cm và 35cm. Sợi nào dài hơn?', options:['20cm','35cm','Bằng nhau'], correct:1, explain:'35 > 20' },
        { type:'fillBlank', question:'Cây bút 18cm, bút chì 12cm. Chênh ___ cm?', answer:6, explain:'18−12=6cm' },
        { type:'multipleChoice', question:'1cm xấp xỉ bằng gì?', options:['Ngón tay út','Bàn tay','Cánh tay'], correct:0, explain:'1cm ≈ bề rộng ngón tay út' },
        { type:'fillBlank', question:'Que A dài 7cm, que B dài 5cm. Tổng ___ cm?', answer:12, explain:'7+5=12cm' },
        { type:'multipleChoice', question:'Viết tắt của xăng-ti-mét?', options:['m','km','cm'], correct:2, explain:'cm = xăng-ti-mét' },
        { type:'multipleChoice', question:'Đặt thước đo, bắt đầu từ đâu?', options:['Từ 0','Từ 1','Từ 10'], correct:0, explain:'Luôn bắt đầu từ vạch 0' },
        { type:'fillBlank', question:'Dây 30cm cắt bớt 12cm. Còn ___ cm?', answer:18, explain:'30−12=18cm' },
        { type:'multipleChoice', question:'Cái nào thường dài nhất?', options:['Bút chì','Cây thước 30cm','Cục tẩy'], correct:1, explain:'Thước 30cm dài nhất' },
      ]
    },
  ],
  boss: { name:'Thử Thách Cuối Cùng', questions: [
    { type:'fillBlank', question:'56 có mấy chục?', answer:5 },
    { type:'multipleChoice', question:'73 ○ 37?', options:['=','>','<'], correct:1 },
    { type:'fillBlank', question:'45 + 32 = ___?', answer:77 },
    { type:'fillBlank', question:'89 − 56 = ___?', answer:33 },
    { type:'fillBlank', question:'Que 25cm + que 14cm = ___ cm?', answer:39 },
    { type:'multipleChoice', question:'Sắp tăng dần: 82, 28, 55?', options:['28, 55, 82','82, 55, 28'], correct:0 },
    { type:'fillBlank', question:'100 − 40 = ___?', answer:60 },
    { type:'fillBlank', question:'___ + 24 = 57?', answer:33 },
    { type:'multipleChoice', question:'6 chục 8 đơn vị = ?', options:['86','68','608'], correct:1 },
    { type:'fillBlank', question:'Đếm theo chục: 30, 40, 50, ___?', answer:60 },
  ]},
  brainGames: [
    { id:'bg_mental_tens', name:'Tính Nhẩm Với Chục', icon:'🧮', source:'Singapore Math', desc:'Cộng trừ nhanh bằng cách tách chục và đơn vị',
      questions:[
        { type:'fillBlank', question:'36 + 20 = ___? (thêm 2 chục)', answer:56, explain:'3 chục + 2 chục = 5 chục, giữ 6' },
        { type:'fillBlank', question:'74 − 30 = ___? (bớt 3 chục)', answer:44, explain:'7 chục − 3 chục = 4 chục, giữ 4' },
        { type:'fillBlank', question:'45 + 30 = ___?', answer:75, explain:'4+3=7 chục' },
        { type:'fillBlank', question:'82 − 50 = ___?', answer:32, explain:'8−5=3 chục' },
        { type:'fillBlank', question:'29 + 40 = ___?', answer:69, explain:'2+4=6 chục, giữ 9' },
      ]
    },
    { id:'bg_estimation', name:'Ước Lượng', icon:'🎯', source:'US Common Core', desc:'Đoán gần đúng kết quả',
      questions:[
        { type:'multipleChoice', question:'38 + 21 gần nhất số nào?', options:['40','50','60','70'], correct:2, explain:'38≈40, 21≈20, 40+20=60. Thực tế: 59' },
        { type:'multipleChoice', question:'72 − 29 gần nhất số nào?', options:['30','40','50','60'], correct:1, explain:'72≈70, 29≈30, 70−30=40. Thực tế: 43' },
        { type:'multipleChoice', question:'49 + 32 gần nhất số nào?', options:['60','70','80','90'], correct:2, explain:'49≈50, 32≈30, 50+30=80. Thực tế: 81' },
        { type:'multipleChoice', question:'88 − 41 gần nhất số nào?', options:['30','40','50','60'], correct:2, explain:'88≈90, 41≈40, 90−40=50. Thực tế: 47' },
        { type:'multipleChoice', question:'Trong cửa hàng: bút 28đ + vở 31đ. Cần khoảng bao nhiêu?', options:['40đ','50đ','60đ','70đ'], correct:2, explain:'28≈30, 31≈30, 30+30=60' },
      ]
    },
    { id:'bg_word_problems', name:'Bài Toán Có Lời Văn', icon:'📝', source:'Singapore Math Bar Model', desc:'Giải bài toán thực tế bằng mô hình thanh',
      questions:[
        { type:'fillBlank', question:'Lớp có 24 bạn nam và 15 bạn nữ. Tổng ___ bạn?', answer:39, explain:'24 + 15 = 39' },
        { type:'fillBlank', question:'Có 50 kẹo, chia cho bạn 23 kẹo. Còn ___ kẹo?', answer:27, explain:'50 − 23 = 27' },
        { type:'fillBlank', question:'Sáng bán 32 bánh, chiều bán 25 bánh. Tổng ___ bánh?', answer:57, explain:'32 + 25 = 57' },
        { type:'fillBlank', question:'Thùng có 78 quả. Lấy ra 45 quả. Còn ___ quả?', answer:33, explain:'78 − 45 = 33' },
        { type:'fillBlank', question:'An cao 98cm. Bình cao 85cm. An cao hơn Bình ___ cm?', answer:13, explain:'98 − 85 = 13cm' },
      ]
    },
  ]
};

// ══════════════════════════════════════════
//  WORLDS REGISTRY
// ══════════════════════════════════════════
const WORLDS = [WORLD1, WORLD2, WORLD3, WORLD4, WORLD5];

const WORLD_PREVIEWS = [
  { id:'world1', name:'Làm Quen Với Hình', icon:'🔺', color:'#f59e0b' },
  { id:'world2', name:'Các Số Đến 10', icon:'🔢', color:'#3b82f6' },
  { id:'world3', name:'Cộng Trừ Trong 10', icon:'➕', color:'#22c55e' },
  { id:'world4', name:'Các Số Đến 20', icon:'🕐', color:'#8b5cf6' },
  { id:'world5', name:'Các Số Đến 100', icon:'💯', color:'#ef4444' },
];
