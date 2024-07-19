"use client";
import Solution from "@/components/templates/Solution";
import Footer from "@/components/templates/Footer";
import RouteLinks from "@/components/templates/RouteLinks";
import Header from "@/components/templates/Header";
import Contact from "@/components/templates/Contact";

const Home = () => (
  <div className="bg-slate-800 flex flex-col items-center justify-center h-full">
    <Header />

    <RouteLinks />

    <Solution />

    <Contact />
    
    <Footer />
  </div>
);

export default Home;
