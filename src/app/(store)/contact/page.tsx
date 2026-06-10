"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you"
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", label: "Your Name", type: "text" },
            { name: "email", label: "Email Address", type: "email" },
            { name: "subject", label: "Subject", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm text-muted">{field.label}</label>
              <input
                type={field.type}
                required={field.name !== "subject"}
                value={form[field.name as keyof typeof form]}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-sm text-muted">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="space-y-8">
          <div className="flex gap-4">
            <MapPin size={24} className="shrink-0 text-gold" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-sm text-muted">
                123 Fashion Avenue, Lahore, Punjab 54000, Pakistan
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone size={24} className="shrink-0 text-gold" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-muted">
                +92-300-LUXEES
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail size={24} className="shrink-0 text-gold" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted">
                contact@luxees.com
              </p>
            </div>
          </div>
          <div className="rounded-sm border border-border p-6">
            <h3 className="mb-2 font-semibold">Business Hours</h3>
            <p className="text-sm text-muted">
              Monday – Sunday: 9:00 AM – 9:00 PM (PKT)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
