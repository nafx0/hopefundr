import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://hopefundr-server.vercel.app/campaigns/email/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This campaign will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
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
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/editCampaign/${id}`);
  }

  return (
    <section className="min-h-screen bg-muted/40 flex items-center justify-center px-6 py-12 mt-10">
      <div className="w-full max-w-7xl space-y-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <GalleryVerticalEnd className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight">Your Campaigns</h1>
          <p className="text-muted-foreground max-w-md text-sm">
            Manage all your fundraising campaigns. Every campaign you launch brings someone closer to their dream.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-44 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-20 rounded-lg border border-dashed border-border bg-background/50">
            <p className="text-muted-foreground text-sm">
              You haven't created any campaigns yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card
                key={campaign._id}
                className="group relative overflow-hidden border hover:border-primary transition-all duration-300"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-44 object-cover rounded-t-md"
                />
                <CardContent className="p-5 space-y-3">
                  <h2 className="text-lg font-semibold line-clamp-2">{campaign.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {campaign.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Raised <span className="font-medium">${campaign.raised || 0}</span> of{" "}
                    <span className="font-medium">${campaign.goal}</span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-1/2 border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => handleEdit(campaign._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-1/2"
                      onClick={() => handleDelete(campaign._id)}
                    >
                      Delete
                    </Button>
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