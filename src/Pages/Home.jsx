import Header from "../Components/Header"
import HeroSection from '../Components/HeroSection'
import {InfoCards} from '../Components/InfoCards'
import {StatCards} from '../Components/InfoCards'
import {Stats} from '../Components/StatsHome'
import Footer from '../Components/Footer'
export const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoCards />
            <br/>
            <Stats />
            <br/>
            <StatCards/>
            <Footer />
        </>
    )

}