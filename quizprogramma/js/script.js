// Ophalen van alle benodigde elementen met Id in variabelen
// Dit selecteert de HTML-elementen die we later gebruiken in het script
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
var interval; // Variabele voor de timer, zodat we deze later kunnen stoppen
var vraagElement = document.getElementById("js--vraagPagina3");
var buttonA = document.getElementById("js--buttonA");
var buttonB = document.getElementById("js--buttonB");
var buttonC = document.getElementById("js--buttonC");
var buttonD = document.getElementById("js--buttonD");
var afbeelding = document.getElementById("js--vraagAfbeelding");


var pagina4 = document.getElementById("js--pagina4");
var naam1 = document.getElementById("js--naamPagina4");
var buttonEindscherm = document.getElementById("js--buttonEindscherm");
var ScoreSpeler = document.getElementById("js--score")
var spelerPunten1 = document.getElementById("js--punten1");
var spelerPunten2 = document.getElementById("js--punten2");
var spelerPunten3 = document.getElementById("js--punten3");
var nummerNaam1 = document.getElementById("js--nummerNaam1");
var nummerNaam2 = document.getElementById("js--nummerNaam2");
var nummerNaam3 = document.getElementById("js--nummerNaam3");
var totaalScore = 0;
vraag1Display = document.getElementById("js--vraag1Display");
vraag2Display = document.getElementById("js--vraag2Display");
vraag3Display = document.getElementById("js--vraag3Display");
vraagGoedFout1 = document.getElementById("js--vraagGoedFout1");
vraagGoedFout2 = document.getElementById("js--vraagGoedFout2");
vraagGoedFout3 = document.getElementById("js--vraagGoedFout3");
gebruikeAntwoord1 = document.getElementById("js--gebruikeAntwoord1");
gebruikeAntwoord2 = document.getElementById("js--gebruikeAntwoord2");
gebruikeAntwoord3 = document.getElementById("js--gebruikeAntwoord3");
juisteAntwoordDisplay1 = document.getElementById("js--juisteAntwoordDisplay1");
juisteAntwoordDisplay2 = document.getElementById("js--juisteAntwoordDisplay2");
juisteAntwoordDisplay3 = document.getElementById("js--juisteAntwoordDisplay3");



// Startpagina zichtbaar maken
// Deze functie zorgt ervoor dat alleen pagina1 zichtbaar is als de quiz start
function startPagina1() {
    pagina1.style.display = "block"; // Toon pagina1
    pagina3.style.display = "none"; // Verberg andere pagina's
    pagina2.style.display = "none";
    pagina4.style.display = "none";
}

startPagina1(); // Roep de functie aan om de startpagina te tonen

// Functie om de naam van de gebruiker op te slaan
function naamToevoegen() {
    if (inputNaam.value === "") { // Controleer of het invoerveld leeg is
        inputNaam.placeholder = "Invoer vereist!"; // Geef een melding in het invoerveld
    } else {
        naam.innerText = inputNaam.value; // Zet de ingevoerde naam op pagina2
        pagina1.style.display = "none"; // Verberg pagina1
        pagina3.style.display = "none"; // Verberg pagina3
        pagina2.style.display = "block"; // Toon pagina2
        pagina4.style.display = "none"; // Verberg pagina4
    }
}

// Koppel de klik op de naamknop aan de naamToevoegen functie
buttonNaam.onclick = naamToevoegen;

// Functie om de naam op het eindscherm te tonen
function naamToevoegen1() {
    if (inputNaam.value !== "") { // Controleer of er een naam is ingevuld
        naam1.innerText = inputNaam.value; // Zet de naam op pagina4
    }
}

// Functie om een array willekeurig te schudden
// Fisher-Yates Shuffle wordt hier gebruikt om de volgorde van vragen te mixen
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { // Loop door de array
        var j = Math.floor(Math.random() * (i + 1)); // Kies een willekeurig index
        [array[i], array[j]] = [array[j], array[i]]; // Verwissel de elementen
    }
}

// Functie om de quiz opnieuw te starten
function quizOpnieuw() {
    location.reload(); // Herlaad de pagina om de quiz opnieuw te beginnen
}

