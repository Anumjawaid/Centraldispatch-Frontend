import Header from "../Components/Header"
import HeroSection from '../Components/HeroSection'
import {InfoCards} from '../Components/InfoCards'
import {Stats} from '../Components/StatsHome'
export const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoCards />
            <br/>
            <Stats />
            <p>Home</p>
        </>
    )

}