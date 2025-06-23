import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import illustrateFund from "../assets/images/illustrateFund.png";
const Hero = () => {
    return (
        <section className="w-full py-12" id='home'>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
              <Sparkles size={16} />
              Trusted by thousands worldwide
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="block text-foreground">Empower</span>
                <span className="block text-primary">
                  Ideas.
                </span>
                <span className="block text-foreground">Fund</span>
                <span className="block text-primary">
                  Dreams.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              HopeFundr connects visionaries with supporters. Transform your ideas into reality through the power of community funding.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/campaigns" className="group">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
                >
                  Explore Campaigns
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/addCampaign" className="group">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2"
                >
                  Start Your Campaign
                  <Sparkles size={20} className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Floating Cards */}
            <div className="absolute -top-8 -left-8 z-10">
              <Card className="w-32 h-20 shadow-lg">
                <CardContent className="p-3 text-center">
                  <div className="text-sm font-bold text-emerald-600">$1,250</div>
                  <div className="text-xs text-muted-foreground">Raised Today</div>
                </CardContent>
              </Card>
            </div>

            <div className="absolute -top-4 -right-12 z-10">
              <Card className="w-36 h-24 shadow-lg">
                <CardContent className="p-3 text-center">
                  <div className="text-sm font-bold text-rose-600">15 New</div>
                  <div className="text-xs text-muted-foreground">Backers Today</div>
                </CardContent>
              </Card>
            </div>

            <div className="absolute -bottom-6 -left-6 z-10">
              <Card className="w-28 h-28 shadow-lg">
                <CardContent className="p-3 text-center flex flex-col justify-center h-full">
                  <div className="text-lg font-bold text-purple-600">98%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Image Card */}
            <Card className="relative w-full max-w-lg mx-auto shadow-xl group overflow-hidden">
              <CardContent className="p-8">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={illustrateFund}
                    alt="Crowdfunding Innovation"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Hero;