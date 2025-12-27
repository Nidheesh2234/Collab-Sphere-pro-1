import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Code, MessageSquare, Zap, Shield, Users } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { BackgroundAnimations } from "@/components/layout/BackgroundAnimations";

function HeroTabs() {
  const [activeTab, setActiveTab] = useState<"freelance" | "social" | "team">("freelance");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <div className="mt-20 w-full max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: "freelance", label: "Freelancing" },
          { id: "social", label: "Social Media" },
          { id: "team", label: "Team Collab" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
              ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_20px_rgba(0,240,181,0.3)]"
              : "bg-surface/50 text-muted-foreground hover:bg-surface hover:text-foreground border border-transparent"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Mockup */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />

        <TiltCard mouseX={mouseX} mouseY={mouseY}>
          <div className="rounded-xl border border-border/50 bg-surface/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-video relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Interface Content Based on Tab */}
            <div className="w-full h-full p-6 flex flex-col">
              {/* Window Controls */}
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>

              {/* Dynamic Content */}
              {activeTab === "freelance" && (
                <div className="flex-1 grid grid-cols-12 gap-6 opacity-80">
                  <div className="col-span-3 bg-surface-elevated/50 rounded-lg border border-white/5 p-4 flex flex-col gap-3">
                    <div className="w-full h-8 bg-primary/20 rounded mb-2" />
                    <div className="w-full h-20 bg-white/5 rounded" />
                    <div className="w-full h-20 bg-white/5 rounded" />
                  </div>
                  <div className="col-span-9 flex flex-col gap-4">
                    <div className="w-full h-32 bg-surface-elevated/50 rounded-lg border border-white/5 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 h-1 bg-primary/30 rounded" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="bg-surface-elevated/50 rounded-lg border border-white/5" />
                      <div className="bg-surface-elevated/50 rounded-lg border border-white/5" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "social" && (
                <div className="flex-1 grid grid-cols-12 gap-6 opacity-80">
                  <div className="col-span-2 bg-surface-elevated/50 rounded-lg border border-white/5" />
                  <div className="col-span-7 flex flex-col gap-4">
                    <div className="w-full h-12 bg-surface-elevated/50 rounded-lg border border-white/5 flex items-center px-4 gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20" />
                      <div className="flex-1 h-2 bg-white/5 rounded" />
                    </div>
                    <div className="flex-1 bg-surface-elevated/50 rounded-lg border border-white/5 relative">
                      {/* Fake "Post" Cards */}
                      <div className="absolute inset-4 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg" />
                        <div className="bg-white/5 rounded-lg" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 bg-surface-elevated/50 rounded-lg border border-white/5 p-4">
                    <div className="w-full aspect-square bg-blue-500/10 rounded-full mb-4 mx-auto" />
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-white/5 rounded" />
                      <div className="w-full h-2 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div className="flex-1 grid grid-cols-12 gap-6 opacity-80">
                  <div className="col-span-3 bg-surface-elevated/50 rounded-lg border border-white/5 flex flex-col gap-2 p-3">
                    <div className="w-8 h-8 rounded bg-green-500/20 mb-4" />
                    <div className="w-full h-2 bg-white/5 rounded" />
                    <div className="w-full h-2 bg-white/5 rounded" />
                    <div className="w-full h-2 bg-white/5 rounded" />
                  </div>
                  <div className="col-span-6 bg-surface-elevated/50 rounded-lg border border-white/5 p-4">
                    <div className="flex gap-4 mb-4">
                      <div className="w-1/3 h-full bg-white/5 rounded flex-1 aspect-[2/3]" />
                      <div className="w-1/3 h-full bg-white/5 rounded flex-1 aspect-[2/3]" />
                      <div className="w-1/3 h-full bg-white/5 rounded flex-1 aspect-[2/3]" />
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-col gap-4">
                    <div className="w-full aspect-video bg-surface-elevated/50 rounded-lg border border-white/5 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 animate-pulse" />
                      </div>
                    </div>
                    <div className="flex-1 bg-surface-elevated/50 rounded-lg border border-white/5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </TiltCard>

        {/* Glow under the image */}
        <div className={`absolute -inset-1 bg-gradient-to-r rounded-xl blur-2xl opacity-20 -z-10 animate-pulse transition-colors duration-500 ${activeTab === 'freelance' ? 'from-primary to-cyan-500' :
          activeTab === 'social' ? 'from-purple-500 to-pink-500' :
            'from-green-500 to-emerald-500'
          }`} />
      </motion.div>
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  // The 'position' transform is not directly used in the provided code,
  // but it's often used with scroll-based animations to fix/unfix elements.
  // Keeping it here as it was in the instruction, though it might not have a direct effect
  // on the current layout without further styling.
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed";
  });

  // Mouse tilt effect for hero image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-inter selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Global Background Grid */}
      <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      {/* Animated Backgrounds */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <BackgroundAnimations />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={targetRef}
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-visible min-h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -z-10"
        />

        <div className="container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-8 hover:bg-secondary/20 transition-colors duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide uppercase">v2.0 is now live</span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            Collaboration <br className="hidden md:block" />
            <span className="gradient-text relative inline-block">
              Reimagined for Future
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-50"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.00025 6.99997C25.7501 9.99995 84.8347 8.25702 108.5 7.99997C196.5 7.04388 196.5 3.99981 190.5 4.99997C118.5 17 84 0 54 2.5" stroke="currentColor" strokeWidth="3" />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The all-in-one workspace where teams flow together. Chat, code, and create with AI-powered superpowers.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="w-full md:w-auto text-lg h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => navigate("/auth")}
            >
              Start for Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full md:w-auto text-lg h-12 px-8 border-primary/20 hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Hero Image/Mockup with Tilt Effect */}
          <motion.div style={{ opacity, scale }}>
            <HeroTabs />
          </motion.div>
        </div>
      </motion.section>

      {/* Social Proof */}
      <section className="py-10 border-y border-border/50 bg-surface/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-8">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-opacity duration-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, filter: "grayscale(0%)", opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-8 w-24 bg-foreground/20 rounded cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -50, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"
        />
        <motion.div
          animate={{ y: [0, 50, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10"
        />

        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Built for <span className="text-primary">Speed</span>, Designed for <span className="text-secondary">Flow</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Everything you need to manage projects, write code, and communicate - all in one beautiful interface.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare size={32} />}
              title="Real-time Chat"
              description="Connect with your team instantly. Channels, threads, and direct messages that feel as natural as conversation."
              delay={0}
            />
            <FeatureCard
              icon={<Bot size={32} />}
              title="AI-Powered Assistant"
              description="Your intelligent co-pilot. Generate code, summarize discussions, and brainstorm ideas without leaving your workspace."
              delay={0.1}
              highlight
            />
            <FeatureCard
              icon={<Code size={32} />}
              title="Collaborative Coding"
              description="Share snippets and review code in real-time. Syntax highlighting for over 100 languages."
              delay={0.2}
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Lightning Fast"
              description="Optimized for performance. Zero loading times between pages and instant state updates."
              delay={0.3}
            />
            <FeatureCard
              icon={<Shield size={32} />}
              title="Enterprise Security"
              description="Bank-grade encryption, role-based access control, and audit logs keeping your data safe."
              delay={0.4}
            />
            <FeatureCard
              icon={<Users size={32} />}
              title="Team Management"
              description="Organize members into teams and channels. Manage permissions effortlessly."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-background -z-20" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -z-10"
        />

        <div className="container mx-auto px-4 text-center z-10 relative">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 leading-tight"
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Blast Off?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <Button
                size="lg"
                className="relative text-lg h-14 px-10 rounded-full bg-foreground text-background hover:scale-105 transition-transform duration-300 shadow-xl"
                onClick={() => navigate("/auth")}
              >
                Get Started for Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, delay, highlight }: { icon: React.ReactNode, title: string, description: string, delay: number, highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
      className={`p-8 rounded-2xl border transition-all duration-300 ${highlight
        ? "bg-gradient-to-b from-surface-elevated to-surface border-primary/20 shadow-glow"
        : "bg-surface hover:bg-surface-elevated border-border/50 hover:border-primary/30"
        }`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110 ${highlight ? "bg-gradient-to-br from-primary to-secondary text-white" : "bg-primary/10 text-primary"
        }`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function TiltCard({ children, mouseX, mouseY }: { children: React.ReactNode, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
