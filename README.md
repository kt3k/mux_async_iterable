# mux_async_iterable v1.0.3

> Multiplexer of async iterables for JavaScript

# Usage

Deno:

```ts
import { mux } from "https://deno.land/x/mux_async_iterable@v1.0.3/mod.ts";

mux(foo(), bar(), baz()); // => returns merged async iterator of foo(), bar(), and baz()
```

Node:

```js
import { mux } from "mux-async-iterable";

mux(foo(), bar(), baz()); // => returns merged async iterator of foo(), bar(), and baz()
```

# License

MIT
