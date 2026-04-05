// ══════════════════════════════════════════
//  SUPPLEMENTARY CONTENT — Closing all gaps
//  Singapore Math + US Common Core additions
//  Loaded AFTER data.js, patches existing worlds
// ══════════════════════════════════════════

// ── WORLD 1 ADDITIONS ──

// New unit: Cylinder, Sphere, Cone (Singapore Math gap)
WORLD1.units.splice(2, 0, {
  id: 'w1u2b', name: 'Hình Trụ, Hình Cầu, Hình Nón', icon: '🏀',
  lesson: { title: 'Thêm hình khối 3D', steps: [
    { type:'intro', title:'3 hình khối mới!', text:'Ngoài khối hộp và lập phương, còn có hình trụ, hình cầu và hình nón!', visual:'🥫🏀🎄' },
    { type:'concept', title:'Hình trụ 🥫', text:'Hình trụ giống lon nước, cây nến. Có 2 mặt tròn (trên + dưới) và 1 mặt cong bao quanh.', shape:'cylinder', examples:['🥫 Lon nước','🕯️ Cây nến','🪵 Khúc gỗ'] },
    { type:'concept', title:'Hình cầu 🏀', text:'Hình cầu giống quả bóng. Tròn đều mọi phía. KHÔNG có mặt phẳng, chỉ có 1 mặt cong.', examples:['🏀 Quả bóng','🌍 Trái đất','🍊 Quả cam'] },
    { type:'concept', title:'Hình nón 🎄', text:'Hình nón giống nón lá, cây thông Noel. Có 1 mặt tròn (đáy) và 1 đỉnh nhọn.', examples:['🎄 Cây thông','📐 Nón lá','🍦 Ốc quế'] },
    { type:'summary', title:'Tóm tắt 5 hình khối 3D', table:[['Hình khối','Mặt phẳng','Đặc điểm'],['📦 Khối hộp','6 chữ nhật','Dạng hộp'],['🎲 Khối lập phương','6 vuông','Mặt bằng nhau'],['🥫 Hình trụ','2 tròn + 1 cong','Lăn được'],['🏀 Hình cầu','0 (1 mặt cong)','Tròn đều'],['🎄 Hình nón','1 tròn + 1 cong','Có đỉnh nhọn']] }
  ]},
  tryIt: [
    { type:'multipleChoice', question:'🏀 Quả bóng là hình gì?', options:['Hình trụ','Hình cầu','Hình nón'], correct:1 },
    { type:'multipleChoice', question:'🥫 Lon nước là hình gì?', options:['Hình trụ','Hình cầu','Khối hộp'], correct:0 },
    { type:'multipleChoice', question:'🍦 Ốc quế kem hình gì?', options:['Hình trụ','Hình cầu','Hình nón'], correct:2 },
  ],
  quiz: [
    { type:'multipleChoice', question:'Hình nào lăn được mọi hướng?', options:['🎲 Lập phương','🏀 Cầu','📦 Hộp'], correct:1, explain:'Hình cầu tròn đều, lăn mọi hướng' },
    { type:'multipleChoice', question:'🍊 Quả cam hình gì?', options:['Trụ','Cầu','Nón'], correct:1, explain:'Cam tròn đều = hình cầu' },
    { type:'multipleChoice', question:'Hình trụ có mấy mặt tròn?', options:['1','2','3'], correct:1, explain:'2 mặt tròn: trên và dưới' },
    { type:'multipleChoice', question:'Hình nón có đỉnh nhọn không?', options:['Có','Không'], correct:0, explain:'Nón có 1 đỉnh nhọn' },
    { type:'multipleChoice', question:'🕯️ Cây nến hình gì?', options:['Hình trụ','Hình cầu','Hình nón'], correct:0, explain:'Cây nến = hình trụ' },
    { type:'trueFalse', question:'Hình cầu có mặt phẳng?', answer:false, explain:'Cầu chỉ có mặt cong, không có mặt phẳng' },
    { type:'multipleChoice', question:'Vật nào hình nón?', options:['🥫 Lon','🎄 Cây thông','🏀 Bóng'], correct:1, explain:'Cây thông hình nón' },
    { type:'multipleChoice', question:'Hình nào có thể lăn VÀ đứng yên?', options:['Hình cầu','Hình trụ','Khối lập phương'], correct:1, explain:'Trụ lăn ngang nhưng đứng được trên mặt tròn' },
  ]
});

