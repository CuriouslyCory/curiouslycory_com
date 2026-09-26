import { CodeBlock } from "curiouslycory.com";

export const KeyOptional = () => (
  <div className="w-full max-w-md">
    <CodeBlock language="typescript">
      {`type Context = {
  traceId?: string;
}

// Can be called like:
someFunction({})
someFunction({ traceId: "abc123" })`}
    </CodeBlock>
  </div>
);

export const ValueOptional = () => (
  <div className="w-full max-w-md">
    <CodeBlock language="typescript">
      {`type Context = {
  traceId: string | undefined; // must be provided
};

function main(ctx: Context) {
  // Now we're forced to pass the traceId down
  doThing({ traceId: ctx.traceId });
  doAnotherThing({ traceId: ctx.traceId });
}`}
    </CodeBlock>
  </div>
);

export const Arduino = () => (
  <div className="w-full max-w-md">
    <CodeBlock language="arduino">
      {`// touch sensor
#include <CapacitiveSensor.h>
#include <MedianFilter.h>

#define MQTT_SERV "io.adafruit.com"
#define MQTT_PORT 1883

const uint16_t PixelCount = 13;
#define colorSaturation 32`}
    </CodeBlock>
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground w-full max-w-md rounded-lg p-6">
    <CodeBlock language="typescript">
      {`type Context = {
  traceId?: string;
}

// Can be called like:
someFunction({})
someFunction({ traceId: "abc123" })`}
    </CodeBlock>
  </div>
);
