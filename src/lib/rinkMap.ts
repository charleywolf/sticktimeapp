import { Rink } from "./fetch";

export default function rinkMap(rink: Rink) {
  switch (rink) {
    case "Ice Hutch":
      return {
        href: "https://www.icehutch.com",
        style: "text-red-300",
        onlineRegistration: false,
      };
    case "WSA":
      return {
        href: "https://www.skatewsa.com/page/show/6116225-sticktime",
        style: "text-green-300",
        onlineRegistration: true,
      };
    case "Brewster":
      return {
        href: "https://brewstericearena.com/seasonal-schedule",
        style: "text-blue-300",
        onlineRegistration: false,
      };
    case "Twin Rinks":
      return {
        href: "https://stamfordtwinrinks.com/hockey/stick-puck",
        style: "text-cyan-300",
        onlineRegistration: false,
      };
    default:
      return {
        href: "https://www.google.com/search?q=" + rink,
        style: "",
        onlineRegistration: false,
      };
  }
}
