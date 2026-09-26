import { Input, Label, Textarea } from "curiouslycory.com";

export const WithInput = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="label-email">Email</Label>
    <Input id="label-email" type="email" placeholder="astronaut@example.com" />
  </div>
);

export const ContactFields = () => (
  <div className="grid w-full max-w-sm gap-4">
    <div className="grid gap-2">
      <Label htmlFor="label-name">Callsign</Label>
      <Input id="label-name" defaultValue="Major Tom" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="label-message">Transmission</Label>
      <Textarea
        id="label-message"
        placeholder="Tell me about your project…"
      />
    </div>
  </div>
);

export const Disabled = () => (
  <div className="group grid w-full max-w-sm gap-2" data-disabled="true">
    <Label htmlFor="label-disabled">Newsletter frequency</Label>
    <Input id="label-disabled" defaultValue="Weekly" disabled />
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground grid w-full max-w-md gap-4 rounded-lg p-6">
    <div className="grid gap-2">
      <Label htmlFor="label-dark-name">Callsign</Label>
      <Input id="label-dark-name" defaultValue="Major Tom" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="label-dark-message">Transmission</Label>
      <Textarea
        id="label-dark-message"
        placeholder="Tell me about your project…"
      />
    </div>
    <div className="group grid gap-2" data-disabled="true">
      <Label htmlFor="label-dark-disabled">Newsletter frequency</Label>
      <Input id="label-dark-disabled" defaultValue="Weekly" disabled />
    </div>
  </div>
);
