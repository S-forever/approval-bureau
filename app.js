// ===== 数据管理 =====
function getRecords() {
  return JSON.parse(localStorage.getItem('approval_records') || '[]');
}

function saveRecords(records) {
  localStorage.setItem('approval_records', JSON.stringify(records));
}

function getNextNo() {
  var records = getRecords();
  return String(records.length + 1).padStart(6, '0');
}

// ===== 音频上下文 =====
var AudioCtx = window.AudioContext || window.webkitAudioContext;
var audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

// ===== 音效函数 =====
function playStampSound() {
  var ctx = getAudioCtx();
  var osc1 = ctx.createOscillator();
  var gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(800, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
  gain1.gain.setValueAtTime(0.6, ctx.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.15);

  setTimeout(function() {
    var osc2 = ctx.createOscillator();
    var gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(200, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0.4, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.15);
  }, 80);
}

function playRejectSound() {
  var ctx = getAudioCtx();
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);

  setTimeout(function() {
    var osc2 = ctx.createOscillator();
    var gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(300, ctx.currentTime);
    osc2.frequency.setValueAtTime(280, ctx.currentTime + 0.1);
    osc2.frequency.setValueAtTime(260, ctx.currentTime + 0.2);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.3);
  }, 150);
}

function playSuccessSound() {
  var ctx = getAudioCtx();
  var notes = [523, 659, 784, 1047, 1318];
  notes.forEach(function(freq, i) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.3);
  });

  setTimeout(function() {
    [2093, 2637, 3136].forEach(function(freq, i) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.5);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.5);
    });
  }, 400);
}

function playScanSound() {
  var ctx = getAudioCtx();
  var osc1 = ctx.createOscillator();
  var gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.type = 'square';
  osc1.frequency.setValueAtTime(1800, ctx.currentTime);
  osc1.frequency.setValueAtTime(2200, ctx.currentTime + 0.05);
  gain1.gain.setValueAtTime(0.25, ctx.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.12);

  var osc2 = ctx.createOscillator();
  var gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.type = 'square';
  osc2.frequency.setValueAtTime(2400, ctx.currentTime + 0.15);
  osc2.frequency.setValueAtTime(2800, ctx.currentTime + 0.2);
  gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.27);
  osc2.start(ctx.currentTime + 0.15);
  osc2.stop(ctx.currentTime + 0.27);
}

function playTearSound() {
  var ctx = getAudioCtx();
  var bufferSize = ctx.sampleRate * 0.4;
  var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  var data = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  var source = ctx.createBufferSource();
  source.buffer = buffer;
  var gain = ctx.createGain();
  var filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  source.start(ctx.currentTime);
}

function playPrinterSound() {
  var ctx = getAudioCtx();
  for (var i = 0; i < 8; i++) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100 + Math.random() * 80, ctx.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.08);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.08);
  }

  setTimeout(function() {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }, 800);
}

// ===== 彩纸效果 =====
function spawnConfetti() {
  var colors = ['#16a34a', '#facc15', '#3b82f6', '#ef4444', '#a855f7', '#ec4899'];
  for (var i = 0; i < 50; i++) {
    var el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    el.style.width = (Math.random() * 10 + 5) + 'px';
    el.style.height = (Math.random() * 10 + 5) + 'px';
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    el.style.animationDelay = (Math.random() * 0.5) + 's';
    document.body.appendChild(el);
    setTimeout(function(elem) { elem.remove(); }.bind(null, el), 4000);
  }
}

