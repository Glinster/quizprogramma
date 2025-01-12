// Ophalen van alle benodigde elementen met Id in variabelen
var pagina1 = document.getElementById("js--pagina1");
var inputNaam = document.getElementById("js--inputNaam");
var buttonNaam = document.getElementById("js--buttonNaam");

var pagina2 = document.getElementById("js--pagina2");
var naam = document.getElementById("js--naamPagina2");
var thema1 = document.getElementById("js--thema1");
var thema2 = document.getElementById("js--thema2");
var thema3 = document.getElementById("js--thema3");

var pagina3 = document.getElementById("js--pagina3");
var timer = document.getElementById("js--timer");
var interval;
var vraagElement = document.getElementById("js--vraagPagina3");
var buttonA = document.getElementById("js--buttonA");
var buttonB = document.getElementById("js--buttonB");
var buttonC = document.getElementById("js--buttonC");
var buttonD = document.getElementById("js--buttonD");

var pagina4 = document.getElementById("js--pagina4");
var naam1 = document.getElementById("js--naamPagina4");
var buttonEindscherm = document.getElementById("js--buttonEindscherm")

function startPagina1() {
    pagina1.style.display = "block";
    pagina3.style.display = "none";
    pagina2.style.display = "none";
    pagina4.style.display = "none";
}

startPagina1();

function naamToevoegen() { // functie: titel en wachtwoord toevoegen aan set1
    if (inputNaam.value === "") { // controleren of het eerste inputveld leeg is
        inputNaam.placeholder = "Invoer vereist!"; // geeft melding bij foute invoer
    } else {
        naam.innerText = inputNaam.value; // weergave titel heeft dezelfde waarde als is ingevoerd in inputveld

        pagina1.style.display = "none";
        pagina3.style.display = "none";
        pagina2.style.display = "block";
        pagina4.style.display = "none";
    }
}

buttonNaam.onclick = naamToevoegen;

function naamToevoegen1() { 
    // Controleer of de waarde van inputNaam niet leeg is
    if (inputNaam.value !== "") {
        // Zet de naam op pagina4 gelijk aan de waarde van inputNaam
        naam1.innerText = inputNaam.value;
    }
}

// Functie om een array willekeurig te schudden
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elementen
    }
}

function quizOpnieuw(){
    location.reload();
}


// Laad de quizvragen uit het JSON-bestand
fetch('../themas/quizVragen.json')
    .then(response => response.json()) // Verandert de data in een object
    .then(data => { // Zorg ervoor dat de functies pas werken als de data er is.
        var vragen1 = data.quizThema1;
        var vragen2 = data.quizThema;
        var vragen3 = data.quizThema3;

        var huidigeVragen = []; // array die tijdelijk de vragen opslaat voor het geselecteerde thema
        var vraagIndex = 0; // Start bij de eerste vraag

        // Functie om een vraag te laden en deze willekeurig te tonen
        function laadVraag(vragen) {//parameter
            if (vragen.length === 0) { // Als het geselecteerde thema geen vragen bevat, ga naar pagina 4
                pagina1.style.display = "none";
                pagina2.style.display = "none";
                pagina3.style.display = "none";
                pagina4.style.display = "block";
                return;
            }

            shuffleArray(vragen); // Schud de vragen
            huidigeVragen = vragen; // Bewaar de vragen voor dit thema
            vraagIndex = 0; // Begin bij de eerste vraag
            toonVraag(huidigeVragen[vraagIndex]); // Laad de eerste vraag
            verhoogVraagnummer(); // Verhoog het vraagnummer en werk het bij
        }

        // Voeg een functie toe die het vraagnummer verhoogt en weergeeft
        function verhoogVraagnummer() {
            // Verhoog het vraagnummer met 1, zodat "Vraag 1" wordt getoond bij de eerste vraag
            vraagElement.innerText = (vraagIndex + 1) + ": " + huidigeVragen[vraagIndex].vraag; 
        }

        // Functie om de vraag en de antwoordknoppen te updaten
        function toonVraag(vraagData) {
            vraagElement.innerText = vraagData.vraag; // Zet de vraag
            buttonA.innerText = vraagData.A;
            buttonB.innerText = vraagData.B;
            buttonC.innerText = vraagData.C;
            buttonD.innerText = vraagData.D;
        }

        // Functie om naar de volgende vraag te gaan
        function volgendeVraag() {
            vraagIndex++;
            if (vraagIndex >= huidigeVragen.length) {
                // Ga naar pagina4 als alle vragen beantwoord zijn
                pagina1.style.display = "none";
                pagina2.style.display = "none";
                pagina3.style.display = "none";
                pagina4.style.display = "block";
                naamToevoegen1();
                buttonEindscherm.onclick = quizOpnieuw;
                return;
            }

            toonVraag(huidigeVragen[vraagIndex]); // Laad de volgende vraag
            verhoogVraagnummer(); // Verhoog het vraagnummer en werk het bij
            werkingTimer(); // Start de timer opnieuw voor de volgende vraag
        }

        // Timerfunctie
        function werkingTimer() {
          if (interval) {
              clearInterval(interval);
          }
          
          var secondes = 15;
          var minuten = 0;
          
          timer.innerText = "0" + minuten + ":" + secondes;
          
          interval = setInterval(function () {
              secondes -= 1;
              if (secondes <= 9)
                  timer.innerText = "0" + minuten + ":0" + secondes;
              else
                  timer.innerText = "0" + minuten + ":" + secondes;
      
              if (secondes === 0) {
                  clearInterval(interval); // Stop de timer
                  werkingTimer(); // Start de timer opnieuw voor de volgende vraag
                  volgendeVraag(); // Ga naar de volgende vraag
              }
          }, 1000);
      }

        // Functie om de volgorde van de vragen willekeurig te schudden
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elementen
            }
        }

        // Thema-knoppen activeren
        document.getElementById("js--thema1").addEventListener("click", function () {
            pagina1.style.display = "none";
            pagina2.style.display = "none";
            pagina3.style.display = "block";
            pagina4.style.display = "none";
            laadVraag(vragen1); // Laad een vraag voor thema1
            werkingTimer(); // Start de timer wanneer het thema is geselecteerd
        });

        document.getElementById("js--thema2").addEventListener("click", function () {
            pagina1.style.display = "none";
            pagina2.style.display = "none";
            pagina3.style.display = "block";
            pagina4.style.display = "none";
            laadVraag(vragen2); // Laad een vraag voor thema2
            werkingTimer(); // Start de timer wanneer het thema is geselecteerd
        });

        document.getElementById("js--thema3").addEventListener("click", function () {
            pagina1.style.display = "none";
            pagina2.style.display = "none";
            pagina3.style.display = "block";
            pagina4.style.display = "none";
            laadVraag(vragen3); // Laad een vraag voor thema3
            werkingTimer(); // Start de timer wanneer het thema is geselecteerd
        });

        // Event listeners voor de antwoordknoppen
        buttonA.addEventListener("click", volgendeVraag);
        buttonB.addEventListener("click", volgendeVraag);
        buttonC.addEventListener("click", volgendeVraag);
        buttonD.addEventListener("click", volgendeVraag);
    })
    .catch(error => {
        console.error('Er was een probleem met het laden van de JSON:', error);
    });

  
  
  





// function themaKiezen(
//     {

//     }
// )








// begin = 0;

// fetch[/js/script.js]






   
// myArray = JSON.parse("quizThema1");

// display questioni


//bronnen
//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

