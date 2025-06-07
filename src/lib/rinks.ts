export const rinks: Rink[] = [
  "Ice Hutch",
  "WSA",
  "Brewster",
  "Twin Rinks",
  "Chelsea Piers CT",
];

export type Rink =
  | "Ice Hutch"
  | "WSA"
  | "Brewster"
  | "Twin Rinks"
  | "Chelsea Piers CT";

export type RinkDistance = {
  [key in Rink]: number;
};

export const getEmptyRinkDistanceArray = (): RinkDistance => {
  return rinks.reduce((acc: RinkDistance, rink: Rink) => {
    acc[rink] = -1;
    return acc;
  }, {} as RinkDistance);
};

export const rinkData = {
  "Ice Hutch": {
    href: "/rinks/icehutch",
    style: "text-red-300",
    onlineRegistration: null,
    coordinates: {
      latitude: 40.90029446090625,
      longitude: -73.81860737983997,
    },
  },
  WSA: {
    href: "/rinks/wsa",
    style: "text-green-300",
    onlineRegistration: "Register online on DaySmart Recreation.",
    coordinates: {
      latitude: 41.07180375397404,
      longitude: -73.8174119230832,
    },
  },
  Brewster: {
    href: "/rinks/brewster",
    style: "text-blue-300",
    onlineRegistration: null,
    coordinates: {
      latitude: 41.369578020133105,
      longitude: -73.61580867000204,
    },
  },
  "Twin Rinks": {
    href: "/rinks/twinrinks",
    style: "text-cyan-300",
    onlineRegistration: null,
    coordinates: {
      latitude: 41.100747437722454,
      longitude: -73.51942438436843,
    },
  },
  "Chelsea Piers CT": {
    href: "/rinks/chelseapiersct",
    style: "text-purple-300",
    onlineRegistration: "Register online up to 7 days in advance.",
    coordinates: {
      latitude: 41.07180567359938,
      longitude: -73.4981515013726,
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
    case "Chelsea Piers CT":
      return rinkData["Chelsea Piers CT"];
    default:
      return rinkData["Ice Hutch"]; //default rink - will never happen unless type assertion
  }
}
