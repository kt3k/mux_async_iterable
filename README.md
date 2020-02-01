# mux-async-iterator v1.0.0

> Multiplexer of async iterators for JavaScript

# Usage

Deno:

```ts
import { mux } from "https://raw.githubusercontent.com/kt3k/mux-async-iterator/master/mod.ts";

mux(foo(), bar(), baz()) // => returns merged async iterator of foo(), bar(), and baz()
```

Node:

```js
const { mux } = require("mux-async-iterator");

mux(foo(), bar(), baz()) // => returns merged async iterator of foo(), bar(), and baz()
```

# License

MIT
