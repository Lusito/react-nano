# Routes

## Route

Showing a component if the location matches a certain path is done with a `Route` component. It takes a `path` prop and either a `component` prop or children.

```tsx
export const Component = () => (
  <div>
    <Route path="/news" component={News} />
    <Route path="/fakenews">Drumpf</Route>
  </div>
);
```

**Beware:** If multiple routes have a matching path, all will be shown. Use a `Switch` component if that's not desired.

As you can see, it's possible to specify a component to render or normal children.

You can even use a callback instead of children like this:

```tsx
export const Component = () => (
    <Route path="/foo/:id">{(params: { id: string }) => <div>Bar {params.id}</div>}</Route>;
);
```

See further below for the the possibility of using parameters.

## Switch

If you only want the first `Route` that has a matching path to be shown, you can use a `Switch`:

```tsx
export const Component = () => (
  <Switch>
    <Route path="/news" component={News} />
    <Route path="/fakenews" component={FakeNews} />
    {/* use "(.*)"  instead of "*" if you use path-to-regexp */}
    <Route path="*" component={Otherwise} />
  </Switch>
);
```

**Note:** The path pattern for the "Otherwise" Route differs depending on your [route matching algorithm](./router.md). With the built-in `simpleRouteMatcherFactory` you would use `"*"`, while you would use `"(.*)"` or `"/:fallback"` for `path-to-regexp`.

## Adding Parameters

When you use a custom matching algorithm like `path-to-regexp`, you can extract values from the path. Let's say you have this route:

```tsx
export const Component = () => <Route path="/news/:id" component={News} />;
```

You defined a parameter :id in your path. Now you can access it in your `News` component:

```tsx
export const News = (props: RouteComponentProps<{ id: string }>) => <div>News ID: {props.params.id}</div>;
```

## Fresh Rendering

Let's say you have this route:

```tsx
export const Component = () => <Route path="/news/:id" component={News} />;
```

Moving from `/news/1` to `/news/2` will only update the components properties. State will be preserved.
If you want to force the component to be created from scratch in this situation, you can do so by setting the property `addKey` (boolean).
This will add the `key` property to the component with a value of the current path.
