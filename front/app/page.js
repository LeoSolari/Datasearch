"use client";
import Contact from "@/components/templates/Contact";
import Solution from "@/components/templates/Solution";
import Footer from "@/components/templates/Footer";
import RouteLinks from "@/components/templates/RouteLinks";
import Quote from "@/components/templates/Quote";
import Header from "@/components/templates/Header";

const Home = () => (
  <div className="bg-slate-800 flex flex-col items-center justify-center h-full">
    <Header />

    <RouteLinks />

    <Solution />

    {/* <Quote />  */}

   

    {/* <Contact /> */}

    <Footer />
  </div>
);

export default Home;
