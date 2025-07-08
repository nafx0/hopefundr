import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowRight, CalendarDays, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hopefundr-server.vercel.app/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-12 md:py-16"
      id="campaigns"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <motion.div
        className="mb-12 max-w-2xl text-center mx-auto space-y-5"
        variants={fadeUpVariant}
        custom={0}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Every <span className="text-primary">dream</span> deserves a chance.
        </h1>
        <p className="text-muted-foreground md:text-lg leading-relaxed">
          Whether it's a medical emergency, a creative project, or launching a startup—real people with real stories are counting on your support.
        </p>
      </motion.div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[...Array(6)].map((_, idx) => (
            <Card key={idx} className="overflow-hidden flex flex-col h-full">
              <Skeleton className="w-full aspect-video rounded-b-none" />
              <CardContent className="p-5 flex flex-col flex-grow">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-2.5 pt-4 mt-auto">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex justify-end pt-5">
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign._id}
              variants={fadeUpVariant}
              custom={index}
              className="flex"
            >
              <Card className="group overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl">
                <div className="overflow-hidden">
                  <motion.img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full aspect-video object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
                <CardContent className="p-5 flex flex-col flex-grow">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-lg font-semibold line-clamp-2 mb-2">
                      {campaign.title}
                    </h2>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex-grow"
                  >
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {campaign.description}
                    </p>
                  </motion.div>

                  <div className="space-y-2.5 pt-1 mt-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CalendarDays className="w-4 h-4 flex-shrink-0" />
                      <span>Deadline: {formatDate(campaign.deadline)}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Goal: ${Number(campaign.goal || 0).toLocaleString()}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span>Min Donation: ${campaign.minDonationAmount || "5"}</span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex justify-end pt-5 mt-2"
                  >
                    <Link to={`/campaign/${campaign._id}`}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="group-hover:bg-primary/10 group-hover:text-primary px-3"
                      >
                        See More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default Campaigns;