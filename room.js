const { v4: uuidv4 } = require("uuid");

const { BoxCollider } = require("./collider");
const { Vector } = require("./component");

class Room {
    constructor(width, height, fps){
        this.active = false;
        this.gameObjects = {};

        if(fps === undefined)
            fps = 0;
        if(width === undefined)
            width = 0;
        if(height === undefined)
            height = 0;

        this.fps = fps;
        this.screen = new Vector(width, height);

        this.addGameObject = (gameObject, id) => {
            if(id === undefined)
                id = uuidv4();
            
            this.gameObjects[id] = gameObject;
        };

        this.collisionsProcess = (gameObject) => {
            const collisions = [];
            for(let pos in this.gameObjects){
                const gameObject2 = this.gameObjects[pos];

                if (gameObject.collider.collision(gameObject, gameObject2))
                    collisions.push(gameObject2);
            }

            return collisions;
        };

        this.physicsProcess = (gameObject) => {
            gameObject.physics.addWeight();
            gameObject.physics.addDrag();
            gameObject.move(gameObject.physics.force, new Vector(), this.screen);
        };

        this.loop = () => {
            let listToDestroy = [];
            
            for(let pos in this.gameObjects){
                const gameObject = this.gameObjects[pos]

                if(gameObject.onCollision !== undefined){
                    const collisions = this.collisionsProcess(gameObject);
                    gameObject.onCollision(collisions);
                }

                if(gameObject.physics !== undefined || gameObject.physics !== null){
                    this.physicsProcess(gameObject);
                }

                gameObject.onUpdate();

                if(gameObject.toDestroy)
                    delete this.gameObjects[pos];
            }
        };
    
        this.initialize = () => {
            for(let pos in this.gameObjects){
                const gameObject = this.gameObjects[pos];
                gameObject.onStart();
            }
        };

        this.timer = (timeInterval) => {
            if(this.active)
                setTimeout(() => {
                    this.loop();
                    this.timer();
                }, timeInterval, timeInterval);
        };

        this.start = () => {
            this.initialize();
            this.continue();
        };

        this.continue = () => {
            const timeInterval = 1000 / this.fps;
            this.active = true;
            this.timer(timeInterval);
        };

        this.stop = () => {
            this.active = false;
        };
    }
}

module.exports = { Room }