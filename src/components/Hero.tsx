const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center text-center"
  >
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src="https://res.cloudinary.com/dmgrtwca6/video/upload/v1742916827/VID-20241216-WA0005_j2uz4e.mp4"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-foreground/60" />
    <div className="relative z-10 px-4 max-w-3xl animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight">
        "Where Your Vision Meets Reality"
      </h1>
      <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 font-body">
        We don't just organize events—we create unforgettable experiences.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="#services"
          className="px-8 py-3 rounded-full bg-[var(--secondary-color)] text-secondary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition"
        >
          EXPLORE SERVICES
        </a>
        <a
          href="#contact"
          className="px-8 py-3 rounded-full border-2 border-primary-foreground text-primary-foreground font-medium text-sm tracking-wide hover:bg-primary-foreground/10 transition"
        >
          CONTACT US
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
