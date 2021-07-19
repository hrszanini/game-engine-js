const imports = [
    require("./modules/game"),
    require("./modules/component"),
    require("./modules/gameObject"),
    require("./modules/collider")
];

for(let modulePos in imports){
    for(let importPos in imports[modulePos]){
        const importCollection = imports[modulePos];
        module.exports[importPos] = importCollection[importPos];
    }
}