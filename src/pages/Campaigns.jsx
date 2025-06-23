import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" id="campaigns">
      {/* Header & Intro Text */}
      <div className="mb-12 max-w-2xl text-center mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Every <span className="text-primary">dream</span> deserves a chance.</h1>
        <p className="text-muted-foreground text-lg">
          Whether it's a medical emergency, a creative project, or launching a startup—
          real people with real stories are counting on your support. Discover campaigns that
          inspire hope and create change.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign._id} className="group overflow-hidden shadow-sm transition hover:shadow-lg">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold">{campaign.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {campaign.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium text-emerald-600">
                    ${campaign.minDonation} Min
                  </span>
                  <Link to={`/campaign/${campaign._id}`}>
                    <Button variant="ghost" size="sm" className="text-sm group-hover:underline">
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