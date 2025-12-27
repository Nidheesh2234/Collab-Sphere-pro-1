import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/logo";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-sm"
                : "bg-transparent py-5"
                }`}
        >

            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <Logo className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">CollabSphere</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Features
                    </a>
                    <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Testimonials
                    </a>
                    <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Pricing
                    </a>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/auth">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            Log in
                        </Button>
                    </Link>
                    <Link to="/auth">
                        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-glow hover:shadow-elevated transition-all duration-300">
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {
                isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 animate-slide-up">
                        <a
                            href="#features"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#testimonials"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Testimonials
                        </a>
                        <a
                            href="#pricing"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pricing
                        </a>
                        <div className="flex flex-col gap-2 mt-2">
                            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </nav >
    );
}