// ===== Canvas 金币效果 =====
function spawnCanvasCoins(amount) {
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1000';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var coins = [];
  var coinCount = Math.min(Math.floor(amount / 10), 30);

  for (var i = 0; i < coinCount; i++) {
    coins.push({
      x: Math.random() * canvas.width,
      y: -50,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 15 + 10
    });
  }

  var frame = 0;
  var maxFrames = 180;

  function animate() {
    if (frame >= maxFrames) {
      document.body.removeChild(canvas);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    coins.forEach(function(coin) {
      coin.x += coin.vx;
      coin.y += coin.vy;
      coin.vy += 0.1;
      coin.rotation += coin.rotationSpeed;

      ctx.save();
      ctx.translate(coin.x, coin.y);
      ctx.rotate(coin.rotation);

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, coin.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, coin.size * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold ' + coin.size + 'px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('¥', 0, 0);

      ctx.restore();
    });

    frame++;
    requestAnimationFrame(animate);
  }

  animate();
}

// ===== URL 解析和图片预览 =====
var parsedImageData = null;

function parseProductUrl() {
  var urlInput = document.getElementById('product-url');
  var url = urlInput.value.trim();
  var parseSection = document.querySelector('.parse-section');

  if (!url) {
    alert('请先粘贴商品链接');
    return;
  }

  var laser = document.createElement('div');
  laser.className = 'scan-laser';
  parseSection.style.position = 'relative';
  parseSection.appendChild(laser);

  try {
    var urlObj = new URL(url);
    var params = new URLSearchParams(urlObj.search);

    var title = params.get('title') || params.get('name') || params.get('product');
    var price = params.get('price') || params.get('amount') || params.get('cost');
    var img = params.get('img') || params.get('image') || params.get('pic');

    var parsed = false;

    if (title) {
      document.getElementById('product-name').value = title;
      parsed = true;
    }

    if (price) {
      document.getElementById('amount').value = parseFloat(price);
      parsed = true;
    }

    if (img) {
      showImagePreview(img);
      parsed = true;
    }

    if (parsed) {
      playScanSound();
      showScanAnimation();
      
      setTimeout(function() {
        parseSection.classList.add('scanning');
        setTimeout(function() { parseSection.classList.remove('scanning'); }, 300);
      }, 800);
    } else {
      setTimeout(function() { laser.remove(); }, 800);
      alert('未能从链接中解析到商品信息，请手动填写');
    }
  } catch (e) {
    setTimeout(function() { laser.remove(); }, 800);
    alert('链接格式不正确，请输入完整的URL');
  }
}

function showScanAnimation() {
  var preview = document.getElementById('image-preview');
  var scanLine = document.createElement('div');
  scanLine.className = 'scan-line';
  preview.appendChild(scanLine);
  setTimeout(function() { scanLine.remove(); }, 1500);
}

function showImagePreview(imgSrc) {
  var preview = document.getElementById('image-preview');
  var img = document.createElement('img');
  img.src = imgSrc;
  img.alt = '商品图片';
  img.onerror = function() {
    preview.innerHTML = '<div class="placeholder">❌ 图片加载失败</div>';
  };
  preview.innerHTML = '';
  preview.appendChild(img);
  parsedImageData = imgSrc;
}

function resetImagePreview() {
  parsedImageData = null;
  var preview = document.getElementById('image-preview');
  preview.innerHTML = '<div class="placeholder"><span class="icon">📸</span><div>拖拽商品图片到这里</div><div class="hint">支持从淘宝、拼多多直接拖入</div></div>';
}

function initDragDrop() {
  var preview = document.getElementById('image-preview');

  preview.addEventListener('dragover', function(e) {
    e.preventDefault();
    preview.classList.add('drag-over');
  });

  preview.addEventListener('dragleave', function(e) {
    e.preventDefault();
    preview.classList.remove('drag-over');
  });

  preview.addEventListener('drop', function(e) {
    e.preventDefault();
    preview.classList.remove('drag-over');

    var files = e.dataTransfer.files;
    if (files.length > 0) {
      var file = files[0];
      if (file.type.startsWith('image/')) {
        var reader = new FileReader();
        reader.onload = function(event) {
          showImagePreview(event.target.result);
          playScanSound();
          showScanAnimation();
        };
        reader.readAsDataURL(file);
      } else {
        alert('请拖拽图片文件');
      }
    }
  });
}

// ===== 购买理由生成 =====
var reasonMap = {
  '奶茶': [
    '今天风太大，需要一杯奶茶压压惊，不然容易被吹跑',
    '我的血液里流淌的是奶茶，这不是购物，这是续命',
    '奶茶店老板说今天不做奶茶就会倒闭，我不能见死不救'
  ],
  '游戏': [
    '这不是游戏，这是在进行高强度的手指关节康复训练',
    '我在研究一款关于人类决策心理学的互动式数字产品',
    '这不是玩游戏，这是在维护我的社交关系网，队友需要我'
  ],
  '衣服': [
    '衣柜说它最近很空虚，需要新衣服来填补它内心的创伤',
    '我这不是买衣服，这是在做形象投资，回报率高达200%',
    '去年的衣服配不上今年的我了，这是成长的代价'
  ],
  '零食': [
    '我的胃刚刚给我发了律师函，要求立即补充碳水和脂肪',
    '这不是零食，这是情绪稳定剂，不买我会暴躁',
    '我在进行一场味蕾的环球旅行，从薯片开始'
  ],
  '盲盒': [
    '我买的是盲盒吗？不，我买的是当代年轻人的精神寄托！',
    '这不是盲盒，这是低成本的心理治疗，比看医生便宜多了',
    '我在投资一个可能改变我一天心情的概率事件'
  ],
  '书': [
    '这不是买书，这是在投资我的大脑，回报率无法估量',
    '我的书架说它寂寞了，需要新书来陪它',
    '知识就是力量，我这是在囤积力量'
  ],
  '手机': [
    '我的手机电池已经老化到需要随身携带充电宝了，这是解放',
    '这不是换手机，这是生产力升级，效率提升300%',
    '旧手机经常死机，我这是在挽救我的时间和生命'
  ],
  '化妆品': [
    '这不是化妆品，这是社交战场的盔甲',
    '我在进行面部基础设施的维护和升级',
    '这不是消费，这是对自己脸的投资，ROI超高'
  ],
  '鞋': [
    '我的脚说它想住新房子了，我不能忽视它的需求',
    '这不是买鞋，这是在收集行走的艺术品',
    '旧鞋已经磨平了，我这是在保护我的膝盖'
  ],
  '包': [
    '这不是包，这是移动的家，装着我所有的安全感',
    '我的东西需要一个更精致的住所',
    '这是功能性投资，能提升我每天的出行效率'
  ],
  'default': [
    '经过严密的数学计算，不买这个将会导致我今日多巴胺分泌严重不足',
    '这不是消费，这是对生活品质的合理追求',
    '我掐指一算，今天宜购物，忌犹豫',
    '这个商品正在召唤我，我感受到了宇宙的意志',
    '我不是在花钱，我是在给快乐充值',
    '这是限时的心动，错过就要等下一个轮回',
    '我的钱包说它想减肥，帮它减减负',
    '这不是冲动消费，这是深思熟虑后的即时决策',
    '我在支持实体经济，这是社会责任',
    '生活已经够苦了，这点甜头都不给吗？'
  ]
};

function generateReason() {
  var productName = document.getElementById('product-name').value.trim();
  var key = Object.keys(reasonMap).find(function(k) { return productName.includes(k); }) || 'default';
  var reasons = reasonMap[key];
  var reason = reasons[Math.floor(Math.random() * reasons.length)];
  document.getElementById('reason').value = reason;
}

// ===== 审批意见生成 =====
var approveComments = [
  '朕准了！退下吧，记得给我带点好吃的回来。',
  '财务已盖章！这笔钱花得很有艺术感，批准！',
  '看在你长得好看的份上，这笔预算我批了。',
  '同意！毕竟你开心了，我才能跟着蹭吃蹭喝。',
  '准奏！爱卿辛苦了，这点赏赐不算什么。',
  '批准！记住，这是本月最后一次仁慈了（大概）。',
  '通过！你的理由说服了我，虽然我也不知道为什么。',
  '同意！钱是身外之物，快乐才是永恒的。',
  '准了！但下次记得请我喝奶茶作为回报。',
  '批准！你的消费欲望让我感动，去吧。',
  '同意！人生苦短，及时行乐，我支持你。',
  '准奏！这笔开支合理，下次继续。',
  '通过！你的理由很有创意，值得鼓励。',
  '批准！但你要承诺，买了之后要开心至少三天。'
];

var rejectComments = [
  '驳回！买这个不如请我吃顿火锅，我考虑一下再批。',
  '预算不足！你的钱包刚刚给我发了求救信号。',
  '拒绝！你的购物车已经满了，再买就要溢出来了！',
  '驳回！我觉得你只是想要，但你并不是真的需要。',
  '不准！你的理由太牵强了，连我自己都编不出这么烂的借口。',
  '驳回！建议你把这个钱存起来，等冷静期过了再申请。',
  '拒绝！你的消费记录让我担忧，需要冷静一下。',
  '不准！这个月你已经申请了三次了，适可而止。',
  '驳回！你的理由不够充分，请补充至少三个更扯淡的理由再试。',
  '拒绝！我觉得你需要的是运动，不是购物。',
  '不准！你的钱包在哭泣，你听不到吗？',
  '驳回！建议你把这个商品加入购物车，等三天后再说。',
  '拒绝！你的消费欲望像无底洞，我填不满了。',
  '不准！这个商品看起来不错，但你的余额看起来更不错（才怪）。'
];

function fillComment(recordId, friend, type) {
  var arr = type === 'approve' ? approveComments : rejectComments;
  var comment = arr[Math.floor(Math.random() * arr.length)];
  var textarea = document.getElementById('comment-' + friend);
  if (textarea) {
    textarea.value = comment;
  }
}

// ===== 小法庭逻辑 =====
function judgeResult(approvals, rejections) {
  if (approvals.length >= 2) return { status: 'approved', reason: '全票通过！恭喜获得合法剁手权！' };
  if (rejections.length >= 2) return { status: 'rejected', reason: '全票驳回！你的钱包保住了！' };
  if (approvals.length === 1 && rejections.length === 1) {
    var isApproved = Math.random() > 0.5;
    var courtReasons = isApproved
      ? ['小法庭判定：虽然有点贵，但看着可怜，准了！', '法官敲下法槌：今天天气不错，适合花钱，通过！']
      : ['小法庭判定：驳回！买这个不如把钱存起来买排骨。', '法官表示：你的理由太牵强了，驳回！'];

    return {
      status: isApproved ? 'approved' : 'rejected',
      reason: courtReasons[Math.floor(Math.random() * courtReasons.length)],
      isCourt: true
    };
  }
  return { status: 'pending', reason: '等待另一位法官到场...' };
}

function showCourt(result, recordId) {
  var overlay = document.createElement('div');
  overlay.className = 'court-overlay';
  overlay.innerHTML = '<div class="court-card"><div class="gavel">⚖️</div><h2 class="text-2xl font-bold mt-4 mb-2">小法庭开庭！</h2><p class="text-lg mb-4">1票同意 vs 1票驳回</p><div class="court-reason"><p class="font-bold">' + result.reason + '</p></div><button class="submit-btn mt-6" id="close-court-btn">确认</button></div>';
  document.body.appendChild(overlay);

  playStampSound();

  document.getElementById('close-court-btn').addEventListener('click', function() {
    closeCourt(recordId);
  });
}

function closeCourt(recordId) {
  var overlay = document.querySelector('.court-overlay');
  if (overlay) overlay.remove();
  showReceiptDetail(recordId);
  renderHistory();
}

// ===== 标签切换 =====
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) { btn.classList.remove('active'); });
  if (tab === 'form') {
    document.getElementById('form-tab').classList.remove('hidden');
    document.getElementById('history-tab').classList.add('hidden');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
  } else {
    document.getElementById('form-tab').classList.add('hidden');
    document.getElementById('history-tab').classList.remove('hidden');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    renderHistory();
  }
}

