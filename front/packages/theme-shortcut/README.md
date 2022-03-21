# Theme-shortcut

Now we can use less code to the same style object. For example:

```typescript
merge(
  layout({ pos: 'absolute', r: padding, b: padding }),
  text({ col: 'fg-0' }),
  bg({ col: { _: 'bg-2', hover: 'bg-4' } }),
  size({ h: '2rem', w: '8rem' }),
  border({ width: '2px', col: 'bg-6' }),
)
```

And it equals to:
```typescript
{
  position: 'absolute',
  right: padding,
  bottom: padding,
  color: 'fg-0',
  backgroundColor: 'bg-2',
  height: '2rem',
  width: '8rem',
  borderWidth: '2px',
  borderColor: 'bg-6',
  ':hover': {
    backgroundColor: 'bg-4',
  },
}
```

## TODO

In my opintion, I hope we can only export a function named `cszp`, And this code
below can run well:

```
cszp({
  layout: { pos: 'absolute', r: padding, b: padding },
  // same as `text: { col: `fg-0` }`
  col: 'fg-0',
  // same as `bg: { col: { _: 'bg-2', hv: 'bg-4' } }`
  bgCol: { _: 'bg-2', hv: 'bg-4' }
  size: { h: '2rem', w: '8rem' },
  border: { w: '2px', col: 'bg-6' },
})
```

The emotion style object would be valid for function `cszp`.

The function `cszp` need to be a pure function and we can deal with it at the
compile time with a plugin we defined.

