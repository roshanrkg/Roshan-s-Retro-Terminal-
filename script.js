const input = document.getElementById("commandInput");
const output = document.getElementById("output");

const commands = {
  help: `Available commands:\nabout, resume, projects, experience, contact, clear`,
  skills: `Programming Languages: JavaScript, Java.
Backend Technologies: Node.js, Express.js.
Databases: MongoDB, Oracle DB, Redis.
Frontend Technologies: HTML,Tailwind CSS(basic) , EJS.
Tools & Methodologies: NPM,Render, Railway,Github.
Soft Skills: Communication, Teamwork, Leadership, Problem-Solving.`,
  about: "Aspiring Backend Engineer with strong JavaScript skills, specializing in building scalable APIs using Node.js, Express.js, and modern databases. Passionate about high-performance systems and currently learning Golang with the Gin framework.",
  resume: "Opening resume in new tab...",
  projects: `🧑‍💻 Projects:\n- Realtime Device Tracker (Websocket project) <a href="https://real-time-device-tracking-jv9r.onrender.com/" class=" text-blue-400" target="_blank">🔗</a> \n A real-time map-based tracking system inspired by Uber/Zomato Using websockets and leaflet.js. \n \n- The Bag Company ( E commerce Platform )<a href="https://github.com/roshanrkg/The-Bag-Company" class=" text-blue-400" target="_blank">🔗</a>\n A dynamic and fully functional e-commerce platform with the Tech Stack: Node.js, Express.js, MongoDB, Tailwind CSS, EJS.\n \n- Task Manager (First beginner project) \n A fully functional Task manager with user based authorizaton and authentication using JWT , with capabilities to perform all CRUD operations.`,
  experience: "Work Experience:\n Not employed yet — but learning every day, building cool stuff, and preparing for real-world dev challenges..",
  contact: `📧 Email: <a href="mailto:roshanguptarkg@gmail.com" class="underline text-blue-400" target="_blank">roshanguptarkg@gmail.com</a> \n🔗 LinkedIn: <a href="https://www.linkedin.com/in/roshan-kumar-gupta-a979b626b/" class="underline text-blue-400" target="_blank">linkedin</a> \n🔗 Github: <a href="https://github.com/roshanrkg" class="underline text-blue-400" target="_blank">Github</a>`,  clear: "clear"
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim().toLowerCase();
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
});