// New unit: Halves & Quarters (US CC 1.G.3)
WORLD1.units.push({
  id: 'w1u5', name: 'Nửa & Một Phần Tư', icon: '🥧',
  lesson: { title: 'Chia hình thành phần bằng nhau', steps: [
    { type:'intro', title:'Chia đều!', text:'Chúng ta có thể chia hình tròn và hình chữ nhật thành 2 hoặc 4 phần BẰNG NHAU!', visual:'🍕 → 🍕🍕' },
    { type:'concept', title:'Một nửa (1/2)', text:'Chia thành 2 phần BẰNG NHAU → mỗi phần là MỘT NỬA.\n\n🍕 chia 2 → mỗi miếng = 1/2 cái bánh.\nHình tròn cắt giữa → 2 nửa hình tròn.' },
    { type:'concept', title:'Một phần tư (1/4)', text:'Chia thành 4 phần BẰNG NHAU → mỗi phần là MỘT PHẦN TƯ.\n\n🍕 chia 4 → mỗi miếng = 1/4 cái bánh.\nHình vuông cắt chéo 2 lần → 4 tam giác bằng nhau.' },
    { type:'concept', title:'Phải BẰNG NHAU!', text:'⚠️ Quan trọng: các phần phải BẰNG NHAU!\n\nNếu chia không đều → KHÔNG phải nửa hay phần tư.\nBánh cắt lệch → 1 miếng to, 1 miếng nhỏ → KHÔNG phải 2 nửa.' },
    { type:'summary', title:'Nhớ nhé!', points:['1/2 = chia 2 phần bằng nhau','1/4 = chia 4 phần bằng nhau','Phải BẰNG NHAU mới đúng','2 nửa = 1 cái nguyên, 4 phần tư = 1 cái nguyên'] }
  ]},
  tryIt: [
    { type:'multipleChoice', question:'Bánh pizza chia 2 phần bằng nhau. Mỗi phần là gì?', options:['Một phần tư','Một nửa','Một phần ba'], correct:1 },
    { type:'multipleChoice', question:'Bánh chia 4 phần bằng nhau. Mỗi phần là gì?', options:['Một nửa','Một phần tư','Một phần ba'], correct:1 },
    { type:'trueFalse', question:'Chia hình tròn thành 2 phần KHÔNG bằng nhau. Đó có phải 2 nửa không?', answer:false },
  ],
  quiz: [
    { type:'multipleChoice', question:'1/2 nghĩa là gì?', options:['Chia 2 phần bằng nhau','Chia 3 phần','Chia 4 phần'], correct:0, explain:'1/2 = một nửa = 2 phần bằng nhau' },
    { type:'multipleChoice', question:'1/4 nghĩa là gì?', options:['Chia 2 phần','Chia 3 phần','Chia 4 phần bằng nhau'], correct:2, explain:'1/4 = một phần tư = 4 phần bằng nhau' },
    { type:'multipleChoice', question:'Chia vuông thành 2 nửa. Mỗi nửa là hình gì?', options:['Tam giác','Chữ nhật','Tròn'], correct:1, explain:'Cắt đôi vuông → 2 chữ nhật' },
    { type:'fillBlank', question:'Mấy phần tư ghép lại = 1 cái nguyên?', answer:4, explain:'4 phần tư = 1 nguyên' },
    { type:'fillBlank', question:'Mấy nửa ghép lại = 1 cái nguyên?', answer:2, explain:'2 nửa = 1 nguyên' },
    { type:'trueFalse', question:'Chia tròn thành 4 phần bằng nhau = 4 phần tư?', answer:true, explain:'Đúng! 4 phần bằng nhau = 4 phần tư' },
    { type:'multipleChoice', question:'Cái nào KHÔNG phải chia thành 2 nửa?', options:['Chia đều giữa','Chia lệch sang 1 bên','Cắt đôi bằng nhau'], correct:1, explain:'Chia lệch → không bằng nhau → không phải nửa' },
    { type:'multipleChoice', question:'Chia hình tròn thành 4 phần bằng nhau. Lấy 1 phần ra. Còn lại mấy phần?', options:['2 phần','3 phần','4 phần'], correct:1, explain:'4 − 1 = 3 phần còn lại' },
  ]
});

// Update World 1 boss with new 3D shapes and halves
WORLD1.boss.questions.push(
  { type:'multipleChoice', question:'🏀 hình gì?', options:['Trụ','Cầu','Nón'], correct:1 },
  { type:'multipleChoice', question:'Chia tròn thành 2 phần bằng nhau. Mỗi phần gọi là?', options:['1/4','1/2','1/3'], correct:1 },
  { type:'multipleChoice', question:'🥫 Lon nước hình gì?', options:['Trụ','Cầu','Lập phương'], correct:0 }
);

// Add brain game for halves/quarters
WORLD1.brainGames.push({
  id:'bg_fractions_intro', name:'Chia Đều — Nửa & Phần Tư', icon:'🥧', source:'US Common Core 1.G.3', desc:'Chia hình thành phần bằng nhau',
  questions:[
    { type:'fillBlank', question:'1 cái bánh chia 4 phần bằng nhau. Ăn 1 phần. Còn ___ phần?', answer:3, explain:'4−1=3 phần' },
    { type:'multipleChoice', question:'2 bạn chia đều 1 cái bánh. Mỗi bạn được bao nhiêu?', options:['1/2 cái bánh','1/4 cái bánh','1 cái bánh'], correct:0, explain:'Chia 2 = mỗi bạn 1/2' },
    { type:'multipleChoice', question:'4 bạn chia đều 1 cái bánh. Mỗi bạn được?', options:['1/2','1/4','1/3'], correct:1, explain:'Chia 4 = mỗi bạn 1/4' },
    { type:'trueFalse', question:'Nửa cái bánh LỚN HƠN một phần tư cái bánh?', answer:true, explain:'1/2 > 1/4 vì chia ít phần hơn → mỗi phần to hơn' },
    { type:'fillBlank', question:'Có 2 nửa và 2 phần tư. Tổng cộng bao nhiêu phần tư? (gợi ý: 1 nửa = 2 phần tư)', answer:6, explain:'2 nửa = 4 phần tư. 4 + 2 = 6 phần tư' },
  ]
});

