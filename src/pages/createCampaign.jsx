import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import Swal from "sweetalert2";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "../contexts/AuthProvider";

export default function CreateCampaign({ className, ...props }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    image: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
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

    if (!form.title || !form.goal || !form.description || !form.deadline) {
      return setError("Please fill out all required fields.");
    }

    // Handle actual submission here (e.g. POST to backend)
    console.log("Campaign Data:", form);

    Swal.fire({
      title: "Campaign Created",
      text: "Your campaign has been successfully created.",
      icon: "success",
    });

    setForm({ title: "", description: "", goal: "", deadline: "", image: "" });
    navigate("/myCampaigns");
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
              <div className="grid gap-2">
                <Label htmlFor="title">Campaign Title</Label>
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
                <Label htmlFor="description">Description</Label>
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
                <Label htmlFor="goal">Goal Amount (USD)</Label>
                <Input
                  type="number"
                  id="goal"
                  name="goal"
                  required
                  placeholder="5000"
                  value={form.goal}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  type="date"
                  id="deadline"
                  name="deadline"
                  required
                  value={form.deadline}
                  onChange={handleChange}
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
                Create Campaign
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
