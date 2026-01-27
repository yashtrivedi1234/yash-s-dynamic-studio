import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="relative mb-8">
          <span className="font-display text-[150px] md:text-[200px] font-bold text-muted/20 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Oops!
            </span>
          </div>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-gradient-accent hover:opacity-90">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View Projects
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
