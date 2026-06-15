import About from "../components/home/About";
import Events from "../components/home/Events";
import Hero from "../components/home/Hero";
import Involve from "../components/home/Involve";
import Ministries from "../components/home/Ministries";
import Resources from "../components/home/Resources";
import Stats from "../components/home/Stats";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Topbar from "../components/layout/Topbar";


export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero/>
      <Stats/>
      <Ministries/>
      <Events/>
      <Involve/>
      <Resources/>
      <About/>
      <Footer/>
      <main></main>
    </>
  );
}