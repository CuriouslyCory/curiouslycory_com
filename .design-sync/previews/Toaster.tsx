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

// Dark mode is set on <html> the way the site's next-themes toggle does it.
// The Toaster reads its theme from next-themes' useTheme(), and the `dark`
// class alone does not reach it: without a ThemeProvider (there is none in the
// bundle) the hook yields "system", so sonner follows prefers-color-scheme and
// richColors toasts render light on the dark page. On the site the provider
// hands the Toaster "dark"; `theme="dark"` passes that same value directly.
// `expand` lays both toasts out instead of stacking them, so the default
// (token-driven) and richColors success surfaces are both visible.
export const Dark = () => {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
    toast("Resume exported", {
      id: "toast-dark-default",
      toasterId: "toast-dark",
      description: "CareerCraft Studio saved your tailored resume as a PDF.",
      action: { label: "Open", onClick: () => undefined },
      duration: Infinity,
    });
    toast.success("Transmission sent", {
      id: "toast-dark-success",
      toasterId: "toast-dark",
      description: "Thanks for reaching out. Cory usually replies within a day.",
      duration: Infinity,
    });
    return () => document.documentElement.classList.remove("dark");
  }, []);
  return (
    // Page's minHeight keeps bottom-right in the card's corner; the dark page
    // surface is painted here because the card template's background is light.
    <div
      className="bg-background text-foreground flex flex-col items-start gap-3 p-8"
      style={{ minHeight: 552 }}
    >
      <h2 className="font-oswald text-2xl tracking-tight">Send Transmission</h2>
      <Button>
        <Send />
        Send Transmission
      </Button>
      <Toaster
        id="toast-dark"
        position="bottom-right"
        richColors
        expand
        theme="dark"
      />
    </div>
  );
};
