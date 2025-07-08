import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryVerticalEnd, ArrowRight, BarChart2, Calendar, User } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Apple-style animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch campaigns
        const campRes = await fetch(
          `https://hopefundr-server.vercel.app/campaigns/email/${user.email}`
        );
        const campData = await campRes.json();
        
        // Fetch donations for each campaign
        const campaignsWithDonations = await Promise.all(
          campData.map(async (campaign) => {
            const donRes = await fetch(
              `https://hopefundr-server.vercel.app/donations/campaign/${campaign._id}`
            );
            const donations = donRes.ok ? await donRes.json() : [];
            const raised = donations.reduce((sum, d) => sum + d.amount, 0);
            return { ...campaign, raised };
          })
        );
        
        setCampaigns(campaignsWithDonations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This campaign will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
      background: "#1a1a1a",
      color: "#f0f0f0",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://hopefundr-server.vercel.app/campaigns/${_id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (data.deletedCount > 0) {
          const remaining = campaigns.filter((c) => String(c._id) !== String(_id));
          setCampaigns(remaining);
          
          Swal.fire({
            title: "Deleted!",
            text: "Your campaign has been removed.",
            icon: "success",
            background: "#1a1a1a",
            color: "#f0f0f0",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          background: "#1a1a1a",
          color: "#f0f0f0",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editCampaign/${id}`);
  };

  // Calculate days left for deadline
  const calculateDaysLeft = (deadline) => {
    if (!deadline) return 0;
    const diffMs = Math.max(new Date(deadline) - new Date(), 0);
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  // Calculate progress percentage
  const calculateProgress = (raised, goal) => {
    const progress = (raised / goal) * 100;
    return Math.min(progress, 100);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muted/10 flex items-center justify-center px-4 py-12 mt-10"
    >
      <div className="w-full max-w-7xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <GalleryVerticalEnd className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight">Your Campaigns</h1>
          <p className="text-muted-foreground max-w-md text-sm">
            Manage all your fundraising campaigns. Every campaign you launch brings someone closer to their dream.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden flex flex-col h-full">
                <Skeleton className="w-full aspect-video rounded-b-none" />
                <CardContent className="p-5 flex flex-col flex-grow space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="space-y-2 flex-grow">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div className="space-y-2.5 pt-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex gap-2 mt-auto pt-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 rounded-lg border border-dashed border-border/50 bg-background/50"
          >
            <p className="text-muted-foreground text-sm">
              You haven't created any campaigns yet.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate("/createCampaign")}
            >
              Create Your First Campaign
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {campaigns.map((campaign, index) => {
              const daysLeft = calculateDaysLeft(campaign.deadline);
              const progress = calculateProgress(campaign.raised, campaign.goal);
              
              return (
                <motion.div
                  key={campaign._id}
                  variants={fadeUpVariant}
                  custom={index}
                  className="flex h-full"
                >
                  <Card className="group relative overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl border-border/50">
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

                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : "Ended"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{campaign.donations?.length || 0} supporters</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground font-medium">
                              ${campaign.raised?.toLocaleString() || 0}
                            </span>
                            <span className="text-muted-foreground">
                              ${campaign.goal?.toLocaleString()}
                            </span>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-foreground/10 rounded-full"></div>
                            <motion.div
                              className="h-2 bg-primary rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            ></motion.div>
                          </div>
                          <p className="text-right text-xs text-muted-foreground mt-1">
                            {Math.floor(progress)}% funded
                          </p>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-2 mt-4"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-1/2 border-foreground/20 hover:border-primary hover:text-primary"
                          onClick={() => handleEdit(campaign._id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-1/2"
                          onClick={() => handleDelete(campaign._id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Delete
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default MyCampaigns;