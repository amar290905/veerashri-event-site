import { Facebook, Instagram, Linkedin, Mail, MessageSquare, Phone, MapPin, Youtube } from "lucide-react";
import { FormEvent, useState } from "react";
import { insertContact, isSupabaseConfigured } from "@/lib/supabase";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveContactLocally = (contact: { name: string; email: string; phone: string; message: string }) => {
    const newContact = {
      id: Date.now(),
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      created_at: new Date().toISOString(),
    };
    const existing = localStorage.getItem("adminContacts");
    const contacts = existing ? JSON.parse(existing) : [];
    localStorage.setItem("adminContacts", JSON.stringify([...contacts, newContact]));
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    if (error && typeof error === "object" && "message" in error) {
      // @ts-expect-error - narrowing for dynamic Supabase error object
      return (error as { message?: string }).message ?? JSON.stringify(error);
    }
    return "Unable to send message. Please try again later.";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage("");
    setFormError("");
    setIsSubmitting(true);

    const contact = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.");
      }

      await insertContact(contact);
      setStatusMessage("Your message has been sent successfully. Thank you for contacting us.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "42501") {
        saveContactLocally(contact);
        setStatusMessage(
          "Your message has been saved locally because Supabase row-level security blocked the insert. Configure Supabase table policies to allow anonymous writes."
        );
      } else {
        setFormError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-section-alt">
      <h2 className="section-title">CONTACT US</h2>
      <div className="section-divider" />
      <p className="section-subtitle">Get in touch with us for your next event</p>

      <div className="container mt-12 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <h3 className="font-heading text-2xl font-semibold mb-6">Contact Information</h3>
          <div className="space-y-5">
            <a href="mailto:veerashrieventplanners@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition">
              <Mail className="w-5 h-5 text-primary" />
              veerashrieventplanners@gmail.com
            </a>
            <a href="tel:+919591915156" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition">
              <Phone className="w-5 h-5 text-primary" />
              +91 9591915156
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              Bangalore, India
            </div>
            <div className="social-media mt-4">
              <h2>Follow Us</h2>
              <div className="social-icons flex flex-wrap gap-3 mt-2">
                <a href="https://www.instagram.com/veerashri_event_planners?igsh=cm9jNnV6NGNwMnp3" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-card text-primary hover:bg-primary/10 transition" aria-label="Follow us on Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/1EqFGVMPix/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-card text-primary hover:bg-primary/10 transition" aria-label="Follow us on Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/veerashri-event-planners-355846293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-card text-primary hover:bg-primary/10 transition" aria-label="Follow us on LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@VeerashriEventPlanners" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-card text-primary hover:bg-primary/10 transition" aria-label="Subscribe to our YouTube channel">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://wa.me/919591915156" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-card text-primary hover:bg-primary/10 transition" aria-label="Contact us on WhatsApp">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {statusMessage ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {statusMessage}
            </div>
          ) : null}
          {formError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {formError}
            </div>
          ) : null}
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 rounded-full bg-[var(--secondary-color)] text-secondary-foreground font-medium hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
