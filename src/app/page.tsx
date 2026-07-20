import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Bento } from "@/components/bento";
import { HowItWorks } from "@/components/how-it-works";
import { Marketplace } from "@/components/marketplace";
import { Chain } from "@/components/chain";
import { Roadmap } from "@/components/roadmap";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Bento />
        <HowItWorks />
        <Marketplace />
        <Chain />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