// ===== 表单提交 =====
function submitForm(e) {
  e.preventDefault();
  var name = document.getElementById('product-name').value.trim();
  var amount = parseFloat(document.getElementById('amount').value);
  var reason = document.getElementById('reason').value.trim();

  if (!name || !amount || !reason) return;

  var requiredApprovals = amount > 50 ? 2 : 1;
  var record = {
    id: Date.now(),
    no: getNextNo(),
    name: name,
    amount: amount,
    reason: reason,
    required_approvals: requiredApprovals,
    approvals: {
      A: { status: 'pending', label: '朋友A' },
      B: requiredApprovals === 2 ? { status: 'pending', label: '朋友B' } : { status: 'ignored', label: '朋友B（无需审批）' }
    },
    created_at: new Date().toISOString(),
    createdAt: new Date().toLocaleString('zh-CN')
  };

  var records = getRecords();
  records.unshift(record);
  saveRecords(records);

  document.getElementById('approval-form').reset();
  resetImagePreview();
  document.getElementById('receipt-no').textContent = getNextNo();

  playPrinterSound();
  switchTab('history');

  setTimeout(function() {
    var firstItem = document.querySelector('#history-list .receipt');
    if (firstItem) {
      firstItem.classList.add('ticket-printing');
      firstItem.addEventListener('animationend', function() {
        firstItem.classList.remove('ticket-printing');
      }, { once: true });
    }
  }, 50);

  setTimeout(function() {
    showReceiptDetail(record.id);
    window.scrollTo(0, 0);
  }, 1600);
}

