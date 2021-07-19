const imports = [
    require("./game"),
    require("./component"),
    require("./gameObject"),
    require("./collider")
];

for(let modulePos in imports){
    for(let importPos in imports[modulePos]){
        const importCollection = imports[modulePos];
        module.exports[importCollection[importPos]] = importCollection[importPos];
    }
}