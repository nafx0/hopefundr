import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";
import Swal from "sweetalert2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleCampaign() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch campaign data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/campaigns/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDonate = () => {
    Swal.fire({
      title: "Thank you!",
      text: "Your donation was successful.",
      icon: "success",
      confirmButtonText: "Awesome!",
    });
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="mt-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20">
        <LoaderCircle className="animate-spin mx-auto mb-4" size={32} />
        <p className="text-lg text-muted-foreground">Loading campaign...</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-10 px-4 mt-20">
      {/* Campaign Header */}
      <div className="space-y-4">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-80 object-cover rounded-xl"
        />
        <h1 className="text-3xl font-bold">{campaign.title}</h1>
        <p className="text-muted-foreground">{campaign.category}</p>
        <div className="text-muted-foreground">{campaign.shortDescription}</div>
        <Button size="lg" className="mt-4" onClick={handleDonate}>
          Donate Now
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-10">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <p className="text-lg leading-relaxed">{campaign.description}</p>
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          <div className="text-muted-foreground">No comments yet. Be the first!</div>
        </TabsContent>

        <TabsContent value="updates" className="mt-6">
          <div className="text-muted-foreground">No updates available.</div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
