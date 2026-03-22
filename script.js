const input  = document.getElementById("commandInput");
const output = document.getElementById("output");
const keySound = document.getElementById("key-sound");

// ── Tab UI ────────────────────────────────────────────────────────────────────
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function printLines(html, lineDelay = 18) {
  const lines = html.split('\n');
  for (const line of lines) {
    output.innerHTML += line + '\n';
    window.scrollTo(0, document.body.scrollHeight);
    if (lineDelay > 0) await sleep(lineDelay);
  }
}

// ── Persistent history ────────────────────────────────────────────────────────
let commandHistory = JSON.parse(localStorage.getItem('termHistory') || '[]');
let historyIndex   = commandHistory.length;

// ── ASCII Banner ──────────────────────────────────────────────────────────────
const ASCII_BANNER =
`<span class="ascii-art" style="color:var(--term-color)">██████╗  ██████╗ ███████╗██╗  ██╗ █████╗ ███╗   ██╗
██╔══██╗██╔═══██╗██╔════╝██║  ██║██╔══██╗████╗  ██║
██████╔╝██║   ██║███████╗███████║███████║██╔██╗ ██║
██╔══██╗██║   ██║╚════██║██╔══██║██╔══██║██║╚██╗██║
██║  ██║╚██████╔╝███████║██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝</span>`;

