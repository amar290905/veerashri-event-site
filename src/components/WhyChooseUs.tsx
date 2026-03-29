import { Heart, Lightbulb, CheckCircle, Eye } from "lucide-react";

const items = [
  { icon: Heart, title: "Personalized Planning", desc: "Every event is crafted to match your style and personality." },
  { icon: Lightbulb, title: "Innovative Designs", desc: "From classic elegance to modern chic, we create breathtaking setups." },
  { icon: CheckCircle, title: "Stress-Free Execution", desc: "Leave the planning to us while you enjoy your special day." },
  { icon: Eye, title: "Attention to Detail", desc: "Because perfection is in the little things." },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-section-alt">
    <h2 className="section-title">WHY CHOOSE US</h2>
    <div className="section-divider" />
    <p className="section-subtitle">We go above and beyond to make your event extraordinary</p>
    <div className="container mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-card rounded-lg p-8 text-center shadow-md hover:shadow-xl transition group"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
            <item.icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="mt-5 font-heading text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
