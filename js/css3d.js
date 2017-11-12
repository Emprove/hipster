window.onload = function () {

    let camera, scene, renderer;
    let mouseX, mouseY;
    let group;
    let windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {

        let container = document.getElementById( 'container' );

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
        camera.position.set(0, 0, 1000);

        scene = new THREE.Scene();

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.style.position = 'absolute';

        container.appendChild( renderer.domElement );

        group = new THREE.Group();

        let plane = document.getElementById( 'plane' );
        let planeObject = new THREE.CSS3DObject( plane );
        planeObject.position.set( 0, 0, 0 );

        let backout = document.getElementById( 'backout' );
        let backoutObject = new THREE.CSS3DObject( backout );
        backoutObject.position.set( 0, 0, -100 );

        group.add( planeObject );
        group.add( backoutObject );
        //group.add( descriptionObject );
        scene.add( group );

        window.addEventListener( 'resize', onWindowResize, false );
        document.addEventListener( 'mousemove', onMouseMove, false );
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        camera.position.x += ( -mouseX - camera.position.x ) * 0.002;
        camera.position.y += ( mouseY - camera.position.y ) * 0.002;
        camera.lookAt( group.position );
    }

    function render() {

        renderer.render( scene, camera );
    }

    function animate() {

        requestAnimationFrame(animate);
        render();
    }
};