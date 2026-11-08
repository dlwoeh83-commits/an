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
const targets = document.querySelectorAll('.section-head, .value, .gallery-item, .treatment, .steps li, .program, .doctor, .hours-table, .contact-box, .location');
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

// 푸터 연도
document.getElementById('year').textContent = new Date().getFullYear();