// ===== 历史记录渲染 =====
function renderHistory() {
  var records = getRecords();
  var container = document.getElementById('history-list');

  if (records.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500">暂无审批记录</p>';
    return;
  }

  var html = '';
  records.forEach(function(r) {
    var status = getOverallStatus(r);
    var statusClass = status === 'approved' ? 'status-approved' : status === 'rejected' ? 'status-rejected' : 'status-pending';
    var statusText = status === 'approved' ? '✅ 已通过' : status === 'rejected' ? '❌ 已驳回' : '⏳ 审批中';
    html += '<div class="receipt history-item" data-record-id="' + r.id + '"><div class="receipt-border"><div class="flex justify-between items-start"><div><p class="text-xl font-bold">' + escapeHtml(r.name) + '</p><p class="text-lg">💰 ¥' + r.amount.toFixed(2) + '</p><p class="text-sm text-gray-500">No. ' + r.no + ' | ' + r.createdAt + '</p></div><span class="status-badge ' + statusClass + '">' + statusText + '</span></div></div></div>';
  });
  container.innerHTML = html;

  // 绑定点击事件
  document.querySelectorAll('.history-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var recordId = parseInt(this.getAttribute('data-record-id'));
      showReceiptDetail(recordId);
    });
  });
}

function getOverallStatus(record) {
  var a = record.approvals.A;
  var b = record.approvals.B;
  if (a.status === 'rejected' || b.status === 'rejected') return 'rejected';
  if (a.status === 'approved' && (b.status === 'approved' || b.status === 'ignored')) return 'approved';
  return 'pending';
}