// ── WORLD 2 ADDITIONS ──

// New unit: Ordinal Numbers & Skip Counting
WORLD2.units.push({
  id: 'w2u5', name: 'Số Thứ Tự & Đếm Cách', icon: '🏅',
  lesson: { title: 'Số thứ tự và đếm cách', steps: [
    { type:'intro', title:'Số thứ tự', text:'Thứ nhất, thứ hai, thứ ba... Số thứ tự cho biết VỊ TRÍ trong hàng!', visual:'🥇🥈🥉' },
    { type:'concept', title:'Thứ 1 đến thứ 10', text:'Thứ nhất (1st), thứ hai (2nd), thứ ba (3rd), thứ tư (4th), thứ năm (5th)...\n\n🐶🐱🐔🐸🐰 ← 🐔 đứng thứ 3 từ trái.' },
    { type:'concept', title:'Đếm cách 2', text:'Bỏ qua 1 số, đếm số tiếp: 2, 4, 6, 8, 10\nHoặc: 1, 3, 5, 7, 9\n\nĐếm cách 2 giúp đếm NHANH hơn!' },
    { type:'concept', title:'Đếm cách 5 và cách 10', text:'Cách 5: 5, 10, 15, 20, 25, 30...\nCách 10: 10, 20, 30, 40, 50...\n\nĐếm ngón tay theo nhóm 5 hoặc 10!' },
    { type:'summary', title:'Nhớ nhé!', points:['Số thứ tự: vị trí (thứ nhất, thứ hai...)','Đếm cách 2: 2,4,6,8,10','Đếm cách 5: 5,10,15,20,25','Đếm cách 10: 10,20,30...'] }
  ]},
  tryIt: [
    { type:'multipleChoice', question:'🐶🐱🐔🐸🐰 — 🐔 đứng thứ mấy?', options:['Thứ 2','Thứ 3','Thứ 4'], correct:1 },
    { type:'fillBlank', question:'Đếm cách 2: 2, 4, 6, ___?', answer:8 },
    { type:'fillBlank', question:'Đếm cách 5: 5, 10, 15, ___?', answer:20 },
  ],
  quiz: [
    { type:'multipleChoice', question:'🍎🍌🍊🍇🍓 — 🍊 thứ mấy từ trái?', options:['Thứ 2','Thứ 3','Thứ 4'], correct:1, explain:'Táo(1), chuối(2), cam(3)' },
    { type:'multipleChoice', question:'🚗🚌🚕🏎️ — Xe nào thứ tư?', options:['🚗','🚕','🏎️'], correct:2, explain:'🏎️ ở vị trí thứ 4' },
    { type:'fillBlank', question:'Đếm cách 2: 2, 4, 6, 8, ___?', answer:10, explain:'Cách 2: 8+2=10' },
    { type:'fillBlank', question:'Đếm cách 5: 5, 10, 15, 20, ___?', answer:25, explain:'Cách 5: 20+5=25' },
    { type:'fillBlank', question:'Đếm cách 10: 10, 20, 30, ___?', answer:40, explain:'Cách 10: 30+10=40' },
    { type:'fillBlank', question:'Đếm cách 2: 1, 3, 5, 7, ___?', answer:9, explain:'Số lẻ cách 2' },
    { type:'multipleChoice', question:'Bạn nào về NHẤT trong cuộc chạy?', options:['Bạn về thứ 1','Bạn về thứ 2','Bạn về cuối'], correct:0, explain:'Nhất = thứ 1' },
    { type:'fillBlank', question:'Đếm cách 5: 10, 15, 20, 25, ___?', answer:30, explain:'25+5=30' },
  ]
});

// Add more number bond questions to existing quiz
WORLD2.units[2].quiz.push(
  { type:'fillBlank', question:'4 = 1 + ___?', answer:3, explain:'4 = 1+3' },
  { type:'fillBlank', question:'10 = 2 + ___?', answer:8, explain:'10 = 2+8' },
  { type:'fillBlank', question:'9 = ___ + 6?', answer:3, explain:'9 = 3+6' },
  { type:'fillBlank', question:'7 = 5 + ___?', answer:2, explain:'7 = 5+2' },
  { type:'fillBlank', question:'10 = ___ + 1?', answer:9, explain:'10 = 9+1' },
  { type:'fillBlank', question:'8 = 4 + ___?', answer:4, explain:'8 = 4+4' },
  { type:'fillBlank', question:'6 = ___ + 3?', answer:3, explain:'6 = 3+3' },
  { type:'fillBlank', question:'10 = 4 + ___?', answer:6, explain:'10 = 4+6' }
);

// Update World 2 boss
WORLD2.boss.questions.push(
  { type:'fillBlank', question:'Đếm cách 2: 4, 6, 8, ___?', answer:10 },
  { type:'multipleChoice', question:'🐸🐱🐶🐔 — 🐶 thứ mấy?', options:['Thứ 2','Thứ 3','Thứ 4'], correct:1 }
);

// ── WORLD 3 ADDITIONS ──

