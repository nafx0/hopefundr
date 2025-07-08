import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { ArrowRight, Sparkles } from "lucide-react";
import illustrateFund from "../assets/images/illustrateFund.png";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: "easeOut",
    },
  },
};

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center bg-black/80 text-white overflow-hidden py-16 lg:py-0"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        style={{
          backgroundImage: `url(${illustrateFund})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center px-6 max-w-4xl space-y-8 pt-16"
      >
        {/* Badge */}
        <motion.div
          variants={fadeDown}
          className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm shadow-lg"
        >
          <Sparkles size={16} />
          Trusted by thousands worldwide
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeDown}
          className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg"
        >
          Empower{" "}
          <span className="text-primary animate-text-glow">Ideas</span>, Fund{" "}
          <span className="text-primary animate-text-glow">Dreams</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeDown}
          className="text-lg text-white/80 max-w-xl mx-auto"
        >
          HopeFundr connects visionaries with supporters. Turn your ideas into
          reality with the power of community.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeDown}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <NavHashLink
              smooth
              to="/#campaigns"
              scroll={(el) =>
                window.scrollTo({
                  top: el.offsetTop - 70,
                  behavior: "smooth",
                })
              }
            >
              <Button
                size="lg"
                className="px-6 py-3 text-lg transition-all duration-300 shadow-md hover:shadow-white/10"
              >
                Explore Campaigns
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </NavHashLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/createCampaign">
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 text-lg text-muted-foreground border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-md hover:shadow-white/10"
              >
                Start Your Campaign
                <Sparkles size={20} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;