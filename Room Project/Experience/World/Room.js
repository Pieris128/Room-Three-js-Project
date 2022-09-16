import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.setModel();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      console.log(child.name);
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.receiveShadow = true;
          groupchild.castShadow = true;
        });
      }
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  resize() {}

  update() {}
}