// New unit: Three Addends (US CC 1.OA.2) + Make-10 in main lesson
WORLD3.units.splice(2, 0, {
  id: 'w3u2b', name: 'Chiến Lược "Làm 10" & Ba Số', icon: '🎯',
  lesson: { title: 'Chiến lược Làm 10 & Cộng 3 số', steps: [
    { type:'intro', title:'Chiến lược "Làm 10"', text:'Khi cộng 2 số vượt quá 10, hãy TÁN số để tạo ra 10 trước!\nĐây là kỹ năng #1 của Singapore Math!', visual:'8+5 → 8+2+3 → 10+3 = 13' },
    { type:'concept', title:'Cách làm', text:'8 + 5 = ?\nBước 1: 8 cần thêm MẤY để thành 10? → Cần 2\nBước 2: Tách 5 = 2 + 3\nBước 3: 8 + 2 = 10, rồi 10 + 3 = 13!\n\n→ 8 + 5 = 13' },
    { type:'concept', title:'Thêm ví dụ', text:'9 + 4 = ?\n9 cần 1 → tách 4 = 1 + 3\n9 + 1 = 10, 10 + 3 = 13\n\n7 + 6 = ?\n7 cần 3 → tách 6 = 3 + 3\n7 + 3 = 10, 10 + 3 = 13' },
    { type:'concept', title:'Cộng 3 số', text:'2 + 3 + 4 = ?\nCách 1: (2+3) + 4 = 5 + 4 = 9\nCách 2: 2 + (3+4) = 2 + 7 = 9\n\nMẹo: Tìm cặp "làm 10" trước!\n1 + 9 + 3 = (1+9) + 3 = 10 + 3 = 13' },
    { type:'summary', title:'Nhớ nhé!', points:['Bước 1: Tìm số cần thêm để thành 10','Bước 2: Tách số kia','Bước 3: Cộng 10 + phần dư','Cộng 3 số: nhóm cặp "làm 10" trước'] }
  ]},
  tryIt: [
    { type:'multipleChoice', question:'8 + 5 = ? (Làm 10: 8+2=10, 10+3=?)', options:['12','13','14'], correct:1 },
    { type:'multipleChoice', question:'9 + 6 = ? (9+1=10, 10+5=?)', options:['14','15','16'], correct:1 },
    { type:'fillBlank', question:'2 + 3 + 5 = ___?', answer:10, explain:'(2+3)+5 = 5+5 = 10' },
  ],
  quiz: [
    { type:'multipleChoice', question:'8 + 7 = ?', options:['14','15','16'], correct:1, explain:'8+2=10, 7−2=5, 10+5=15' },
    { type:'multipleChoice', question:'9 + 4 = ?', options:['12','13','14'], correct:1, explain:'9+1=10, 4−1=3, 10+3=13' },
    { type:'multipleChoice', question:'7 + 5 = ?', options:['11','12','13'], correct:1, explain:'7+3=10, 5−3=2, 10+2=12' },
    { type:'multipleChoice', question:'6 + 7 = ?', options:['12','13','14'], correct:1, explain:'6+4=10, 7−4=3, 10+3=13' },
    { type:'fillBlank', question:'3 + 4 + 2 = ___?', answer:9, explain:'3+4=7, 7+2=9' },
    { type:'fillBlank', question:'1 + 9 + 5 = ___?', answer:15, explain:'(1+9)+5 = 10+5 = 15' },
    { type:'fillBlank', question:'2 + 5 + 5 = ___?', answer:12, explain:'2+(5+5) = 2+10 = 12' },
    { type:'fillBlank', question:'4 + 3 + 6 = ___?', answer:13, explain:'(4+6)+3 = 10+3 = 13' },
  ]
});

