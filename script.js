const skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
];
const input = document.getElementById("skillInput");
const recommendedSkillsContainer = document.getElementById(
  "recommendedSkillsContainer"
);
const recommendedSkills = document.getElementById("recommendedSkills");
const selectedSkillsContainer = document.getElementById("selectedSkills");
const recommendedTitle = document.querySelector(".recommended-title");

input.addEventListener("input", function () {
  const query = input.value.toLowerCase();
  recommendedSkills.innerHTML = "";
  if (query) {
    recommendedTitle.classList.add("hidden");
    recommendedSkills.classList.remove("grid");
    recommendedSkills.classList.add("column");
    const matches = skills.filter((skill) =>
      skill.toLowerCase().includes(query)
    );
    if (matches.length) {
      matches.forEach((skill) => {
        const div = document.createElement("div");
        div.textContent = skill;
        div.addEventListener("click", () => addSkill(skill));
        recommendedSkills.appendChild(div);
      });
    } else {
      const div = document.createElement("div");
      div.textContent = `Добавить "${input.value}"`;
      div.addEventListener("click", () => addSkill(input.value));
      recommendedSkills.appendChild(div);
    }
  } else {
    recommendedSkills.classList.remove("column");
    recommendedSkills.classList.add("grid");
    skills.forEach((skill) => {
      const div = document.createElement("div");
      div.textContent = skill;
      div.addEventListener("click", () => addSkill(skill));
      recommendedSkills.appendChild(div);
    });
    recommendedTitle.classList.remove("hidden");
  }
  recommendedSkillsContainer.classList.remove("hidden");
});

input.addEventListener("focus", () => {
  if (!input.value) {
    recommendedSkills.innerHTML = "";
    recommendedSkills.classList.remove("column");
    recommendedSkills.classList.add("grid");
    skills.forEach((skill) => {
      const div = document.createElement("div");
      div.textContent = skill;
      div.addEventListener("click", () => addSkill(skill));
      recommendedSkills.appendChild(div);
    });
    recommendedSkillsContainer.classList.remove("hidden");
    recommendedTitle.classList.remove("hidden");
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".skill-input")) {
    recommendedSkillsContainer.classList.add("hidden");
  }
});

function addSkill(skill) {
  const skillElement = document.createElement("div");
  skillElement.className = "selected-skill";
  skillElement.innerHTML = `<span>${skill}</span> <svg class="remove-skill" onclick="removeSkill(this)" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7277 11.3137L17.6774 6.36396L16.2632 4.94975L11.3135 9.8995L6.36373 4.94975L4.94951 6.36396L9.89926 11.3137L4.94952 16.2635L6.36373 17.6777L11.3135 12.7279L16.2632 17.6777L17.6774 16.2635L12.7277 11.3137Z" fill="#fff"/>
  </svg>
   `;
  selectedSkillsContainer.appendChild(skillElement);
  input.value = "";
  recommendedSkillsContainer.classList.add("hidden");
}

function removeSkill(element) {
  selectedSkillsContainer.removeChild(element.parentElement);
}
