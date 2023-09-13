import type { Renderer } from "three";
import { Camera, PerspectiveCamera, Scene, WebGLRenderer } from "three";

type AfterMountCallback = (scene: Scene, camera: Camera, renderer: Renderer) => void;
type Options = {
  createCamera?: (width: number, height: number) => Camera;
  createRenderer?: () => Renderer;
};

export default function mount(element: Element, cb: AfterMountCallback, options?: Options): void {
  const { height, width } = element.getBoundingClientRect();

  const scene = new Scene();
  const camera = options?.createCamera?.(width, height) ?? new PerspectiveCamera(75, width / height, 0.1, 1000);

  const renderer = options?.createRenderer?.() ?? new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  cb(scene, camera, renderer);
  renderer.render(scene, camera);

  element.addEventListener("resize", () => {
    const { height, width } = element.getBoundingClientRect();
    renderer.setSize(height, width);
  });
}
