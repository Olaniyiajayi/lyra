import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  ShoppingBag, 
  Factory, 
  Laptop, 
  GraduationCap,
  MessageSquare,
  BarChart3,
  Wrench,
  Megaphone,
  Users,
  Settings
} from "lucide-react";

export default function Solutions() {
  const industries = [
    {
      icon: Building2,
      title: "Healthcare",
      description: "Improve patient care and operational efficiency with AI-powered insights.",
      gradient: "bg-gradient-to-br from-blue-100 to-cyan-100",
    },
    {
      icon: TrendingUp,
      title: "Finance",
      description: "Enhance financial analysis, risk management, and customer service.",
      gradient: "bg-gradient-to-br from-green-100 to-emerald-100",
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Optimize inventory, personalize customer experiences, and boost sales.",
      gradient: "bg-gradient-to-br from-orange-100 to-yellow-100",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Streamline production, ensure quality control, and predict maintenance needs.",
      gradient: "bg-gradient-to-br from-gray-100 to-slate-100",
    },
    {
      icon: Laptop,
      title: "Technology",
      description: "Accelerate development, automate testing, and provide intelligent support.",
      gradient: "bg-gradient-to-br from-purple-100 to-indigo-100",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Personalize learning, automate administrative tasks, and improve student outcomes.",
      gradient: "bg-gradient-to-br from-pink-100 to-rose-100",
    },
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "Customer Support",
      description: "Provide instant, intelligent support to customers, resolving issues quickly and efficiently.",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-100",
    },
    {
      icon: TrendingUp,
      title: "Sales Enablement",
      description: "Equip sales teams with AI-driven insights to close deals faster and improve customer engagement.",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-100",
    },
    {
      icon: Wrench,
      title: "Product Development",
      description: "Accelerate product innovation with AI-powered research, design, and testing tools.",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-100",
    },
    {
      icon: Megaphone,
      title: "Marketing Automation",
      description: "Automate marketing campaigns, personalize content, and optimize lead generation.",
      gradient: "bg-gradient-to-br from-orange-50 to-yellow-100",
    },
    {
      icon: Users,
      title: "Human Resources",
      description: "Streamline HR processes, from recruitment to employee onboarding and performance management.",
      gradient: "bg-gradient-to-br from-teal-50 to-cyan-100",
    },
    {
      icon: Settings,
      title: "Operations Management",
      description: "Optimize workflows, predict bottlenecks, and improve overall operational efficiency.",
      gradient: "bg-gradient-to-br from-gray-50 to-slate-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Lyra Solutions
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Explore how Lyra can transform your business across various industries and use cases. 
            Discover tailored solutions to enhance productivity, streamline workflows, and drive innovation.
          </p>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Industries</h2>
            <p className="text-xl text-muted-foreground">
              Lyra adapts to the unique needs of different industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="group hover:shadow-floating transition-all duration-300 border-0 overflow-hidden">
                <div className={`h-48 ${industry.gradient} relative flex items-center justify-center`}>
                  <industry.icon className="h-16 w-16 text-primary/80" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Use Cases</h2>
            <p className="text-xl text-muted-foreground">
              Discover how Lyra can be applied across different business functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group hover:shadow-floating transition-all duration-300 border-0 overflow-hidden">
                <div className={`h-48 ${useCase.gradient} relative flex items-center justify-center`}>
                  <useCase.icon className="h-16 w-16 text-primary/80" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-gradient-card border-0 shadow-floating">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how Lyra can be tailored to your specific industry and use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Schedule a Demo
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors">
                Contact Sales
              </button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}