import ComingSoon from "../components/ComingSoon"
import ContactForm from "../components/ContactForm"
import FAQSection from "../components/FAQSection"
import Hero from "../components/Hero"
import PopularAreas from "../components/PopularAreas"
import PopularListing from "../components/PopularListings"
import RoomsBySize from "../components/RoomBySize"
import Testimonials from "../components/Testimonials"
import UniquePreferences from "../components/UniquePreference"
import Footer from "../components/Footer"

function Home() {

  return (
    <div className="sm:px-18 sm:pt-5">
    <Hero/>
    <PopularListing/>
    <UniquePreferences/>
    <PopularAreas/>
    <RoomsBySize/>
    <ComingSoon/>
    <Testimonials/>
    <FAQSection/>
    <ContactForm/>
    <Footer/>
    </div>
  )
}

export default Home
