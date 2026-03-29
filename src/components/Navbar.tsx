import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b border-primary/20">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-3 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-sm shadow-primary/20 transition hover:shadow-md hover:shadow-primary/25">
          <div className="w-8 h-8">
            <img
              src="https://res.cloudinary.com/dmgrtwca6/image/upload/v1743814694/v_logo_white-removebg-preview_luxml7.png"
              alt="Veerashri Event Planners logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading text-lg md:text-xl font-bold tracking-wide">
            Veerashri Event Planners
          </span>
        </a>

        <a
          href="#contact"
          className="hidden lg:inline-flex px-5 py-2 rounded-full bg-[var(--secondary-color)] text-secondary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          Book Your Slot
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block bg-primary border-t border-primary/20">
        <div className="container flex items-center justify-center gap-8 h-12">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-primary-foreground hover:text-secondary-foreground transition"
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden bg-primary border-t border-primary/20">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2 text-foreground hover:text-primary transition"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-5 py-2 rounded-full bg-[var(--secondary-color)] text-secondary-foreground text-sm font-medium"
            >
              Book Your Slot
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
