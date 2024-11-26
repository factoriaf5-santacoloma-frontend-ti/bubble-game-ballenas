const corals = ["coral0", "coral1", "coral2", "coral3", "coral4", "coral5", "coral6", "coral7", "coral8", "coral9", "alga"];
const scene = document.querySelector('a-scene');

function addCorals(coralRandom) {
    if (!scene) {
        console.error("No se encontró la escena A-Frame.");
        return;
    }

    for (let i = 0; i < coralRandom; i++) {
        const coral = document.createElement('a-entity');
        const randomCoral = corals[Math.floor(Math.random() * corals.length)];
        coral.setAttribute('gltf-model', `#${randomCoral}`);
        
        const x = (Math.random() - 0.5) * 500;
        const z = (Math.random() - 0.5) * 500; 
        const y = -1.5; 
        
        coral.setAttribute('position', `${x} ${y} ${z}`);
        const rotationY = Math.random() * 360; 
        coral.setAttribute('rotation', `0 ${rotationY} 0`);
        
        const scale = Math.random() * 50 + 30;
        coral.setAttribute('scale', `${scale} ${scale} ${scale}`);
        
        scene.appendChild(coral);    
    }
}

addCorals(500);