// New unit: Word Problems (THE biggest gap)
WORLD3.units.push({
  id: 'w3u5', name: 'Bài Toán Có Lời Văn', icon: '📝',
  lesson: { title: 'Giải bài toán bằng lời', steps: [
    { type:'intro', title:'Bài toán có lời văn', text:'Đọc kỹ → Tìm: Cho gì? Hỏi gì? → Cộng hay trừ? → Tính → Trả lời!', visual:'📖 → 🤔 → ✏️ → ✅' },
    { type:'concept', title:'Dạng 1: Thêm vào', text:'An có 3 kẹo. Mẹ cho thêm 5 kẹo. Hỏi An có tất cả mấy kẹo?\n\n"Thêm" → CỘNG: 3 + 5 = 8\nTrả lời: An có 8 kẹo.' },
    { type:'concept', title:'Dạng 2: Bớt đi', text:'Có 9 con chim. Bay đi 4 con. Hỏi còn mấy con?\n\n"Bay đi" → TRỪ: 9 − 4 = 5\nTrả lời: Còn 5 con chim.' },
    { type:'concept', title:'Dạng 3: Gộp lại', text:'Tổ 1 có 4 bạn. Tổ 2 có 6 bạn. Hỏi cả 2 tổ có mấy bạn?\n\n"Cả hai" → CỘNG: 4 + 6 = 10\nTrả lời: Cả 2 tổ có 10 bạn.' },
    { type:'concept', title:'Dạng 4: So sánh', text:'An có 8 bi. Bình có 5 bi. An nhiều hơn Bình mấy viên?\n\n"Nhiều hơn" → TRỪ: 8 − 5 = 3\nTrả lời: An nhiều hơn 3 viên bi.' },
    { type:'summary', title:'4 dạng bài toán', points:['Thêm vào → CỘNG','Bớt đi → TRỪ','Gộp lại → CỘNG','So sánh (hơn/kém) → TRỪ','Luôn viết: Phép tính → Đáp số'] }
  ]},
  tryIt: [
    { type:'fillBlank', question:'An có 4 bút. Bình cho thêm 3 bút. An có tất cả ___ bút?', answer:7 },
    { type:'fillBlank', question:'Có 8 quả táo. Ăn 3 quả. Còn ___ quả?', answer:5 },
    { type:'fillBlank', question:'Mai có 6 kẹo. Lan có 4 kẹo. Mai nhiều hơn Lan ___ kẹo?', answer:2 },
  ],
  quiz: [
    { type:'fillBlank', question:'Trong vườn có 5 bông hồng và 4 bông cúc. Có tất cả ___ bông hoa?', answer:9, explain:'5+4=9 (gộp lại)' },
    { type:'fillBlank', question:'Có 10 cái kẹo. Cho bạn 6 cái. Còn ___ cái?', answer:4, explain:'10−6=4 (bớt đi)' },
    { type:'fillBlank', question:'Sáng An đọc 3 trang sách. Chiều đọc thêm 5 trang. An đọc tổng ___ trang?', answer:8, explain:'3+5=8 (thêm vào)' },
    { type:'fillBlank', question:'Tổ 1 trồng 7 cây. Tổ 2 trồng 4 cây. Tổ 1 trồng nhiều hơn tổ 2 ___ cây?', answer:3, explain:'7−4=3 (so sánh)' },
    { type:'fillBlank', question:'Mẹ mua 6 quả cam và 3 quả xoài. Mẹ mua tất cả ___ quả?', answer:9, explain:'6+3=9 (gộp lại)' },
    { type:'fillBlank', question:'Có 9 viên bi. Mất 5 viên. Còn ___ viên?', answer:4, explain:'9−5=4 (bớt đi)' },
    { type:'fillBlank', question:'Anh 10 tuổi. Em 7 tuổi. Anh hơn em ___ tuổi?', answer:3, explain:'10−7=3 (so sánh)' },
    { type:'fillBlank', question:'Hộp có 2 bút đỏ, 3 bút xanh, 4 bút vàng. Tổng ___ bút?', answer:9, explain:'2+3+4=9 (gộp 3 nhóm)' },
    { type:'fillBlank', question:'Lan có 5 sticker. Được thêm 4. Cho bạn 3. Còn ___ sticker?', answer:6, explain:'5+4−3=6 (thêm rồi bớt)' },
    { type:'fillBlank', question:'Bạn nam: 6. Bạn nữ: 4. Bạn nam nhiều hơn ___ bạn?', answer:2, explain:'6−4=2 (so sánh)' },
  ]
});

// ── WORLD 4 ADDITIONS ──

// New unit: Calendar & Days of Week
WORLD4.units.push({
  id: 'w4u5', name: 'Ngày, Tuần, Tháng', icon: '📅',
  lesson: { title: 'Lịch và các ngày trong tuần', steps: [
    { type:'intro', title:'Thời gian', text:'1 tuần = 7 ngày. 1 năm = 12 tháng. Lịch giúp ta biết hôm nay là ngày nào!', visual:'📅 Thứ Hai → Chủ Nhật' },
    { type:'concept', title:'7 ngày trong tuần', text:'Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ Nhật\n\nĐi học: Thứ 2 → Thứ 6 (5 ngày)\nNghỉ: Thứ 7 + Chủ Nhật (2 ngày)' },
    { type:'concept', title:'12 tháng trong năm', text:'Tháng 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\n\nNgày sinh nhật con tháng mấy? 🎂\nTết Nguyên Đán: tháng 1 hoặc 2\nNăm học mới: tháng 9' },
    { type:'concept', title:'Đọc lịch', text:'Lịch cho biết: THỨ + NGÀY + THÁNG + NĂM\nVí dụ: Thứ Hai, ngày 5 tháng 4 năm 2026\n\nHôm nay → Ngày mai → Hôm qua' },
    { type:'summary', title:'Nhớ nhé!', points:['1 tuần = 7 ngày','5 ngày đi học + 2 ngày nghỉ','1 năm = 12 tháng','Hôm qua → Hôm nay → Ngày mai'] }
  ]},
  tryIt: [
    { type:'fillBlank', question:'1 tuần có ___ ngày?', answer:7 },
    { type:'multipleChoice', question:'Sau Thứ Năm là thứ mấy?', options:['Thứ Tư','Thứ Sáu','Thứ Bảy'], correct:1 },
    { type:'fillBlank', question:'1 năm có ___ tháng?', answer:12 },
  ],
  quiz: [
    { type:'fillBlank', question:'1 tuần = ___ ngày?', answer:7, explain:'7 ngày trong tuần' },
    { type:'multipleChoice', question:'Sau Thứ Bảy là ngày gì?', options:['Thứ Sáu','Chủ Nhật','Thứ Hai'], correct:1, explain:'Chủ Nhật sau Thứ Bảy' },
    { type:'multipleChoice', question:'Trước Thứ Tư là thứ mấy?', options:['Thứ Hai','Thứ Ba','Thứ Năm'], correct:1, explain:'Thứ Ba trước Thứ Tư' },
    { type:'fillBlank', question:'Mỗi tuần đi học ___ ngày?', answer:5, explain:'Thứ 2 đến Thứ 6 = 5 ngày' },
    { type:'fillBlank', question:'1 năm = ___ tháng?', answer:12, explain:'12 tháng' },
    { type:'multipleChoice', question:'Tháng nào sau tháng 8?', options:['Tháng 7','Tháng 9','Tháng 10'], correct:1, explain:'Tháng 9 sau tháng 8' },
    { type:'multipleChoice', question:'Ngày cuối tuần gồm?', options:['Thứ 6 + Thứ 7','Thứ 7 + Chủ Nhật','Thứ 2 + Thứ 3'], correct:1, explain:'Cuối tuần = Thứ 7 + CN' },
    { type:'multipleChoice', question:'Hôm nay Thứ Ba. Ngày mai là?', options:['Thứ Hai','Thứ Tư','Thứ Năm'], correct:1, explain:'Sau Thứ Ba là Thứ Tư' },
  ]
});

