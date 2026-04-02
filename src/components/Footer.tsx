import { FormEvent, useState } from "react";

const NEWSLETTER_STORAGE_KEY = "adminNewsletterSubscribers";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    const subscribers = stored ? JSON.parse(stored) : [];
    const uniqueSubscribers = Array.isArray(subscribers) ? subscribers : [];

    const alreadySubscribed = uniqueSubscribers.some(
      (item: { email: string }) => item.email.toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (!alreadySubscribed) {
      uniqueSubscribers.push({
        id: Date.now(),
        email: trimmedEmail,
        subscribed_at: new Date().toISOString(),
      });
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(uniqueSubscribers));
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4">
      <div className="container mx-auto grid gap-8 md:grid-cols-[1fr_1.4fr] items-center">
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
              className="shrink-0 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              type="submit"
            >
              Subscribe
            </button>
          </div>
          {subscribed ? (
            <p className="mt-3 text-sm text-green-500">Thank you! Your subscription request has been received.</p>
          ) : null}
        </form>
      </div>
      <div className="container mx-auto flex flex-col gap-4 border-t border-border/60 pt-6 mt-10 md:flex-row md:items-center md:justify-between">
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
