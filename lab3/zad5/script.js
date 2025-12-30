//Pobieranie formularza
const form = document.querySelector("form");
const submitBtn = form.querySelector("button[type='submit']");

//Regex
const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź\s]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{9}$/;

//Funkcje pomocnicze
function showError(input, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");

    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error")) {
        error = document.createElement("div");
        error.className = "error";
        input.after(error);
    }
    error.textContent = message;    
}

function showSuccess(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");

    const error = input.nextElementSibling;
    if (error && error.classList.contains("error")) {
        error.remove();
    }
}

//Walidacja pól
function validateName() {
    const input = form.imieNazwisko;
    if (!nameRegex.test(input.value.trim())) {
        showError(input, "Imię i nazwisko: min. 2 litery, tylko litery");
        return false;
    }
    showSuccess(input);
    return true;
}

function validateEmail() {
    const input = form.email;
    if (!emailRegex.test(input.value.trim())) {
        showError(input, "Nieprawidłowy adres email");
        return false;
    }
    showSuccess(input);
    return true;
}

function validatePhone() {
    const input = form.telefon;
    if (input.value && !phoneRegex.test(input.value.replace(/\D/g, ""))) {
        showError(input, "Telefon musi mieć 9 cyfr");
        return false;
    }
    showSuccess(input);
    return true;
}

function validateMessage() {
    const input = form.wiadomosc;
    if (input.value.trim().lenght < 10) {
        showError(input, "Wiadomość musi mieć min. 10 znaków");
        return false;
    }
    showSuccess(input);
    return true;
}

function validateCheckbox() {
    const input = form.regulamin;
    if (!input.checked) {
        showError(input, "Musisz zaakceptować regulamin");
        return false;
    }
    showSuccess(input);
    return true;
}

//Walidacja w czasie rzeczywistym
form.imieNazwisko.addEventListener("input", validateName);
form.email.addEventListener("input", validateEmail);
form.telefon.addEventListener("input", validatePhone);
form.wiadomosc.addEventListener("blur", validateMessage);
form.regulamin.addEventListener("change", validateCheckbox);

//Obsługa submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = 
        validateName() &
        validateEmail() &
        validatePhone() &
        validateMessage() &
        validateCheckbox();

    if (!valid) return;

    //FormData API
    const formData = new FormData(form);
    const dataObject = {};

    formData.forEach((value, key) => {
        if (dataObject[key]) {
            if (!Array.isArray(dataObject[key])) {
                dataObject[key] = [dataObject[key]];
            }
            dataObject[key].push(value);
        } else {
            dataObject[key] = value;
        }
    });

    console.log("Dane formularza:", dataObject);

    //UX wysyłki
    submitBtn.disabled = true;
    submitBtn.textContent = "Wysyłanie...";

    setTimeout(() => {
        alert("Formularz wysłany poprawnie!");
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Wyślij";

        form.querySelectorAll(".valid").forEach(el => el.classList.remove("valid"));
    }, 1500);
});