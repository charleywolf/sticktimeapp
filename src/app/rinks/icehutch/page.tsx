import Content from "../Content";

export default function RinkPage() {
  return (
    <Content
      name="Ice Hutch"
      href="https://www.icehutch.com"
      googleMapsEmbed="https://www.google.com/maps/embed/v1/place?q=Ice+Hutch&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      equipmentRequired="Full Equipment"
      onlineRegistration="Unavailable"
      skaterLimit={24}
      stars={4}
      rules={["No Scrimmages/Games (Unenforced)"]}
    />
  );
}
