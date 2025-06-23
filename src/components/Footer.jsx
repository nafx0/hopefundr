import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-primary/10 px-4 py-2 text-sm font-medium">
      <footer className="max-w-7xl mx-auto">
        <div className="container py-12 px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand Info */}
            <div className="space-y-4">
              <span className="font-bold text-xl">
                Hopefund<span className="text-[#2e7d32]">r.</span>
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-300 max-w-sm">
                Empowering communities to raise funds for causes that matter —
                from personal needs to big ideas.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/campaigns" className="hover:underline">
                    All Campaigns
                  </Link>
                </li>
                <li>
                  <Link to="/addCampaign" className="hover:underline">
                    Start a Campaign
                  </Link>
                </li>
                <li>
                  <Link to="/myDonations" className="hover:underline">
                    My Donations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:underline">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="hover:underline">
                    Impact Stories
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-700 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} HopeFundr. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/hopefundr"
                className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/hopefundr"
                className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/hopefundr"
                className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@hopefundr.com"
                className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
