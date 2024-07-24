import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { CircleAlert } from "lucide-react";

export default function OnlineRegistration() {
  return (
    <Popover>
      <PopoverTrigger>
        <CircleAlert className="h-4 w-4 flex items-center hover:opacity-80" />
      </PopoverTrigger>
      <PopoverContent className="z-20 w-40 mt-1" align="start">
        <p className="text-sm">
          This rink offers online registration and has a limited number of slots
          per sticktime.
        </p>
      </PopoverContent>
    </Popover>
  );
}
