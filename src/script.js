import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Base
 */
// Debug 
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// // Axes Helper
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/ace.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const textGeometry = new TextGeometry()



/**
 * Fonts
 */

// const text = 'We are stuck with technology when what we really want is just stuff that works. - Douglas Adams'
const text = `We are stuck with technology when
what we really want is just
stuff that works. - Douglas Adams` // using backticks lets you write multi-line strings

const lines = text.split('\n') // gives you array of strings
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
        {
            lines.forEach(line => { 
            const textGeometry = new TextGeometry(
                text, // `text` is an array so you need to change this to `line` which is what you named the iteration in line 48
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 4,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            
            textGeometry.center()
            const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
            // textMaterial.wireframe = true
            const textMesh = new THREE.Mesh(textGeometry, material)
            scene.add(textMesh)

            

            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            

            const cross = new THREE.PolyhedronGeometry(4, 6, 0.2, 1)

            

            for(let i = 0; i < 33; i++)
                {
                    
                    const donut = new THREE.Mesh(donutGeometry, material)

                    donut.position.x = (Math.random() - 0.5) * 10
                    donut.position.y = (Math.random() - 0.5) * 10
                    donut.position.z = (Math.random() - 0.5) * 10

                    donut.rotation.x = Math.random() * Math.PI
                    donut.rotation.y = Math.random() * Math.PI

                    const scale = Math.random()
                    donut.scale.set(scale, scale, scale)

                    scene.add(donut)

                    
                }

            })
            
        }
    )



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4.3
camera.position.y = 0.4
camera.position.z = 7
scene.add(camera)

// gui.add(camera.position, 'x').min(-10).max(10).step(0.1)
// gui.add(camera.position, 'y').min(-10).max(10).step(0.1)
// gui.add(camera.position, 'z').min(-10).max(10).step(0.1)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()