const Component = require("./component");

const ColliderType = {
    BOX: "box",
    CIRCLE: "circle"
}

class Collider{
    constructor(offset){
        if(offset === undefined)
            offset = new Component.Vector();

        this.offset = offset;
        this.collisionHandler = {};

        this.collision = (self, target) => {
            if(self === target)
                return false;
            return this.collisionHandler[target.collider.type](self, target);
        }
    }
}

class BoxCollider extends Collider{
    constructor(offset, size){
        super(offset);

        if(size === undefined)
            size = new Component.Vector();

        this.type = ColliderType.BOX;
        this.size = size;

        this.collisionHandler[ColliderType.BOX] = BoxBoxCollision;
        this.collisionHandler[ColliderType.CIRCLE] = BoxCircleCollision;
    }
}

class CircleCollider extends Collider {
    constructor(offset, radius){
        super(offset);

        if(radius === undefined)
            radius = 0;

        this.type = ColliderType.CIRCLE;
        this.offset = offset;
        this.radius = radius;

        this.collisionHandler[ColliderType.BOX] = BoxCircleCollision;
        this.collisionHandler[ColliderType.CIRCLE] = CircleCircleCollision;
    }
}

function BoxCircleCollision(gameObject1, gameObject2){
    let  box, circle;
    if(gameObject1.collider.type == ColliderType.BOX){
        box = gameObject1;
        circle = gameObject2;
    }else{
        box = gameObject1;
        circle = gameObject2;
    }
        
    return false;
}

function BoxBoxCollision(gameObject1, gameObject2){
    const collider1x = gameObject1.position.x + gameObject1.collider.offset.x;
    const collider1y = gameObject1.position.y + gameObject1.collider.offset.y;
    const initial1x = collider1x - (gameObject1.collider.size.x / 2); 
    const final1x = collider1x + (gameObject1.collider.size.x / 2); 
    const initial1y = collider1y - (gameObject1.collider.size.y / 2);
    const final1y = collider1y + (gameObject1.collider.size.y / 2);

    const collider2x = gameObject2.position.x + gameObject2.collider.offset.x;
    const collider2y = gameObject2.position.y + gameObject2.collider.offset.y;
    const initial2x = collider2x - (gameObject2.collider.size.x / 2); 
    const final2x = collider2x + (gameObject2.collider.size.x / 2); 
    const initial2y = collider2y - (gameObject2.collider.size.y / 2);
    const final2y = collider2y + (gameObject2.collider.size.y / 2);

    if((initial1x > initial2x && initial1x < final2x)|| (final1x > initial2x && final1x < final2x))
        if((initial1y > initial2y && initial1y < final2y)|| (final1y > initial2y && final1y < final2y))
            return true;
    return false;
}

function CircleCircleCollision(gameObject1, gameObject2){
    const collider1x = gameObject1.position.x + gameObject1.collider.offset.x;
    const collider1y = gameObject1.position.y + gameObject1.collider.offset.y;

    const collider2x = gameObject2.position.x + gameObject2.collider.offset.x;
    const collider2y = gameObject2.position.y + gameObject2.collider.offset.y;

    const componentX = Math.pow(collider1x - collider2x, 2); 
    const componentY = Math.pow(collider1y - collider2y, 2); 
    const distance = Math.sqrt(componentX + componentY);

    if(distance < gameObject1.collider.radius || distance < gameObject2.collider.radius)
        return true;
    return false;
}

module.exports = { BoxCollider, CircleCollider };