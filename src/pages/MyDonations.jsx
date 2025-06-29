import {
  Gift,
  Clock,
  User,
  Search,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

export default function MyDonations() {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    if (!user?.email) return;

    const fetchDonations = async () => {
      try {
        const response = await fetch(
          `https://hopefundr-server.vercel.app/donations/email/${user.email}`
        );
        if (!response.ok) throw new Error("Failed to fetch donations");

        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Donations fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user?.email]);

  const filteredDonations = donations
    .filter((donation) => {
      const matchesSearch =
        donation.campaignTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === "recent") {
        const donationDate = new Date(donation.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return matchesSearch && donationDate > thirtyDaysAgo;
      }

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "recent") {
        return new Date(b.date) - new Date(a.date);
      } else if (sort === "oldest") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return b.amount - a.amount;
      }
    });

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  if (loading) {
    return (
      <section className="min-h-svh bg-muted/40 flex items-center justify-center px-6 py-12 mt-10">
        <div className="w-full max-w-5xl space-y-10">
          <div className="text-center space-y-3">
            <Gift className="h-8 w-8 mx-auto text-primary" />
            <h1 className="text-3xl font-extrabold">My Donations</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Loading your donation history...
            </p>
          </div>
          <Separator />
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex items-center justify-between px-4 pb-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-svh bg-muted/40 px-6 py-12 mt-10">
      <div className="w-full max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <Gift className="h-12 w-12 mx-auto text-primary p-2 bg-primary/10 rounded-full" />
          <h1 className="text-3xl font-extrabold">My Donations</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Your generosity is making a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="bg-background p-4 rounded-lg border shadow-sm text-center min-w-[150px]">
              <p className="text-sm text-muted-foreground">Total Donated</p>
              <p className="text-2xl font-bold text-primary">${totalDonated.toFixed(2)}</p>
            </div>
            <div className="bg-background p-4 rounded-lg border shadow-sm text-center min-w-[150px]">
              <p className="text-sm text-muted-foreground">Total Donations</p>
              <p className="text-2xl font-bold text-primary">{donations.length}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search donations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="recent">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="amount">Highest Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Donations List */}
        <div className="grid gap-6">
          {filteredDonations.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-dashed border-border bg-background/50">
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? `No donations match "${searchTerm}"`
                  : "You haven't donated to any campaigns yet."}
              </p>
              {!searchTerm && (
                <Button variant="secondary">Browse Campaigns</Button>
              )}
            </div>
          ) : (
            filteredDonations.map((donation) => (
              <Card key={donation._id} className="hover:shadow-md transition-shadow border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        {donation.campaignTitle}
                        <Badge variant="secondary" className="text-primary">
                          ${donation.amount.toFixed(2)}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        Donation ID: {donation._id}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 pb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-secondary p-2 rounded-full">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{donation.name}</p>
                      <p className="text-muted-foreground">{donation.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(donation.date).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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