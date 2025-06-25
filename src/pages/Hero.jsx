import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { ArrowRight, Sparkles } from "lucide-react";
import illustrateFund from "../assets/images/illustrateFund.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center bg-black/80 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={illustrateFund}
          alt="Crowdfunding background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content */}
      <div className="text-center px-6 max-w-4xl space-y-8 pt-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">
          <Sparkles size={16} />
          Trusted by thousands worldwide
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white">
          Empower <span className="text-primary">Ideas</span>, Fund{" "}
          <span className="text-primary">Dreams</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-white/80 max-w-xl mx-auto">
          HopeFundr connects visionaries with supporters. Turn your ideas into
          reality with the power of community.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
            <Button size="lg" className="px-6 py-3 text-lg">
              Explore Campaigns
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </NavHashLink>
          <Link to="/createCampaign">
            <Button
              size="lg"
              variant="outline"
              className="px-6 py-3 text-lg text-muted-foreground border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Start Your Campaign
              <Sparkles size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;