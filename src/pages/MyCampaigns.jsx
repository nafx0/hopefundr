import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";
import Swal from "sweetalert2";
// import { AuthContext } from "../contexts/AuthProvider";

const dummyMyCampaigns = [
    {
      id: 1,
      title: "Fund My Final Year Project",
      image: "https://placehold.co/400x200",
      goal: 1200,
      raised: 750,
    },
    {
      id: 2,
      title: "Help Me Attend TechConf 2025",
      image: "https://placehold.co/400x200",
      goal: 2000,
      raised: 2000,
    },
];

const MyCampaigns = () => {
  // const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch user's campaigns (placeholder logic)
    setCampaigns(dummyMyCampaigns);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This campaign will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setCampaigns(campaigns.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Your campaign has been removed.", "success");
      }
    });
  };

  return (
    <section className="min-h-svh bg-muted/40 flex items-center justify-center px-6 py-12 mt-10">
      <div className="w-full max-w-5xl space-y-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <GalleryVerticalEnd className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight">
            Your Campaigns
          </h1>
          <p className="text-muted-foreground max-w-md text-sm">
            Manage all your fundraising campaigns. Every campaign you launch
            brings someone closer to their dream.
          </p>
        </div>

        {/* Campaign List */}
        {campaigns.length === 0 ? (
          <div className="text-center py-20 rounded-lg border border-dashed border-border bg-background/50">
            <p className="text-muted-foreground text-sm">
              You haven't created any campaigns yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="group relative overflow-hidden hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-44 object-cover rounded-t-md"
                  />
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold line-clamp-2">
                      {campaign.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Raised{" "}
                      <span className="font-medium">${campaign.raised}</span> of{" "}
                      <span className="font-medium">${campaign.goal}</span>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(campaign.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCampaigns;
