import * as React from "react";
import { Button, Send, Toaster, toast } from "curiouslycory.com";

// Mirrors src/app/layout.tsx: <Toaster position="bottom-right" richColors />.
// Each story gets its own Toaster id so toasts don't bleed between cells when
// the whole card renders at once; duration Infinity keeps them on screen.
// Sonner renders inline (no portal) and the card's story root has a transform,
// so position:fixed resolves against the story root, not the viewport: Page
// fills the 600px viewport (minus the 24px capture gutter) so bottom-right
// lands in the actual corner.

const Page = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex flex-col items-start gap-3 p-8"
    style={{ minHeight: 552 }}
  >
    {children}
  </div>
);

export const Success = () => {
  React.useEffect(() => {
    toast.success("Transmission sent", {
      id: "toast-success",
      toasterId: "toast-success",
      description: "Thanks for reaching out. Cory usually replies within a day.",
      duration: Infinity,
    });
  }, []);
  return (
    <Page>
      <h2 className="font-oswald text-2xl tracking-tight">Send Transmission</h2>
      <Button>
        <Send />
        Send Transmission
      </Button>
      <Toaster id="toast-success" position="bottom-right" richColors />
    </Page>
  );
};

export const Failure = () => {
  React.useEffect(() => {
    toast.error("Signal lost", {
      id: "toast-error",
      toasterId: "toast-error",
      description:
        "The contact form could not reach the server. Try again in a moment.",
      duration: Infinity,
    });
  }, []);
  return (
    <Page>
      <h2 className="font-oswald text-2xl tracking-tight">Send Transmission</h2>
      <Button>
        <Send />
        Retry
      </Button>
      <Toaster id="toast-error" position="bottom-right" richColors />
    </Page>
  );
};

export const WithAction = () => {
  React.useEffect(() => {
    toast("Resume exported", {
      id: "toast-action",
      toasterId: "toast-action",
      description: "CareerCraft Studio saved your tailored resume as a PDF.",
      action: { label: "Open", onClick: () => undefined },
      duration: Infinity,
    });
  }, []);
  return (
    <Page>
      <h2 className="font-oswald text-2xl tracking-tight">Resume Builder</h2>
      <p className="text-muted-foreground text-sm">
        Tailored for: Senior Frontend Engineer
      </p>
      <Toaster id="toast-action" position="bottom-right" richColors />
    </Page>
  );
};
