// 모바일 메뉴 열기/닫기
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// 갤러리 사진이 아직 없으면 안내 표시
document.querySelectorAll('.gallery-item img').forEach((img) => {
  img.addEventListener('error', () => {
    img.parentElement.classList.add('missing');
    img.remove();
  });
});

// 스크롤하면 부드럽게 나타나기
const targets = document.querySelectorAll('.section-head, .value, .gallery-item, .treatment, .steps li, .program, .doctor, .hours-table, .contact-box, .location, .disease, .info-box, .faq');
targets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add('visible'));
}

// 스크롤하면 헤더가 흰색으로 바뀜
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 모바일 메뉴를 열면 헤더를 흰색으로
toggle.addEventListener('click', () => header.classList.toggle('open', nav.classList.contains('open')));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => header.classList.remove('open')));

// 지금 진료 중인지 표시 (월~금 09:30~17:20 / 토 09:30~12:20 / 점심 12:20~14:00 / 일 휴무)
(function showStatus() {
  const box = document.getElementById('status');
  const text = document.getElementById('statusText');
  if (!box || !text) return;
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const OPEN = 9 * 60 + 30;
  const LUNCH_START = 12 * 60 + 20;
  const LUNCH_END = 14 * 60;
  const WEEKDAY_CLOSE = 17 * 60 + 20;
  const SAT_CLOSE = 12 * 60 + 20;
  let msg = '';
  let open = false;

  if (day === 0) {
    msg = '오늘은 정기휴무 · 월요일 09:30 진료 시작';
  } else if (day === 6) {
    if (mins < OPEN) msg = '오늘 09:30 진료 시작';
    else if (mins < SAT_CLOSE) { msg = '지금 진료 중 · 12:20까지'; open = true; }
    else msg = '오늘 진료 종료 · 월요일 09:30 진료 시작';
  } else {
    if (mins < OPEN) msg = '오늘 09:30 진료 시작';
    else if (mins < LUNCH_START) { msg = '지금 진료 중 · 17:20까지 (점심 12:20~14:00)'; open = true; }
    else if (mins < LUNCH_END) msg = '점심시간 · 14:00부터 진료';
    else if (mins < WEEKDAY_CLOSE) { msg = '지금 진료 중 · 17:20까지'; open = true; }
    else msg = '오늘 진료 종료 · 내일 09:30 진료 시작';
  }
  text.textContent = msg;
  box.classList.toggle('open', open);
})();

// 푸터 연도
document.getElementById('year').textContent = new Date().getFullYear();
