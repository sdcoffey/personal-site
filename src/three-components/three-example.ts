import {
  DirectionalLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  OrthographicCamera,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import mount from "./mount-three.ts";

document.querySelectorAll(".three-canvas.three-example").forEach((canvas) => {
  mount(
    canvas,
    (scene, camera, renderer) => {
      renderer.setClearColor("#fff", 0);

      function createParticle(type: "proton" | "neutron"): Mesh {
        const geo = new SphereGeometry(40, 50, 50);
        const material = new MeshPhongMaterial({ color: type === "proton" ? "#abcdef" : "#fff" });
        return new Mesh(geo, material);
      }

      const proton = createParticle("proton");
      const neutron = createParticle("neutron");
      const topLight = new DirectionalLight(0xffffff, 3); // soft white light
      const bottomLight = new DirectionalLight(0xffffff, 1); // soft white light
      // const lightHelper = new PointLightHelper(light, 1);
      topLight.position.set(2, 2, 2);
      bottomLight.position.set(-2, -2, 2);
      neutron.position.set(-50, 0, 0);
      const group = new Group();
      group.add(proton);
      group.add(neutron);

      scene.add(group);

      scene.add(topLight);
      scene.add(bottomLight);

      function animate() {
        requestAnimationFrame(animate);

        group.rotation.x += 0.01;
        group.rotation.y += 0.01;

        renderer.render(scene, camera);
      }

      animate();
    },
    {
      createCamera: (width, height) => {
        const cam = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -1000, 1000);
        cam.position.z = 2;
        return cam;
      },
      createRenderer: () => {
        return new WebGLRenderer({ antialias: true, alpha: true });
      },
    },
  );
});