// ===== 小票详情弹窗 =====
function showReceiptDetail(id) {
  var records = getRecords();
  var record = records.find(function(r) { return r.id === id; });
  if (!record) return;

  var modal = document.getElementById('receipt-modal');
  var detail = document.getElementById('receipt-detail');
  var status = getOverallStatus(record);

  var aStatus = record.approvals.A.status;
  var bStatus = record.approvals.B.status;

  var html = '<div class="receipt-border"><div class="text-center mb-4"><p class="text-2xl font-bold">═══ 审批小票 ═══</p><p class="text-sm text-gray-500">No. ' + record.no + '</p><p class="text-sm text-gray-500">' + record.createdAt + '</p></div><div class="mb-4 space-y-2"><p class="text-lg"><span class="font-bold">📦 商品：</span>' + escapeHtml(record.name) + '</p><p class="text-lg"><span class="font-bold">💰 金额：</span>¥' + record.amount.toFixed(2) + '</p><p class="text-lg"><span class="font-bold">📝 理由：</span>' + escapeHtml(record.reason) + '</p><p class="text-lg"><span class="font-bold">👥 需要审批：</span>' + record.required_approvals + ' 位朋友</p></div><div class="border-t-2 border-dashed border-gray-300 my-4 pt-4"><p class="text-center text-lg font-bold mb-3">─── 审批区 ───</p>';

  // 朋友A
  html += '<div class="mb-4 relative" id="approval-a"><p class="text-lg font-bold mb-2">👤 朋友A</p>';
  if (aStatus === 'pending') {
    html += '<div class="mb-2"><div class="flex gap-1 mb-1 items-center"><span class="text-sm text-gray-500">审批意见（可选）：</span><button type="button" class="fill-comment-btn" data-action="fill-comment" data-record-id="' + record.id + '" data-friend="A" data-type="approve">🎲 随机批准语</button><button type="button" class="fill-comment-btn" style="background:#ef4444" data-action="fill-comment" data-record-id="' + record.id + '" data-friend="A" data-type="reject">🎲 随机驳回语</button></div><textarea id="comment-A" class="comment-textarea" rows="2" placeholder="写点什么审批意见吧..."></textarea></div><div class="flex gap-2"><button class="btn-approve flex-1 py-2 text-lg" data-action="submit-approval" data-record-id="' + record.id + '" data-friend="A" data-status="approved">✅ 批准</button><button class="btn-reject flex-1 py-2 text-lg" data-action="submit-approval" data-record-id="' + record.id + '" data-friend="A" data-status="rejected">❌ 驳回</button></div>';
  } else {
    html += '<div class="text-center py-2 relative"><span class="status-badge ' + (aStatus === 'approved' ? 'status-approved' : 'status-rejected') + ' text-lg">' + (aStatus === 'approved' ? '✅ 已批准' : '❌ 已驳回') + '</span><div class="stamp ' + (aStatus === 'approved' ? 'approved' : 'rejected') + '" style="top: -10px; right: 20px;">' + (aStatus === 'approved' ? '准' : '驳') + '</div>';
    if (record.approvals.A.comment) {
      html += '<p class="text-sm text-gray-600 mt-2 italic">"' + escapeHtml(record.approvals.A.comment) + '"</p>';
    }
    html += '</div>';
  }
  html += '</div>';

  // 朋友B
  html += '<div class="mb-4 relative" id="approval-b"><p class="text-lg font-bold mb-2">👤 朋友B ' + (record.required_approvals === 1 ? '<span class="text-sm text-gray-400">(无需审批)</span>' : '') + '</p>';
  if (record.required_approvals === 1) {
    html += '<p class="text-gray-400 text-center py-2">— 金额 ≤ 50元，无需第二位审批 —</p>';
  } else if (bStatus === 'pending') {
    html += '<div class="mb-2"><div class="flex gap-1 mb-1 items-center"><span class="text-sm text-gray-500">审批意见（可选）：</span><button type="button" class="fill-comment-btn" data-action="fill-comment" data-record-id="' + record.id + '" data-friend="B" data-type="approve">🎲 随机批准语</button><button type="button" class="fill-comment-btn" style="background:#ef4444" data-action="fill-comment" data-record-id="' + record.id + '" data-friend="B" data-type="reject">🎲 随机驳回语</button></div><textarea id="comment-B" class="comment-textarea" rows="2" placeholder="写点什么审批意见吧..."></textarea></div><div class="flex gap-2"><button class="btn-approve flex-1 py-2 text-lg" data-action="submit-approval" data-record-id="' + record.id + '" data-friend="B" data-status="approved">✅ 批准</button><button class="btn-reject flex-1 py-2 text-lg" data-action="submit-approval" data-record-id="' + record.id + '" data-friend="B" data-status="rejected">❌ 驳回</button></div>';
  } else {
    html += '<div class="text-center py-2 relative"><span class="status-badge ' + (bStatus === 'approved' ? 'status-approved' : 'status-rejected') + ' text-lg">' + (bStatus === 'approved' ? '✅ 已批准' : '❌ 已驳回') + '</span><div class="stamp ' + (bStatus === 'approved' ? 'approved' : 'rejected') + '" style="top: -10px; right: 20px;">' + (bStatus === 'approved' ? '准' : '驳') + '</div>';
    if (record.approvals.B.comment) {
      html += '<p class="text-sm text-gray-600 mt-2 italic">"' + escapeHtml(record.approvals.B.comment) + '"</p>';
    }
    html += '</div>';
  }
  html += '</div>';

  // 小法庭结果
  if (record.courtResult) {
    html += '<div class="border-t-2 border-dashed border-gray-300 my-4 pt-4"><p class="text-center text-lg font-bold mb-2">⚖️ 小法庭判决书</p><div class="court-reason"><p>' + escapeHtml(record.courtResult.reason) + '</p></div></div>';
  }

  // 最终状态
  var finalStatusClass = status === 'approved' ? 'pass' : 'wait';
  var finalStatusStyle = status === 'rejected' ? ' style="color:#dc2626"' : '';
  var finalStatusText = status === 'approved' ? '✅ 审批通过，去买吧！' : status === 'rejected' ? '❌ 审批被驳回，省钱了！' : '⏳ 等待审批中';
  html += '<div class="final-status ' + finalStatusClass + '"' + finalStatusStyle + '>' + finalStatusText + '</div>';

  // 删除按钮
  html += '<div class="text-center mt-4"><button class="text-red-500 text-sm underline" data-action="delete-record" data-record-id="' + record.id + '">🗑️ 删除此记录</button></div>';

  html += '</div>';

  detail.innerHTML = html;
  modal.classList.remove('hidden');
  document.getElementById('close-modal-btn').style.display = 'block';

  // 防止页面滚动，确保能看到弹窗页头
  window.scrollTo(0, 0);

  // 绑定弹窗内的事件
  detail.querySelectorAll('[data-action]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var action = this.getAttribute('data-action');
      var recordId = parseInt(this.getAttribute('data-record-id'));
      
      if (action === 'fill-comment') {
        var friend = this.getAttribute('data-friend');
        var type = this.getAttribute('data-type');
        fillComment(recordId, friend, type);
      } else if (action === 'submit-approval') {
        var friend = this.getAttribute('data-friend');
        var status = this.getAttribute('data-status');
        submitApproval(recordId, friend, status);
      } else if (action === 'delete-record') {
        deleteRecord(recordId);
      }
    });
  });

  setTimeout(function() {
    detail.querySelectorAll('.stamp').forEach(function(s) {
      s.style.animation = 'none';
      void s.offsetWidth;
      s.style.animation = '';
    });
  }, 50);
}

