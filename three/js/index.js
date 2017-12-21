var scene,camera,renderer,sphere;

window.onload = function(){
	init();
	addLight();
	addPlane();
	addModels();
	drawWordSphere();
	animate();
}

function addPlane () {
	var url = 'asset/grass.jpg';
	var loader = new THREE.TextureLoader();
	loader.load(url, function (texture) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(10, 10)
		var cubeGeo = new THREE.PlaneGeometry( 100, 100 );
		var cubeMat = new THREE.MeshLambertMaterial({
			color: 0x004400,
			map: texture
		});
		var cube = new THREE.Mesh(cubeGeo, cubeMat);
		cube.rotation.x = -Math.PI / 2;
		scene.add(cube);
	})
}

function addModels(){
	var manager = new THREE.LoadingManager();
	var textureLoader = new THREE.MTLLoader( manager );
	textureLoader.load( 'asset/GermanShephardLowPoly.mtl', function (materials) {
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials(materials);
		loader.load( 'asset/GermanShephardLowPoly.obj', function ( object ) {
			addDogs(object);
		}, onProgress, onError );
	} );
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
		console.log(xhr);
	};
}

function addDogs (object) {
	var group = new THREE.Group();
	scene.add(group);

	var list = getTxtPixs("江");
	for(var i = 0; i < list.length; i += 2){
		var temp = list[i];
		for(var j = 0; j < temp.length; j += 2){
			if(temp[j] === 1){
				var n = Math.random() * 0.6 + 0.4;
				var dog = object.clone();
				group.add( dog );
			
				dog.scale.set(n, n, n);
				var box = new THREE.Box3().setFromObject(dog);
				dog.position.x = j * 3 + (0.5 - Math.random()) * 2;
				dog.position.z = i * 3 + (0.5 - Math.random()) * 2;
				dog.position.y = 0 - box.min.y;
			}
		}
	}

	var box = new THREE.Box3().setFromObject(group);
	group.position.x = (box.min.x - box.max.x) / 2;
	group.position.z = (box.min.z - box.max.z) / 2;
}

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set(-16, 6, 36);

	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.setClearColor(0x000000, 1.0);
	renderer.clear(); 

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	document.body.appendChild( renderer.domElement );
}

function addLight () {
	var light = new THREE.DirectionalLight( 0xffffff, 4, 1000 );
	light.position.set( 100, 100, 100 );
	scene.add( light );

	scene.add( new THREE.AmbientLight( 0x666666 ) );
}


function animate() {
	camera.position.x += 0.03;
	camera.position.z -= 0.01;
	if(sphere){
		sphere.rotation.y -= 0.01;
	}
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function drawWordSphere() {
	drawCore(function (obj) {
		sphere = new THREE.Group();
		sphere.add(obj);
		var sphere1 = drawTxt("江");
		var sphere2 = drawTxt("先");
		var sphere3 = drawTxt("生");
		sphere1.rotation.y = Math.PI / 180 * 0;
		sphere2.rotation.y = Math.PI / 180 * 8;
		sphere3.rotation.y = Math.PI / 180 * 16;

		sphere.add(sphere1);
		sphere.add(sphere2);
		sphere.add(sphere3);

		sphere.position.y = 18;

		scene.add(sphere);
	});
	
}

function drawCore(callback) {
	var cubeGeo = new THREE.SphereGeometry( 3, 12, 12 );
	var cubeMat = new THREE.MeshNormalMaterial();
	var obj = new THREE.Mesh(cubeGeo, cubeMat);
	callback(obj);
}

function drawTxt (txt) {
	var geometry = new THREE.SphereGeometry( 8, 16, 24 );
	geometry.mergeVertices();
	var vertices = geometry.vertices;
	var pointeGeometry = new THREE.Geometry();
	pointeGeometry.vertices = vertices;
	var pointeMaterial = new THREE.PointsMaterial( { 
		size: 1, 
		map: createCanvasMaterial("#12b4fd", 256, txt),
		transparent: true,
		depthWrite: true
	} )

	var points = new THREE.Points( pointeGeometry, pointeMaterial );
	return points;
}

function createCanvasMaterial(color, size, txt) {
	var matCanvas = document.createElement('canvas');
	var matContext = matCanvas.getContext('2d');
	var texture = new THREE.Texture(matCanvas);
	var center = size / 2;
	matCanvas.width = matCanvas.height = size;
	matContext.lineWidth = size / 10;
	matContext.font = size + "px Arial"; 
	matContext.textAlign = "center";
	matContext.strokeStyle = '#056bbd';
	matContext.fillStyle = color;
	matContext.strokeText(txt, size / 2, size * 0.9);
	matContext.fillText(txt, size / 2, size * 0.9);

	texture.needsUpdate = true;
	return texture;
}

function getTxtPixs (txt) {
		var size = 24;
		var canvas = document.createElement('canvas');
		canvas.width = canvas.height = size;
		var context = canvas.getContext('2d');
		context.fillStyle = '#fff';
		context.font = size + "px Arial"; 
		context.textAlign = "center";
		context.fillText(txt, size / 2, size * 0.9);

		var list = [];
		for(var i = 0; i < size; i++){
			var temp = [];
			for(var j = 0; j < size; j++){
				imageData = context.getImageData(j,i,1,1).data; 
				if(imageData[0] > 90){
					temp.push(1);
				}
				else{
					temp.push(0);
				}
			}
			list.push(temp);
		}
		return list;
	}