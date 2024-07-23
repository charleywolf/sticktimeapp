import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { CircleAlert } from "lucide-react";

export default function OnlineRegistration() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <CircleAlert className="h-4 w-4 flex items-center" />
        </TooltipTrigger>
        <TooltipContent align="start">
          <p className="w-40 text-sm">
            This rink offers online registration and has a limited number of
            slots per sticktime.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
