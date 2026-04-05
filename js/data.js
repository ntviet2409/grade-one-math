// ══════════════════════════════════════════
//  MATH LEARNING HUB — CONTENT DATA
//  Grade 1, CTST + Singapore Math + US Common Core
//  All UI text in Vietnamese
// ══════════════════════════════════════════

// ── Gamification Config ──
const GAME_CONFIG = {
  xpPerCorrect: 10,
  xpPerTryIt: 5,
  xpPerBoss: 50,
  xpPerBrainGame: 15,
  xpPerLevel: 200,
  star1Pct: 60,
  star2Pct: 80,
  star3Pct: 100,
};

const BADGES = [
  { id: 'shape_master', name: 'Bậc Thầy Hình Học', icon: '🔺', desc: 'Hoàn thành Thế giới 1', world: 'world1' },
  { id: 'number_ninja', name: 'Ninja Số Học', icon: '🔢', desc: 'Hoàn thành Thế giới 2', world: 'world2' },
  { id: 'math_hero', name: 'Siêu Nhân Toán Học', icon: '🦸', desc: 'Hoàn thành Thế giới 3', world: 'world3' },
  { id: 'perfect', name: 'Hoàn Hảo', icon: '💎', desc: 'Đạt 3 sao trong 1 bài kiểm tra', type: 'achievement' },
  { id: 'streak7', name: 'Chăm Chỉ 7 Ngày', icon: '🔥', desc: 'Học 7 ngày liên tiếp', type: 'achievement' },
  { id: 'brain_champ', name: 'Nhà Tư Duy', icon: '🧠', desc: 'Hoàn thành 10 trò chơi tư duy', type: 'achievement' },
  { id: 'speed_demon', name: 'Nhanh Như Chớp', icon: '⚡', desc: 'Hoàn thành quiz dưới 60 giây', type: 'achievement' },
];

