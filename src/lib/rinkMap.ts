import { Rink } from "./fetch";

export default function rinkMap(rink: Rink) {
  switch (rink) {
    case "Ice Hutch":
      return {
        href: "https://www.icehutch.com/",
        style: "text-red-600",
      };
    case "WSA":
      return {
        href: "https://www.skatewsa.com/page/show/6116225-sticktime",
        style: "text-green-600",
      };
    default:
      return {
        href: "https://www.google.com/search?q=" + rink,
        style: "",
      };
  }
}
