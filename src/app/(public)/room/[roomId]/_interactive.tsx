"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export function CopyRoomLinkButton() {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        className="text-sm font-medium"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Copied to clipboard");
        }}
      >
        <CopyIcon className="inline-flex mr-2 items-center size-4" /> Copy Link
      </Button>
    </div>
  );
}
