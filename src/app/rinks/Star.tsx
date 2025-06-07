import { StarIcon } from "lucide-react";
import clsx from "clsx";

export default function Star({ fill }: { fill: boolean }) {
  return (
    <StarIcon
      className={clsx(
        "h-8 w-8",
        fill ? "fill-[#ffe234] text-[#ffe234]" : "text-gray-500 fill-gray-500"
      )}
    />
  );
}
