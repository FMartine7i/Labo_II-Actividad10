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
loader.load('cityblend.glb', function(gltf) {
	const city = gltf.scene
 	city.name = "city" // Asigna un nombre al objeto del modelo
 	scene.add(city)
})

const light1 = new THREE.PointLight( 0xffffff, 20, 100 )
light1.position.set( 100, 300, 200 )
scene.add( light1 )

const light2 = new THREE.PointLight( 0xffffff, 10, 100 )
light2.position.set( -10, 100, 500 )
scene.add(light2);

const light3 = new THREE.PointLight( 0xffffff, 2, 100 )
light3.position.set( 15, 30, -5 )
scene.add(light3)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
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
