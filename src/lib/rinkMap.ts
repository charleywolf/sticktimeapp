import { Rink } from "./fetch";

export default function rinkMap(rink: Rink) {
  switch (rink) {
    case "Ice Hutch":
      return {
        href: "/rinks/icehutch",
        style: "text-red-300",
        onlineRegistration: false,
      };
    case "WSA":
      return {
        href: "/rinks/wsa",
        style: "text-green-300",
        onlineRegistration: true,
      };
    case "Brewster":
      return {
        href: "/rinks/brewster",
        style: "text-blue-300",
        onlineRegistration: false,
      };
    case "Twin Rinks":
      return {
        href: "/rinks/twinrinks",
        style: "text-cyan-300",
        onlineRegistration: false,
      };
    default:
      return {
        href: "/rinks",
        style: "",
        onlineRegistration: false,
      };
  }
}
