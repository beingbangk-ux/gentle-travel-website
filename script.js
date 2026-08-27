const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Local preview: keep future visa routes testable without opening a missing page.
document.querySelectorAll('.visa-destination').forEach((card) => {
  card.addEventListener('click', (event) => {
    const isLocalPreview = window.location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    if (!isLocalPreview) return;
    event.preventDefault();
    const route = card.dataset.futureRoute;
    const note = document.getElementById('visa-preview-note');
    note.textContent = `ลิงก์พร้อมใช้งาน: ${route} — หน้ารายละเอียดยังไม่ถูกสร้างในรอบนี้`;
  });
});
