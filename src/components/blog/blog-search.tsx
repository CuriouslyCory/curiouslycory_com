"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";

const formSchema = z.object({
  query: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchParams.get("q") ?? "",
    },
  });

  function onSubmit(values: FormValues) {
    const params = new URLSearchParams(searchParams.toString());

    if (values.query) {
      params.set("q", values.query);
    } else {
      params.delete("q");
    }

    // Reset to page 1 when searching
    params.set("page", "1");

    router.push(`/blog?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-2"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Search posts..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
