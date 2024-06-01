# Usage with Redux

## Example

You can just as easily combine it with redux:

```tsx
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source";
import { Action, Store } from "redux";
import { useStore } from "@react-nano/redux"; // or: "react-redux";

function MyComponent() {
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();
  const [eventSource, eventSourceStatus] = useEventSource("api/events", true);
  useEventSourceListener(
    eventSource,
    ["update"],
    (evt) => {
      dispatch(addMessages(JSON.parse(evt.data)));
    },
    [dispatch],
  );

  return (
    <div>
      {eventSourceStatus === "open" ? null : <BusyIndicator />}
      {messages.map((msg) => (
        <div>{msg.text}</div>
      ))}
    </div>
  );
}
```
