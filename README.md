# mux_async_iterable v1.0.2

> Multiplexer of async iterables for JavaScript

# Usage

Deno:

```ts
import { mux } from "https://deno.land/x/mux_async_iterable@v1.0.2/mod.ts";

mux(foo(), bar(), baz()) // => returns merged async iterator of foo(), bar(), and baz()
```

Node:

```js
const { mux } = require("mux-async-iterable");

mux(foo(), bar(), baz()) // => returns merged async iterator of foo(), bar(), and baz()
```

# License

MIT
