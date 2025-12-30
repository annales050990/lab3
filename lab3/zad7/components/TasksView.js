export function TasksView() {
  return `
  <section class="tasks">
    <h2>Plan treningowy 🥊</h2>

    <form id="task-form">
      <input
        type="text"
        id="task-title"
        placeholder="Nazwa treningu (np. Technika bokserska)"
        required
      >

      <select id="task-category">
        <option value="Początkująca">Grupa początkująca</option>
        <option value="Średniozaawansowana">Grupa średniozaawansowana</option>
        <option value="Zaawansowana">Grupa zaawansowana</option>
        <option value="Kobiety">Grupa kobiet</option>
      </select>

      <select id="task-priority">
        <option value="Niska">Niska intensywność</option>
        <option value="Średnia">Średnia intensywność</option>
        <option value="Wysoka">Wysoka intensywność</option>
      </select>

      <select id="task-day">
        <option value="Poniedziałek">Poniedziałek</option>
        <option value="Wtorek">Wtorek</option>
        <option value="Środa">Środa</option>
        <option value="Czwartek">Czwartek</option>
        <option value="Piątek">Piątek</option>
      </select>

      <select id="task-sort">
        <option value="day">Dzień</option>
        <option value="priority">Intensywność</option>
        <option value="title">Nazwa</option>
      </select>


      <button type="submit">➕ Dodaj trening</button>
    </form>

    <div id="task-filters">
      <button data-filter="all">Wszystkie</button>
      <button data-filter="active">Aktywne</button>
      <button data-filter="completed">Ukończone</button>

      <input
        type="text"
        id="task-search"
        placeholder="Szukaj treningu..."
      >
    </div>

    <ul id="task-list"></ul>

    <div class="task-data-buttons">
      <button id="export-tasks">Eksportuj treningi</button>
      <input type="file" id="import-tasks" accept=".json">
    </div>


  </section>
  `;
}
