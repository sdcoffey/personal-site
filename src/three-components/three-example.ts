import { NaiveBroadphase, World } from "cannon";
import { DirectionalLight, PerspectiveCamera, WebGLRenderer } from "three";
import Atom from "./Atom.ts";
import mount from "./mount-three.ts";

document.querySelectorAll(".three-canvas.three-example").forEach((canvas) => {
  mount(
    canvas,
    (scene, camera, renderer) => {
      renderer.setClearColor("#fff", 0);
      const world = new World();
      world.broadphase = new NaiveBroadphase(world);
      world.solver.iterations = 10;

      const topLight = new DirectionalLight(0xffffff, 3); // soft white light
      topLight.castShadow = true;
      topLight.shadow.radius = 10;
      topLight.shadow.mapSize.width = 1024;
      topLight.shadow.mapSize.height = 1024;
      topLight.position.set(2, 2, 2);

      const bottomLight = new DirectionalLight(0xffffff, 1); // soft white light
      bottomLight.castShadow = true;
      bottomLight.shadow.radius = 10;
      bottomLight.shadow.mapSize.width = 1024;
      bottomLight.shadow.mapSize.height = 1024;
      bottomLight.position.set(0, 0, 2);

      const hydrogen = new Atom(92, 146, world);
      scene.add(hydrogen.nucleus);

      scene.add(topLight);
      scene.add(bottomLight);

      function animate() {
        requestAnimationFrame(animate);

        hydrogen.nucleus.rotation.x += 0.005;
        hydrogen.nucleus.rotation.y += 0.0;
        hydrogen.animate();
        world.step(1 / 60);
        hydrogen.update();

        renderer.render(scene, camera);
      }

      world.gravity.set(0, 0, 0);
      animate();
    },
    {
      createCamera: (width, height) => {
        const cam = new PerspectiveCamera(50, width / height, 0.01, 1000);
        cam.position.z = 30;
        return cam;
      },
      createRenderer: () => {
        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.shadowMap.enabled = true;
        return renderer;
      },
    },
  );
});