// Expand clock unit with half-hours
WORLD4.units[3].lesson.steps.push(
  { type:'concept', title:'Giờ rưỡi (nửa giờ)', text:'Kim dài chỉ 6 → "rưỡi" (30 phút)\n\n🕜 = 1 giờ 30 (một giờ rưỡi)\n🕝 = 2 giờ 30 (hai giờ rưỡi)\n\nKim ngắn ở GIỮA 2 số = giờ rưỡi!' }
);
WORLD4.units[3].quiz.push(
  { type:'multipleChoice', question:'Kim ngắn giữa 3 và 4, kim dài chỉ 6. Mấy giờ?', options:['3 giờ','3 giờ 30','4 giờ'], correct:1, explain:'Kim dài chỉ 6 = rưỡi, kim ngắn sau 3 = 3 giờ 30' },
  { type:'multipleChoice', question:'7 giờ rưỡi = mấy giờ mấy phút?', options:['7 giờ 15','7 giờ 30','7 giờ 45'], correct:1, explain:'Rưỡi = 30 phút' },
  { type:'multipleChoice', question:'Kim dài chỉ 6 nghĩa là?', options:['Giờ đúng','30 phút (rưỡi)','12 giờ'], correct:1, explain:'Kim dài ở 6 = nửa giờ' },
  { type:'fillBlank', question:'1 giờ = ___ phút?', answer:60, explain:'1 giờ = 60 phút' }
);

// Add 10-more/10-less brain game
WORLD4.brainGames.push({
  id:'bg_10more_less', name:'10 Thêm — 10 Bớt', icon:'🔄', source:'US Common Core 1.NBT.5', desc:'Tính nhẩm cộng trừ 10',
  questions:[
    { type:'fillBlank', question:'25 thêm 10 = ___?', answer:35, explain:'25+10=35' },
    { type:'fillBlank', question:'48 bớt 10 = ___?', answer:38, explain:'48−10=38' },
    { type:'fillBlank', question:'73 thêm 10 = ___?', answer:83, explain:'73+10=83' },
    { type:'fillBlank', question:'60 bớt 10 = ___?', answer:50, explain:'60−10=50' },
    { type:'fillBlank', question:'99 thêm 1 = ___?', answer:100, explain:'99+1=100' },
    { type:'fillBlank', question:'50 bớt 10 = ___?', answer:40, explain:'50−10=40' },
  ]
});

// ── WORLD 5 ADDITIONS ──

// New unit: Money (Singapore Math)
WORLD5.units.push({
  id: 'w5u5', name: 'Tiền Việt Nam', icon: '💰',
  lesson: { title: 'Tìm hiểu về tiền', steps: [
    { type:'intro', title:'Tiền Việt Nam', text:'Tiền giúp mua bán. Ở Việt Nam dùng đồng (đ). Biết đếm tiền = biết tính toán!', visual:'💵💰🪙' },
    { type:'concept', title:'Các mệnh giá nhỏ', text:'1.000đ, 2.000đ, 5.000đ, 10.000đ, 20.000đ\n\nVí dụ: 1 cây bút = 5.000đ\n1 quyển vở = 10.000đ' },
    { type:'concept', title:'Đếm tiền', text:'2 tờ 5.000đ = bao nhiêu?\n5.000 + 5.000 = 10.000đ\n\n1 tờ 10.000đ + 1 tờ 5.000đ = 15.000đ\n\nĐếm tiền = phép cộng!' },
    { type:'concept', title:'Trả lại tiền', text:'Mua kẹo 3.000đ, đưa 5.000đ.\nTiền thừa: 5.000 − 3.000 = 2.000đ\n\nTrả lại tiền = phép trừ!' },
    { type:'summary', title:'Nhớ nhé!', points:['Tiền Việt Nam: đồng (đ)','Đếm tiền = cộng các tờ','Tiền thừa = trừ','Luôn kiểm tra tiền thừa!'] }
  ]},
  tryIt: [
    { type:'fillBlank', question:'2 tờ 5.000đ = ___? (nghìn đồng)', answer:10, explain:'5+5=10 nghìn' },
    { type:'fillBlank', question:'Mua bút 3.000đ, đưa 10.000đ. Thừa ___ nghìn?', answer:7, explain:'10−3=7 nghìn' },
    { type:'fillBlank', question:'1 tờ 10.000đ + 1 tờ 5.000đ = ___ nghìn?', answer:15, explain:'10+5=15 nghìn' },
  ],
  quiz: [
    { type:'fillBlank', question:'3 tờ 2.000đ = ___ nghìn đồng?', answer:6, explain:'2+2+2=6' },
    { type:'fillBlank', question:'Mua vở 8.000đ, đưa 10.000đ. Thừa ___ nghìn?', answer:2, explain:'10−8=2' },
    { type:'fillBlank', question:'2 tờ 10.000đ = ___ nghìn?', answer:20, explain:'10+10=20' },
    { type:'fillBlank', question:'Bút 5.000đ + vở 10.000đ = ___ nghìn?', answer:15, explain:'5+10=15' },
    { type:'fillBlank', question:'Có 20.000đ, mua sách 12.000đ. Còn ___ nghìn?', answer:8, explain:'20−12=8' },
    { type:'multipleChoice', question:'Cần mua 2 bút, mỗi bút 5.000đ. Cần ___ đồng?', options:['5.000đ','10.000đ','15.000đ'], correct:1, explain:'5+5=10 nghìn' },
    { type:'fillBlank', question:'10.000đ + 5.000đ + 2.000đ = ___ nghìn?', answer:17, explain:'10+5+2=17' },
    { type:'fillBlank', question:'Mua kem 7.000đ, đưa 20.000đ. Thừa ___ nghìn?', answer:13, explain:'20−7=13' },
  ]
});

