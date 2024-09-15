const env = require("../");

// get variable from .env file
console.log(env("name"));


// with filter
console.log(typeof env("logging"));


// Without filter
console.log(typeof env("logging", false))