import { Sprout, Users, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface LandingPageProps {
  onGetStarted: (role: string) => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-primary">AgroConnect</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm hover:text-primary">Features</a>
            <a href="#" className="text-sm hover:text-primary">About</a>
            <a href="#" className="text-sm hover:text-primary">Contact</a>
            <Button variant="outline" size="sm">Login</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-4">Connecting Farmers with Consumers</h1>
              <p className="text-xl text-green-100 mb-8">
                Fresh produce directly from farm to table. Supporting sustainable agriculture and fair trade.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => onGetStarted('farmer')}
                  size="lg" 
                  className="bg-secondary text-primary hover:bg-yellow-300"
                >
                  <Sprout className="w-5 h-5 mr-2" />
                  Join as Farmer
                </Button>
                <Button 
                  onClick={() => onGetStarted('buyer')}
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join as Buyer
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1623211267197-b8b4bc48a0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBmaWVsZHxlbnwxfHx8fDE3NjE0NTkwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farmer in field"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-primary mb-4">Why Choose AgroConnect?</h2>
            <p className="text-xl text-muted-foreground">Empowering farmers and connecting communities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Verified Products</h3>
              <p className="text-muted-foreground">
                All products are verified by government authorities ensuring quality and authenticity.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Fair Pricing</h3>
              <p className="text-muted-foreground">
                Direct connection between farmers and buyers ensures fair prices for everyone.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Organic Options</h3>
              <p className="text-muted-foreground">
                Choose from a wide variety of organic and inorganic products based on your needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers and consumers on AgroConnect today
          </p>
          <Button 
            onClick={() => onGetStarted('farmer')}
            size="lg" 
            className="bg-secondary text-primary hover:bg-yellow-300"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xl">AgroConnect</span>
              </div>
              <p className="text-green-200 text-sm">
                Connecting farmers and consumers for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200 text-sm">
            © 2025 AgroConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
