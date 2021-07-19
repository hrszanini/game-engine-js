const collider = require("./modules/collider");
const component = require("./modules/component");
const game = require("./modules/game");
const gameObject = require("./modules/gameObject");
const physics = require("./modules/physics");
const room = require("./modules/room");

module.exports.BoxCollider = collider.BoxCollider;
module.exports.CircleCollider = collider.CircleCollider;
module.exports.Vector = component.Vector;
module.exports.Game = game.Game;
module.exports.GameObject = gameObject.GameObject;
module.exports.Physics = physics.Physics;
module.exports.Room = room.Room;