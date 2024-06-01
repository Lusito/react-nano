# Usage

## Example

In order to subscribe to an SSE endpoint, you need to call useEventSource.
After you have it, you can add listeners to it. Here's a simple example:

```tsx
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source";

function MyComponent() {
  const [messages, addMessages] = useReducer(messageReducer, []);

  const [eventSource, eventSourceStatus] = useEventSource("api/events", true);
  useEventSourceListener(
    eventSource,
    ["update"],
    (evt) => {
      addMessages(JSON.parse(evt.data));
    },
    [addMessages],
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

## useEventSource

This describes the entire API of the useEventSource hook:

```tsx
// Create an EventSource
function useEventSource(
    // The url to fetch from
    url: string,
    // Send credentials or not
    withCredentials?: boolean,
    // Optionally override the EventSource class (for example with a polyfill)
    ESClass: EventSourceConstructor = EventSource
) => [
    // The generated EventSource.. on first call, it will be null.
    EventSource | null,
    // The status of the connection can be used to display a busy indicator, error indicator, etc.
    EventSourceStatus
];

type EventSourceStatus = "init" | "open" | "closed" | "error";
```

## useEventSourceListener

This describes the entire API of the useEventSourceListener hook:

```tsx
// Add a listener to the EventSource
function useEventSourceListener(
    // The EventSource from the above hook
    source: EventSource | null,
    // The event types to add the listener to
    types: string[],
    // A listener callback (use e.type to get the event type)
    listener: (e: EventSourceEvent) => void,
    // If one of the dependencies changes, the listener will be re-added to the event types.
    dependencies: any[] = []
) => void;

```
