// import AFRAME from 'aframe';
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

addCorals(100);

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

addRandomAlga(20)

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
  
  addRandomPeces(4);
  
  AFRAME.registerComponent('visible-only-in-view', {
    tick: function () {
      const camera = document.querySelector('[camera]');
      const objPosition = this.el.object3D.position;
      const cameraPosition = camera.object3D.position;
      const distance = cameraPosition.distanceTo(objPosition);
  
      // 如果物体太远，则隐藏
      if (distance > 100) {
        this.el.setAttribute('visible', 'false');
      } else {
        this.el.setAttribute('visible', 'true');
      }
    },
  });

  const medusas = [
    { x: 0, y: 0.002, z: -30 },
    { x: 0, y: 0.002, z: 30 },
    { x: 30, y: 0.003, z: 0 },
    { x: -30, y: 0.003, z: 0 },
    { x: 20, y: 0.05, z: 20 },
    { x: 20, y: 0.05, z: -20 },
    { x: -20, y: 0.005, z: -20 },
    { x: -20, y: 0.005, z: 20 },
];
  
let score = 0;
  
// Función para inicializar las medusas
function initScene() {
  const orbitas = document.querySelectorAll('.orbit');

  orbitas.forEach((orbit) => {
      medusas.forEach((pos) => {
          const medusa = document.createElement('a-entity');

          medusa.setAttribute('gltf-model', '#medusas');
          medusa.setAttribute('class', 'medusa');
          medusa.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
          medusa.setAttribute('dynamic-body', 'shape: sphere; mass: 0');
          medusa.setAttribute('animation-mixer', '');
          medusa.setAttribute('shootable', '');

          // 添加平滑游动动画
          medusa.setAttribute('animation__move', `
            property: position; 
            to: ${pos.x + (Math.random() * 10 - 5)} ${pos.y + (Math.random() * 2 - 1)} ${pos.z + (Math.random() * 10 - 5)}; 
            loop: true; 
            dur: ${3000 + Math.random() * 2000}; 
            easing: easeInOutSine; 
            dir: alternate
          `);

          // 添加旋转动画
          medusa.setAttribute('animation__rotate', `
            property: rotation; 
            to: 0 ${Math.random() * 360} 0; 
            loop: true; 
            dur: ${5000 + Math.random() * 2000}; 
            easing: easeInOutSine; 
            dir: alternate
          `);

          


          orbit.appendChild(medusa);
      });
  });
}

  
  // Llamar a la función después de que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    initScene();
});

// Componente para interacción por clic
AFRAME.registerComponent('shootable', {
    // Método de inicialización del componente
    init: function () {
        // Añade un event listener para el evento 'click'
        this.el.addEventListener('click', () => {
            // Elimina el meteorito cuando es clickeado
            this.el.parentNode.removeChild(this.el)
            
            // Incrementa y actualiza el contador de puntuación
            document.querySelector('[text]').setAttribute('value', 
                `${++score} medusas cazadas`)
        })
    }
})

