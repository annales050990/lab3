import { HomeView } from '../components/HomeView.js';
import { AboutView } from '../components/AboutView.js';
import { ContactView } from '../components/ContactView.js';
import { TasksView } from '../components/TasksView.js';
import { CompletedView } from '../components/CompletedView.js';
import { initTasksPage } from './tasks.js';

export function handleRoute() {
  const app = document.getElementById('app');
  const route = location.hash || "#/";

  switch (route) {
    case "#/about":
      app.innerHTML = AboutView();
      break;

    case "#/contact":
      app.innerHTML = ContactView();
      break;

    case "#/tasks":
      app.innerHTML = TasksView();
      initTasksPage();
      break;

    case "#/completed":
      app.innerHTML = CompletedView();
      initTasksPage("completed");

      // automatycznie pokaż tylko ukończone
      setTimeout(() => {
        document.querySelector('[data-filter="completed"]')?.click();
      }, 0);
      break;

    case "#/":
    default:
      app.innerHTML = HomeView();
  }
}
