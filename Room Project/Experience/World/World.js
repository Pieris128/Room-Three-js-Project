import * as THREE from "three";
import Experience from "../Experience";

import Room from "./Room";
import Enviroment from "./Enviroment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.Sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.enviroment = new Enviroment();
      this.room = new Room();
    });
  }

  resize() {}

  update() {}
}
