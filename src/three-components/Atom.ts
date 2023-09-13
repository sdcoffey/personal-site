import { Body, Sphere, Vec3, World } from "cannon";
import { Group, Mesh, MeshPhongMaterial, SphereGeometry } from "three";
import { shuffle } from "../utilities";

type MeshBody = { mesh: Mesh; body: Body };

export default class Atom {
  private readonly protons: MeshBody[];
  private readonly neutrons: MeshBody[];
  public nucleus: Group;

  constructor(protons: number, neutrons: number, world: World) {
    this.protons = new Array(protons).fill(null).map(() => this.createNucleon("proton"));
    this.neutrons = new Array(neutrons).fill(null).map(() => this.createNucleon("neutron"));
    this.nucleus = this.createNucleus(world);
  }

  animate(): void {
    this.protons.forEach(({ body }) => this.applyStrongForce(body));
    this.neutrons.forEach(({ body }) => this.applyStrongForce(body));
  }

  update(): void {
    this.neutrons.forEach(this.copyMeshState);
    this.protons.forEach(this.copyMeshState);
  }

  private createNucleus(world: World): Group {
    const nucleons = this.protons.concat(this.neutrons);
    shuffle(nucleons);

    const group = new Group();
    nucleons.forEach((meshBody, i) => {
      world.addBody(meshBody.body);
      group.add(meshBody.mesh);
    });

    return group;
  }

  private applyStrongForce(body: Body): void {
    body.force.set(-body.position.x * 10, -body.position.y * 10, -body.position.z * 10);
  }

  private copyMeshState(meshbody: MeshBody): void {
    meshbody.mesh.position.copy(meshbody.body.position);
    meshbody.mesh.quaternion.copy(meshbody.body.quaternion);
  }

  private createNucleon(type: "proton" | "neutron"): { body: Body; mesh: Mesh } {
    const radius = 1;
    const mesh = new Mesh(
      new SphereGeometry(radius, 50, 50),
      new MeshPhongMaterial({ color: type === "proton" ? "#abcdef" : "#fff" }),
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return {
      mesh,
      body: new Body({
        mass: 1,
        position: this.randomPosition(1),
        shape: new Sphere(radius),
      }),
    };
  }

  private randomPosition(outerRadius: number): Vec3 {
    let x = (2 * Math.random() - 1) * outerRadius,
      y = (2 * Math.random() - 1) * outerRadius,
      z = (2 * Math.random() - 1) * outerRadius;
    return new Vec3(x, y, z);
  }
}
