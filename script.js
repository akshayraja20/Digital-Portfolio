 
        /* ---------- Navigation + smooth anchor ---------- */
        const navLinks = document.querySelectorAll('nav a');
        function setActive() {
            const hash = location.hash || '#home';
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.addEventListener('hashchange', setActive);
        window.addEventListener('load', () => { if (!location.hash) location.hash = '#home'; setActive(); animateSkills(); startTypewriter(); loadTheme(); });

        navLinks.forEach(a => a.addEventListener('click', e => { e.preventDefault(); location.hash = a.getAttribute('href'); }));

        /* ---------- Skills animation ---------- */
        function animateSkills() {
            document.querySelectorAll('.skill-fill').forEach(el => {
                const w = el.dataset.w || '60%';
                setTimeout(() => el.style.width = w, 250);
            });
        }

        /* ---------- Smooth typewriter (slower + smooth) ---------- */
        const phrases = ['Web Developer', 'Front-End Enthusiast', 'UI/UX Learner'];
        let pIdx = 0, cIdx = 0, typing = true;
        const typeEl = document.getElementById('type-text');
        const cursor = document.getElementById('cursor');

        function startTypewriter() {
            if (!typeEl) return;
            let delay = 120; // base typing speed
            function step() {
                const cur = phrases[pIdx];
                if (typing) {
                    cIdx++;
                    typeEl.textContent = cur.slice(0, cIdx);
                    if (cIdx >= cur.length) {
                        typing = false;
                        setTimeout(step, 900);
                        return;
                    }
                    setTimeout(step, delay);
                } else {
                    cIdx--;
                    typeEl.textContent = cur.slice(0, cIdx);
                    if (cIdx <= 0) {
                        typing = true;
                        pIdx = (pIdx + 1) % phrases.length;
                        setTimeout(step, 300);
                        return;
                    }
                    setTimeout(step, Math.max(40, delay / 1.5));
                }
            }
            step();
            // cursor blink
            setInterval(() => { cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0'; }, 500);
        }

        /* ---------- Viewer modal ---------- */
        /* ---------- Open project links (GitHub or Live) ---------- */
document.querySelectorAll('.view-proj').forEach(btn => {
    btn.addEventListener('click', e => {
        const link = e.currentTarget.dataset.link;
        if (link) {
            window.open(link, '_blank'); // naya tab me khulega
        } else {
            alert('Project link not added yet!');
        }
    });
});

        // const modal = document.getElementById('viewer-modal');
        // const frame = document.getElementById('viewer-frame');
        // document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', () => { const pdf = btn.dataset.pdf || 'marksheet-placeholder.pdf'; openViewer(pdf); }));
        // document.querySelectorAll('.view-cert').forEach(btn => btn.addEventListener('click', () => { const pdf = btn.dataset.pdf || 'cert-placeholder.pdf'; openViewer(pdf); }));
        // document.querySelectorAll('.view-proj').forEach(btn => btn.addEventListener('click', e => {
        //     const id = e.currentTarget.dataset.proj || 'Project';
        //     const content = `<html><body style="font-family:Inter,Arial;padding:28px;background:${document.body.classList.contains('dark') ? '#07122a' : '#fff'};color:${document.body.classList.contains('dark') ? '#e9f6ff' : '#071021'}"><h2>${id}</h2></p></body></html>`;
        //     openViewer('data:text/html;charset=utf-8,' + encodeURIComponent(content));
        // }));
        // function openViewer(src) { frame.src = src; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
        // document.getElementById('modal-close').addEventListener('click', closeViewer);
        // modal.addEventListener('click', e => { if (e.target === modal) closeViewer(); });
        // function closeViewer() { modal.classList.remove('open'); frame.src = ''; modal.setAttribute('aria-hidden', 'true'); }
        /* ---------- PDF Viewer (Modal) ---------- */
const modal = document.getElementById('viewer-modal');
const frame = document.getElementById('viewer-frame');
const modalClose = document.getElementById('modal-close');

// Certificate ya Resume view buttons ke liye
document.querySelectorAll('.view-btn, .view-cert').forEach(btn => {
  btn.addEventListener('click', () => {
    const pdfPath = btn.dataset.pdf || 'certificates/sample.pdf';
    openViewer(pdfPath);
  });
});

// PDF ko safe tarike se open karne ka function
function openViewer(src) {
  let safeSrc = src;
  if (typeof src === 'string' && src.toLowerCase().endsWith('.pdf')) {
    // PDF ke toolbar, download, aur scrollbar disable kar diye
    safeSrc = src + (src.includes('#') ? '' : '#toolbar=0&navpanes=0&scrollbar=0');
  }
  frame.src = safeSrc;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

// Modal close karne ka function
function closeViewer() {
  modal.classList.remove('open');
  frame.src = '';
  modal.setAttribute('aria-hidden', 'true');
}

// Close button aur backdrop click par modal band ho
modalClose.addEventListener('click', closeViewer);
modal.addEventListener('click', e => {
  if (e.target === modal) closeViewer();
});


        /* ---------- Contact form (fake popup) ---------- */
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const f = e.target;
            const name = (f.name.value || 'Friend').trim();
            const popup = document.getElementById('top-popup');
            popup.textContent = `Thank you, ${name}! I'll contact you soon ❤️`;
            popup.classList.add('show');
            f.reset();
            setTimeout(() => { popup.classList.remove('show'); }, 3000);
        });

        /* ---------- Theme toggle with persistence ---------- */
        const themeBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('ak_theme', isDark ? 'dark' : 'light');
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
        function loadTheme() {
            const saved = localStorage.getItem('ak_theme');
            if (saved === 'dark') { document.body.classList.add('dark'); themeIcon.className = 'fas fa-sun'; }
            else { document.body.classList.remove('dark'); themeIcon.className = 'fas fa-moon'; }
        }

        /* ---------- Resume & utilities ---------- */
        document.getElementById('download-resume').addEventListener('click', e => { e.preventDefault(); alert('Replace with your resume link to enable download.'); });
        function copyEmail() { navigator.clipboard?.writeText('akshay@example.com').then(() => alert('Email copied')) }
        window.copyEmail = copyEmail;

        /* ---------- Ensure nothing gets hidden on small screens ---------- */
        // No-op: CSS is mobile-first and responsive. If any element overflows, browser will show scroll.
   