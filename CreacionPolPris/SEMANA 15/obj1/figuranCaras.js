

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);
//Creacion escena
var scene = new THREE.Scene();
//Creacion camara
var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
//Posicion de la camara en la escena
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;
camera.rotation.set(0, -0.5, 0);
scene.add(camera);
//OrbitControls para navegar la vista en la escena
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//Creacion funcion poligono 
function poligono(nlados, ladoigual)//Dicha funcion se crea para facilitar la cuenta de caras
{
  const vertices = [];//Arreglo de vertices vacio
    const ang = 2*Math.PI/nlados;
    for (let i = 0; i <= nlados; i++) {
        let x = ladoigual * Math.cos(i * ang);
        let y = ladoigual * Math.sin(i * ang);
        vertices[i] = new THREE.Vector3(x, y, 0);//Hallamos los vertices con trigonometria
    }
    return vertices;
}
//Creacion funcion prisma
function prisma(nlados, ladoigual,altura){//Se le agrega parametro altura que equivale al extrucion
  const vertices=poligono(nlados,ladoigual);
  // Crear la geometría extruida
  const shape = new THREE.Shape(vertices);//Creacion de un shape para definir una forma bidimensional cerrada

  const extrudeSettings = { depth: altura, bevelEnabled: false };//Extruimos con el parametro altura la forma bidimensional
  
  const geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);//Creacion de geometrioa

  // Crear el material y la malla
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);
//Vertices visibles cambiando BufferyGeomtry con LineLoop para que se vean las lineas
  const materialVertices = new THREE.LineBasicMaterial({ color: 0x000000 });
  const meshVertices = new THREE.LineLoop(geometry, materialVertices);
  scene.add(meshVertices);
  return mesh;
}
var figure = prisma(4,1,10);
scene.add(figure);


//Luz de la escena 
const light = new THREE.DirectionalLight(0xffffff, 1);
// Modificar la posición y dirección de la luz
light.position.set(-5, 10, 10);
light.target.position.set(0, 0, 0);

// Modificar el color y la intensidad de la luz
light.color.set(0xffa500);
light.intensity = 2;
scene.add(light);







const size = 150;
const divisions = 160;
//Grilla con ejes 
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);




function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();