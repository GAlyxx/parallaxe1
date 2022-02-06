$.fn.parallaxe = function(vitesse) {
    // Récupérer l'élément
    const element = $(this);

    // Hauteur du viewport
    const hViewport = $(window).height();

    // Hauteur de l'élément
    const hElt = element.height();

    function actualiser () {
        // Récupérer la position de la page
        const posY = $(window).scrollTop();
        

        // Position au sein du body
        const y = element.offset().top;

        // On agit sur la position du background
        if (y > posY + hViewport || posY > y + hElt ) {
            // En dehors du viewport 
        } else {
            element.css({
                backgroundPositionY: `${Math.round((y - posY)* vitesse)}px`,
            })
        }

    }
    // Initialisation
    actualiser();

    // Ecoute le scroll
    $('.scroller').scroll(actualiser);

}