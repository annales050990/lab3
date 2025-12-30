//Własna Promise (symulacja ładowania)
function fakeLoad(name, delay = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.1
            ? resolve(`Załadowano: ${name}`)
            : reject(`Błąd ładowania: ${name}`);
        }, delay);
    });
}

//then / catch / finally
fakeLoad("Dane A")
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log("Operacja zakończona"));

//Promise.all
Promise.all([
    fakeLoad("Dane 1", 1000),
    fakeLoad("Dane 2", 1500),
    fakeLoad("Dane 3", 500)
]).then(results => console.log("ALL:", results));

//Promise.race - timeout
function timeout(ms) {
    return new Promise((_, reject) =>
        setTimeout(() => reject("Timeout!"), ms)
    );
}
Promise.race([
    fakeLoad("Wolne dane", 2000),
    timeout(1000)
]).catch(console.error);

//ASYNC / AWAIT
async function asyncSequence() {
    try {
        const a = await fakeLoad("Sekwencja 1", 800);
        const b = await fakeLoad("Sekwencja 2", 800);
        console.log(a,b);
    } catch (err) {
        console.error("Błąd sekwencji:", err);
    }
}

async function asyncParallel() {
    try {
        const results = await Promise.all([
            fakeLoad("Równolegle 1"),
            fakeLoad("Równolegle 2")
        ]);
        console.log("Równolegle:", results);
    } catch (err) {
        console.error(err);
    }
}

asyncSequence();
asyncParallel();

//Fetch API (JSONPlaceholder)
const app = document.createElement("section");
app.innerHTML = `
    <h2>Użytkownicy (Fetch API)</h2>
    <button id="refresh">Refresh</button>
    <div id="loader">Ładowanie...</div>
    <div id="error"></div>
    <table id="users"></table>
    <div id="posts"></div>
    `;
document.body.appendChild(app);

const loader = document.getElementById("loader");
const errorBox = document.getElementById("error");
const table = document.getElementById("users");
const postsBox = document.getElementById("posts");

async function fetchUsers() {
    loader.style.display = "block";
    errorBox.textContent = "";
    table.innerHTML = "";
    postsBox.innerHTML = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Błąd serwera");

        const users = await response.json();
        renderUsers(users);
    } catch (err) {
        errorBox.textContent = "Błąd pobierania danych";
    } finally {
        loader.style.display = "none";
    }
}

function renderUsers(users) {
    table.innerHTML = `
        <tr>
            <th>Imię</th>
            <th>Email</th>
            <th>Miasto</th>
        </tr>
    `;

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
        `;
        row.addEventListener("click", () => fetchPosts(user.id));
        table.appendChild(row);
    });
}

async function fetchPosts(userId) {
    postsBox.innerHTML = "Ładowanie postów...";
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        if (!res.ok) throw new Error("Błąd postów");

        const posts = await res.json();
        postsBox.innerHTML = "<h3>Posty użytkowników</h3>";
        posts.forEach(p => {
            postsBox.innerHTML += `<p><strong>${p.title}</strong></p>`;
        });
    } catch {
        postsBox.textContent = "Błąd ładowania postów";
    }   
}

document.getElementById("refresh").addEventListener("click", fetchUsers);

//Start
fetchUsers();