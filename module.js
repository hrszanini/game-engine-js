const imports = [
    require("./game"),
    require("./component"),
    require("./gameObject"),
    require("./collider")
];

for(let pos in imports)
    module.exports[imports[pos]] = imports[pos];