"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ChatBubble } from "~/components/ui/chat-bubble";
import { toast } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    toast.success("Transmission received. I'll respond at lightspeed. (Results may vary.)");
    setName("");
    setEmail("");
    setMessage("");
  };

  const fields = [
    {
      id: "name",
      label: "Callsign",
      element: (
        <Input
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />
      ),
    },
    {
      id: "email",
      label: "Frequency",
      element: (
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
      ),
    },
    {
      id: "message",
      label: "Your Message",
      element: (
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-oswald text-3xl font-bold">Contact Me</h1>
      <div className="mb-8 flex justify-center">
        <ChatBubble
          variant="thought"
          direction="bottom"
          text="Want to build something together? I'm all ears. Well, all helmet."
        />
      </div>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <label
                htmlFor={field.id}
                className="mb-1 block text-sm font-medium"
              >
                {field.label}
              </label>
              {field.element}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: fields.length * 0.1 }}
          >
            <Button type="submit">Send Transmission</Button>
          </motion.div>
        </form>
      </Card>
    </div>
  );
}
