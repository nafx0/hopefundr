import { useContext, useState, useEffect } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { LogIn, LogOut, Menu } from "lucide-react";
import { AuthContext } from "../contexts/AuthProvider";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const mainLinks = [
    { title: "Home", href: "/#home", hashLink: true },
    { title: "All Campaigns", href: "/#campaigns", hashLink: true },
  ];

  const privateLinks = [
    { title: "My Donations", href: "/myDonations" },
    { title: "My Campaigns", href: "/myCampaigns" },
    { title: "Create Campaign", href: "/createCampaign" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHashLinkActive = (href) => {
    const [path, hash] = href.split("#");
    const currentPath = path || "/";
    const currentHash = hash ? `#${hash}` : "";
    return location.pathname === currentPath && location.hash === currentHash;
  };

  const isHomePage = location.pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
      animate={{
        opacity: 1,
        y: 0,
        backdropFilter: isHomePage && !isScrolled ? "blur(0px)" : "blur(12px)",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 px-5 md:px-0",
        isHomePage && !isScrolled
          ? "bg-transparent"
          : "bg-background/95 supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center space-x-2">
          <span
            className={cn(
              "font-bold text-xl transition-colors duration-300",
              isHomePage && !isScrolled ? "text-white" : ""
            )}
          >
            Hopefund<span className="text-[#2e7d32]">r.</span>
          </span>
        </RouterLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {mainLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  {link.hashLink ? (
                    <NavHashLink
                      smooth
                      to={link.href}
                      scroll={(el) =>
                        window.scrollTo({
                          top: el.offsetTop - 70,
                          behavior: "smooth",
                        })
                      }
                      activeClassName="text-primary"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-medium transition-all duration-300 hover:text-primary",
                        isHashLinkActive(link.href) && "text-primary",
                        isHomePage && !isScrolled
                          ? "text-white/90 hover:text-white bg-transparent hover:bg-white/10"
                          : ""
                      )}
                    >
                      {link.title}
                    </NavHashLink>
                  ) : (
                    <RouterLink to={link.href}>
                      {({ isActive }) => (
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "font-medium transition-all duration-300 hover:text-primary",
                            isActive ? "text-primary" : "",
                            isHomePage && !isScrolled
                              ? "text-white/90 hover:text-white bg-transparent hover:bg-white/10"
                              : ""
                          )}
                          active={isActive}
                        >
                          {link.title}
                        </NavigationMenuLink>
                      )}
                    </RouterLink>
                  )}
                </NavigationMenuItem>
              ))}
              {user &&
                privateLinks.map((prvLink) => (
                  <NavigationMenuItem key={prvLink.href}>
                    <RouterLink to={prvLink.href}>
                      {({ isActive }) => (
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "font-medium transition-all duration-300 hover:text-primary",
                            isActive ? "text-primary" : "",
                            isHomePage && !isScrolled
                              ? "text-white/90 hover:text-white bg-transparent hover:bg-white/10"
                              : ""
                          )}
                          active={isActive}
                        >
                          {prvLink.title}
                        </NavigationMenuLink>
                      )}
                    </RouterLink>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center">
          <AnimatePresence mode="wait">
            {!loading ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Button
                  variant={isHomePage && !isScrolled ? "outline" : "default"}
                  size="sm"
                  asChild
                  className={cn(
                    "transition-all duration-300",
                    isHomePage && !isScrolled
                      ? "border-white/30 text-primary hover:bg-white/10 hover:text-white"
                      : ""
                  )}
                >
                  {!user ? (
                    <RouterLink to="/login">
                      Login/Register <LogIn className="ml-2 h-4 w-4" />
                    </RouterLink>
                  ) : (
                    <button
                      onClick={signOutUser}
                      className="flex items-center gap-1"
                    >
                      Sign Out <LogOut className="h-4 w-4" />
                    </button>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-[120px] h-9 rounded-md bg-muted animate-pulse"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-9 w-9 transition-all duration-300",
                  isHomePage && !isScrolled
                    ? "border-white/30 text-shadow-muted-foreground hover:bg-white/10 hover:text-white"
                    : ""
                )}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile nav
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4 px-5">
                {mainLinks.map((link) =>
                  link.hashLink ? (
                    <NavHashLink
                      key={link.href}
                      smooth
                      to={link.href}
                      scroll={(el) =>
                        window.scrollTo({
                          top: el.offsetTop - 70,
                          behavior: "smooth",
                        })
                      }
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        isHashLinkActive(link.href) && "text-primary"
                      )}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.title}
                    </NavHashLink>
                  ) : (
                    <RouterLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : ""
                        )
                      }
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.title}
                    </RouterLink>
                  )
                )}
                {user &&
                  privateLinks.map((prvLink) => (
                    <RouterLink
                      key={prvLink.href}
                      to={prvLink.href}
                      className={({ isActive }) =>
                        cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : ""
                        )
                      }
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {prvLink.title}
                    </RouterLink>
                  ))}
                <Button className="mt-4" asChild>
                  {!user ? (
                    <RouterLink
                      to="/login"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Login/Register <LogIn className="ml-2 h-4 w-4" />
                    </RouterLink>
                  ) : (
                    <button
                      onClick={() => {
                        signOutUser();
                        setIsSheetOpen(false);
                      }}
                      className="flex items-center gap-1"
                    >
                      Sign Out <LogOut className="h-4 w-4" />
                    </button>
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
