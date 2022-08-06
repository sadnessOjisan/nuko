# nuko

Cat CSS's class name.

## How to use

```jsx
// Blazing fast function. But this supports for only variadic args and doesn't support object and array.

cn("a", "b");
//  a b

cn("a", "b", false, 0, null, undefined, "");
// "a b"

const Hello = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={cn(styles.text, show && styles.show)}>Hello world!!</div>
  );
};
```

```js
// Compatible for clsx and classnames version
clsx({
  a: true,
  b: false,
  c: 0,
  d: null,
  e: undefined,
  f: 1,
});
// a f

clsx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]]);
// foo bar baz hello there
```
