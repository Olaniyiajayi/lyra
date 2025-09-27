import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Shield, CheckCircle } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Users,
      title: "Customer-Centric",
      description: "We prioritize our customers' needs, ensuring our solutions are tailored to their unique challenges and goals.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We are committed to continuous innovation, pushing the boundaries of AI technology.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest standards of integrity, ensuring transparency, security, and ethical practices.",
    },
  ];

  const team = [
    {
      name: "Sophia Chen",
      role: "CEO",
      description: "Leads the strategic direction and growth of Lyra, with a focus on innovation and customer satisfaction.",
      avatar: "SC"
    },
    {
      name: "Ethan Ramirez",
      role: "CTO",
      description: "Oversees the technical development and architecture of Lyra's AI platform.",
      avatar: "ER"
    },
    {
      name: "Olivia Dubois",
      role: "Head of Product",
      description: "Manages the product roadmap and ensures Lyra meets the evolving needs of enterprise users.",
      avatar: "OD"
    },
  ];

  const journey = [
    {
      year: "2018",
      title: "Founded",
      description: "Lyra was founded with the vision to revolutionize enterprise AI.",
    },
    {
      year: "2020",
      title: "Product Launch",
      description: "Launched our first AI assistant platform for enterprises.",
    },
    {
      year: "2022",
      title: "Expanded Features",
      description: "Added advanced machine learning and analytics capabilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Lyra is an enterprise AI assistant designed to streamline workflows and 
            enhance productivity. Our team is dedicated to delivering innovative solutions 
            that empower businesses to achieve more.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At Lyra, our mission is to revolutionize how businesses interact with technology. 
                We strive to create intuitive, powerful AI tools that seamlessly integrate into 
                daily operations, driving efficiency and growth. We believe in the power of AI to 
                transform the workplace, making it more collaborative, intelligent, and human-centric.
              </p>
            </div>
            
            {/* Values Cards */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
            <p className="text-xl text-muted-foreground">
              The brilliant minds behind Lyra's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-floating transition-all duration-300 border-0 text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <Badge variant="secondary" className="mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              A timeline of our key milestones.
            </p>
          </div>

          <div className="space-y-8">
            {journey.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-2xl font-semibold text-foreground">{milestone.title}</h3>
                    <Badge variant="outline">{milestone.year}</Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}