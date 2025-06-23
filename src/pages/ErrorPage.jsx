import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] dark:bg-[#0e0e0e] px-6">
      <div className="max-w-xl text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Page not found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          The page you’re looking for doesn’t exist or may have been moved. Let's get you back on track!
        </p>
        <Link to="/">
          <Button size="lg" className="px-6 text-base font-medium">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;