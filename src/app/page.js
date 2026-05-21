import Hero from "./Component/Hero";
import Features from "./Component/Features";
import Testimonials from "./Component/Testimonials";
import AvailableCars from "./Component/AvailableCars";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <AvailableCars></AvailableCars>
      <Features></Features>
      <Testimonials></Testimonials>
    </>
  );
}
