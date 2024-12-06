// Set up the Matter.js engine for the rope container
const ropeContainer = document.querySelector('.rope-container');
const containerRect = ropeContainer.getBoundingClientRect();
const absoluteTop = containerRect.top + window.scrollY;
const absoluteLeft = containerRect.left + window.scrollX;
const engine = Matter.Engine.create();
const world = engine.world;

// Rope configuration
const ropeLength = 5; // Number of segments
const segmentLength = 20; // Length of each segment
const group = Matter.Body.nextGroup(true);




// Create rope
const rope = Matter.Composites.stack(
    absoluteLeft + containerRect.width / 2, // Position x de départ
    absoluteTop + 50, // Position y de départ
    ropeLength, 1, 0, 0,
    (x, y) => Matter.Bodies.circle(x, y, 8, { collisionFilter: { group } })
);


Matter.Composites.chain(rope, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: segmentLength,
    damping: 0.1,
});

// Attach rope to a fixed point in the container
const fixedPoint = {
    x: absoluteLeft + containerRect.width / 2,
    y: absoluteTop + 30
};

Matter.World.add(world, [
    rope,
    Matter.Constraint.create({
        pointA: fixedPoint,
        bodyB: rope.bodies[0],
        pointB: { x: 0, y: 0 },
        stiffness: 1,
        length: segmentLength, // Ajuster la longueur pour permettre le mouvement
    }),
]);


// Create mouse control
const handle = rope.bodies[rope.bodies.length - 1];
const mouseConstraint = Matter.MouseConstraint.create(engine, {
    constraint: {
        render: { visible: false },
        stiffness: 0.9,
    },
});
Matter.World.add(world, mouseConstraint);

// Run the engine
Matter.Engine.run(engine);

// Rope rendering
const ropePath = document.querySelector('#rope path');
const handleElement = document.querySelector('#handle');
const progressBar = document.querySelector('#progress');

Matter.Events.on(engine, 'afterUpdate', () => {
    let path = `M ${fixedPoint.x - absoluteLeft} ${fixedPoint.y - absoluteTop}`;
    for (let body of rope.bodies) {
        path += ` L ${body.position.x - absoluteLeft} ${body.position.y - absoluteTop}`;
    }
    ropePath.setAttribute('d', path);

    handleElement.setAttribute('cx', handle.position.x - absoluteLeft);
    handleElement.setAttribute('cy', handle.position.y - absoluteTop);

    // Mise à jour de la barre de progression en fonction de la position de la poignée
    const progress = Math.min(
        100,
        ((handle.position.y - (absoluteTop + 50)) / (containerRect.height - 50)) * 100
    );
    progressBar.style.width = `${progress}%`;
});