// Laad de quizvragen uit het JSON-bestand
fetch('../json/quizVragen.json')
    .then(response => response.json())//Zet de respons van de server om naar een JSON-object.
    .then(data => { //Als het JSON-bestand correct geladen is, wordt de data doorgegeven voor verder gebruik.
        // Laad de vragen voor elk thema
        var vragen1 = data.quizThema1;
        var vragen2 = data.quizThema2;
        var vragen3 = data.quizThema3;

        var huidigeVragen = []; // Huidige lijst van vragen
        var vraagIndex = 0; // Begin bij vraag 0

        //functie om de quiz te starten
        function startVragenRonde(vragen) {
            if (vragen.length === 0) {
                pagina1.style.display = "none";
                pagina2.style.display = "none";
                pagina3.style.display = "none";
                pagina4.style.display = "block";
                return;
            }
        
            shuffleArray(vragen); // Schud de vragen
            huidigeVragen = vragen; // Zet de vragen in de huidigeVragen array
            vraagIndex = 0; // Begin bij de eerste vraag
            toonVraag(huidigeVragen[vraagIndex]); // Toon de eerste vraag
            verhoogVraagnummer(); // Verhoog het vraagnummer
            
        }
        

        // Functie om het vraagnummer te tonen
        function verhoogVraagnummer() {
            vraagElement.innerText = (vraagIndex + 1) + ": " + huidigeVragen[vraagIndex].vraag;
        }



        //functie De vraag en de antwoorden worden gekoppeld aan de knoppen. Als er een afbeelding is bij de vraag, wordt deze getoond.
        function toonVraag(vraagData) {
            // Koppel de antwoorden direct aan de knoppen zonder te schudden
            buttonA.innerText = vraagData.A;
            buttonB.innerText = vraagData.B;
            buttonC.innerText = vraagData.C;
            buttonD.innerText = vraagData.D;
            
            // Geef elke knop een attribuut met het bijbehorende antwoord
            buttonA.setAttribute("data-answer", "A");
            buttonB.setAttribute("data-answer", "B");
            buttonC.setAttribute("data-answer", "C");
            buttonD.setAttribute("data-answer", "D");
            
            vraagElement.innerText = vraagData.vraag; // Zet de vraagtekst


    // Voeg de afbeelding toe (als er een afbeelding is)
    if (vraagData.afbeelding) {
        afbeelding.src = vraagData.afbeelding[0];  // Zet het src attribuut van de afbeelding
        afbeelding.style.display = "block";  // Zorg ervoor dat de afbeelding zichtbaar is
    } else {
        afbeelding.style.display = "none";  // Verberg de afbeelding als deze niet bestaat
    }
};
        
        
        
        //functie om volgende vraag te tonen
        function volgendeVraag() {
            vraagIndex++; // Verhoog de vraagIndex
        
            // Controleer of vraagIndex kleiner is dan de lengte van de huidigeVragen
            if (vraagIndex >= huidigeVragen.length) {
        
                // Hier roep je de naamEnScoreOpslaan functie aan
                naamEnScoreOpslaan(); // Sla de naam en score op
        
                // Verberg de pagina's en toon het eindscherm
                pagina1.style.display = "none";
                pagina2.style.display = "none";
                pagina3.style.display = "none";
                pagina4.style.display = "block"; // Eindscherm tonen
        
                // Voeg de naam toe aan het eindscherm en toon de score
                naamToevoegen1(); // Voeg de naam toe aan het eindscherm
                scoreOptellen(); // Voeg de score toe
                toonSpelers();
                buttonEindscherm.onclick = quizOpnieuw; // Voeg de knop voor herstart toe
                return; // Stop de functie
            }
        
            // Toon de volgende vraag
            toonVraag(huidigeVragen[vraagIndex]);
            verhoogVraagnummer(); // Update het vraagnummer
            werkingTimer(); // Start de timer opnieuw
        }
        
    
    


        // Timerfunctie
        function werkingTimer() {
            if (interval) {
                clearInterval(interval); // Stop een eerdere timer als die zou lopen
            }

            var secondes = 15; // Start met 15 seconden
            var minuten = 0; // Minuten zijn altijd 0

            timer.innerText = "0" + minuten + ":" + secondes; // Zet de timertekst

            interval = setInterval(function () {
                secondes -= 1; // Verminder de seconden met 1
                if (secondes <= 9)
                    timer.innerText = "0" + minuten + ":0" + secondes; // Format met 0
                else
                    timer.innerText = "0" + minuten + ":" + secondes; // Normaal format

                if (secondes === 0) { // Als de tijd op is
                    clearInterval(interval); // Stop de timer
                    werkingTimer(); // Start opnieuw
                    volgendeVraag(); // Ga naar de volgende vraag
                }
            }, 1000); // Herhaal elke seconde
        }

 
//functie die de score van de speler bijhouden.
 function scoreOptellen(geselecteerdAntwoord) {
    // Controleer of de huidige vraag bestaat en of de vraag correct is geladen
    if (!huidigeVragen[vraagIndex]) {
        return; // Stop de functie als de vraag niet bestaat
    }

    // Haal het juiste antwoord van de huidige vraag op
    var correctAntwoord = huidigeVragen[vraagIndex].juisteAntwoord;


    // Vergelijk het geselecteerde antwoord met het juiste antwoord
    if (geselecteerdAntwoord === correctAntwoord) {
        totaalScore++; // Verhoog de score met 1 als het antwoord juist is
        console.log("Correct antwoord! Score: " + ScoreSpeler.innerText);
    } else {
        console.log("Fout antwoord.");
    }


    // Toon de score op de pagina
    ScoreSpeler.innerText = totaalScore;

    // Sla de score op in de browser via localStorage
    localStorage.setItem("playerScore", totaalScore);
   
}


        // Thema-knoppen activeren
        thema1.addEventListener("click", function () {
            pagina1.style.display = "none"; // Verberg pagina1
            pagina2.style.display = "none"; // Verberg pagina2
            pagina3.style.display = "block"; // Toon pagina3
            pagina4.style.display = "none"; // Verberg pagina4
            startVragenRonde(vragen1); // Laad vragen van thema1
            werkingTimer(); // Start de timer
        });

        thema2.addEventListener("click", function () {
            pagina1.style.display = "none";
            pagina2.style.display = "none";
            pagina3.style.display = "block";
            pagina4.style.display = "none";
            startVragenRonde(vragen2); // Laad vragen van thema2
            werkingTimer();
        });

        thema3.addEventListener("click", function () {
            pagina1.style.display = "none";
            pagina2.style.display = "none";
            pagina3.style.display = "block";
            pagina4.style.display = "none";
            startVragenRonde(vragen3); // Laad vragen van thema2
            werkingTimer();
        });



buttonA.addEventListener("click", function() {
    scoreOptellen("A"); // Roep de scoreOptellen functie aan en geef het geselecteerde antwoord door
    volgendeVraag(); // Ga naar de volgende vraag
});

buttonB.addEventListener("click", function() {
    scoreOptellen("B"); // Roep de scoreOptellen functie aan en geef het geselecteerde antwoord door
    volgendeVraag(); // Ga naar de volgende vraag
});

buttonC.addEventListener("click", function() {
    scoreOptellen("C"); // Roep de scoreOptellen functie aan en geef het geselecteerde antwoord door
    volgendeVraag(); // Ga naar de volgende vraag
});

buttonD.addEventListener("click", function() {
    scoreOptellen("D"); // Roep de scoreOptellen functie aan en geef het geselecteerde antwoord door
    volgendeVraag(); // Ga naar de volgende vraag
});

function naamEnScoreOpslaan() {
    // Haal de opgeslagen array op uit localStorage, of maak een lege array als die er nog niet is
    var spelers = JSON.parse(localStorage.getItem("spelers")) || [];

    // Controleer of de naam en score beschikbaar zijn
    if (inputNaam.value && totaalScore !== undefined) {
        // Maak een object voor de nieuwe speler
        var speler = {
            naam: inputNaam.value,   // Naam van de speler
            score: totaalScore       // De totale score van de speler
        };

        // Controleer of de speler al bestaat in de lijst
        var spelerBestaat = spelers.some(function(existingPlayer) {
            return existingPlayer.naam === speler.naam;
        });

        if (spelerBestaat) {
            // Als de speler al bestaat, werk dan de score bij
            spelers.forEach(function(existingPlayer) {
                if (existingPlayer.naam === speler.naam) {
                    existingPlayer.score = speler.score; // Bijwerken van de score
                }
            });
        } else {
            // Voeg de nieuwe speler toe als hij nog niet bestaat
            spelers.push(speler);
        }

        // Sorteer de spelersarray van hoog naar laag op score
        spelers.sort(function(a, b) {
            return b.score - a.score; // Hoogste score eerst
        });

        // Zorg ervoor dat de array maximaal 3 spelers bevat
        spelers = spelers.slice(0, 3); // Snijd de array af na de eerste 3 spelers

        // Sla de bijgewerkte array op in localStorage
        localStorage.setItem("spelers", JSON.stringify(spelers));

    } 
}
   // Functie om de namen en scores van spelers te tonen op het scoreboard
   function toonSpelers() {
    // Haal de spelersarray op uit localStorage
    var spelers = JSON.parse(localStorage.getItem("spelers")) || [];

    // Vul de informatie in voor de eerste speler
    if (spelers[0]) {
        nummerNaam1.innerText = spelers[0].naam; // Zet de naam van de speler in het scorebord
        spelerPunten1.innerText = spelers[0].score; // Zet de score van de speler in he
    } else {
        nummerNaam1.innerText = "N.v.t."; // Geen speler beschikbaar
        spelerPunten1.innerText = "-";
    }

    if (spelers[1]) {
        nummerNaam2.innerText = spelers[1].naam; // Zet de naam van de speler in het scorebord
        spelerPunten2.innerText = spelers[1].score; // Zet de score van de speler in he
    } else {
        nummerNaam2.innerText = "N.v.t."; // Geen speler beschikbaar
        spelerPunten2.innerText = "-";
    }

    if (spelers[2]) {
        nummerNaam3.innerText = spelers[2].naam; // Zet de naam van de speler in het scorebord
        spelerPunten3.innerText = spelers[2].score; // Zet de score van de speler in he
    } else {
        nummerNaam3.innerText = "N.v.t."; // Geen speler beschikbaar
        spelerPunten3.innerText = "-";
    }
}


// functie die alle vragen van een bepaald thema weergeven.
function toonAlleVragen(vragen) {
    // Zorg ervoor dat de displays worden geleegd
    vraag1Display.innerText = '';  
    vraag2Display.innerText = '';
    vraag3Display.innerText = '';

    // Toon de vragen
    if (vragen.length > 0) {
        vraag1Display.innerText = vragen[0].vraag;  // Toon de eerste vraag
        juisteAntwoordDisplay1.innerText = vragen[0].juisteAntwoord;
     
    }
    if (vragen.length > 1) {
        vraag2Display.innerText = vragen[1].vraag;  // Toon de tweede vraag
        juisteAntwoordDisplay2.innerText = vragen[1].juisteAntwoord;
    }
    if (vragen.length > 2) {
        vraag3Display.innerText = vragen[2].vraag;  // Toon de derde vraag
        juisteAntwoordDisplay3.innerText = vragen[2].juisteAntwoord;
    }
}




thema1.onclick = function() {
    toonAlleVragen(vragen1);  // Toon alle vragen van het eerste thema
  
  
};

thema2.onclick = function() {
    toonAlleVragen(vragen2);  // Toon alle vragen van het tweede thema

  
};

thema3.onclick = function() {
    toonAlleVragen(vragen3);  // Toon alle vragen van het derde thema
  
};


    })
    .catch(error => {
        console.error('Er was een probleem met het laden van de JSON:', error); // Toon een foutmelding in console als het JSON-bestand niet geladen kan worden
    });











//bronnen
//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition#String_concatenation
