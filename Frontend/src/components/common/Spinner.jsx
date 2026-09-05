import { Loader2 } from "lucide-react";

export default function Spinner({ className = "h-5 w-5 text-royal-500" }) {
  return <Loader2 className={`animate-spin ${className}`} />;
}
