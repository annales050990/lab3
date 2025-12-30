const KEY = "tasks";

/* ====== STAN ====== */
let tasks = JSON.parse(localStorage.getItem(KEY)) || [];
let searchQuery = "";
let viewFilter = "all";
let sortBy = "day";

/* ====== STORAGE ====== */
function saveTasks() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

/* ====== API ====== */
export function getTasks() {
  return tasks;
}

export function addTask(task) {
  tasks.push(task);
  saveTasks();
}

export function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
}

export function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
}

/* ====== RENDER ====== */
function renderTasks() {
  const list = document.getElementById("task-list");
  if (!list) return;

  list.innerHTML = "";

  // Mapa do sortowania dni tygodnia
  const dayOrder = {
    "Poniedziałek": 1,
    "Wtorek": 2,
    "Środa": 3,
    "Czwartek": 4,
    "Piątek": 5
  };

  let filtered = tasks
    .filter(task => {
      if (viewFilter === "active") return !task.completed;
      if (viewFilter === "completed") return task.completed;
      return true;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchQuery)
    );

  if (filtered.length === 0) {
    list.innerHTML = "<li>Brak treningów</li>";
    return;
  }

  filtered.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "priority") return a.priority.localeCompare(b.priority);
    if (sortBy === "day") return dayOrder[a.day] - dayOrder[b.day];
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.title}</strong><br>
      Grupa: ${task.category}<br>
      Dzień: ${task.day}<br>
      Intensywność: ${task.priority}<br>
      Status: ${task.completed ? "✔ ukończony" : "⏳ aktywny"}
      <div class="actions">
        ${!task.completed ? `<button data-toggle="${task.id}">✔</button>` : ""}
        <button data-delete="${task.id}">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}

/* ====== INIT ====== */
export function initTasksPage(filter = "all") {
  viewFilter = filter;
  searchQuery = "";

  renderTasks();

  const form = document.getElementById("task-form");
  form?.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const category = document.getElementById("task-category").value;
    const priority = document.getElementById("task-priority").value;
    const day = document.getElementById("task-day").value;

    if (!title) {
      showToast("Podaj nazwę treningu");
      return;
    }

    addTask({
      id: Date.now(),
      title,
      category,
      priority,
      day,
      completed: false
    });

    form.reset();
    renderTasks();
    showToast("Dodano trening");
  });

  /* Filtry */
  document.querySelectorAll("#task-filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      viewFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  /* Sortowanie */
  document.getElementById("task-sort")?.addEventListener("change", e => {
    sortBy = e.target.value;
    renderTasks();
  });

    /* Eksport / Import */
    document.getElementById("export-tasks")?.addEventListener("click", () => {
        exportTasks();
    });
    document.getElementById("import-tasks")?.addEventListener("change", e => {
        const file = e.target.files[0];
    if (file) importTasks(file);
        });

  /* Wyszukiwanie */
  document.getElementById("task-search")?.addEventListener("input", e => {
    searchQuery = e.target.value.toLowerCase();
    renderTasks();
  });

  /* Akcje toggle/delete */
  document.addEventListener("click", e => {
    if (e.target.dataset.toggle) {
      toggleTask(Number(e.target.dataset.toggle));
      renderTasks();
    }
    if (e.target.dataset.delete) {
      if (confirm("Usunąć trening?")) {
        deleteTask(Number(e.target.dataset.delete));
        renderTasks();
      }
    }
  });
}

/* ====== EKSPORT ====== */
export function exportTasks() {
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "treningi.json";
  a.click();

  URL.revokeObjectURL(url);
}

/* ====== IMPORT ====== */
export function importTasks(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        tasks = imported;
        saveTasks();
        renderTasks();
        showToast("Wczytano treningi z pliku");
      } else {
        showToast("Nieprawidłowy format pliku");
      }
    } catch {
      showToast("Błąd odczytu pliku JSON");
    }
  };
  reader.readAsText(file);
}


/* ====== TOAST ====== */
export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}