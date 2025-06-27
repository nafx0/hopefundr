import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle, Heart, Share2, Flag, BarChart2, Calendar, User } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleCampaign() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [daysLeft, setDaysLeft] = useState(0);

  // Fetch campaign data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/campaigns/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data);
        setLoading(false);
        
        // Calculate days remaining
        if (data.deadline) {
          const today = new Date();
          const deadline = new Date(data.deadline);
          const diffTime = Math.max(deadline - today, 0);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysLeft(diffDays);
        }
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

  // Mock raised amount for demonstration (30% of goal)
  const raisedAmount = Math.floor(parseInt(campaign.goal) * 0.3);
  const progress = (raisedAmount / parseInt(campaign.goal)) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Campaign Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-96 object-cover"
            />
            
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {campaign.type}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {daysLeft > 0 ? `${daysLeft} days left` : "Campaign ended"}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
              <p className="text-gray-600 mb-6">{campaign.shortDescription}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{campaign.name}</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{campaign.minDonationAmount}$ min donation</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Raised: ${raisedAmount.toLocaleString()}</span>
                  <span>Goal: ${parseInt(campaign.goal).toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-3 text-secondary" />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {Math.round(progress)}% funded
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Button 
                  size="lg" 
                  className="flex-1 min-w-[200px]"
                  onClick={handleDonate}
                >
                  Donate Now
                </Button>
                <Button variant="outline" size="lg" className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Save
                </Button>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Story</h2>
                <div className="prose prose-blue max-w-none">
                  {campaign.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Info & Action */}
        <div className="space-y-6">
          
          {/* Campaign Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Organizer</span>
                <span className="font-medium">{campaign.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{campaign.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Donation</span>
                <span className="font-medium">${campaign.minDonationAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deadline</span>
                <span className="font-medium">
                  {new Date(campaign.deadline).toLocaleDateString()} 
                  {daysLeft > 0 && ` (${daysLeft} days left)`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact</span>
                <span className="font-medium">{campaign.email}</span>
              </div>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Supporters</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="ml-3">
                  <p className="text-sm font-medium">Anonymous</p>
                  <p className="text-xs text-gray-500">Donated $100 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="ml-3">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Donated $50 • 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="ml-3">
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-gray-500">Donated $25 • 1 day ago</p>
                </div>
              </div>
            </div>
            <Button variant="link" className="w-full mt-4 text-secondary-foreground">
              See all 42 supporters
            </Button>
          </div>
          
          {/* Report Button */}
          <Button variant="outline" className="w-full flex items-center text-gray-500">
            <Flag className="h-4 w-4 mr-2" />
            Report this campaign
          </Button>
        </div>
      </div>
    </div>
  );
}