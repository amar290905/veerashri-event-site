import { FormEvent, useState } from "react";
import { insertSubscriber, isSupabaseConfigured } from "@/lib/supabase";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    if (error && typeof error === "object" && "message" in error) {
      // @ts-expect-error - narrowing for dynamic Supabase error object
      return (error as { message?: string }).message ?? JSON.stringify(error);
    }
    return "Unable to subscribe. Please try again later.";
  };

  const saveSubscriberLocally = (email: string) => {
    const newSubscriber = {
      id: Date.now(),
      email,
      created_at: new Date().toISOString(),
    };
    const existing = localStorage.getItem("adminNewsletterSubscribers");
    const subscribers = existing ? JSON.parse(existing) : [];
    localStorage.setItem("adminNewsletterSubscribers", JSON.stringify([...subscribers, newSubscriber]));
  };

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFormError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.");
      }

      await insertSubscriber({ email: trimmedEmail });
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "42501") {
        saveSubscriberLocally(trimmedEmail);
        setSubscribed(true);
        setEmail("");
        setFormError("Supabase blocked the insert due to row-level security. Subscription was saved locally.");
      } else {
        setFormError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4">
      <div className="container mx-auto grid gap-8 md:grid-cols-[1fr_1.4fr] items-center mb-10">
        <div>
          <h5 className="text-lg font-semibold">Newsletter</h5>
          <p className="text-sm text-primary-foreground/70">
            Subscribe to our newsletter for updates and offers.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <input
              type="email"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button
              className="shrink-0 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          {formError ? (
            <p className="mt-3 text-sm text-red-500">{formError}</p>
          ) : null}
          {subscribed ? (
            <p className="mt-3 text-sm text-green-500">Thank you! Your subscription request has been received.</p>
          ) : null}
        </form>
      </div>

      <hr className="border-primary-foreground/20 border-t my-8" />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dmgrtwca6/image/upload/v1743814694/v_logo_white-removebg-preview_luxml7.png"
            alt="Veerashri Event Planners Logo"
            className="h-8 w-auto"
          />
          <span className="font-heading font-bold">Veerashri Event Planners</span>
        </div>
        <p className="text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Veerashri Event Planners. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
