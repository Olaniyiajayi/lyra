import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LyraLogo } from "@/components/ui/lyra-logo";

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { name: "Product", path: "/product" },
    { name: "Solutions", path: "/solutions" },
    { name: "Resources", path: "/resources" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <LyraLogo className="h-8 w-8 group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-bold text-foreground">Lyra</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/contact">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Contact Sales
              </Button>
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}