// Variable globale
let index = 0;


//Gestion des evenements 2//
$('section:nth-of-type(3) span').click(function () {
    // Récupération index

    let indexN = $('section:nth-of-type(3) span').index(this);

    // Renouveller l'image
    $('section:nth-of-type(3)>div>div').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);
    //Script develloper par Mr.Noirot//
    // $('section:nth-of-type(3)>div>div').eq(index).fadeOut(5000, function() {
    //     $('section:nth-of-type(3)>div>div').eq(indexN).fadeIn(5000)
    // });
    // Mettre à jour l'index
    index = indexN;
});

// Gestion des événements
$('section:nth-of-type(4) span').click(function () {
  
    // Récupération index
    let indexN = $('section:nth-of-type(4) span').index(this);

    // Renouveller l'image
    $('section:nth-of-type(4) img').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);

    // Mettre à jour l'index
    index = indexN;
});
/*script pour la video*/

let etatLecteur;

function lecteurPret(event) {
    // event.target = lecteur
    event.target.setVolume(50);
}

function changementLecteur(event) {
    // event.data = état du lecteur
    etatLecteur = event.data;
}

let lecteur;

function onYouTubeIframeAPIReady() {
    lecteur = new YT.Player('video', {
        height: '390',
        width: '640',
        videoId: 'n9xhJrPXop4',
        playerVars: {
            color: 'white',
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0,
        },
        events: {
            onReady: lecteurPret,
            onStateChange: changementLecteur,
        },
    });
}

// Hauteur de la vidéo
const hauteurVideo = $('#video').height();

// Position Y de la vidéo
const posYVideo = $('#video').offset().top;

// Valeur declenchant la modification de l'affichage (choix "esthétique")
const seuil = posYVideo + 0.75 * hauteurVideo;

// Gestion du défilement
$('.scroller').scroll(function () {
    // Récupération de la valeur du défilement vertical
    const scroll = $('.scroller').scrollTop();
    // Classe permettant l'exécution du CSS
    $('#video').toggleClass(
        'scroll',
        etatLecteur === YT.PlayerState.PLAYING && scroll > seuil,
    );
});
//Carte//


// Création de la carte, vide à ce stade
let carte = L.map('carte', {
    center: [47.2608333, 2.4188888888888886], // Centre de la France
    zoom: 5,
    minZoom: 4,
    maxZoom: 19,
});

// Ajout des tuiles (ici OpenStreetMap)
// https://wiki.openstreetmap.org/wiki/Tiles#Servers
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(carte);

// Ajout de l'échelle
L.control.scale().addTo(carte);

//localisation//


// Appelée si récupération des coordonnées réussie
function positionSucces(position) {
  // Injection du résultat dans du texte
  const lat = Math.round(1000 * position.coords.latitude) / 1000;
  const long = Math.round(1000 * position.coords.longitude) / 1000;
  $("#5a>p").text(`Latitude: ${lat}°, Longitude: ${long}°`);
  carte.flyTo([position.coords.latitude,position.coords.longitude],11);
//cinema localisation//
L.geoJSON(bernard, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(carte);
}

// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
  // Cas d'usage du switch !
  let natureErreur;
  switch (erreurPosition.code) {
    case erreurPosition.TIMEOUT:
      // Attention, durée par défaut de récupération des coordonnées infini
      natureErreur = "La géolocalisation prends trop de temps...";
      break;
    case erreurPosition.PERMISSION_DENIED:
      natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
      break;
    case erreurPosition.POSITION_UNAVAILABLE:
      natureErreur = "Votre position n'a pu être déterminée.";
      break;
    default:
      natureErreur = "Une erreur inattendue s'est produite.";
  }
  // Injection du texte
  $("#5a>p").text(natureErreur);
}

// Récupération des coordonnées au clic sur le bouton
$("button").click(function () {
  // Support de la géolocalisation
  if ("geolocation" in navigator) {
    // Support = exécution du callback selon le résultat
    navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    });
  } else {
    // Non support = injection de texte
    $("#5a>p").text("La géolocalisation n'est pas supportée par votre navigateur");
  }
});


//parallax
$('#1a').parallaxe(.5);

$('#2a').parallaxe(.5);

$('#3a').parallaxe(.5);

$('#4a').parallaxe(.5);

$('#5a').parallaxe(.5);


