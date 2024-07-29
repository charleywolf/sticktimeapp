import Content from "../Content";

export default function RinkPage() {
  return (
    <Content
      name="Chelsea Piers CT"
      href="https://sports.chelseapiers.com/connecticut/stamford/sports/drop-in-schedule?sport=Ice%20Hockey"
      googleMapsEmbed="https://www.google.com/maps/embed/v1/place?q=Chelsea+Piers+Stamford&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      equipmentRequired="Full Equipment"
      onlineRegistration="Recommended; Up to 7 days in advance"
      skaterLimit="20"
      notes={[{ title: "Pucks", desc: "Provided" }]}
    />
  );
}
