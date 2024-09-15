# @helper-modules/env

Allows to Access Environment Variables Easily


## Installation

```bash
npm i @helper-modules/env
```

## Usage

### Syntex
```js
env(key: String, filter: Boolean);
```

- Params:
    - `key`: 
        - type: `String`
        - default: `undefined`
    - `filter`:
        - type: `Boolean`
        - default: `true`
        - usage: Allows to filter threw values

-------

### Common Usage
- .env
```env
name=Jhon
```

- index.js
```js
const env = require("@helper-modules/env");
// or
const { env } = require("@helper-modules/all");

let name = env("name");

console.log(name); // Jhon

```

------

### `filter` Param

- .env
```env
logging=false
```

- index.js
#### With Filter
```js
...

let logging = env("logging");

console.log(logging) // false
console.log(typeof logging) // 'boolean'

```

#### Without Filter
```js
...

let logging = env("logging", false);

console.log(logging) // 'false'
console.log(typeof logging) // 'string'

```


- Filterable Values
    - `'false'`: `false`
    - `'true'`: `true`
    - `'undefined'`: `undefined`
    - `'null'`: `null`



