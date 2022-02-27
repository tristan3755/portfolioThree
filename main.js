import './style.css'

import * as THREE from 'three'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture'
import gsap from 'gsap'
import hoverEffect from 'hover-effect'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';


/*landingpage*/
let portfolio=document.querySelector('header p:nth-child(1)')
let technologie=document.querySelector('header p:nth-child(2)')
let titre=document.querySelector('.titre')
let sect1=document.getElementById('sect1')
let grid=document.querySelector('.portfolioGrid')
let pageTechno=document.querySelector('.technologie')
let header=document.querySelector('header')
let retourPortfolio=document.querySelector('.retour')
let retourTechno=document.querySelector('.retourTechno')
let cadre=document.querySelector('.cadre')
let contactButton=document.querySelector('header p:nth-child(3)')
let contactSection=document.querySelector('.contact')
let retourContact=document.querySelector('.retourContact')
/*landingpage*/
const scene=new THREE.Scene()

const container=document.getElementById('divThree')

let camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.01,1000)

const renderer=new THREE.WebGL1Renderer({
  canvas:container,
  alpha:true,
 antialias:true,
})

renderer.setPixelRatio(container.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.autoClear = false;
  

  //postprocessing
let stats
let composer
let fxaaPass


stats = new Stats();
container.appendChild( stats.dom );

const params = {
	exposure:0.5,
	bloomStrength: 0.3,
	bloomThreshold: 0,
	bloomRadius: 0.5,
};

const bloomPass = new UnrealBloomPass( new THREE.Vector2( container.clientWidth, container.clientHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;



const renderScene = new RenderPass( scene, camera );
fxaaPass = new ShaderPass( FXAAShader );

const copyPass = new ShaderPass( CopyShader );


composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass(fxaaPass)
composer.addPass( copyPass );

const pixelRatio = renderer.getPixelRatio();

				fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
				fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );

 //postprocessing

/*construction sphere*/

let envmaploader= new THREE.PMREMGenerator(renderer)
new RGBELoader().setPath('./').load('custom4.hdr',(hdrmap)=>{

  let envmap=envmaploader.fromCubemap(hdrmap)
  let textures=new THREE.CanvasTexture(new FlakesTexture())
  textures.wrapS= THREE.RepeatWrapping
  textures.wrapT= THREE.RepeatWrapping
  textures.repeat.x=0
  textures.repeat.y=0
  
  const sphereMaterials={
    clearcoat: 1,
    clearcoatRoughness:0.4,
    metalness:1,
    roughness:0.4,
    normalMap:textures,
    normalScale:new THREE.Vector2(0.85,0.85),
    envMap:envmap.texture,
    transparent: true,
  }
  
  let sphereConstruct=new THREE.SphereGeometry(55,55,55)
  let sphereMaterial=new THREE.MeshPhysicalMaterial(sphereMaterials)
  let sphere= new THREE.Mesh(sphereConstruct,sphereMaterial)
  scene.add(sphere)
  if(window.matchMedia("(min-width:900px)").matches){
  let orbit

document.addEventListener('mousemove',(e)=>{
  if(window.matchMedia("(min-width:1400px)").matches){
    let scale = -0.002
    orbit.rotateY( e.movementX * scale );
    orbit.rotateX( e.movementY * scale ); 
    orbit.rotation.z = 0;
  }else{
    let scale = -0.003
    orbit.rotateY( e.movementX * scale );
    orbit.rotateX( e.movementY * scale ); 
    orbit.rotation.z = 0;
  }
})
orbit = new THREE.Object3D();
orbit.rotation.order = "YXZ"; 
orbit.position.copy( sphere.position );
scene.add(orbit);

let cameraDistance = 70;
camera.position.z = cameraDistance;
orbit.add( camera );
}else{
  let cameraDistance = 110;
  camera.position.z = cameraDistance;
}
function fadeAwayTitre(){
  sect1.removeChild(titre)
}
function returnTitre(){
  titre.style.transform='translateY(0vh)'
}
function transitionGrid(){
  grid.style.transform='translateY(0vh)';
}
function transitionContact(){
  contactSection.style.transform='translateY(0vh)';
}
function fadeAwayGrid(){
  grid.style.display='none'
}
function fadeAwayTechno(){
  pageTechno.style.display='none'
}
function transitionTechno(){
  pageTechno.style.transform='translateX(0)'
}
function fadeAwayContact(){
  contactSection.style.display='none'
}
portfolio.addEventListener('click',()=>{
  gsap.to(camera.position,{duration:5,y:-500})
  titre.style.transform='translateY(-100vh)'
  setTimeout(fadeAwayTitre,1000)
  grid.style.display='grid'
  sect1.removeChild(header)
  sect1.removeChild(cadre)
  setTimeout(hover,500)
  setTimeout(transitionGrid,500)
})

retourPortfolio.addEventListener("click",()=>{
  gsap.to(camera.position,{duration:5,y:0})
  sect1.appendChild(titre)
  setTimeout(returnTitre,1000)
  grid.style.transform='translateY(100vh)';
  setTimeout(fadeAwayGrid,1000)
  sect1.appendChild(header)
  sect1.appendChild(cadre)
})
technologie.addEventListener('click',()=>{
  gsap.to(camera.position,{duration:5,x:-500})
  pageTechno.style.display="flex"
  setTimeout(transitionTechno,1000)
  titre.style.transform='translateX(-100vw)'
  setTimeout(fadeAwayTitre,1000)
  sect1.removeChild(header)
  sect1.removeChild(cadre)
  
})
retourTechno.addEventListener('click',()=>{
  gsap.to(camera.position,{duration:5,x:0})
  sect1.appendChild(titre)
  setTimeout(returnTitre,1000)
  pageTechno.style.transform='translateX(-100vw)';
  setTimeout(fadeAwayTechno,1000)
  sect1.appendChild(header)
  sect1.appendChild(cadre)
})
contactButton.addEventListener('click',()=>{
  titre.style.transform='translateY(-100vh)'
  setTimeout(fadeAwayTitre,1000)
  contactSection.style.display="flex"
  sect1.removeChild(header)
  sect1.removeChild(cadre)
  setTimeout(transitionContact,500)
})
retourContact.addEventListener('click',()=>{
  sect1.appendChild(titre)
  setTimeout(returnTitre,1000)
  contactSection.style.transform='translateY(-100vh)';
  setTimeout(fadeAwayContact,1000)
  sect1.appendChild(header)
  sect1.appendChild(cadre)
})

function animate(){

  renderer.render(scene,camera)
  stats.update();
  composer.render();
  requestAnimationFrame(animate) 
  if(window.matchMedia("(max-width:900px)").matches){
    camera.rotation.z+=0.01
  }
}

animate()

window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  const pixelRatio = renderer.getPixelRatio();
  renderer.setSize( window.innerWidth, window.innerHeight );
  fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
  fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );
};

})

