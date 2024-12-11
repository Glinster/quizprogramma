
//Ophalen van alle benodigde elementen met Id in variabelen

var pagina1 = document.getElementById("js--pagina1");
var inputNaam = document.getElementById("js--inputNaam");
var buttonNaam = document.getElementById("js--buttonNaam");

var pagina2 = document.getElementById("js--pagina2");
var naam = document.getElementById("js--naamPagina2");
var thema1 = document.getElementById("js--thema1");
var thema2 = document.getElementById("js--thema2");
var thema3 = document.getElementById("js--thema3");

var pagina3 = document.getElementById("js--pagina3");
// var vraag = document.getElementById("js--vraagPagina3");
var timer = document.getElementById("js--timer");
var minuten = 0;
var secondes = 16;
var interval
var buttonA = document.getElementById("js--buttonA");
var buttonB = document.getElementById("js--buttonB");
var buttonC = document.getElementById("js--buttonC");
var buttonD = document.getElementById("js--buttonD");


function startPagina1() {
    pagina1.style.display = "block";
    pagina3.style.display = "none";
    pagina2.style.display = "none";

}

startPagina1();



function naamToevoegen() { //functie: titel en wachtwoord toevoegen aan set1
    if (inputNaam.value === "") { //controleren of het eerste inputveld leeg is
        inputNaam.placeholder = "Invoer vereist!";//geeft melding bij foute invoer
    }



    else {
        naam.innerText = inputNaam.value; //weergave titel heeft dezelfde waarde als is ingevoerd in inputveld

        pagina1.style.display = "none";
        pagina3.style.display = "none";
        pagina2.style.display = "block";




    }

};

buttonNaam.onclick = naamToevoegen;

function thema1doorverwijzen() {
    pagina1.style.display = "none";  // Verberg pagina 1
    pagina2.style.display = "none";  // Verberg pagina 2
    pagina3.style.display = "block"; // Toon pagina 3
}

// Event listener koppelen aan button
thema1.addEventListener("click", thema1doorverwijzen);

function thema2doorverwijzen() {
    pagina1.style.display = "none";  // Verberg pagina 1
    pagina2.style.display = "none";  // Verberg pagina 2
    pagina3.style.display = "block"; // Toon pagina 3
}

// Event listener koppelen aan button
thema2.addEventListener("click", thema2doorverwijzen);

function thema3doorverwijzen() {
    pagina1.style.display = "none";  // Verberg pagina 1
    pagina2.style.display = "none";  // Verberg pagina 2
    pagina3.style.display = "block"; // Toon pagina 3
}

// Event listener koppelen aan button
thema3.addEventListener("click", thema3doorverwijzen);



function werkingTimer() {

    //elke seconde iets uitvoeren
    interval = setInterval(function () {
        secondes -= 1;

        if (secondes <= 9)
            timer.innerText = "0" + minuten + ":" + "0" + secondes;

        else {
            timer.innerText = "0" + minuten + ":" + secondes;
        }

        if (secondes === -1) {
            secondes = 0;
            minuten = 0;
            timer.innerText = "Timer";

            clearInterval(interval); // Stop het interval
            interval = null; // Reset de interval variabele
            secondes = 16; // Reset de seconden
            minuten = 0;   // Reset de minuten
            timer.innerText = "Timer"; // Toon 'Timer' op de UI
        }

    }, 1000)
}

timer.addEventListener("click", werkingTimer);


var vraag = document.getElementById("js--vraagPagina3");








// display question