// ══════════════════════════════════════════
//  WORLD 1: LÀM QUEN VỚI HÌNH
//  (Getting to know shapes)
// ══════════════════════════════════════════
const WORLD1 = {
  id: 'world1',
  name: 'Làm Quen Với Hình',
  icon: '🔺',
  color: '#f59e0b',
  desc: 'Học về vị trí, hình khối 3D và hình phẳng 2D',

  units: [
    // ────────────────────────────────────
    //  UNIT 1: VỊ TRÍ (Position)
    // ────────────────────────────────────
    {
      id: 'w1u1',
      name: 'Vị Trí',
      icon: '📍',
      lesson: {
        title: 'Vị trí — Trên, dưới, trái, phải',
        steps: [
          {
            type: 'intro',
            title: 'Học về vị trí',
            text: 'Hôm nay chúng ta sẽ học cách nói về vị trí của các vật!',
            visual: '🏠🌳🚗'
          },
          {
            type: 'concept',
            title: 'Trên — Dưới',
            text: 'Máy bay ở TRÊN. Ô tô ở DƯỚI.',
            visual: 'position_above_below',
            items: [
              { emoji: '✈️', label: 'Trên', pos: 'top' },
              { emoji: '🚗', label: 'Dưới', pos: 'bottom' },
            ]
          },
          {
            type: 'concept',
            title: 'Trái — Phải',
            text: 'Con mèo ở bên TRÁI. Con chó ở bên PHẢI.',
            visual: 'position_left_right',
            items: [
              { emoji: '🐱', label: 'Trái', pos: 'left' },
              { emoji: '🐶', label: 'Phải', pos: 'right' },
            ]
          },
          {
            type: 'concept',
            title: 'Trước — Sau',
            text: 'Xe đỏ ở TRƯỚC. Xe xanh ở SAU.',
            visual: 'position_front_back',
            items: [
              { emoji: '🚗', label: 'Trước', pos: 'front' },
              { emoji: '🚙', label: 'Sau', pos: 'back' },
            ]
          },
          {
            type: 'concept',
            title: 'Ở giữa',
            text: 'Con gà ở GIỮA con mèo và con chó.',
            visual: 'position_middle',
            items: [
              { emoji: '🐱', pos: 'left' },
              { emoji: '🐔', label: 'Ở giữa', pos: 'center' },
              { emoji: '🐶', pos: 'right' },
            ]
          },
          {
            type: 'summary',
            title: 'Nhớ nhé!',
            points: ['Trên ↑ — Dưới ↓', 'Trái ← — Phải →', 'Trước — Sau', 'Ở giữa = ở chính giữa hai vật']
          }
        ]
      },
      tryIt: [
        { type: 'multipleChoice', question: '✈️ ở đâu so với 🚗?', visual: 'pos_above_below', options: ['Trên', 'Dưới', 'Trái', 'Phải'], correct: 0 },
        { type: 'multipleChoice', question: 'Con nào ở bên PHẢI?', visual: 'pos_left_right', visualItems: ['🐱', '🐶'], options: ['🐱 Con mèo', '🐶 Con chó'], correct: 1 },
        { type: 'multipleChoice', question: '🐔 ở đâu?  🐱 🐔 🐶', options: ['Bên trái', 'Bên phải', 'Ở giữa', 'Ở trên'], correct: 2 },
      ],
      quiz: [
        { type: 'multipleChoice', question: '🌙 ở đâu so với 🏠?', visual: 'moon_above_house', options: ['Trên', 'Dưới', 'Trái', 'Phải'], correct: 0, explain: '🌙 ở trên 🏠' },
        { type: 'multipleChoice', question: '🐟 ở đâu so với 🚢?', visual: 'fish_below_ship', options: ['Trên', 'Dưới', 'Trái', 'Phải'], correct: 1, explain: '🐟 ở dưới 🚢' },
        { type: 'multipleChoice', question: 'Trong hàng: 🍎 🍌 🍊 — 🍌 ở đâu?', options: ['Bên trái', 'Bên phải', 'Ở giữa'], correct: 2, explain: '🍌 ở giữa 🍎 và 🍊' },
        { type: 'multipleChoice', question: 'Trong hàng: 🚗 🚌 🚕 — 🚗 ở đâu?', options: ['Bên trái', 'Bên phải', 'Ở giữa'], correct: 0, explain: '🚗 ở bên trái' },
        { type: 'multipleChoice', question: 'Con nào ở bên TRÁI? 🐸 🐢', options: ['🐸 Con ếch', '🐢 Con rùa'], correct: 0, explain: '🐸 ở bên trái' },
        { type: 'trueFalse', question: '🌳 ở DƯỚI ☁️ — Đúng hay Sai?', answer: true, explain: '🌳 (cây) ở dưới ☁️ (mây)' },
        { type: 'multipleChoice', question: '☀️ thường ở đâu so với chúng ta?', options: ['Trên', 'Dưới', 'Phía sau'], correct: 0, explain: '☀️ luôn ở trên chúng ta' },
        { type: 'multipleChoice', question: 'Trong hàng: 🐕 🐈 🐇 🐓 — 🐈 ở vị trí nào từ trái sang?', options: ['Thứ 1', 'Thứ 2', 'Thứ 3', 'Thứ 4'], correct: 1, explain: '🐈 ở vị trí thứ 2 từ trái' },
      ]
    },

    // ────────────────────────────────────
    //  UNIT 2: HÌNH KHỐI 3D
    // ────────────────────────────────────
    {
      id: 'w1u2',
      name: 'Khối Hộp & Khối Lập Phương',
      icon: '📦',
      lesson: {
        title: 'Hình khối 3D — Khối hộp và khối lập phương',
        steps: [
          {
            type: 'intro',
            title: 'Hình khối 3D',
            text: 'Hình khối 3D là hình mà con có thể CẦM được, có chiều dài, chiều rộng và chiều cao!',
            visual: '📦🎲'
          },
          {
            type: 'concept',
            title: 'Khối hộp chữ nhật',
            text: 'Khối hộp chữ nhật giống như hộp giày, tủ lạnh, hộp sữa. Có 6 mặt, các mặt là hình chữ nhật.',
            visual: 'shape3d_box',
            examples: ['📦 Hộp giày', '🧱 Viên gạch', '📱 Điện thoại']
          },
          {
            type: 'concept',
            title: 'Khối lập phương',
            text: 'Khối lập phương giống như con xúc xắc. Có 6 mặt BẰNG NHAU, tất cả là hình vuông.',
            visual: 'shape3d_cube',
            examples: ['🎲 Xúc xắc', '🧊 Viên đá', '🎁 Hộp quà vuông']
          },
          {
            type: 'compare',
            title: 'Khác nhau thế nào?',
            text: 'Khối lập phương: tất cả mặt bằng nhau (vuông). Khối hộp chữ nhật: các mặt có thể khác nhau.',
            left: { name: 'Khối lập phương', icon: '🎲', note: '6 mặt vuông bằng nhau' },
            right: { name: 'Khối hộp chữ nhật', icon: '📦', note: '6 mặt, có thể khác kích thước' },
          },
          {
            type: 'summary',
            title: 'Nhớ nhé!',
            points: [
              'Hình 3D = cầm được, có 3 chiều',
              'Khối hộp chữ nhật: 6 mặt hình chữ nhật',
              'Khối lập phương: 6 mặt hình vuông bằng nhau',
              'Khối lập phương là trường hợp đặc biệt của khối hộp'
            ]
          }
        ]
      },
      tryIt: [
        { type: 'multipleChoice', question: '🎲 Xúc xắc là hình gì?', options: ['Khối hộp chữ nhật', 'Khối lập phương', 'Hình tròn'], correct: 1 },
        { type: 'multipleChoice', question: '📦 Hộp giày là hình gì?', options: ['Khối hộp chữ nhật', 'Khối lập phương', 'Hình tam giác'], correct: 0 },
        { type: 'multipleChoice', question: 'Khối lập phương có mấy mặt?', options: ['4 mặt', '5 mặt', '6 mặt', '8 mặt'], correct: 2 },
      ],
      quiz: [
        { type: 'multipleChoice', question: '🧊 Viên đá hình gì?', options: ['Khối hộp chữ nhật', 'Khối lập phương', 'Hình tròn'], correct: 1, explain: 'Viên đá vuông vức — khối lập phương' },
        { type: 'multipleChoice', question: '🧱 Viên gạch là hình gì?', options: ['Khối hộp chữ nhật', 'Khối lập phương'], correct: 0, explain: 'Viên gạch dài hơn — khối hộp chữ nhật' },
        { type: 'trueFalse', question: 'Khối lập phương có tất cả các mặt bằng nhau?', answer: true, explain: '6 mặt đều là hình vuông bằng nhau' },
        { type: 'trueFalse', question: 'Tủ lạnh là khối lập phương?', answer: false, explain: 'Tủ lạnh cao hơn rộng — là khối hộp chữ nhật' },
        { type: 'multipleChoice', question: 'Cả khối hộp chữ nhật và khối lập phương đều có mấy mặt?', options: ['4', '5', '6', '8'], correct: 2, explain: 'Cả hai đều có 6 mặt' },
        { type: 'multipleChoice', question: 'Vật nào KHÔNG phải hình khối 3D?', options: ['🎲 Xúc xắc', '📦 Hộp', '⭕ Vòng tròn trên giấy', '🧊 Đá'], correct: 2, explain: 'Vòng tròn trên giấy là hình 2D — phẳng, không cầm được' },
        { type: 'multipleChoice', question: 'Mặt của khối lập phương là hình gì?', options: ['Hình chữ nhật', 'Hình vuông', 'Hình tam giác', 'Hình tròn'], correct: 1, explain: 'Tất cả 6 mặt đều là hình vuông' },
        { type: 'counting', question: 'Đếm: có bao nhiêu khối lập phương? 🎲🎲📦🎲📦🎲', items: ['🎲','🎲','📦','🎲','📦','🎲'], countTarget: '🎲', answer: 4, explain: 'Có 4 khối lập phương 🎲' },
      ]
    },

    // ────────────────────────────────────
    //  UNIT 3: HÌNH PHẲNG 2D
    // ────────────────────────────────────
    {
      id: 'w1u3',
      name: 'Hình Tròn, Tam Giác, Vuông, Chữ Nhật',
      icon: '🔵',
      lesson: {
        title: 'Hình phẳng 2D',
        steps: [
          {
            type: 'intro',
            title: 'Hình phẳng 2D',
            text: 'Hình 2D là hình phẳng, con vẽ được trên giấy. Không có chiều cao — chỉ có chiều dài và chiều rộng.',
            visual: '⭕🔺🟦'
          },
          {
            type: 'concept',
            title: 'Hình tròn ⭕',
            text: 'Hình tròn KHÔNG có cạnh, KHÔNG có góc. Tròn đều mọi phía. Giống: mặt đồng hồ, bánh xe, đĩa.',
            visual: 'shape_circle',
            props: { sides: 0, corners: 0 }
          },
          {
            type: 'concept',
            title: 'Hình tam giác 🔺',
            text: 'Hình tam giác có 3 cạnh và 3 góc. "Tam" = 3, "giác" = góc.',
            visual: 'shape_triangle',
            props: { sides: 3, corners: 3 }
          },
          {
            type: 'concept',
            title: 'Hình vuông 🟦',
            text: 'Hình vuông có 4 cạnh BẰNG NHAU và 4 góc vuông. Giống: viên gạch men, ô bàn cờ.',
            visual: 'shape_square',
            props: { sides: 4, corners: 4, note: '4 cạnh bằng nhau' }
          },
          {
            type: 'concept',
            title: 'Hình chữ nhật 🟩',
            text: 'Hình chữ nhật có 4 cạnh (2 dài, 2 ngắn) và 4 góc vuông. Giống: cửa sổ, bảng đen, sách.',
            visual: 'shape_rectangle',
            props: { sides: 4, corners: 4, note: '2 cạnh dài, 2 cạnh ngắn' }
          },
          {
            type: 'compare',
            title: 'Vuông vs Chữ nhật',
            text: 'Hình vuông là hình chữ nhật đặc biệt — có 4 cạnh bằng nhau!',
            left: { name: 'Hình vuông', note: '4 cạnh bằng nhau' },
            right: { name: 'Hình chữ nhật', note: '2 dài + 2 ngắn' },
          },
          {
            type: 'summary',
            title: 'Bảng tóm tắt',
            table: [
              ['Hình', 'Cạnh', 'Góc'],
              ['⭕ Tròn', '0', '0'],
              ['🔺 Tam giác', '3', '3'],
              ['🟦 Vuông', '4 (bằng nhau)', '4'],
              ['🟩 Chữ nhật', '4 (2 dài, 2 ngắn)', '4'],
            ]
          }
        ]
      },
      tryIt: [
        { type: 'multipleChoice', question: 'Hình nào có 3 cạnh?', options: ['⭕ Hình tròn', '🔺 Hình tam giác', '🟦 Hình vuông'], correct: 1 },
        { type: 'multipleChoice', question: 'Hình tròn có mấy cạnh?', options: ['0 cạnh', '1 cạnh', '2 cạnh', '4 cạnh'], correct: 0 },
        { type: 'multipleChoice', question: 'Hình vuông khác hình chữ nhật ở điểm nào?', options: ['Có nhiều góc hơn', '4 cạnh bằng nhau', 'Không có góc'], correct: 1 },
        { type: 'multipleChoice', question: 'Mặt đồng hồ tròn là hình gì?', options: ['Hình vuông', 'Hình tròn', 'Hình tam giác'], correct: 1 },
      ],
      quiz: [
        { type: 'multipleChoice', question: 'Hình tam giác có mấy góc?', options: ['2', '3', '4', '5'], correct: 1, explain: 'Tam giác = 3 góc' },
        { type: 'multipleChoice', question: 'Hình nào KHÔNG có góc?', options: ['🔺 Tam giác', '🟦 Vuông', '⭕ Tròn', '🟩 Chữ nhật'], correct: 2, explain: 'Hình tròn không có góc' },
        { type: 'multipleChoice', question: 'Bảng đen hình gì?', options: ['Hình tròn', 'Hình vuông', 'Hình chữ nhật', 'Hình tam giác'], correct: 2, explain: 'Bảng đen hình chữ nhật — 2 cạnh dài, 2 cạnh ngắn' },
        { type: 'multipleChoice', question: 'Hình vuông có mấy cạnh bằng nhau?', options: ['2', '3', '4', '0'], correct: 2, explain: '4 cạnh đều bằng nhau' },
        { type: 'trueFalse', question: 'Hình chữ nhật có 4 góc vuông?', answer: true, explain: 'Đúng — cả vuông và chữ nhật đều có 4 góc vuông' },
        { type: 'counting', question: 'Đếm hình tam giác: 🔺⭕🔺🟦🔺⭕🔺', items: ['🔺','⭕','🔺','🟦','🔺','⭕','🔺'], countTarget: '🔺', answer: 4, explain: 'Có 4 hình tam giác 🔺' },
        { type: 'multipleChoice', question: 'Hình nào có 4 cạnh nhưng 2 cạnh dài hơn 2 cạnh còn lại?', options: ['Hình vuông', 'Hình chữ nhật', 'Hình tròn'], correct: 1, explain: 'Hình chữ nhật: 2 dài + 2 ngắn' },
        { type: 'multipleChoice', question: 'Bánh xe đạp hình gì?', options: ['🔺 Tam giác', '⭕ Tròn', '🟦 Vuông'], correct: 1, explain: 'Bánh xe tròn' },
        { type: 'counting', question: 'Đếm tất cả hình có 4 cạnh: 🔺🟦🟩⭕🟦🔺🟩', items: ['🔺','🟦','🟩','⭕','🟦','🔺','🟩'], countTarget: ['🟦','🟩'], answer: 4, explain: '2 hình vuông + 2 hình chữ nhật = 4 hình có 4 cạnh' },
        { type: 'trueFalse', question: 'Hình vuông cũng là một loại hình chữ nhật?', answer: true, explain: 'Đúng! Hình vuông là hình chữ nhật đặc biệt (4 cạnh bằng nhau)' },
      ]
    },

    // ────────────────────────────────────
    //  UNIT 4: XẾP HÌNH & NHẬN DẠNG
    // ────────────────────────────────────
    {
      id: 'w1u4',
      name: 'Xếp Hình & Quy Luật',
      icon: '🧩',
      lesson: {
        title: 'Xếp hình và tìm quy luật',
        steps: [
          {
            type: 'intro',
            title: 'Xếp hình theo quy luật',
            text: 'Quy luật là điều lặp đi lặp lại theo một trật tự. Con hãy tìm quy luật rồi đoán hình tiếp theo!',
            visual: '🔺⭕🔺⭕🔺❓'
          },
          {
            type: 'concept',
            title: 'Quy luật đơn giản',
            text: '🔴🔵🔴🔵🔴❓ — Hình tiếp theo là gì? 🔵! Vì quy luật là: đỏ-xanh lặp lại.',
            visual: 'pattern_simple'
          },
          {
            type: 'concept',
            title: 'Quy luật 3 hình',
            text: '🔺⭕🟦🔺⭕🟦🔺❓❓ — Tiếp theo: ⭕🟦! Quy luật lặp lại 3 hình.',
            visual: 'pattern_three'
          },
          {
            type: 'concept',
            title: 'Ghép hình',
            text: 'Dùng các hình đơn giản ghép thành hình phức tạp. Ví dụ: 2 hình tam giác ghép thành 1 hình vuông!',
            visual: 'compose_shapes'
          },
          {
            type: 'summary',
            title: 'Nhớ nhé!',
            points: [
              'Quy luật = hình lặp lại theo trật tự',
              'Tìm nhóm lặp lại → đoán tiếp theo',
              'Các hình đơn giản có thể ghép thành hình phức tạp'
            ]
          }
        ]
      },
      tryIt: [
        { type: 'pattern', question: 'Tìm hình tiếp theo: 🔴🔵🔴🔵🔴❓', sequence: ['🔴','🔵','🔴','🔵','🔴'], options: ['🔴', '🔵', '🟢'], correct: 1 },
        { type: 'pattern', question: 'Tìm hình tiếp theo: 🔺🔺⭕🔺🔺⭕🔺🔺❓', sequence: ['🔺','🔺','⭕','🔺','🔺','⭕','🔺','🔺'], options: ['🔺', '⭕', '🟦'], correct: 1 },
        { type: 'multipleChoice', question: '2 hình tam giác 🔺🔻 có thể ghép thành hình gì?', options: ['Hình tròn', 'Hình vuông', 'Hình chữ nhật'], correct: 1 },
      ],
      quiz: [
        { type: 'pattern', question: '🟦⭕🟦⭕🟦❓', sequence: ['🟦','⭕','🟦','⭕','🟦'], options: ['🟦', '⭕', '🔺'], correct: 1, explain: 'Quy luật: vuông-tròn lặp lại → tiếp theo là ⭕' },
        { type: 'pattern', question: '🔺🔺🟦🔺🔺🟦🔺🔺❓', sequence: ['🔺','🔺','🟦','🔺','🔺','🟦','🔺','🔺'], options: ['🔺', '🟦', '⭕'], correct: 1, explain: 'Quy luật: 🔺🔺🟦 lặp lại' },
        { type: 'pattern', question: '🔴🔵🟢🔴🔵🟢🔴❓❓', sequence: ['🔴','🔵','🟢','🔴','🔵','🟢','🔴'], options: ['🔵🟢', '🔴🔵', '🟢🔴'], correct: 0, explain: 'Quy luật 3 màu: đỏ-xanh-lục → tiếp theo 🔵🟢' },
        { type: 'multipleChoice', question: 'Hình nào KHÔNG thuộc quy luật: ⭕🔺⭕🔺⭕🟦', options: ['⭕', '🔺', '🟦'], correct: 2, explain: '🟦 không thuộc quy luật ⭕🔺 lặp lại' },
        { type: 'pattern', question: '🟩🟩🔺🟩🟩🔺🟩🟩❓', sequence: ['🟩','🟩','🔺','🟩','🟩','🔺','🟩','🟩'], options: ['🟩', '🔺', '⭕'], correct: 1, explain: 'Quy luật: 🟩🟩🔺 lặp lại' },
        { type: 'multipleChoice', question: 'Nếu gấp 1 hình chữ nhật làm đôi, con được gì?', options: ['2 hình tam giác', '2 hình vuông', '2 hình chữ nhật nhỏ hơn'], correct: 2, explain: 'Gấp đôi chữ nhật → 2 chữ nhật nhỏ' },
        { type: 'counting', question: 'Trong dãy 🔺⭕🔺🟦⭕🔺⭕🔺 có mấy hình tròn?', items: ['🔺','⭕','🔺','🟦','⭕','🔺','⭕','🔺'], countTarget: '⭕', answer: 3, explain: 'Có 3 hình tròn ⭕' },
        { type: 'multipleChoice', question: 'Quy luật nào đúng?', options: ['🔴🔵🔴🔴🔵', '🔴🔵🔴🔵🔴', '🔴🔴🔵🔴🔵'], correct: 1, explain: '🔴🔵 lặp lại đều đặn' },
      ]
    },
  ],

  // ── BOSS CHALLENGE ──
  boss: {
    name: 'Thử Thách Cuối — Thế Giới Hình Học',
    questions: [
      { type: 'multipleChoice', question: 'Hộp sữa hình gì?', options: ['Khối hộp chữ nhật', 'Khối lập phương', 'Hình tròn'], correct: 0 },
      { type: 'multipleChoice', question: 'Hình nào có 3 cạnh?', options: ['⭕', '🔺', '🟦', '🟩'], correct: 1 },
      { type: 'multipleChoice', question: '🌙 ở đâu so với 🏔️?', options: ['Dưới', 'Trên', 'Trái'], correct: 1 },
      { type: 'pattern', question: '⭕🔺🟦⭕🔺🟦⭕❓❓', sequence: ['⭕','🔺','🟦','⭕','🔺','🟦','⭕'], options: ['🔺🟦', '⭕🔺', '🟦⭕'], correct: 0 },
      { type: 'trueFalse', question: 'Khối lập phương có 6 mặt hình vuông bằng nhau?', answer: true },
      { type: 'counting', question: 'Đếm hình 4 cạnh: 🔺🟦⭕🟩🔺🟦🟩⭕🟦', items: ['🔺','🟦','⭕','🟩','🔺','🟦','🟩','⭕','🟦'], countTarget: ['🟦','🟩'], answer: 5 },
      { type: 'multipleChoice', question: 'Trong hàng 🐱🐶🐔🐸 — 🐔 ở vị trí thứ mấy từ trái?', options: ['1', '2', '3', '4'], correct: 2 },
      { type: 'multipleChoice', question: 'Hình tròn khác hình vuông ở điểm nào?', options: ['Hình tròn không có cạnh', 'Hình tròn có 4 cạnh', 'Hình tròn có 3 góc'], correct: 0 },
      { type: 'multipleChoice', question: 'Quả bóng đá hình gì?', options: ['Hình vuông', 'Hình tròn', 'Hình tam giác'], correct: 1 },
      { type: 'pattern', question: '🟢🟡🟢🟡🟢🟡❓', sequence: ['🟢','🟡','🟢','🟡','🟢','🟡'], options: ['🟡', '🟢', '🔴'], correct: 1 },
    ]
  },

  // ── BRAIN GAMES (Singapore Math + Logic) ──
  brainGames: [
    {
      id: 'bg_shape_count',
      name: 'Đếm Hình Ẩn',
      icon: '🔍',
      source: 'Singapore Math',
      desc: 'Đếm tất cả hình tam giác hoặc hình vuông trong một hình phức tạp',
      questions: [
        { type: 'multipleChoice', question: 'Một hình vuông lớn được chia thành 4 ô bằng nhau. Có tổng cộng bao nhiêu hình vuông? (gồm cả ô nhỏ và ô lớn)', options: ['4', '5', '6'], correct: 1, explain: '4 ô nhỏ + 1 ô lớn = 5 hình vuông!' },
        { type: 'multipleChoice', question: 'Một hình tam giác lớn có 1 đường kẻ chia đôi. Có bao nhiêu hình tam giác tất cả?', options: ['2', '3', '4'], correct: 1, explain: '2 tam giác nhỏ + 1 tam giác lớn = 3!' },
        { type: 'multipleChoice', question: 'Một hình chữ nhật chia thành 2 ô. Có bao nhiêu hình chữ nhật?', options: ['2', '3', '4'], correct: 1, explain: '2 ô nhỏ + 1 hình lớn = 3 hình chữ nhật' },
      ]
    },
    {
      id: 'bg_odd_one_out',
      name: 'Tìm Kẻ Khác Biệt',
      icon: '👀',
      source: 'Logic Enrichment',
      desc: 'Tìm hình không giống các hình còn lại',
      questions: [
        { type: 'multipleChoice', question: 'Hình nào khác biệt? 🔺🔺🔺⭕🔺', options: ['🔺 (hình đầu)', '⭕ (hình thứ 4)', '🔺 (hình cuối)'], correct: 1, explain: '⭕ là hình tròn, còn lại đều là tam giác' },
        { type: 'multipleChoice', question: 'Vật nào KHÔNG phải hình tròn? ⚽🏀🎲🏐', options: ['⚽', '🏀', '🎲', '🏐'], correct: 2, explain: '🎲 là khối lập phương (vuông), không tròn' },
        { type: 'multipleChoice', question: 'Nhóm nào cùng loại? A: 🔺🔺🔺  B: 🔺⭕🟦  C: ⭕⭕⭕', options: ['Nhóm B', 'Nhóm A và C', 'Cả 3 nhóm'], correct: 1, explain: 'Nhóm A (toàn tam giác) và nhóm C (toàn tròn) — mỗi nhóm chứa 1 loại hình' },
      ]
    },
    {
      id: 'bg_spatial',
      name: 'Tư Duy Không Gian',
      icon: '🧩',
      source: 'Singapore Math',
      desc: 'Xoay, lật, ghép hình trong đầu',
      questions: [
        { type: 'multipleChoice', question: 'Nếu xoay hình 🔺 ngược lại, nó thành hình gì?', options: ['🔻 (tam giác ngược)', '⭕ (tròn)', '🟦 (vuông)'], correct: 0, explain: 'Tam giác xoay ngược vẫn là tam giác, chỉ đổi hướng' },
        { type: 'multipleChoice', question: 'Ghép 2 hình vuông cạnh nhau thành hình gì?', options: ['Hình vuông lớn hơn', 'Hình chữ nhật', 'Hình tam giác'], correct: 1, explain: '2 vuông cạnh nhau = 1 chữ nhật dài' },
        { type: 'multipleChoice', question: 'Gấp tờ giấy hình vuông theo đường chéo, được hình gì?', options: ['Hình vuông nhỏ', 'Hình tam giác', 'Hình tròn'], correct: 1, explain: 'Gấp chéo hình vuông → hình tam giác' },
        { type: 'multipleChoice', question: 'Cắt hình tròn làm đôi, mỗi nửa gọi là gì?', options: ['Hình tam giác', 'Nửa hình tròn (bán nguyệt)', 'Hình vuông'], correct: 1, explain: 'Nửa hình tròn = hình bán nguyệt' },
      ]
    },
    {
      id: 'bg_pattern_adv',
      name: 'Quy Luật Nâng Cao',
      icon: '🧠',
      source: 'US Common Core',
      desc: 'Tìm quy luật khó hơn với kích thước và hướng',
      questions: [
        { type: 'pattern', question: 'Tìm quy luật: 🔴🔴🔵🔴🔴🔵🔴🔴❓', sequence: ['🔴','🔴','🔵','🔴','🔴','🔵','🔴','🔴'], options: ['🔴', '🔵', '🟢'], correct: 1, explain: 'Quy luật: 2 đỏ + 1 xanh, lặp lại' },
        { type: 'pattern', question: '🔺🔺⭕⭕🔺🔺⭕⭕🔺🔺❓❓', sequence: ['🔺','🔺','⭕','⭕','🔺','🔺','⭕','⭕','🔺','🔺'], options: ['⭕⭕', '🔺🔺', '⭕🔺'], correct: 0, explain: 'Quy luật: 2 tam giác + 2 tròn' },
        { type: 'multipleChoice', question: 'Quy luật: 1, 2, 1, 2, 1, 2, ❓ — số tiếp theo?', options: ['1', '2', '3'], correct: 0, explain: 'Quy luật: 1-2 lặp lại → tiếp theo là 1' },
        { type: 'multipleChoice', question: 'Quy luật kích thước: nhỏ, lớn, nhỏ, lớn, nhỏ, ❓', options: ['Nhỏ', 'Lớn', 'Vừa'], correct: 1, explain: 'Nhỏ-lớn lặp lại → tiếp theo là lớn' },
      ]
    },
    {
      id: 'bg_comparison_logic',
      name: 'Suy Luận So Sánh',
      icon: '⚖️',
      source: 'Logic Enrichment',
      desc: 'Suy luận từ thông tin cho trước',
      questions: [
        { type: 'multipleChoice', question: 'Hình vuông có 4 cạnh. Hình tam giác có 3 cạnh. Hình nào có NHIỀU cạnh hơn?', options: ['Hình vuông', 'Hình tam giác', 'Bằng nhau'], correct: 0, explain: '4 > 3, nên hình vuông nhiều cạnh hơn' },
        { type: 'multipleChoice', question: 'Hộp A to hơn hộp B. Hộp B to hơn hộp C. Hộp nào to nhất?', options: ['Hộp A', 'Hộp B', 'Hộp C'], correct: 0, explain: 'A > B > C → Hộp A to nhất' },
        { type: 'multipleChoice', question: 'Cây A cao hơn cây B. Cây C thấp hơn cây B. Cây nào thấp nhất?', options: ['Cây A', 'Cây B', 'Cây C'], correct: 2, explain: 'A > B > C → Cây C thấp nhất' },
        { type: 'multipleChoice', question: 'Bạn An đứng trước bạn Bình. Bạn Bình đứng trước bạn Chi. Ai đứng cuối cùng?', options: ['An', 'Bình', 'Chi'], correct: 2, explain: 'An — Bình — Chi → Chi đứng cuối' },
      ]
    },
  ]
};

// ══════════════════════════════════════════
//  WORLDS REGISTRY
// ══════════════════════════════════════════
const WORLDS = [
  WORLD1,
  // WORLD2, WORLD3, WORLD4, WORLD5 — will be added later
];

// Placeholder worlds for the map (locked)
const WORLD_PREVIEWS = [
  { id: 'world1', name: 'Làm Quen Với Hình', icon: '🔺', color: '#f59e0b', unlocked: true },
  { id: 'world2', name: 'Các Số Đến 10', icon: '🔢', color: '#3b82f6', unlocked: false },
  { id: 'world3', name: 'Cộng Trừ Trong 10', icon: '➕', color: '#22c55e', unlocked: false },
  { id: 'world4', name: 'Các Số Đến 20', icon: '🕐', color: '#8b5cf6', unlocked: false },
  { id: 'world5', name: 'Các Số Đến 100', icon: '💯', color: '#ef4444', unlocked: false },
];
