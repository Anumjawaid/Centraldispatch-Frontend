import Header from "../Components/Header"
import HeroSection from '../Components/HeroSection'
import { MainHeader } from "../Components/Home/MainHeader"
import HowItWorks from "../Components/Home/HowIy"
import {InfoCards} from '../Components/InfoCards'
import {StatCards} from '../Components/InfoCards'
import {Stats} from '../Components/StatsHome'
import Footer from '../Components/Footer'
import ShipperInfo from "../Components/Home/ShipperInfo"
import ContactSupport from "../Components/Home/ContactSection"
import RegistrationNotice from "../Components/Home/RegistrationNotice"
import DisclaimerModal from "../Components/Home/DisclaimerModal"
export const Home = () => {
  
    return (
        <>
            <Header />
            <MainHeader/>

            <HowItWorks />
            <br/>
            <ShipperInfo/>
            <ContactSupport />
            <RegistrationNotice />
            {/* <InfoCards />
            <br/>
            <Stats />
            <br/>
            <StatCards/> */}
            <Footer />
        </>
    )

}