function closeModal() {
  document.getElementById('receipt-modal').classList.add('hidden');
  document.getElementById('close-modal-btn').style.display = 'none';
  renderHistory();
}

// ===== 审批操作 =====
function submitApproval(id, friend, action) {
  var records = getRecords();
  var record = records.find(function(r) { return r.id === id; });
  if (!record) return;

  var commentTextarea = document.getElementById('comment-' + friend);
  var comment = commentTextarea ? commentTextarea.value.trim() : '';

  record.approvals[friend].status = action;
  record.approvals[friend].comment = comment;
  saveRecords(records);

  if (action === 'approved') {
    playStampSound();
  } else {
    playRejectSound();
    playTearSound();
  }

  var section = document.getElementById('approval-' + friend.toLowerCase());
  if (section) {
    section.classList.add('shake');
    setTimeout(function() { section.classList.remove('shake'); }, 500);
  }

  var aStatus = record.approvals.A.status;
  var bStatus = record.approvals.B.status;

  var approvals = [];
  var rejections = [];
  if (aStatus === 'approved') approvals.push('A');
  if (aStatus === 'rejected') rejections.push('A');
  if (bStatus === 'approved') approvals.push('B');
  if (bStatus === 'rejected') rejections.push('B');

  if (approvals.length === 1 && rejections.length === 1 && !record.courtResult) {
    var courtResult = judgeResult(approvals, rejections);
    record.courtResult = courtResult;
    saveRecords(records);

    setTimeout(function() {
      showCourt(courtResult, id);
      if (courtResult.status === 'approved') {
        setTimeout(function() {
          playSuccessSound();
          spawnConfetti();
          spawnCanvasCoins(record.amount);
        }, 300);
      }
    }, 300);
  } else {
    var newStatus = getOverallStatus(record);
    if (newStatus === 'approved') {
      setTimeout(function() {
        playSuccessSound();
        spawnConfetti();
        spawnCanvasCoins(record.amount);
      }, 300);
    }
    showReceiptDetail(id);
  }
}

function deleteRecord(id) {
  if (!confirm('确定要删除这条审批记录吗？')) return;
  var records = getRecords().filter(function(r) { return r.id !== id; });
  saveRecords(records);
  closeModal();
  renderHistory();
}

// ===== 工具函数 =====
function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  // 初始化单号
  document.getElementById('receipt-no').textContent = getNextNo();

  // 绑定标签切换事件
  document.getElementById('tab-form-btn').addEventListener('click', function() {
    switchTab('form');
  });
  document.getElementById('tab-history-btn').addEventListener('click', function() {
    switchTab('history');
  });

  // 绑定表单提交事件
  document.getElementById('approval-form').addEventListener('submit', submitForm);

  // 绑定解析按钮事件
  document.getElementById('parse-btn').addEventListener('click', parseProductUrl);

  // 绑定生成理由按钮事件
  document.getElementById('gen-reason-btn').addEventListener('click', generateReason);

  // 绑定关闭弹窗按钮事件
  document.getElementById('close-modal-btn').addEventListener('click', closeModal);

  // 初始化拖拽功能
  initDragDrop();
});
