const corals = ["coral0", "coral1", "coral2", "coral3", "coral4", "coral5", "coral6", "coral7", "coral8", "coral9"];
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
        
        const x = (Math.random() - 0.5) * 300;
        const z = (Math.random() - 0.5) * 300; 
        const y = -2; 
        
        coral.setAttribute('position', `${x} ${y} ${z}`);
        const rotationY = Math.random() * 360; 
        coral.setAttribute('rotation', `0 ${rotationY} 0`);
        
        const scale = Math.random() * 50 + 30;
        coral.setAttribute('scale', `${scale} ${scale} ${scale}`);
        
        scene.appendChild(coral);    
    }
}

addCorals(200);

function addRandomAlga(numAlgas) {
    const scene = document.querySelector('a-scene');

    for (let i = 0; i < numAlgas; i++) {
      
      const alga = document.createElement('a-entity');
      
      alga.setAttribute('gltf-model', '#alga')
      
      const x = (Math.random() - 0.5) * 300;  
      const z = (Math.random() - 0.5) * 300; 
      const y = -1.5;
      
      alga.setAttribute('position', `${x} ${y} ${z}`);
      
      
      const scale = Math.random() * 0.5 + 0.5; 
      alga.setAttribute('scale', `${scale} ${scale} ${scale}`);
      
      scene.appendChild(alga);
    }
}

addRandomAlga(40)

function addRandomPeces(numPeces) {
    const scene = document.querySelector('a-scene');

    for (let i = 0; i < numPeces; i++) {
      const pez = document.createElement('a-entity');

      pez.setAttribute('gltf-model', '#peces');
      pez.setAttribute('scale', '10 10 10');
      pez.setAttribute('animation-mixer', '');
      pez.setAttribute('material', 'metalness: 0; roughness: 0.5;');
      pez.setAttribute('shadow', 'cast: true; receive: true');

      const x = Math.random() * 500 - 150;
      const z = Math.random() * 300 - 150;
      const y = Math.random() * 5 + 0.5; 

      pez.setAttribute('position', `${x} ${y} ${z}`);

      
      scene.appendChild(pez);
    }
}

addRandomPeces(10);

const medusas = [
    { x: 0, y: 0, z: -30 },    // Frente
    { x: 0, y: 0, z: 30 },     // Atrás
    { x: 30, y: 0, z: 0 },     // Derecha
    { x: -30, y: 0, z: 0 },    // Izquierda
    { x: 20, y: 0, z: 20 },    // Diagonal derecha atrás
    { x: 20, y: 0, z: -20 },   // Diagonal derecha frente
    { x: -20, y: 0, z: -20 },  // Diagonal izquierda frente
    { x: -20, y: 0, z: 20 }    // Diagonal izquierda atrás
  ];

  let score = 0;

  // Función para inicializar las medusas en las órbitas
  function initScene() {
    const orbitas = document.querySelectorAll('.orbit');

    orbitas.forEach(orbit => {
      medusas.forEach(pos => {
        const medusa = document.createElement('a-entity');  // Crear la medusa

        medusa.setAttribute('gltf-model', '#medusas');
        medusa.setAttribute('class', 'medusa');
        medusa.object3D.position.set(pos.x, pos.y, pos.z);  // Posicionar la medusa
        medusa.setAttribute('dynamic-body', 'shape: sphere; mass: 0');  // Usar cuerpo dinámico pero sin gravedad

        // Detectar la colisión entre la red y las medusas
        medusa.addEventListener('collide', function (e) {
          if (e.detail.body.el.id === 'red') {  // Verifica si la colisión es con la red
            medusa.parentNode.removeChild(medusa);  // Eliminar la medusa
            const scoreText = document.getElementById('score-text');  // Seleccionar el texto de puntuación
            scoreText.setAttribute('value', `${++score} medusas cazadas`);  // Actualizar el puntaje
          }
        });

        orbit.appendChild(medusa);  // Añadir la medusa a la órbita
      });
    });
  }

  // Llamar a la función de inicialización
  initScene();