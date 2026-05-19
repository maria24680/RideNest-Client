import Image from "next/image";
import Hero from "./Component/Hero";
import Features from "./Component/Features";
import Testimonials from "./Component/Testimonials";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Features></Features>
      <Testimonials></Testimonials>
    </>
  );
}
