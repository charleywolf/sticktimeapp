import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { CircleAlert } from "lucide-react";

export default function OnlineRegistration({
  notes,
  spotsLeft,
}: {
  notes: string;
  spotsLeft?: number;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <CircleAlert className="h-4 w-4 flex items-center hover:opacity-80" />
      </PopoverTrigger>
      <PopoverContent
        className="z-20 w-64 gap-2 flex flex-col mt-1"
        align="start"
      >
        <p className="text-sm">
          This rink offers online registration and has a limited number of slots
          per sticktime.
        </p>

        {spotsLeft && (
          <p className="text-sm">
            There are {spotsLeft} spots left at this stick time.
          </p>
        )}

        <p className="italic text-xs">{notes}</p>
      </PopoverContent>
    </Popover>
  );
}
