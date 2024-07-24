import Content from "../Content";

export default function RinkPage() {
  return (
    <Content
      name="Twin Rinks"
      href="https://stamfordtwinrinks.com/hockey/stick-puck"
      googleMapsEmbed="https://www.google.com/maps/embed/v1/place?q=Twin+Rinks+Stamford&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      equipmentRequired="Under 18: Full Equipment, 18+: Helmet, Gloves, Skates"
      onlineRegistration="Unavailable"
      skaterLimit="Unknown"
      rules={["No Full-Ice Scrimmages"]}
    />
  );
}
