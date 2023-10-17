import Slide1 from '../assets/slideshow/slide1.jpg'
import Slide2 from '../assets/slideshow/slide2.jpg'
import Slide3 from '../assets/slideshow/slide3.jpg'
import SmartSlider from "react-smart-slider";
import Slide4 from '../assets/slideshow/slide4.jpg'

const slides = [
    {url: Slide1},
    {url: Slide2},
    {url: Slide3},
    {url: Slide4},
]

export const Slideshow = () => {
    return (
        <SmartSlider slides={slides} height={"90vh"} autoSlide={false} />
    )
}