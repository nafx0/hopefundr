import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowRight, CalendarDays, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="max-w-7xl mx-auto px-4 py-12" id="campaigns">
      {/* Header */}
      <div className="mb-12 max-w-2xl text-center mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Every <span className="text-primary">dream</span> deserves a chance.
        </h1>
        <p className="text-muted-foreground text-lg">
          Whether it's a medical emergency, a creative project, or launching a startup—
          real people with real stories are counting on your support.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <Card key={idx} className="p-4 space-y-3">
              <Skeleton className="w-full h-40" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between mt-3">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign._id}
              className="group overflow-hidden shadow-md transition hover:shadow-lg"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-5 space-y-2">
                <h2 className="text-lg font-semibold line-clamp-2">{campaign.title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {campaign.description}
                </p>

                <div className="flex items-center gap-2 text-sm mt-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span>Deadline: {formatDate(campaign.deadline)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>
                    Goal: ${Number(campaign.goal || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>Min Donation: ${campaign.minDonationAmount || "5"}</span>
                </div>

                <div className="flex justify-end mt-3">
                  <Link to={`/campaign/${campaign._id}`}>
                    <Button variant="ghost" size="sm" className="group-hover:underline">
                      See More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Campaigns;