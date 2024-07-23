import { Rink } from "./fetch";

export default function rinkMap(rink: Rink) {
  switch (rink) {
    case "Ice Hutch":
      return {
        href: "https://www.icehutch.com/",
        bg: "bg-red-50",
      };
    case "WSA":
      return {
        href: "https://www.skatewsa.com/page/show/6116225-sticktime",
        bg: "bg-green-50",
      };
    default:
      return {
        href: "https://www.google.com/search?q=" + rink,
        bg: "",
      };
  }
}
