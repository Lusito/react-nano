# Provider

## Adding a Provider

In order to get access to your redux store, you'll need to wrap your app in a (single) provider like this:

```tsx
import { Provider } from "@react-nano/redux";
export const App = () => <Provider store={store}>...</Provider>;
```
