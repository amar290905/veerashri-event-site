const members = [
  { name: "Rajeshwari Chowdry", role: "Founder & Creative Director", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743858650/image-1000x1000_gj9uxj.png" },
  { name: "Vishrutha", role: "Co-Founder & Operations Head", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/c_crop,w_500,h_500,g_auto/v1743858844/WhatsApp_Image_2025-04-05_at_6.43.18_PM_pwofb2.jpg" },
  { name: "Venkataswamy J.R", role: "Business Development Consultant", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/c_crop,w_250,h_280,g_auto/v1743859372/image-1000x1500_1_pg1o0w.png" },
  { name: "Gayathri P.V", role: "Marketing Assistant", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1743858650/image-1000x1000_1_gk3zee.png" },
  { name: "Amarnath G.V", role: "Editor & Content Specialist", img: "https://res.cloudinary.com/dmgrtwca6/image/upload/v1744394804/image-1000x1500_4_d3xd1x_u3nbmc.png" },
];

const Team = () => (
  <section id="team" className="section-padding bg-background">
    <h2 className="section-title">Meet Our Team</h2>
    <div className="section-divider" />
    <p className="section-subtitle">The passionate professionals behind every perfect event</p>
    <div className="container mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {members.map((m) => (
        <div key={m.name} className="text-center group">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition">
            <img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <h4 className="mt-4 font-heading text-base font-semibold">{m.name}</h4>
          <p className="text-sm text-muted-foreground">{m.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Team;
