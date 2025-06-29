import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LoaderCircle,
  Flag,
  BarChart2,
  Calendar,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SingleCampaign() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [daysLeft, setDaysLeft] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [campRes, donRes] = await Promise.all([
          fetch(`https://hopefundr-server.vercel.app/campaigns/${id}`),
          fetch(`https://hopefundr-server.vercel.app/donations/campaign/${id}`),
        ]);
        const campData = await campRes.json();
        const donData = donRes.ok ? await donRes.json() : [];

        setCampaign(campData);
        setDonations(donData);

        if (campData.deadline) {
          const diffMs = Math.max(new Date(campData.deadline) - new Date(), 0);
          setDaysLeft(Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleDonate = () => {
    if (!campaign) return;

    Swal.fire({
      title: `Donate to "${campaign.title}"`,
      html: `
        <div class="grid gap-4 text-left">
          <label>Campaign</label>
          <input type="text" class="input border-2 border-accent-foreground px-3 py-2 rounded-lg w-full" value="${campaign.title}" readonly />
          <label>Name</label>
          <input type="text" id="donorName" class="input border-2 border-accent-foreground px-3 py-2 rounded-lg w-full" value="${campaign.name}" readonly />
          <label>Email</label>
          <input type="email" id="donorEmail" class="input border-2 border-accent-foreground px-3 py-2 rounded-lg w-full" value="${campaign.email}" readonly />
          <label>Amount (min: $${campaign.minDonationAmount})</label>
          <input type="number" placeholder="Enter your donation amount" id="donAmount" class="input border-2 border-accent-foreground px-3 py-2 rounded-lg w-full" min="${campaign.minDonationAmount}" required />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Donate",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#donorName").value;
        const email = Swal.getPopup().querySelector("#donorEmail").value;
        const amount = parseFloat(Swal.getPopup().querySelector("#donAmount").value);

        if (amount < campaign.minDonationAmount) {
          Swal.showValidationMessage(`Minimum donation is $${campaign.minDonationAmount}`);
        }

        return {
          campaignId: campaign._id,
          campaignTitle: campaign.title,
          name,
          email,
          amount,
          date: new Date().toISOString(),
        };
      },
    }).then(async (res) => {
      if (res.isConfirmed && res.value) {
        try {
          await fetch("https://hopefundr-server.vercel.app/donations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(res.value),
          });
          Swal.fire("Thanks!", "Your donation has been sent.", "success");
          setDonations((d) => [res.value, ...d]);
        } catch (err) {
          Swal.fire("Error", err.message || "Failed to donate", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        <Skeleton className="h-64 rounded-lg w-full" />
        {[...Array(2)].map((_, idx) => (
          <Skeleton key={idx} className="h-8 rounded w-3/4" />
        ))}
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20">
        <LoaderCircle className="animate-spin mx-auto mb-4" size={48} />
        <p className="text-lg">Campaign not found</p>
      </div>
    );
  }

  const raised = donations.reduce((sum, d) => sum + d.amount, 0);
  const goal = parseFloat(campaign.goal);
  const progressPct = Math.min((raised / goal) * 100, 100);
  const shortDesc = campaign.description.slice(0, 200);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 mt-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <BarChart2 /> <strong>Min Don:</strong> ${campaign.minDonationAmount}
              <Calendar /> {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
              <User /> {campaign.name}
            </div>
            <h1 className="text-3xl font-bold">{campaign.title}</h1>

            <p className="text-gray-700">
              {showFullDesc ? campaign.description : shortDesc}
              {campaign.description.length > 200 && (
                <Button
                  variant="link"
                  className="ml-2 text-sm"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                >
                  {showFullDesc ? "See Less" : "See More"}
                </Button>
              )}
            </p>

            <div>
              <div className="flex justify-between font-medium text-gray-700">
                <span>Raised: ${raised.toLocaleString()}</span>
                <span>Goal: ${goal.toLocaleString()}</span>
              </div>
              <Progress value={progressPct} className="h-4 rounded" />
              <p className="text-right text-sm text-gray-500">
                {Math.floor(progressPct)}%
              </p>
            </div>
            <Button onClick={handleDonate} size="lg" className="bg-primary w-full">
              Donate Now
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Organizer:</strong> {campaign.name}</p>
              <p><strong>Category:</strong> {campaign.type}</p>
              <p><strong>Min Donation:</strong> ${campaign.minDonationAmount}</p>
              <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
              <p><strong>Contact:</strong> {campaign.email}</p>
            </CardContent>
          </Card>

          <Card className="shadow">
            <CardHeader>
              <CardTitle>Supporters ({donations.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {donations.slice(0, 5).map((d) => (
                <div key={d.date + d.email} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    <div>
                      <p className="font-medium">{d.name || "Anonymous"}</p>
                      <p className="text-sm text-gray-500">
                        ${d.amount.toLocaleString()} • {new Date(d.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {donations.length > 5 && <Button variant="link">See all</Button>}
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full flex items-center">
            <Flag className="mr-2" />
            Report this campaign
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}