// New unit: Picture Graphs (US CC 1.MD.4)
WORLD5.units.push({
  id: 'w5u6', name: 'Biểu Đồ Tranh', icon: '📊',
  lesson: { title: 'Đọc biểu đồ tranh', steps: [
    { type:'intro', title:'Biểu đồ tranh', text:'Biểu đồ tranh dùng HÌNH ẢNH để thể hiện số lượng. Mỗi hình = 1 đơn vị!', visual:'🍎🍎🍎 🍌🍌 🍊🍊🍊🍊' },
    { type:'concept', title:'Cách đọc', text:'Quả yêu thích:\n🍎🍎🍎 → Táo: 3 bạn\n🍌🍌 → Chuối: 2 bạn\n🍊🍊🍊🍊 → Cam: 4 bạn\n\nĐếm hình = đọc số liệu!' },
    { type:'concept', title:'So sánh dữ liệu', text:'Cam (4) > Táo (3) > Chuối (2)\n\n❓ Quả nào được chọn nhiều nhất? → Cam\n❓ Nhiều hơn bao nhiêu? → 4 − 2 = 2 bạn' },
    { type:'summary', title:'Nhớ nhé!', points:['Mỗi hình = 1 đơn vị','Đếm hình → biết số lượng','So sánh cột → biết nhiều/ít hơn','Biểu đồ giúp nhìn thấy thông tin nhanh'] }
  ]},
  tryIt: [
    { type:'multipleChoice', question:'🐱🐱🐱 🐶🐶🐶🐶🐶 — Có nhiều mèo hay chó hơn?', options:['Mèo','Chó','Bằng nhau'], correct:1 },
    { type:'fillBlank', question:'🍎🍎🍎🍎 🍌🍌 — Táo nhiều hơn chuối ___ quả?', answer:2 },
    { type:'counting', question:'Đếm: ⭐⭐⭐⭐⭐⭐', items:['⭐','⭐','⭐','⭐','⭐','⭐'], countTarget:'⭐', answer:6 },
  ],
  quiz: [
    { type:'multipleChoice', question:'🚗🚗🚗 🚌🚌🚌🚌🚌 🚕🚕 — Xe nào nhiều nhất?', options:['🚗 Ô tô','🚌 Xe buýt','🚕 Taxi'], correct:1, explain:'Xe buýt: 5, nhiều nhất' },
    { type:'fillBlank', question:'🍎🍎🍎🍎🍎 🍌🍌🍌 — Táo nhiều hơn chuối ___ quả?', answer:2, explain:'5−3=2' },
    { type:'fillBlank', question:'🐱🐱🐱 🐶🐶🐶🐶 🐰🐰 — Tổng cộng ___ con vật?', answer:9, explain:'3+4+2=9' },
    { type:'multipleChoice', question:'🌺🌺🌺🌺 🌻🌻🌻🌻 — Hoa nào nhiều hơn?', options:['Hồng','Hướng dương','Bằng nhau'], correct:2, explain:'4 = 4, bằng nhau' },
    { type:'fillBlank', question:'🔴🔴🔴 🔵🔵🔵🔵🔵🔵 — Xanh nhiều hơn đỏ ___ cái?', answer:3, explain:'6−3=3' },
    { type:'multipleChoice', question:'🍕🍕 🍔🍔🍔🍔 🌭🌭🌭 — Ít nhất là gì?', options:['🍕 Pizza','🍔 Burger','🌭 Hotdog'], correct:0, explain:'Pizza chỉ 2, ít nhất' },
    { type:'fillBlank', question:'🟢🟢🟢🟢🟢 🟡🟡🟡 🔴🔴🔴🔴 — Tổng ___ hình?', answer:12, explain:'5+3+4=12' },
    { type:'multipleChoice', question:'Cách nào ĐÚNG để đọc biểu đồ?', options:['Đếm số hình mỗi loại','Đoán bừa','Chỉ xem cái đầu tiên'], correct:0, explain:'Đếm chính xác mỗi loại' },
  ]
});

