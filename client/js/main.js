// =============================================
//  main.js — Simple Portfolio Frontend Logic
// =============================================

const API = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api';

// ---- Mobile Nav Toggle ----
document.getElementById('navToggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ---- Projects ----
function loadProjects() {
  const grid = document.getElementById('projectsGrid');

  const projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'A full stack personal portfolio website built to showcase my skills and projects. Built with HTML, CSS, JavaScript for the frontend and Node.js + MongoDB for the backend.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      liveUrl: '',
      githubUrl: 'https://github.com/yourname/simple-portfolio',
    },
  ];

  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links">
        ${p.liveUrl   ? `<a href="${p.liveUrl}"   target="_blank">↗ Live</a>`   : ''}
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank">↗ GitHub</a>` : ''}
      </div>
    </div>
  `).join('');
}

loadProjects();

// ---- Contact Form ----
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('formMsg');

  const body = {
    name:    document.getElementById('name').value.trim(),
    email:   document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  btn.disabled    = true;
  btn.textContent = 'Sending...';
  msg.className   = 'form-msg';
  msg.textContent = '';

  try {
    const res  = await fetch(`${API}/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) {
      msg.className   = 'form-msg ok';
      msg.textContent = '✓ Message sent!';
      e.target.reset();
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    msg.className   = 'form-msg err';
    msg.textContent = '✗ ' + err.message;
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Send Message';
  }
});

// ---- Utility: prevent XSS ----
function safe(str = '') {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}