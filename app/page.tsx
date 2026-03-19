import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import WhyAttend from "@/components/landing/WhyAttend";
import Speakers from "@/components/landing/Speakers";
import EventDetails from "@/components/landing/EventDetails";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <WhyAttend />
      <Speakers />
      <EventDetails />
      <Footer />
    </main>
  );
}
