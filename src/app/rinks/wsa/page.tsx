import Content from "../Content";

export default function RinkPage() {
  return (
    <Content
      name="Westchester Skating Academy"
      href="https://www.skatewsa.com/page/show/6116225-sticktime"
      googleMapsEmbed="https://www.google.com/maps/embed/v1/place?q=Westchester+Skating+Academy&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      equipmentRequired="Full Equipment"
      onlineRegistration="Recommended"
      skaterLimit={30}
      rules={["No Scrimmages/Games (Enforced)", "No Slapshots"]}
    />
  );
}
