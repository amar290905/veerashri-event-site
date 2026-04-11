import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { title: "Event Planning & Production", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718087/how-much-does-event-setup-cost-hero-image_higyak.jpg", desc: "Meticulous planning, flawless execution, and innovative ideas—that's our promise." },
  { title: "Design & Decor", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718456/8b90e68d-aaf1-4b7c-8251-48493ba7e7c7_xtnvgu.jpg", desc: "Transform your venue into a breathtaking masterpiece with exquisite décor." },
  { title: "On Site Management", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719589/11-500x500_uzexbb.webp", desc: "Enjoy your event without stress while we handle everything behind the scenes." },
  { title: "Photography & Videography", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718985/events_photography_2_z7zdup.jpg", desc: "Capture the magic of your moments with high-quality photography and cinematic videography." },
  { title: "Makeup Artist", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718820/183668_103785_cozr0u.webp", desc: "Step into the spotlight with confidence with our professional makeup artists." },
  { title: "Catering", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719273/istockphoto-650655146-612x612_abfohs.jpg", desc: "Exquisite flavors and customized menus to elevate your event." },
  { title: "Venue Management", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719810/ddf761e0-744b-40dc-9789-cf75846cf491_psdrnu.jpg", desc: "We assist with venue selection, negotiations, and complete management." },
  { title: "Fashion Designer", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719810/shutterstock_1123557119_koes4n.webp", desc: "Custom-designed outfits tailored for your big day." },
  { title: "Corporate Events", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719810/Locate-Your-Events-Purpose_xfhkpe.jpg", desc: "Professional planning and engaging experiences for businesses and colleges." },
  { title: "Gifting Studio", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719151/21ec51d3-33ae-4a56-bb8c-32e0d929598b_ofuvlc.jpg", desc: "Premium gifting services with personalized keepsakes and exquisite hampers." },
  { title: "Musicians", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719272/360_F_106476142_zMZkkTkhMeq0DIjV20oJI00e3QXLYIGN_gykbrb.jpg", desc: "Live music and top-tier entertainment to set the perfect mood." },
  { title: "Choreographers", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719272/360_F_100295281_NWi0jFNVOa1boXAkXNVTKZvXpluQXj7l_r6pibd.jpg", desc: "Expert choreographers design stunning routines for every vibe." },
];

const Services = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const togglePanel = useCallback(() => setIsPanelOpen((open) => !open), []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="services" className="section-padding bg-background">
      <h2 className="section-title">OUR SERVICES</h2>
      <div className="section-divider" />
      <div className="flex items-center justify-center">
        <p className="section-subtitle">Check out our works!</p>
      </div>

      <div className="container mt-12 relative">
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-6"
              >
                <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition h-full">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-30"
              aria-label="Previous services"
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-30"
              aria-label="Next services"
              disabled={!canScrollNext}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={togglePanel}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-secondary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            View All Services
          </button>
        </div>

        <div
          className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 overflow-y-auto max-h-screen lg:w-[26rem] ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
          id="sidePanel"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold">All Services</h2>
            </div>
            <button
              type="button"
              onClick={togglePanel}
              className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground text-sm font-medium hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 menu-list">
            {[
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718087/how-much-does-event-setup-cost-hero-image_higyak.jpg", label: "Event Planning" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718456/8b90e68d-aaf1-4b7c-8251-48493ba7e7c7_xtnvgu.jpg", label: "Design & Decor" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719589/11-500x500_uzexbb.webp", label: "On Site Management" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718985/events_photography_2_z7zdup.jpg", label: "Photography" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742718820/183668_103785_cozr0u.webp", label: "Makeup" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719273/istockphoto-650655146-612x612_abfohs.jpg", label: "Catering" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719810/ddf761e0-744b-40dc-9789-cf75846cf491_psdrnu.jpg", label: "Venue Management" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719810/shutterstock_1123557119_koes4n.webp", label: "Fashion" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719810/Locate-Your-Events-Purpose_xfhkpe.jpg", label: "Corporate" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719151/21ec51d3-33ae-4a56-bb8c-32e0d929598b_ofuvlc.jpg", label: "Gifting" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719272/360_F_106476142_zMZkkTkhMeq0DIjV20oJI00e3QXLYIGN_gykbrb.jpg", label: "Musicians" },
              { src: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1742719272/360_F_100295281_NWi0jFNVOa1boXAkXNVTKZvXpluQXj7l_r6pibd.jpg", label: "Choreographers" },
            ].map((item) => (
              <div key={item.label} className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.src} alt={item.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="px-3 py-4 text-center">
                  <span className="block font-medium text-sm leading-5 text-foreground break-words whitespace-normal">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
