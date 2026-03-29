const About = () => (
  <section id="about" className="section-padding bg-background">
    <h2 className="section-title">ABOUT US</h2>
    <div className="section-divider" />
    <div className="container mt-12 grid md:grid-cols-2 gap-10 items-center">
      <img
        src="https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718661/6247d384-66f1-49de-bf19-c9490a9d8ae4_ffukjj.jpg"
        alt="About Veerashri Event Planners"
        className="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
        loading="lazy"
      />
      <div className="animate-fade-in-up">
        <h3 className="font-heading text-2xl md:text-3xl font-semibold italic text-foreground">
          "Bringing Elegance, Creativity, and Perfection to Every Event"
        </h3>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          We believe that every occasion is unique and deserves to be celebrated
          in the most spectacular way. With a keen eye for detail and a passion
          for creativity, we specialize in curating bespoke events that capture
          the essence of your vision.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          From conceptualization to execution, our team of seasoned professionals
          ensures that every aspect of your event is handled with precision and
          elegance. Whether it's a luxurious wedding, a sophisticated corporate
          event, or an intimate gathering, we bring innovation, excellence, and
          an unwavering commitment to perfection.
        </p>
        
      </div>
    </div>
  </section>
);

export default About;
