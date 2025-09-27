import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { 
  CheckSquare, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Zap,
  ArrowRight,
  Brain,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const benefits = [
    {
      icon: CheckSquare,
      title: "Automate tasks",
      description: "Lyra can automate repetitive tasks, freeing up employees to focus on more strategic work.",
    },
    {
      icon: TrendingUp,
      title: "Improve productivity",
      description: "Lyra can help employees work more efficiently, leading to increased productivity.",
    },
    {
      icon: Users,
      title: "Make better decisions",
      description: "Lyra can provide insights and recommendations to help enterprises make better decisions.",
    },
  ];

  const capabilities = [
    {
      title: "Natural language processing",
      description: "Lyra can understand and respond to natural language queries, making it easy for employees to interact with.",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-100",
    },
    {
      title: "Machine learning",
      description: "Lyra uses machine learning to improve its performance over time, providing increasingly accurate and relevant results.",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-100",
    },
    {
      title: "Data analysis",
      description: "Lyra can analyze large datasets to identify patterns and insights, helping enterprises make better decisions.",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            {/* Hero Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-50/30 to-green-50/30 rounded-3xl" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-full blur-xl" />
            
            <div className="relative p-16 md:p-24">
              <div className="max-w-4xl">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered Enterprise Solutions
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                  The AI assistant for the{" "}
                  <span className="text-primary">enterprise</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
                  Lyra is an AI assistant that helps enterprises automate tasks, improve 
                  productivity, and make better decisions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 py-6 shadow-glow">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Lyra's Core Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Lyra offers a range of benefits to enterprises, including automation of tasks, improved 
              productivity, and better decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-floating transition-all duration-300 border-0 shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Lyra's Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Lyra offers a range of capabilities to enterprises, including natural language processing, 
              machine learning, and data analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="group hover:shadow-floating transition-all duration-300 border-0 overflow-hidden">
                <div className={`h-48 ${capability.gradient} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <Brain className="h-12 w-12 text-primary/80" />
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter value={10000} />+
              </div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter value={500} />+
              </div>
              <p className="text-muted-foreground">Enterprise Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter value={99} />%
              </div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter value={24} />/7
              </div>
              <p className="text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-gradient-card border-0 shadow-floating">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get started with Lyra today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sign up for a free trial and experience the power of Lyra for yourself.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 shadow-glow">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}