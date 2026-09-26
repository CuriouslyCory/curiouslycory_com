import * as React from "react";
import { Card, Label, Slider } from "curiouslycory.com";

export const Default = () => {
  const [value, setValue] = React.useState([65]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="thrust">Thrust</Label>
        <span className="text-muted-foreground font-mono text-sm">
          {value[0]}%
        </span>
      </div>
      <Slider
        id="thrust"
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        aria-label="Thrust"
      />
    </div>
  );
};

export const Range = () => {
  const [value, setValue] = React.useState([3, 8]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex items-center justify-between">
        <Label>Years of experience</Label>
        <span className="text-muted-foreground font-mono text-sm">
          {value[0]}–{value[1]} yrs
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={15}
        step={1}
        aria-label="Years of experience"
      />
      <p className="text-muted-foreground text-sm">
        Filters the job matches CareerCraft Studio suggests.
      </p>
    </div>
  );
};

export const Steps = () => (
  <div className="grid w-full max-w-sm gap-6">
    <div className="grid gap-3">
      <Label>LLM temperature</Label>
      <Slider defaultValue={[0.7]} min={0} max={1} step={0.1} aria-label="LLM temperature" />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Precise</span>
        <span>Creative</span>
      </div>
    </div>
    <div className="grid gap-3">
      <Label>Posts per page</Label>
      <Slider defaultValue={[10]} min={5} max={25} step={5} aria-label="Posts per page" />
      <div className="text-muted-foreground flex justify-between font-mono text-xs">
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>20</span>
        <span>25</span>
      </div>
    </div>
  </div>
);

export const Disabled = () => (
  <div className="grid w-full max-w-sm gap-3">
    <div className="flex items-center justify-between">
      <Label className="opacity-50">Oxygen reserve</Label>
      <span className="text-muted-foreground font-mono text-sm">42%</span>
    </div>
    <Slider defaultValue={[42]} max={100} disabled aria-label="Oxygen reserve" />
    <p className="text-muted-foreground text-sm">
      Locked while the airlock is cycling.
    </p>
  </div>
);

export const Vertical = () => (
  <div className="flex items-end gap-8">
    {[
      { label: "Bass", value: 70 },
      { label: "Mid", value: 45 },
      { label: "Treble", value: 60 },
    ].map((band) => (
      <div key={band.label} className="flex flex-col items-center gap-3">
        <Slider
          orientation="vertical"
          defaultValue={[band.value]}
          max={100}
          aria-label={band.label}
        />
        <span className="text-muted-foreground text-xs">{band.label}</span>
      </div>
    ))}
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground grid w-full max-w-md gap-6 rounded-lg p-6">
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label>Thrust</Label>
        <span className="text-muted-foreground font-mono text-sm">65%</span>
      </div>
      <Slider defaultValue={[65]} max={100} step={1} aria-label="Thrust" />
    </div>
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label>Years of experience</Label>
        <span className="text-muted-foreground font-mono text-sm">3–8 yrs</span>
      </div>
      <Slider
        defaultValue={[3, 8]}
        min={0}
        max={15}
        step={1}
        aria-label="Years of experience"
      />
    </div>
    <Card className="grid gap-3 p-6">
      <Label>LLM temperature</Label>
      <Slider
        defaultValue={[0.7]}
        min={0}
        max={1}
        step={0.1}
        aria-label="LLM temperature"
      />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Precise</span>
        <span>Creative</span>
      </div>
    </Card>
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label className="opacity-50">Oxygen reserve</Label>
        <span className="text-muted-foreground font-mono text-sm">42%</span>
      </div>
      <Slider defaultValue={[42]} max={100} disabled aria-label="Oxygen reserve" />
      <p className="text-muted-foreground text-sm">
        Locked while the airlock is cycling.
      </p>
    </div>
  </div>
);
