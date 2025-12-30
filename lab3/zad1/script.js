console.log('Skrypt załadowany!');

const imie = "Ania";//String
const wiek = 35;//Number
const czyStudent = true;//Boolean
const jezykiProgramowania = ["JavaScript", "Java", "C#"];//Array
const osoba = {
    imie: "Ania",
    wiek: 35,
    miasto: "Krosno"
};//Object
const brakWartosci = null;//null
let nieZdefiniowana;//undefined

console.log(typeof imie);//string
console.log(typeof wiek);//number
console.log(typeof czyStudent);//boolean
console.log(typeof jezykiProgramowania);//object
console.log(typeof osoba);//object
console.log(typeof brakWartosci);//object
console.log(typeof nieZdefiniowana);//undefined

const a = 10;
const b = 3;

console.log(a + b);//dodawanie
console.log(a - b);//odejmowanie
console.log(a * b);//mnożenie
console.log(a / b);//dzielenie
console.log(a % b);//reszta z dzielenia
console.log(a ** b);//potęgowanie

console.log('5' == 5);//true - porównuje wartości
console.log('5' === 5);//false - porównuje wartości i typ

const pelnoletni = wiek >= 8;
const maLegitymacje = true;

console.log(pelnoletni && maLegitymacje); //AND
console.log(pelnoletni || maLegitymacje);//OR
console.log(!pelnoletni)//NOT