/*hover effect*/
function hover(){
 if(document.querySelector('.image')){ 
new hoverEffect(
  {
    parent:document.querySelector('.image'),
    intensity:0.8,
    image1:'./metis.jpg',
    image2:'./metis2.jpg',
    displacementImage:'./heightMap.png',
    imagesRatio:0.55,
  },
)
}
if(document.querySelector('.image1')){ 
new hoverEffect(

  {
    parent:document.querySelector('.image1'),
    intensity:0.1,
    image1:'./meteo.jpg',
    image2:'./meteo2.jpg',
    displacementImage:'./heightMap.png',
    imagesRatio:0.5,
  }
)
}
if(document.querySelector('.image2')){ 
new hoverEffect(
  {
    parent:document.querySelector('.image2'),
    intensity:0.1,
    image1:'./communart.jpg',
    image2:'./communart2.jpg',
    displacementImage:'./heightMap.png',
    imagesRatio:0.5,
  }
)
}
if(document.querySelector('.image3')){ 
new hoverEffect(
  {
    parent:document.querySelector('.image3'),
    intensity:0.1,
    image1:'./community.jpg',
    image2:'./community2.jpg',
    displacementImage:'./heightMap.png',
    imagesRatio:0.5,
  }
)
}
if(document.querySelector('.image4')){ 
  new hoverEffect(
    {
      parent:document.querySelector('.image4'),
      intensity:0.1,
      image1:'./bloom.jpg',
      image2:'./bloom2.jpg',
      displacementImage:'./heightMap.png',
      imagesRatio:0.5,
    }
  )
}
if(document.querySelector('.image5')){ 
    new hoverEffect(
      {
        parent:document.querySelector('.image5'),
        intensity:0.1,
        image1:'./zelda1.jpg',
        image2:'./zelda2.jpg',
        displacementImage:'./heightMap.png',
        imagesRatio:0.5,
      }
    )   
}
if(document.querySelector('.image6')){ 
      new hoverEffect(
        {
          parent:document.querySelector('.image6'),
          intensity:0.1,
          image1:'./cyberpunk1.jpg',
          image2:'./cyberpunk2.jpg',
          displacementImage:'./heightMap.png',
          imagesRatio:0.5,
        }
      )
}
}
//resize camera

//retourScroll

let retourTop=document.querySelectorAll('.retour-top')

retourTop.forEach(i=>{
  i.addEventListener('click',()=>{
    window.scrollTo(0,0)
  })
})