import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();

      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }
      if (this.device === "mobile") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }

      this.timeline.to(".intro-text .animatedis", {
        yPercent: -100,
        stagger: 0.05,
        ease: "back.out(1.7)",
        onComplete: resolve,
      });
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      this.roomChildren.rectLight.scale.set(0, 0, 0);
      this.secondTimeline
        .to(".intro-text .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        })
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 10,
            y: 10,
            z: 10,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 3.5,
            z: 5,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: -0.741718,
            y: 6.92873,
            z: 0.379809,
          },
          "same"
        )
        .set(this.roomChildren.body.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.cube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
            duration: 0.7,
          },
          "intro"
        )
        .to(
          ".hero-main-title .animatedis",
          {
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          ".hero-main-description .animatedis",
          {
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          ".first-sub .animatedis",
          {
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          ".second-sub .animatedis",
          {
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          this.roomChildren.aquarium.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.rectLight.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.3,
          },
          ">-0.4"
        )
        .to(
          this.roomChildren.fish.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.1,
          },
          ">-0.5"
        )
        .to(
          this.roomChildren.shelves.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.1"
        )
        .to(
          this.roomChildren.desks.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.4"
        )
        .to(
          this.roomChildren.floor_items.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.7"
        )
        .to(
          this.roomChildren.computer.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.5"
        )
        .to(
          this.roomChildren.table_stuff.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.6"
        )
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.8"
        )
        .to(
          this.roomChildren.chair.rotation,
          {
            y: Math.PI * 4 - Math.PI / 2,
            ease: "power2.out(2.2)",
            duration: 1,
            onComplete: resolve,
          },
          ">-0.8"
        )
        .set(this.roomChildren.minifloor.scale, {
          x: 1,
          y: 1,
          z: 1,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;

    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  //   scale() {
  //     if (this.device === "desktop") {
  //       this.room.scale.set(0.15, 0.15, 0.15);
  //     } else {
  //       this.room.scale.set(0.07, 0.07, 0.07);
  //     }
  //   }

  update() {
    if (this.moveFlag) {
      this.move();
    }
    // if (this.scaleFlag) {
    //   this.scale();
    // }
  }
}
