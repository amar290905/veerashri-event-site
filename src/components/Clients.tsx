const logos = [
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1745987696/images_ufvmgq.png",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1745987695/bni-2020-logo-png_seeklogo-378515_lxdxvn.png",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1745987696/channels4_profile_meeq34.jpg",
];

const Clients = () => (
  <section className="section-padding bg-background">
    <h2 className="section-title">OUR CLIENTS</h2>
    <div className="section-divider" />
    <p className="section-subtitle">Trusted by leading brands and partners</p>
    <div className="container mt-12 flex flex-wrap justify-center items-center gap-12">
      {logos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Client ${i + 1}`}
          className="h-16 md:h-20"
        />
      ))}
    </div>
  </section>
);

export default Clients;
