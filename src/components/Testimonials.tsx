import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Pooja Hegde", text: "We worked with Veerashri Event Planners for decorating the naming ceremony venue. I highly recommend them if you are looking to elevate your venue with beautiful and custom decor." },
  { name: "Sanjana Raj", text: "Very good service and they manage time. According to the function they will do the service for affordable prices." },
  { name: "Koushik Nataraj", text: "I would recommend Vishrutha & Rajeshwari for any event planning and decor! Such a supportive and understanding team and also reasonably priced." },
  { name: "Arpitha", text: "Really very beautiful decoration experience. Very humble and very supportive and reasonable. You can expect a beautiful outcome at the end." },
  { name: "Prathap Rao", text: "Very happy! I would highly recommend Veerashri Event Planners for any event planning and decors! Such a supportive and understanding team. Reasonable priced and innovative." },
  { name: "Akshay Kumar", text: "Very good event planning by the team. Beautiful decoration for Haldi and Mehandi. We had a great event. Thanks to the team." },
  { name: "Darshini J.N", text: "The best birthday decor ever for my baby girl thanks to Veerashri Event Planner. Keep rocking!" },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="section-padding bg-section-alt">
      <h2 className="section-title">CLIENT TESTIMONIALS</h2>
      <div className="section-divider" />
      <p className="section-subtitle">What our clients say about us</p>

      <div className="container mt-12 max-w-4xl mx-auto relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-full px-4"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
                  <p className="text-lg italic text-foreground leading-relaxed min-h-[120px]">
                    "{t.text}"
                  </p>
                  <h5 className="mt-6 font-heading font-semibold text-foreground">
                    {t.name}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  i === selectedIndex ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
