import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl font-black gradient-text mb-4">404</div>
      <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">The page you're looking for doesn't exist. It may have been moved or deleted.</p>
      <div className="flex gap-3">
        <Button variant="gradient" asChild><Link href="/">Go Home</Link></Button>
        <Button variant="outline" asChild><Link href="/best/ai-automation-tools">Browse AI Tools</Link></Button>
      </div>
    </div>
  );
}
