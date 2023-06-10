import { WebGLRenderer, Scene, PerspectiveCamera, Vector3 } from "three";

export class ThreeEngine {
  dom = null; // 挂载的 DOM
  scene = null; // 场景
  constructor(dom) {
    // 创建渲染器
    let renderer = new WebGLRenderer({
      antialias: true, // 开启抗锯齿
    });
    dom.appendChild(renderer.domElement); // 将渲染器挂载到dom
    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    let scene = new Scene(); // 实例化场景
    // 实例化相机
    let camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000);
    camera.position.set(50, 50, 50); // 设置相机位置
    camera.lookAt(new Vector3(0, 0, 0)); // 设置相机看先中心点
    camera.up = new Vector3(0, 1, 0); // 设置相机自身方向
    this.dom = dom;
    this.scene = scene;
  }
}
