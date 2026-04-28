import { Loader2 } from "lucide-react";

export const Loader = () => (
  <div className="flex items-center justify-center min-h-96">
    <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
  </div>
);