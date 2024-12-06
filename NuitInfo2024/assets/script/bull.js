
    // Fonction pour générer des bulles dynamiquement
    function creerBulles() {
    const nombreBulles = 70; // Nombre de bulles à générer
    const body = document.body;

    for (let i = 0; i < nombreBulles; i++) {
    const bulle = document.createElement('div');
    bulle.classList.add('bulle');

    // Taille aléatoire pour la bulle
    const taille = Math.random() * 40 + 10; // Entre 10px et 50px
    bulle.style.width = `${taille}px`;
    bulle.style.height = `${taille}px`;

    // Position horizontale aléatoire
    bulle.style.left = `${Math.random() * 100}vw`;

    // Début de l'animation à des moments différents
    bulle.style.animationDelay = `${Math.random() * 15}s`;

    // Ajout de la bulle au body
    body.appendChild(bulle);
}
}

    // Appel de la fonction pour créer les bulles au chargement
    creerBulles();