// ── Commands ──────────────────────────────────────────────────────────────────
const commands = {

  help: `\nAvailable commands:\n\n  <span class="text-yellow-400">about</span>                     — Who am I\n  <span class="text-yellow-400">resume</span>                    — Download resume\n  <span class="text-yellow-400">projects</span>                  — My projects\n  <span class="text-yellow-400">experience</span>                — Work experience\n  <span class="text-yellow-400">skills</span>                    — Tech stack\n  <span class="text-yellow-400">contact</span>                   — Get in touch\n  <span class="text-yellow-400">research_and_publications</span> — Published paper\n  <span class="text-yellow-400">neofetch</span>                  — System info card\n  <span class="text-yellow-400">whoami</span>                    — Identity\n  <span class="text-yellow-400">history</span>                   — Command history\n  <span class="text-yellow-400">date</span>                      — Current date & time\n  <span class="text-yellow-400">banner</span>                    — Show ASCII banner\n  <span class="text-yellow-400">man [command]</span>             — Manual for a command\n  <span class="text-yellow-400">theme [green|amber|white]</span>  — Switch terminal theme\n  <span class="text-yellow-400">matrix</span>                    — 👀\n  <span class="text-yellow-400">clear</span>                     — Clear terminal\n\n  <span class="text-gray-500">Tip: Tab to autocomplete · ↑↓ to navigate history</span>\n<hr>`,

  about: `\nBackend-oriented Full Stack Developer currently working at Aadija Technologies,\nbuilding web applications using Core PHP, CodeIgniter, Node.js, and Express.js.\nExperienced in developing e-commerce platforms, hotel management systems,\ncollege management systems, and CRMs.\nPassionate about high-performance, scalable systems.\n<hr>`,

  resume: `Opening resume in new tab...\n<hr>`,

  projects: `\n<span class="text-yellow-400">▶ Real-Time Device Tracking System</span>\n  Node.js · Express.js · Socket.io · Leaflet.js  ·  2024\n  Live map-based tracking system inspired by Uber/Zomato.\n  Selected for publication in MANTECH Publications (2025).\n  <a href="https://real-time-device-tracking-jv9r.onrender.com/" class="text-blue-400 underline" target="_blank">Live Demo ↗</a>\n\n<span class="text-yellow-400">▶ The Bag Company</span>\n  Node.js · Express.js · MongoDB · Tailwind CSS  ·  2024\n  Full-stack e-commerce with JWT auth, Razorpay, RBAC & Multer.\n  <a href="https://github.com/roshanrkg/The-Bag-Company" class="text-blue-400 underline" target="_blank">GitHub ↗</a>\n\n<span class="text-yellow-400">▶ Retro Terminal Portfolio</span>\n  HTML · CSS · Vanilla JS\n  This very portfolio — CRT terminal aesthetic with interactive commands.\n  <a href="https://roshangupta.onrender.com/" class="text-blue-400 underline" target="_blank">Live ↗</a>\n<hr>`,

  experience: `\n<span class="text-yellow-400">Aadija Technologies</span>  ·  Software Developer  ·  2025 – Present\n\n  • Developing and maintaining web apps using Core PHP and CodeIgniter\n  • Contributing to Advanced Hotel Management System — room management,\n    bookings, billing, reporting, restaurant, bar, and store modules\n  • Working on company CRM — client relationships, leads, follow-up workflows\n  • Built e-commerce websites with product catalogs, cart & order management\n  • Developed college management features — student records, attendance,\n    fee payments, and leave management modules\n  • Built dynamic, responsive UIs using Bootstrap, jQuery, and AJAX\n<hr>`,

  skills: `\nProgramming Languages:    JavaScript, Java, PHP\nBackend Technologies:     Node.js, Express.js, Core PHP, CodeIgniter\nFrontend Technologies:    HTML, CSS, Bootstrap, Tailwind CSS, EJS, jQuery, AJAX\nDatabases:                MongoDB, Oracle DB, Redis, MySQL, Mongoose\nTools & Methodologies:    NPM, Composer, Git, GitHub, Postman, Render, Railway, Vercel\nCore Competencies:        RESTful API Development, WebSockets, Auth & Security,\n                          Real-Time Systems, MVC Architecture\nSoft Skills:              Communication, Teamwork, Leadership, Problem-Solving\n<hr>`,

  contact: `\n  📧 Email     <a href="mailto:roshanguptarkg@gmail.com" class="text-blue-400 underline" target="_blank">roshanguptarkg@gmail.com</a>  <button onclick="copyText('roshanguptarkg@gmail.com',this)" class="text-xs border border-current px-1 rounded ml-1 opacity-60 hover:opacity-100">copy</button>\n  🔗 LinkedIn  <a href="https://www.linkedin.com/in/roshan-kumar-gupta-a979b626b/" class="text-blue-400 underline" target="_blank">roshan-kumar-gupta ↗</a>\n  🐙 GitHub    <a href="https://github.com/roshanrkg" class="text-blue-400 underline" target="_blank">roshanrkg ↗</a>\n<hr>`,

  research_and_publications: `\n<span class="text-yellow-400">"Optimizing Last-Mile Delivery in Indian E-Commerce\n Using Real-Time Geo-location Capture"</span>\n\n  Published · MANTECH Publications · 2025\n  <a href="https://drive.google.com/file/d/1hMr8KZSLLGATACSZ-zYAN2XAciFIbin1/view?usp=sharing" class="text-blue-400 underline" target="_blank">View Paper ↗</a>\n<hr>`,

  whoami: `roshan — Full Stack Developer @ Aadija Technologies\nBuilder of scalable systems. Researcher. Retro terminal enthusiast.\n<hr>`,

  date: () => `\n📅  ${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'medium' })}\n<hr>`,

  history: () => {
    if (commandHistory.length === 0) return 'No command history yet.\n<hr>';
    return '\n' + commandHistory.map((cmd, i) => `  ${String(i + 1).padStart(3)}  ${cmd}`).join('\n') + '\n<hr>';
  },

  neofetch:
`\n<span style="color:var(--term-color)">       .+.         </span><span class="text-white font-bold">roshan</span><span style="color:var(--term-color)">@</span><span class="text-white font-bold">portfolio</span>
<span style="color:var(--term-color)">      /###\\        </span>─────────────────────────────────
<span style="color:var(--term-color)">     /#####\\       </span><span style="color:var(--term-color)">OS:</span>        RoshanOS v1.0
<span style="color:var(--term-color)">    /###/\\##\\      </span><span style="color:var(--term-color)">Shell:</span>     retro-terminal v1.0
<span style="color:var(--term-color)">   /###/ /###\\     </span><span style="color:var(--term-color)">Role:</span>      Full Stack Developer
<span style="color:var(--term-color)">  /####___\\###\\    </span><span style="color:var(--term-color)">Company:</span>   Aadija Technologies
<span style="color:var(--term-color)"> /###############\\ </span><span style="color:var(--term-color)">Stack:</span>     PHP · Node.js · CodeIgniter
<span style="color:var(--term-color)">/##################\\</span><span style="color:var(--term-color)">Projects:</span>  3  |  Published: 1 paper
<span style="color:var(--term-color)">                    </span><span style="color:var(--term-color)">Email:</span>     roshanguptarkg@gmail.com
<hr>`,

  banner: `\n${ASCII_BANNER}\n<hr>`,

  sudo: `<span class="text-red-400">sudo: permission denied — nice try though 😏</span>\n<hr>`,

  matrix: "__matrix__",

  clear: "__clear__",
};

