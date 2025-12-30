export function ContactView() {
  return `
  <section>
    <h2>Kontakt</h2>
    <form>
      <input type="text" placeholder="Imię" required>
      <input type="email" placeholder="Email" required>
      <button>Wyślij</button>
    </form>
  </section>
  `;
}
