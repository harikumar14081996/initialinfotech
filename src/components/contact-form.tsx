"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Unable to send inquiry.");
      }

      toast.success("Inquiry received. We will get back to you soon.");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="section-card rounded-[2rem] p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Full name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <Input
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <Input
          placeholder="Phone number"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
        <Input
          placeholder="Company"
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
        />
      </div>
      <Textarea
        className="mt-4"
        placeholder="Tell us about the project, timeline, and goals."
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
      />
      <Button className="mt-4" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send inquiry"}
      </Button>
    </form>
  );
}
