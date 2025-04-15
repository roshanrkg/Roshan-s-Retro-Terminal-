const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const keySound = document.getElementById("key-sound");

const commands = {
  help: `Available commands:\nabout, resume, projects, experience, contact, skills, clear`,
  skills: `Programming Languages: JavaScript, Java.
Backend Technologies: Node.js, Express.js.
Databases: MongoDB, Oracle DB, Redis.
Frontend Technologies: HTML,Tailwind CSS(basic) , EJS.
Tools & Methodologies: NPM,Render, Railway,Github.
Soft Skills: Communication, Teamwork, Leadership, Problem-Solving.`,
  about: "Aspiring Backend Engineer with strong JavaScript skills, specializing in building scalable APIs using Node.js, Express.js, and modern databases. Passionate about high-performance systems and currently learning Golang with the Gin framework.",
  resume: "Opening resume in new tab...",
  projects: `🧑‍💻 Projects:
- Realtime Device Tracker <a href="https://real-time-device-tracking-jv9r.onrender.com/" class="text-blue-400" target="_blank">🔗</a> 
A real-time map-based tracking system inspired by Uber/Zomato.

- The Bag Company <a href="https://github.com/roshanrkg/The-Bag-Company" class="text-blue-400" target="_blank">🔗</a> 
Dynamic E-commerce platform built with Node.js, MongoDB, TailwindCSS, EJS.

- Task Manager 
JWT-based task manager with CRUD operations.`,
  experience: "Work Experience:\nNot employed yet — but learning every day, building cool stuff, and preparing for real-world dev challenges.",
  contact: `📧 Email: <a href="mailto:roshanguptarkg@gmail.com" class="underline text-blue-400" target="_blank">roshanguptarkg@gmail.com</a>
🔗 LinkedIn: <a href="https://www.linkedin.com/in/roshan-kumar-gupta-a979b626b/" class="underline text-blue-400" target="_blank">linkedin</a>
🔗 Github: <a href="https://github.com/roshanrkg" class="underline text-blue-400" target="_blank">Github</a>`,
  clear: "clear"
};

let commandHistory = [];
let historyIndex = -1;

input.addEventListener("keydown", (e) => {
  // Play sound
  if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
    keySound.currentTime = 0;
    keySound.play();
  }

  // Command execution
  if (e.key === "Enter") {
    const command = input.value.trim().toLowerCase();
    if (command) {
      commandHistory.push(command);
      historyIndex = commandHistory.length;
    }

    output.innerHTML += `\n> ${command}\n`;

    if (commands[command]) {
      if (command === "resume") {
        window.open("Roshan_Kumar_Gupta Resume-1.pdf", "_blank");
        output.innerHTML += `${commands[command]}\n`;
      } else if (command === "clear") {
        output.innerHTML = "";
      } else {
        output.innerHTML += `${commands[command]}\n`;
      }
    } else {
      output.innerHTML += "❌ Unknown command. Type 'help' to see available ones.\n";
    }

    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }

  // Command history
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
    }
    e.preventDefault();
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
    } else {
      input.value = "";
      historyIndex = commandHistory.length;
    }
    e.preventDefault();
  }

  // Autocomplete with Tab
  if (e.key === "Tab") {
    e.preventDefault();
    const current = input.value.trim().toLowerCase();
    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(current));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      output.innerHTML += `\n${matches.join("    ")}\n`;
    }
  }
});