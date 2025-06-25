import { Gift, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const donations = [
  {
    id: "1",
    campaign: "Save the Rainforest",
    amount: 50,
    date: "2025-06-20T10:30:00Z",
  },
  {
    id: "2",
    campaign: "Help Local School",
    amount: 25,
    date: "2025-06-15T14:15:00Z",
  },
  {
    id: "3",
    campaign: "Emergency Medical Aid",
    amount: 100,
    date: "2025-06-10T09:45:00Z",
  },
];

export default function MyDonations() {
  return (
    <section className="min-h-svh bg-muted/40 py-12 px-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <Gift className="h-8 w-8 mx-auto text-primary" />
          <h1 className="text-3xl font-extrabold">My Donations</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Thank you for supporting these causes. Your generosity is making a difference.
          </p>
        </div>

        <Separator />

        {/* Donations List */}
        <div className="grid gap-6">
          {donations.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-dashed border-border bg-background/50">
              <p className="text-muted-foreground">You haven’t donated to any campaigns yet.</p>
            </div>
          ) : (
            donations.map((donation) => (
              <Card key={donation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {donation.campaign}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Donation ID: {donation.id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between px-4 pb-4">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Amount: </span>${donation.amount}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {new Date(donation.date).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
