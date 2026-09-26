import * as React from "react";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Search,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Send,
  Textarea,
  useForm,
} from "curiouslycory.com";

type ContactValues = { name: string; email: string; message: string };

export const ContactForm = () => {
  const form = useForm<ContactValues>({
    defaultValues: {
      name: "Ada Lovelace",
      email: "ada@analytical.engine",
      message: "",
    },
  });
  return (
    <Form {...form}>
      <form className="grid w-full max-w-md gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Callsign</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                Where I'll send the reply transmission.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Want to build something together?"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Button type="button">
            <Send />
            Send Transmission
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const ValidationErrors = () => {
  const form = useForm<ContactValues>({
    defaultValues: {
      name: "",
      email: "major-tom@ground-control",
      message: "hi",
    },
  });
  React.useEffect(() => {
    form.setError("name", { message: "Every astronaut needs a callsign." });
    form.setError("email", {
      message: "That frequency is out of range. Use a full email address.",
    });
    form.setError("message", {
      message: "Transmission too short. At least 20 characters, please.",
    });
  }, [form]);
  return (
    <Form {...form}>
      <form className="grid w-full max-w-md gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Callsign</FormLabel>
              <FormControl>
                <Input placeholder="Major Tom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="button">
            <Send />
            Send Transmission
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const BlogSearch = () => {
  const form = useForm<{ query: string }>({
    defaultValues: { query: "langgraph" },
  });
  return (
    <Form {...form}>
      <form className="flex w-full max-w-md gap-2">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="sr-only">Search posts</FormLabel>
              <FormControl>
                <Input placeholder="Search posts..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="button">
          <Search />
          Search
        </Button>
      </form>
    </Form>
  );
};

export const WithSelect = () => {
  const form = useForm<{ resume: string; posting: string }>({
    defaultValues: { resume: "ai", posting: "" },
  });
  return (
    <Form {...form}>
      <form className="grid w-full max-w-md gap-4">
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base resume</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a resume" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fullstack">Full-Stack Engineer</SelectItem>
                  <SelectItem value="ai">AI Engineer</SelectItem>
                  <SelectItem value="lead">Engineering Lead</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                CareerCraft Studio starts from this version.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="posting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job posting URL</FormLabel>
              <FormControl>
                <Input placeholder="https://jobs.example.com/senior-ts" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Button type="button">Tailor Resume</Button>
        </div>
      </form>
    </Form>
  );
};
