import { Application, Sprite, Assets, Container } from "pixi.js";

class SpaceObject{
    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;
    }

    async sinit(Sx_, Sy_, x_, y_, text_) {
        const texture = await Assets.load(text_);
        this.sprite = new Sprite(texture);
        this.sprite.x = x_;
        this.sprite.y = y_;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.width = Sx_;
        this.sprite.height = Sy_;
    }

}

class Camera{
    constructor(x_, y_, w_, h_, world_) {
        const delta = 6;
        this.click = false;
        this.shift = false;
        this.drag = false;
        this.x = x_;
        this.y = y_;

        document.addEventListener("mouseup", (event) => {
            if ( this.click )
            {
                this.click = false;
            }
            
        });
        document.addEventListener("mousedown", (event) => {
            if (event.buttons == 1)
            {
                this.click = true;
                this.mouseX = event.offsetX;
                this.mouseY = event.offsetY;
            }
        });

        document.addEventListener("mousemove", (event) => {
            if ( this.click && event.shiftKey )
            {
                console.log(event.offsetX - this.mouseX, event.offsetY - this.mouseY);
                world.pivot.x += (event.offsetX - this.mouseX);
                world.pivot.y += (event.offsetY - this.mouseY);
                this.mouseX = event.offsetX;
                this.mouseY = event.offsetY;
                
            }
        })

        window.addEventListener("wheel", event => {
            const delta = Math.sign(event.deltaY);
            world.scale = world.scale._x + 0.10 * delta;
        });
    }
}

const app = new Application();

await app.init();

document.body.appendChild(app.canvas);

const world = new Container();
world.height = 4000;
world.width = 4000;
world.x = app.screen.width / 2;
world.y = app.screen.height / 2;
world.pivot.x = world.width / 2;
world.pivot.y = world.height / 2;
app.stage.addChild(world);

const earth = await new SpaceObject(0, 0);
await earth.sinit(100, 100, 200, 200, 'earth.png');
console.log(earth.sprite)
world.addChild(earth.sprite);

const camera = new Camera(0, 0, 0, 0, world);