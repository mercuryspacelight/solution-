import { useEffect, useRef } from "react"
import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    /* ===== SIZES ===== */
    const width = mount.clientWidth
    const height = mount.clientHeight

    /* ===== SCENE ===== */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf2f2f2) // холодный белый

    /* ===== CAMERA ===== */
    const camera = new THREE.PerspectiveCamera(
      35,                 // меньше = меньше искажений
      width / height,
      0.1,
      1000
    )
    camera.position.set(0, 1.8, 9) // ДАЛЬШЕ

    /* ===== RENDERER ===== */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mount.appendChild(renderer.domElement)

    /* ===== CONTROLS ===== */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06

    controls.minDistance = 5
    controls.maxDistance = 14
    controls.minPolarAngle = Math.PI * 0.25
    controls.maxPolarAngle = Math.PI * 0.85

    /* ===== LIGHT (GOTHIC, CLEAN) ===== */
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))

    const keyLight = new THREE.DirectionalLight(0xffffff, 2)
    keyLight.position.set(5, 10, 5)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5)
    rimLight.position.set(-6, 6, -10)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
    fillLight.position.set(-5, 2, 5)
    scene.add(fillLight)

    /* ===== MODEL ===== */
    const loader = new FBXLoader()
    const clock = new THREE.Clock()
    let mixer

    loader.load(
      "/models/Zombie Idle.fbx",
      (fbx) => {
        /* === SCALE === */
        fbx.scale.setScalar(0.008)

        /* === CENTER MODEL === */
        const box = new THREE.Box3().setFromObject(fbx)
        const center = box.getCenter(new THREE.Vector3())
        fbx.position.sub(center)

        scene.add(fbx)

        /* === ANIMATION === */
        if (fbx.animations.length > 0) {
          mixer = new THREE.AnimationMixer(fbx)
          mixer.clipAction(fbx.animations[0]).play()
        }

        /* === CONTROLS TARGET === */
        controls.target.set(0, box.max.y * 0.45, 0)
        controls.update()
      },
      undefined,
      (err) => {
        console.error("FBX load error:", err)
      }
    )

    /* ===== LOOP ===== */
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      if (mixer) mixer.update(delta)

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    /* ===== RESIZE ===== */
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener("resize", onResize)

    /* ===== CLEANUP ===== */
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(frameId)
      renderer.dispose()
      mount.innerHTML = ""
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="three-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
