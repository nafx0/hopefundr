import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "../contexts/AuthProvider";

export default function EditCampaign({ className, ...props }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const id = useParams().id;
  // eslint-disable-next-line no-unused-vars
  const [campaign, setCampaign] = useState(null);
  // Initialize form state with user info
  const [form, setForm] = useState({
    name: user?.displayName || "",
    title: "",
    type: "",
    description: "",
    goal: "",
    minDonationAmount: "",
    deadline: "",
    image: "",
    email: user?.email || "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/campaigns/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch campaign");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("Campaign not found");
        }
        setCampaign(data);
        setForm({
          name: user?.displayName || "",
          title: data.title || "",
          type: data.type || "",
          description: data.description || "",
          goal: data.goal || "",
          minDonationAmount: data.minDonationAmount || "",
          deadline: data.deadline || "",
          image: data.image || "",
          email: user?.email || "",
        });
      });
  }, []);

  const [error, setError] = useState("");

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Show errors
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Campaign Edit Failed",
        text: error,
      });
    }
  }, [error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !form.title ||
      !form.minDonationAmount ||
      !form.description ||
      !form.deadline ||
      !form.type
    ) {
      return setError("Please fill out all required fields.");
    }

    // Validate minimum donation amount
    if (parseFloat(form.minDonationAmount) <= 0) {
      return setError("Minimum donation amount must be greater than 0.");
    }

    // Submit to backend
    fetch(`http://localhost:5000/campaigns/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit campaign");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Campaign edited successfully:", data);
        Swal.fire({
          title: "Campaign Edited",
          text: "Your campaign has been successfully edited.",
          icon: "success",
        });
        // Reset form
        setForm({
          ...form,
          title: "",
          type: "",
          description: "",
          goal: "",
          minDonationAmount: "",
          deadline: "",
          image: "",
        });
        navigate("/myCampaigns");
      })
      .catch((error) => {
        console.error("Error editing campaign:", error);
        setError("Failed to edit campaign. Please try again.");
      });
  };

  return (
    <div className="bg-background flex min-h-svh relative flex-col items-center justify-center gap-6 py-10 px-6 md:p-10 mt-10">
      <div className="w-full max-w-xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <h1 className="text-xl font-bold">Start a Campaign</h1>
              <p className="text-sm text-muted-foreground text-center">
                Share your story and raise funds for what matters to you.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-4">
              {/* Read-only User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Your Name</Label>
                  <Input
                    value={form.name}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Your Email</Label>
                  <Input
                    value={form.email}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">
                  Campaign Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Help build a school..."
                  required
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">
                  Campaign Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="type"
                  name="type"
                  required
                  value={form.type}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a type</option>
                  <option value="personal issue">Personal Issue</option>
                  <option value="startup">Startup</option>
                  <option value="business">Business</option>
                  <option value="creative ideas">Creative Ideas</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell your story..."
                  required
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal">
                  Goal Amount (USD) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  id="goal"
                  name="goal"
                  required
                  placeholder="5000"
                  min="1"
                  value={form.goal}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="minDonationAmount">
                  Minimum Donation Amount (USD){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  id="minDonationAmount"
                  name="minDonationAmount"
                  required
                  placeholder="10"
                  min="1"
                  value={form.minDonationAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">
                  Deadline <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  id="deadline"
                  name="deadline"
                  required
                  value={form.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://example.com/your-image.jpg"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <Button type="submit" className="w-full">
                Submit Changes
              </Button>
            </div>
          </form>

          <div className="text-muted-foreground text-center text-xs text-balance">
            By submitting, you agree to our{" "}
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
