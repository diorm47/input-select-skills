const input = document.getElementById("skillInput");
const addSkillButton = document.getElementById("addSkillButton");
const recommendedSkillsContainer = document.getElementById(
  "recommendedSkillsContainer"
);
const recommendedSkills = document.getElementById("recommendedSkills");
const selectedSkillsContainer = document.getElementById("selectedSkills");
const recommendedTitle = document.querySelector(".recommended-title");

let activeIndex = -1;
let selectedSkills = [];
let allSkills = Array.from(recommendedSkills.children).map(
  (item) => item.dataset.skill
);

input.addEventListener("input", function () {
  const query = input.value.toLowerCase();
  updateRecommendedSkills(query);
});

input.addEventListener("focus", () => {
  if (!input.value) {
    updateRecommendedSkills();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".skill-input")) {
    recommendedSkillsContainer.classList.add("hidden");
  }
});

input.addEventListener("keydown", (event) => {
  const items = Array.from(recommendedSkills.children);
  if (event.key === "ArrowDown") {
    activeIndex = (activeIndex + 1) % items.length;
    updateActiveItem(items);
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    updateActiveItem(items);
    event.preventDefault();
  } else if (event.key === "Enter") {
    if (activeIndex >= 0 && activeIndex < items.length) {
      const selectedItem = items[activeIndex];
      if (selectedItem.classList.contains("add-new-skill")) {
        addSkill(input.value);
      } else {
        addSkill(selectedItem.textContent);
      }
    } else {
      addSkill(input.value);
    }
    event.preventDefault();
    recommendedSkillsContainer.classList.add("hidden");
  }
});

addSkillButton.addEventListener("click", () => {
  addSkill(input.value);
  recommendedSkillsContainer.classList.add("hidden");
});

function updateActiveItem(items) {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
  });
}

function updateRecommendedSkills(query = "") {
  const items = allSkills.filter((skill) => !selectedSkills.includes(skill));
  activeIndex = -1;

  recommendedSkills.innerHTML = "";

  if (query) {
    recommendedTitle.classList.add("hidden");
    recommendedSkills.classList.remove("grid");
    recommendedSkills.classList.add("column");

    const matches = items.filter((skill) =>
      skill.toLowerCase().includes(query)
    );

    if (matches.length) {
      matches.forEach((skill) => {
        const item = createSkillItem(skill);
        recommendedSkills.appendChild(item);
      });
    }

    if (matches.length === 0) {
      const div = document.createElement("div");
      div.className = "skill-item add-new-skill";
      div.textContent = `Добавить "${input.value}"`;
      div.addEventListener("click", () => {
        addSkill(input.value);
        recommendedSkillsContainer.classList.add("hidden");
      });
      recommendedSkills.appendChild(div);
      addSkillButton.classList.remove("hidden");
    } else {
      addSkillButton.classList.add("hidden");
    }
  } else {
    addSkillButton.classList.add("hidden");
    recommendedSkills.classList.remove("column");
    recommendedSkills.classList.add("grid");

    items.forEach((skill) => {
      const item = createSkillItem(skill);
      recommendedSkills.appendChild(item);
    });
    recommendedTitle.classList.remove("hidden");
  }
  recommendedSkillsContainer.classList.remove("hidden");
}

function createSkillItem(skill) {
  const item = document.createElement("div");
  item.className = "skill-item";
  item.dataset.skill = skill;
  item.textContent = skill;
  item.addEventListener("click", () => {
    addSkill(skill);
    recommendedSkillsContainer.classList.add("hidden");
  });
  return item;
}

function addSkill(skill) {
  if (!selectedSkills.includes(skill) && skill.trim()) {
    const skillElement = document.createElement("div");
    skillElement.className = "selected-skill";
    skillElement.innerHTML = `<span>${skill}</span> 
      <svg class="remove-skill" data-skill="${skill}" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7277 11.3137L17.6774 6.36396L16.2632 4.94975L11.3135 9.8995L6.36373 4.94975L4.94951 6.36396L9.89926 11.3137L4.94952 16.2635L6.36373 17.6777L11.3135 12.7279L16.2632 17.6777L17.6774 16.2635L12.7277 11.3137Z" fill="#fff"/>
      </svg>`;
    selectedSkillsContainer.appendChild(skillElement);
    selectedSkills.push(skill);
    input.value = "";
    updateRecommendedSkills();
  }
}

selectedSkillsContainer.addEventListener("click", function (event) {
  if (event.target.closest(".remove-skill")) {
    removeSkill(event.target.closest(".remove-skill"));
  }
});

function removeSkill(element) {
  const skill = element.getAttribute("data-skill");
  selectedSkills = selectedSkills.filter((s) => s !== skill);
  selectedSkillsContainer.removeChild(element.parentElement);
  updateRecommendedSkills(input.value);
}

function getSelectedSkills() {
  return selectedSkills;
}
