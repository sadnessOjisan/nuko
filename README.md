<p align="center">
  <img src="./cat.png" alt="logo" width="200"/>
</p>

# <p align="center">nuko</p>

Simple constructing className function.

Nuko means cat in Japan.

## How to use

I recommend you to copy src/index.ts to your project directly.

Or if you want to use it as node_module, run

```
$ npm install nuko
```

And use it.

```ts
import { cn } from "nuko";

cn(["a", 0, null, undefined, false, true, "b"]); // a b

cn({ foo: true, bar: false, baz: true }); // foo baz
```
