import { Link } from 'react-router-dom';
import { GraduationCap, Users, Calendar, BarChart3, Shield, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Users,
    title: 'Student Management',
    description: 'Complete student profiles, enrollment tracking, and parent communication in one place.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated timetable management with conflict detection and room assignments.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track attendance, grades, and finances with powerful reporting dashboards.',
  },
];

const modules = [
  { name: 'Admin Panel', description: 'Complete school management' },
  { name: 'Teacher Portal', description: 'Gradebook & lesson planning' },
  { name: 'Finance Module', description: 'Invoicing & payments' },
  { name: 'Kitchen System', description: 'Meal planning & tracking' },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Iftixor School</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8">
              <Shield className="h-4 w-4" />
              Trusted by 50+ schools across Uzbekistan
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Digital Platform for
              <span className="text-gradient block">Modern Education</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your school with our comprehensive management system. 
              Streamline administration, empower teachers, and engage parents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="gap-2 h-12 px-8">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything Your School Needs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete suite of tools designed specifically for educational institutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-interactive p-8 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Role-Based Access
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each user gets a personalized dashboard tailored to their responsibilities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className="card-elevated p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-foreground mb-2">{module.name}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join hundreds of schools already using Iftixor to streamline their operations.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Iftixor School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
