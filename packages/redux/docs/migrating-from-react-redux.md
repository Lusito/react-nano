# Migrating From react-redux

This library defines a different provider, which works the same way, but it does not provide the redux store to `react-redux`.
So using the original hooks and connect functions from `react-redux` won't work.

That is easily fixed though: If you want to gradually move code from `react-redux` to `@react-nano/redux`, simply add one `Provider` for each library:
```tsx
import { Provider } from "@react-nano/redux";
import { Provider as LegacyProvider } from "react-redux";
export const App = () => (
    <Provider store={store}>
        <LegacyProvider store={store}>
            ...your app content...
        </LegacyProvider>
    </Provider>
);
```

Now all you need to do is migrate your components to use hooks instead of `connect()`. If you are already using hooks, then it's just a matter of replacing the import from react-redux to @react-nano/redux!
