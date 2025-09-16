import ComingSoon from "../components/ComingSoon"
import ContactForm from "../components/ContactForm"
import FAQSection from "../components/FAQSection"
import Header from "../components/Header"
import Hero from "../components/Hero"
import PopularAreas from "../components/PopularAreas"
import PopularListing from "../components/PopularListings"
import RoomsBySize from "../components/RoomBySize"
import Testimonials from "../components/Testimonials"
import UniquePreferences from "../components/UniquePreference"
import Footer from "../components/Footer"

function Home() {

  return (
    <>
    <Header/>
    <Hero/>
    <PopularListing/>
    <UniquePreferences/>
    <RoomsBySize/>
    <PopularAreas/>
    <ComingSoon/>
    <Testimonials/>
    <FAQSection/>
    <ContactForm/>
    <Footer/>
    </>
  )
}

export default Home
