//Czy liczba jest parzysta?
function czyParzysta(liczba) {
    if (liczba % 2 === 0) {
        console.log("Liczba jest parzysta");
    } else {
        console.log("Liczba jest nieparzysta")
    }
}

czyParzysta(7)

//Kalkulator ocen
function ocena(punkty) {
    if (punkty >= 90) {
        console.log("Bardzo dobry");
    } else if (punkty >= 80) {
        console.log("Dobry");
    } else if (punkty >= 65) {
        console.log("Dostateczny");
    } else if (punkty >= 50) {
        console.log("Dopuszczający");
    } else {
        console.log("Niedostateczny");
    }
}
ocena(82);

//Dni tygodnia
function dzienTygodnia(numer) {
    switch(numer) {
        case 1:
            console.log("Poniedziałek");
            break;
        case 2:
            console.log("Wtorek");
            break;
        case 3:
            console.log("Środa");
            break;
        case 4:
            console.log("Czwartek");
            break;
        case 5:
            console.log("Piątek");
            break;
        case 6:
            console.log("Sobota");
            break;
        case 7:
            console.log("Niedziela");
            break;
        default:
            console.log("Nieprawidłowy numer dnia");
    }
}
dzienTygodnia(5);

//Czy pełnoletni?
const wiekOsoby = 17;
const komunikat = wiekOsoby >= 18 ? "Pełnoletni" : "Niepełnoletni";
console.log(komunikat);

//Liczby 1-10
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

//Liczby 10-0
let licznik = 10;

while (licznik >= 0) {
    console.log(licznik);
    licznik --;
}

//Iteracja tablicy
const kolory = ["Czerwony", "Zielony", "Niebieski"];

for (const kolor of kolory) {
    console.log(kolor);
}

//Iteracja obietów
const auto = {
    marka: "Fiat",
    model: "Bravo",
    rok: 2009
};
for (const klucz in auto) {
    console.log(klucz+ ": " + auto[klucz]);
}

//Break i continue
for(let i = 1; i<= 10; i++) {
    if (i === 3) continue; //pomija 3
    if (i === 8) break; //przerywa pętle
    console.log(i);
}

//Tabliczka mnożenia
for (let i = 1; i <= 10; i++) {
    let wiersz = "";
    for (let j = 1; j <= 10; j++) {
        wiersz += (i * j).toString().padStart(4, " ");
    }
    console.log(wiersz);
}