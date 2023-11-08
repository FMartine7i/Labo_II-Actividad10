import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";


const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true, alpha: true } );
renderer.setSize( canvas.clientWidth, canvas.clientHeight )
renderer.outputEncoding = THREE.sRGBEncoding 


const scene = new THREE.Scene()
scene.background = null

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight);
camera.position.set( 20, 5, 2 )

const loader = new GLTFLoader();
loader.load('../resources/cityblend.glb', function(gltf) {
	const city = gltf.scene
 	city.name = "city" // Asigna un nombre al objeto del modelo
 	scene.add(city)
})

const light1 = new THREE.PointLight( 0x4C2FEF, 10, 75 )
light1.position.set( 30, 100, 80 )
scene.add( light1 )

const light2 = new THREE.PointLight( 0x2FECEF, 10, 75 )
light2.position.set( 15, 30, 30 )
scene.add(light2);

const light3 = new THREE.PointLight( 0xB833FF, 10, 75 )
light3.position.set( 50, 50, 20 )
scene.add(light3)

const ambientLight = new THREE.AmbientLight(0x2FECEF, 0.5)
scene.add(ambientLight)

const controls = new OrbitControls( camera, canvas )

let rotationAngle = 0

function animate() {
	requestAnimationFrame(animate)
  
	// Actualiza la rotación del modelo (por ejemplo, 0.01 radians por fotograma)
	rotationAngle -= 0.0025
  
	// Aplica la rotación al modelo
	if (scene.getObjectByName("city")) {
	  scene.getObjectByName("city").rotation.y = rotationAngle;
	}
  
	renderer.render(scene, camera)
  }
  
animate()
