const imports = [
    require("./modules/collider"),
    require("./modules/component"),
    require("./modules/game"),
    require("./modules/gameObject"),
    require("./modules/physics"),
    require("./modules/room")
];

for(let modulePos in imports){
    for(let importPos in imports[modulePos]){
        const importCollection = imports[modulePos];
        module.exports[importPos] = importCollection[importPos];
    }
}