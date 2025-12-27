import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/ui/logo";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/50 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-4 group">
                            <Logo className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" />
                            <span className="font-bold text-xl tracking-tight">CollabSphere</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Empowering teams to build the future together. The all-in-one workspace for modern collaboration.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div className="col-span-1">
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Features</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Integrations</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pricing</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div className="col-span-1">
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Documentation</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">API Reference</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Community</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</a></li>
                        </ul>
                    </div>

                    {/* Links 3 */}
                    <div className="col-span-1">
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Careers</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Legal</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} CollabSphere Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
