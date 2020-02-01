# mux-async-iterator v0.1.0

> Multiplexer of async iterators for JavaScript

# Usage

```ts
import { mux } from "https://raw.githubusercontent.com/kt3k/mux-async-iterator/master/mod.ts";

mux(foo(), bar(), baz()) // => returns merged async iterator of foo(), bar(), and baz()
```

# License

MIT
