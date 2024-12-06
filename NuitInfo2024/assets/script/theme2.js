// Oceans animation
document.getElementById('atlantic-ocean').addEventListener('click', () => {
    document.getElementById('atlantic-ocean-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});
document.getElementById('pacific-ocean').addEventListener('click', () => {
    document.getElementById('pacific-ocean-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});
document.getElementById('indian-ocean').addEventListener('click', () => {
    document.getElementById('indian-ocean-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});
document.getElementById('austral-ocean').addEventListener('click', () => {
    document.getElementById('austral-ocean-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});
document.getElementById('arctic-ocean').addEventListener('click', () => {
    document.getElementById('arctic-ocean-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

// Food chain

const organisms = [
    { id: "plankton", nextDelay: 2000 },
    { id: "medium-fish", nextDelay: 4000 },
    { id: "big-fish", nextDelay: 6000 },
    { id: "predator", nextDelay: 8000 },
];

function resetOrganisms() {
    // Reset style
    organisms.forEach(organism => {
        const elem = document.getElementById(organism.id);
        elem.style = "";
        elem.style.visibility = "hidden";
        elem.style.opacity = "1";
    });
}

function animateChain() {
    resetOrganisms();
    organisms.forEach((organism, index) => {
        setTimeout(() => {
            const elem = document.getElementById(organism.id);
            elem.style.visibility = "visible";
            elem.style.animation = "appear 2s ease-out";

            // Eat previous one
            if (index > 0) {
                const prevElem = document.getElementById(organisms[index - 1].id);
                setTimeout(() => {
                    prevElem.style.animation = "move-eat 1s ease-in forwards";
                    prevElem.style.opacity = "0";
                }, 1000);
            }
        }, organism.nextDelay);
    });
}

animateChain();
setInterval(animateChain, 10000);  // Do each 10 seconds
