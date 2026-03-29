const images = [
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783489/IMG-20250127-WA0001_ttxbcj.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783489/IMG-20240527-WA0022_aybaoy.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783488/IMG-20230422-WA0024_ppfvwg.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783488/Screenshot_2024_0503_173315_m9c1h5.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783489/444a3c45-4825-48c6-ae94-a9c96eb63c71_i54ka7.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783489/IMG-20250316-WA0001_ybfyzu.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783489/IMG-20230324-WA0047_f9anij.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783489/IMG-20240910-WA0009_1_lsq6uf.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743783927/_DSC9392_4_1_emcpin.jpg",
  "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743869887/IMG-20240527-WA0020_hjin5f.jpg",
];

const Gallery = () => (
  <section id="gallery" className="section-padding bg-section-alt">
    <h2 className="section-title">GALLERY</h2>
    <div className="section-divider" />
    <p className="section-subtitle">Event Highlights</p>
    <div className="container mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {images.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-lg aspect-square group">
          <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ))}
    </div>
    <div className="text-center mt-8">
      <a
        href="https://drive.google.com/drive/folders/1ehx3Zv5gEUM7r0xNsi0Cv_TP_Byy7gmy?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-full bg-[var(--secondary-color)] text-secondary-foreground text-sm font-medium hover:opacity-90 transition"
      >
        View Gallery
      </a>
    </div>
  </section>
);

export default Gallery;