// New unit: Weight (Singapore Math)
WORLD5.units.push({
  id: 'w5u7', name: 'Khối Lượng (Nặng — Nhẹ)', icon: '⚖️',
  lesson: { title: 'So sánh khối lượng', steps: [
    { type:'intro', title:'Nặng — Nhẹ', text:'Mỗi vật có khối lượng (cân nặng). Dùng cân để đo!', visual:'⚖️ 🐘 nặng — 🐁 nhẹ' },
    { type:'concept', title:'So sánh', text:'🐘 nặng hơn 🐁\n🐁 nhẹ hơn 🐘\n\nĐặt lên cân: bên nào thấp hơn = nặng hơn!' },
    { type:'concept', title:'Đơn vị: ki-lô-gam (kg)', text:'Cân nặng đo bằng ki-lô-gam (kg).\n\n1 lít nước ≈ 1 kg\n1 quả dưa hấu ≈ 5 kg\nCon ≈ 20-25 kg' },
    { type:'summary', title:'Nhớ nhé!', points:['Nặng ↓ — Nhẹ ↑ trên cân','kg = ki-lô-gam','Bên cân thấp hơn = nặng hơn','So sánh: nhiều kg hơn = nặng hơn'] }
  ]},
  tryIt: [
    { type:'multipleChoice', question:'🐘 và 🐁 — Con nào nặng hơn?', options:['🐘 Voi','🐁 Chuột','Bằng nhau'], correct:0 },
    { type:'multipleChoice', question:'Túi 3kg và túi 7kg. Túi nào nhẹ hơn?', options:['3kg','7kg'], correct:0 },
    { type:'fillBlank', question:'Táo 2kg + cam 3kg = ___ kg?', answer:5 },
  ],
  quiz: [
    { type:'multipleChoice', question:'Balo 5kg và túi 2kg. Cái nào nặng hơn?', options:['Balo 5kg','Túi 2kg','Bằng nhau'], correct:0, explain:'5 > 2' },
    { type:'fillBlank', question:'Gạo 10kg, dùng 4kg. Còn ___ kg?', answer:6, explain:'10−4=6kg' },
    { type:'multipleChoice', question:'Viết tắt ki-lô-gam?', options:['km','kg','cm'], correct:1, explain:'kg = ki-lô-gam' },
    { type:'fillBlank', question:'Bưởi 2kg + dưa 5kg = ___ kg?', answer:7, explain:'2+5=7kg' },
    { type:'multipleChoice', question:'Trên cân, bên trái thấp hơn bên phải. Bên nào nặng hơn?', options:['Bên trái','Bên phải','Bằng nhau'], correct:0, explain:'Bên thấp = nặng hơn' },
    { type:'fillBlank', question:'Con gà 3kg, con vịt 4kg. Vịt nặng hơn gà ___ kg?', answer:1, explain:'4−3=1kg' },
    { type:'multipleChoice', question:'1 lít nước nặng khoảng bao nhiêu?', options:['1 kg','10 kg','100 kg'], correct:0, explain:'1 lít nước ≈ 1 kg' },
    { type:'fillBlank', question:'Túi A: 8kg. Túi B: 5kg. Tổng ___ kg?', answer:13, explain:'8+5=13kg' },
  ]
});

// Update World 5 boss with new topics
WORLD5.boss.questions.push(
  { type:'fillBlank', question:'2 tờ 10.000đ + 1 tờ 5.000đ = ___ nghìn?', answer:25 },
  { type:'fillBlank', question:'🍎🍎🍎🍎 🍌🍌 — Táo hơn chuối ___ quả?', answer:2 },
  { type:'fillBlank', question:'Gạo 15kg, dùng 8kg. Còn ___ kg?', answer:7 },
  { type:'fillBlank', question:'1 tuần = ___ ngày?', answer:7 },
  { type:'multipleChoice', question:'Kim dài chỉ 6 = mấy phút?', options:['15 phút','30 phút','45 phút'], correct:1 }
);

// Add word problems brain game to World 5
WORLD5.brainGames.push({
  id:'bg_word_adv', name:'Bài Toán Nâng Cao', icon:'📝', source:'Singapore Math Bar Model', desc:'Bài toán 2 bước và so sánh',
  questions:[
    { type:'fillBlank', question:'Lớp có 25 nam và 14 nữ. Tổng ___ bạn?', answer:39, explain:'25+14=39' },
    { type:'fillBlank', question:'Có 80 kẹo, chia bạn 35 kẹo. Còn ___ kẹo?', answer:45, explain:'80−35=45' },
    { type:'fillBlank', question:'An cao 95cm. Bình cao 88cm. An cao hơn ___ cm?', answer:7, explain:'95−88=7' },
    { type:'fillBlank', question:'Sáng bán 32 bánh, chiều bán 25 bánh. Tổng ___ bánh?', answer:57, explain:'32+25=57' },
    { type:'fillBlank', question:'Có 50 quả. Cho A 23 quả, cho B 15 quả. Còn ___ quả?', answer:12, explain:'50−23−15=12 (2 bước)' },
    { type:'fillBlank', question:'Hùng có 45 viên bi. Mua thêm 23 viên. Tặng bạn 18 viên. Còn ___ viên?', answer:50, explain:'45+23−18=50 (2 bước)' },
  ]
});

// ── REFRESH WORLD PREVIEWS ──
// (worlds now have more units, update counts)
