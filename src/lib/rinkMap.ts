import { Rink } from "./fetch";

export const rinkData = {
  "Ice Hutch": {
    href: "/rinks/icehutch",
    style: "text-red-300",
    onlineRegistration: false,
    coordinates: {
      latitude: 40.90029446090625,
      longitude: -73.81860737983997,
    },
  },
  WSA: {
    href: "/rinks/wsa",
    style: "text-green-300",
    onlineRegistration: true,
    coordinates: {
      latitude: 41.07180375397404,
      longitude: -73.8174119230832,
    },
  },
  Brewster: {
    href: "/rinks/brewster",
    style: "text-blue-300",
    onlineRegistration: false,
    coordinates: {
      latitude: 41.369578020133105,
      longitude: -73.61580867000204,
    },
  },
  "Twin Rinks": {
    href: "/rinks/twinrinks",
    style: "text-cyan-300",
    onlineRegistration: false,
    coordinates: {
      latitude: 41.100747437722454,
      longitude: -73.51942438436843,
    },
  },
};

export default function rinkMap(rink: Rink) {
  switch (rink) {
    case "Ice Hutch":
      return rinkData["Ice Hutch"];
    case "WSA":
      return rinkData["WSA"];
    case "Brewster":
      return rinkData["Brewster"];
    case "Twin Rinks":
      return rinkData["Twin Rinks"];
    default:
      return rinkData["Ice Hutch"]; //default rink - will never happen unless type assertion
  }
}