// ── Copy to clipboard ─────────────────────────────────────────────────────────
window.copyText = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
};

// ── Matrix rain ───────────────────────────────────────────────────────────────
let matrixActive = false;
function startMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  canvas.style.display = 'block';
  matrixActive = true;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&ｦｧｨｩｪｫｬｭｮｯ';
  const fontSize = 14;
  const cols    = Math.floor(canvas.width / fontSize);
  const drops   = Array(cols).fill(1);

  function draw() {
    if (!matrixActive) { canvas.style.display = 'none'; return; }
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px monospace`;
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    requestAnimationFrame(draw);
  }
  draw();

  setTimeout(() => {
    const stop = () => {
      matrixActive = false;
      input.focus();
      document.removeEventListener('keydown', stop);
    };
    document.addEventListener('keydown', stop);
  }, 500);
}

// ── Theme switcher ────────────────────────────────────────────────────────────
const themes = {
  green: { color: '#00ff00', glow: '0 0 6px #00ff00, 0 0 1px #00ff00' },
  amber: { color: '#ffb000', glow: '0 0 6px #ffb000, 0 0 1px #ffb000' },
  white: { color: '#e8e8e8', glow: '0 0 4px rgba(255,255,255,0.5)' },
};

function applyTheme(name) {
  const t = themes[name];
  if (!t) return false;
  document.documentElement.style.setProperty('--term-color', t.color);
  document.body.style.color      = t.color;
  document.body.style.textShadow = t.glow;
  localStorage.setItem('termTheme', name);
  return true;
}
applyTheme(localStorage.getItem('termTheme') || 'green');

// ── Man pages ─────────────────────────────────────────────────────────────────
const manPages = {
  about:                    'Displays bio and professional summary.',
  resume:                   'Opens the resume PDF in a new tab.',
  projects:                 'Lists projects with descriptions and links.',
  experience:               'Shows full work experience history.',
  skills:                   'Displays the complete tech stack.',
  contact:                  'Shows contact info with copy-to-clipboard.',
  research_and_publications:'Shows published research paper details.',
  neofetch:                 'Displays system-style info in a visual layout.',
  whoami:                   'Returns a short identity statement.',
  history:                  'Lists all commands entered this session.',
  date:                     'Displays current date and time.',
  banner:                   'Displays the ASCII name banner.',
  clear:                    'Clears all terminal output.',
  matrix:                   'Starts Matrix rain animation. Press any key to stop.',
  theme:                    'Switches terminal color. Usage: theme [green|amber|white]',
  sudo:                     'Grants superuser access. (Just kidding.)',
  man:                      'Displays manual for a command. Usage: man [command]',
};

// ── Boot sequence ─────────────────────────────────────────────────────────────
async function bootSequence() {
  input.disabled = true;
  const lines = [
    '<span class="text-gray-500">BIOS v1.0.1  ..................................  <span class="text-green-400">[ OK ]</span></span>',
    '<span class="text-gray-500">Loading kernel  ...............................  <span class="text-green-400">[ OK ]</span></span>',
    '<span class="text-gray-500">Mounting filesystem  ..........................  <span class="text-green-400">[ OK ]</span></span>',
    '<span class="text-gray-500">Starting network  .............................  <span class="text-green-400">[ OK ]</span></span>',
    '<span class="text-gray-500">Launching RoshanOS  ...........................  <span class="text-green-400">[ OK ]</span></span>',
    '',
    ASCII_BANNER,
    '',
    '<span class="text-gray-400">Backend-Oriented Full Stack Developer  ·  Aadija Technologies</span>',
    '',
    'Type <span class="text-yellow-400">help</span> to see all commands.  Press <span class="text-yellow-400">Tab</span> to autocomplete.',
    '<hr>',
  ];
  for (const line of lines) {
    output.innerHTML += line + '\n';
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(100);
  }
  input.disabled = false;
  input.focus();
}

bootSequence();

// ── All known commands (for Tab autocomplete) ─────────────────────────────────
const ALL_CMDS = [...Object.keys(commands), 'man', 'theme'];

// ── Input handler ─────────────────────────────────────────────────────────────
input.addEventListener("keydown", async (e) => {

  if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
    keySound.currentTime = 0;
    keySound.play().catch(() => {});
  }

  // ── Execute ────────────────────────────────────────────────────────────────
  if (e.key === "Enter") {
    const raw     = input.value.trim();
    const command = raw.toLowerCase();
    input.value   = "";

    if (raw) {
      commandHistory.push(raw);
      localStorage.setItem('termHistory', JSON.stringify(commandHistory));
      historyIndex = commandHistory.length;
    }

    output.innerHTML += `\n<span class="text-gray-500">❯</span> ${raw}\n`;

    // man [cmd]
    if (command.startsWith('man ')) {
      const target = command.slice(4).trim();
      const page   = manPages[target];
      output.innerHTML += (page
        ? `📖 <span class="text-yellow-400">${target}</span>: ${page}`
        : `No manual entry for '${target}'.`) + '\n<hr>\n';

    // theme [name]
    } else if (command.startsWith('theme ')) {
      const name = command.slice(6).trim();
      if (applyTheme(name)) {
        output.innerHTML += `Theme set to <span class="text-yellow-400">${name}</span>.\n<hr>\n`;
      } else {
        output.innerHTML += `Unknown theme. Available: <span class="text-yellow-400">green · amber · white</span>\n<hr>\n`;
      }

    // easter egg
    } else if (command.startsWith('rm ') || command === 'rm') {
      output.innerHTML += '<span class="text-red-400">💥 rm: Permission denied. Nice try.</span>\n<hr>\n';

    } else if (command === 'sudo') {
      await printLines(commands.sudo);

    // registered commands
    } else if (commands[command] !== undefined) {
      const val = commands[command];

      if (val === "__clear__") {
        output.innerHTML = '';

      } else if (val === "__matrix__") {
        output.innerHTML += 'Entering the Matrix... <span class="text-gray-500">(press any key to exit)</span>\n';
        await sleep(400);
        startMatrix();

      } else if (command === 'resume') {
        window.open("Roshan_Kumar_Gupta_Resume .pdf", "_blank");
        await printLines(commands.resume);

      } else {
        const result = typeof val === 'function' ? val() : val;
        await printLines(result);
      }

    } else if (raw !== '') {
      output.innerHTML += `<span class="text-red-400">command not found: ${raw}</span>  —  type <span class="text-yellow-400">help</span> for available commands.\n`;
    }

    window.scrollTo(0, document.body.scrollHeight);
  }

  // ── History navigation ─────────────────────────────────────────────────────
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) { historyIndex--; input.value = commandHistory[historyIndex]; }
    e.preventDefault();
  }
  if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) { historyIndex++; input.value = commandHistory[historyIndex]; }
    else { input.value = ""; historyIndex = commandHistory.length; }
    e.preventDefault();
  }

  // ── Tab autocomplete ───────────────────────────────────────────────────────
  if (e.key === "Tab") {
    e.preventDefault();
    const current = input.value.trim().toLowerCase();
    if (!current) return;
    const matches = ALL_CMDS.filter(cmd => cmd.startsWith(current));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      output.innerHTML += `\n${matches.join('    ')}\n`;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
});
