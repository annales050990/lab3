//Function Declaration
function greetDeclaraction(name) {
    console.log(`Hejka, ${name} (Function Declaration)`);
}
greetDeclaraction("Ania");

//Function Expression
const greetExpression = function(name) {
    console.log(`Hejka, ${name} (Function Expression)`);
};
greetExpression("Ania");

//Arrow Fuction
const greetArrow = (name) => {
    console.log(`Hejka, ${name} (Arrow Function)`);
};
greetArrow("Ania");

// 4. IIFE (Immediately Invoked Function Expression)
(function(name) {
    console.log(`Hejka, ${name} (IIFE)`);
})("Ania");

//Parametry domyślne
function iloczyn(a = 2, b = 3) {
    return a * b;
}
console.log(iloczyn());
console.log(iloczyn(4, 5));

//Parametr rest (...args)
function sumaWszystkich(...args) {
    return args.reduce((acc, val) => acc + val, 0);
}
console.log(sumaWszystkich(1, 2, 3, 4));

//Zwracanie obiektu
function stworzOsobe(imie, wiek) {
    return {imie: imie, wiek: wiek, greet() {
        console.log(`Hej, Jestem ${this.imie}`);
    }};
}
const osoba = stworzOsobe("Ania", 35);
console.log(osoba);
osoba.greet();

//Funkcja przyjmująca callback
function procesNumer(numer, callback) {
    return callback(numer);
}
console.log(procesNumer(5, (x) => x *2));

//Higher-order function (funkcja zwraca inną funkcję)
function zrobMnoznik(czynnik) {
    return function(numer) {
        return numer * czynnik;
    };
}
const wynik = zrobMnoznik(2);
console.log(wynik(5));

//Różnica var, let, const w pętli

// 1. Różnica var, let, const w pętli
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(`var i: ${i}`), 100); // wypisze 3 3 3
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(`let j: ${j}`), 100); // wypisze 0 1 2
}

// const w pętli: wartość nie może być zmieniona, ale można użyć w obrębie bloku
for (let k = 0; k < 3; k++) {
    const x = k * 2;
    console.log(`const x: ${x}`);
}

// 2. Zasięg blokowy
{
    let blockVar = "Istnieję tylko w tym bloku";
    console.log(blockVar);
}
// console.log(blockVar); // błąd! nie istnieje poza blokiem

// 3. Closure – licznik
function createCounter() {
    let count = 0; // zmienna w zewnętrznym zasięgu
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

/* Wyjaśnienie closure:
Funkcja wewnętrzna "zamyka się" na zmienne z zewnętrznego zasięgu (tu: count).
Dzięki temu stan zmiennej count jest pamiętany między wywołaniami funkcji.
*/
