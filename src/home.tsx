import { Grid } from './components/Grid';
import Background from './assets/bg.jpg'
import Footer1 from './assets/footer/ai_peach.png'
import Footer2 from './assets/footer/ai_peach3.png'
import Footer3 from './assets/footer/ai_sebiHarryPotter.png'
import Poster from './assets/poster.png'
import Post1 from './assets/fbposts/370235597_265339986500764_7087376773896982341_n.png'
import Post2 from './assets/fbposts/387326296_1060920191701473_4115733326219678321_n.png'
import Post3 from './assets/fbposts/393244153_7038083572891111_6623681057502858543_n.png'
import Post4 from './assets/fbposts/393414773_24228129736800860_6985542741311839774_n.png'
import Post5 from './assets/fbposts/393465936_704302024981456_1438573240874253931_n.png'
import { Review } from './components/Review';
import { Slideshow } from './components/Slideshow';
import Collage from './assets/collage.jpeg'
import { Link } from 'react-router-dom';

import SpinningSebi from './assets/crop.png'

import Shirt1 from './assets/merch/tshirt1.png'
import Shirt2 from './assets/merch/tshirt2.png'
import Shirt3 from './assets/merch/tshirt3.png'
import Parfum from './assets/merch/parfum.png'

export const Home = () => {
    return ( 

        <main className="font-jomhuria max-w-screen overflow-hidden">
        <section className="relative h-screen">
            <img src={Collage} className="w-full h-full absolute inset-0 -z-10 object-cover" />
            <h1 className="z-20 inset-0 top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 text-center absolute flex justify-center items-center text-[400px] text-white blinkingText leading-[200px]">SEBI</h1>
            <img src={SpinningSebi} className="w-[200px] h-[200px] absolute z-10 spinningSebi"  alt="" />
            <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>
        <Grid>

            {/* <h1 className="col-start-2 col-span-3  text-[300px]/[14rem] pt-[98px] mix-blend-difference text-white">ZWISCHEN EINHÖRNERN UND WACKELPUDDING</h1> */}
        </Grid> 
        </section>

        <section className="sebibox-banner relative py-10 flex flex-col justify-center items-center font-jomhuria max-w-screen overflow-hidden">
        <div className="stripe -z-10">
            <div className="stripe_inner -z-10"></div>
        </div>
        <h2 className="text-white text-[256px]/[.8]">SEBIBOX</h2>
        <h4 className="leading-normal">PARTY PACK</h4>
        <h3 className="leading-[.5]">#30</h3>
        
        <Link to="/sebibox/login" className="leading-[1] underline text-center">JETZT SPIELEN</Link>
        <Grid>
            <p className="col-start-2 col-span-full gameDev">von den Machern von</p>
            <p className="col-start-3 col-span-full gameDev">Adonis' Bananen-Bingo-Ballerei</p>
            <p className="col-start-3 col-span-full gameDev">Xanatos' Xenon-Xperiment: Die Suche nach dem verlorenen X</p>
            <p className="col-start-3 col-span-full gameDev">Spartacus und die Lachende Gurken-Affäre</p>
        </Grid>
        </section>

        {/* TIMELINE */}
        <section>
        <Grid><h1 className="text-[128px] col-start-2 col-span-full leading-normal">TIMELINE</h1></Grid>
        <div className="flex flex-col gap-10 justify-center items-center">
            <img src={Post2} className="object-cover col-span-full" alt="" /> {/* 2011 "Turnen jungs in der Schule" */}
            <img src={Post5} className="object-cover col-span-full" alt="" /> {/* 2012 "körperlich tot" */}
            <img src={Post3} className="object-cover col-span-full" alt="" /> {/* 2012 "primzahlen gecracked" */} 
            <img src={Post1} className="object-cover col-span-full" alt="" /> {/* 2013 Deskart */}
            <img src={Post4} className="object-cover col-span-full" alt="" /> {/* 2013 Es regnet */}
        </div>
        </section>

        {/* TESTIMONIALS */}
        <section>
        <Grid><h1 className="text-[128px] col-span-full col-start-2 leading-normal">TESTIMONIALS</h1></Grid>

        </section>

        {/* EIN LEBEN IN BILDERN */}
        <section>
        <Grid><h1 className="col-start-2 col-span-full text-[128px] leading-[.5]">EIN LEBEN IN BILDERN</h1></Grid>
        <Slideshow />
        </section>
        
        {/* MERCH */}
        <section className="bg-[#161815] py-10 text-white font-sans">
        <Grid className='gap-y-10'>
            <h1 className="row-start-1 col-start-2 col-span-full font-jomhuria text-[128px] leading-normal">MERCH</h1>

            {/* SHIRT 1 */}
            <div className="row-start-2 col-start-3 col-span-2">
                <h3 className="font-bold text-[20px] leading-[20px]">Sebi T-Shirt</h3>
                <h4 className="text-[16px]">25,99€</h4>
                <p className="text-[12px] mt-6">aus Baumwolle oder so</p>
            </div>

            <div className="row-start-2 col-start-5 col-span-7">
                <img src={Shirt1} alt="" className="object-cover w-full" />
            </div>

            {/* SHIRT 2 */}
            <div className="row-start-3 col-start-2 col-span-4 flex flex-col gap-4">
                <img src={Shirt2} alt="" className="object-cover w-full" />

                <div className="">
                    <h3 className="font-bold text-[20px] leading-[20px]">Geiles Shirt für geile</h3>
                    <h4 className="text-[16px]">48,16€</h4>
                </div>
            </div>

            {/* SHIRT 3 */}
            <div className="row-start-3 col-start-7 col-span-5 flex flex-col gap-4">
                <img src={Shirt3} alt="" className="object-cover w-full" />

                <div className="">
                    <h3 className="font-bold text-[20px] leading-[20px]">T-Shirt für Einsame</h3>
                    <h4 className="text-[16px]">14,12€</h4>
                </div>
            </div>


            {/* PARFUM */}
            <div className="row-start-4 col-start-2 col-end-12 flex flex-col gap-4 items-center">
                <img src={Parfum} alt="" className="object-cover w-full" />

                <div className="">
                    <h3 className="font-bold text-[20px] leading-[20px] text-center">Cologne d'Adonis</h3>
                    <h4 className="text-[16px] text-center">1€</h4>
                </div>
            </div>
    
        </Grid>

        </section>
        
        {/* FILM */}
        <section className="py-20 bg-[#454134] text-white">
        <Grid>
        <img src={Poster} className="col-start-2 col-span-6 object-cover max-h-[90vh]" />
        <article className="col-start-8 col-span-4">
            <h1 className="text-[128px] leading-[80px] mb-10">Reviews</h1>
            <div className="font-mono text-[30px] flex flex-col gap-20">
            <Review author="Verge Magazine" stars={5} text={"\"Eine meisterhafte Darstellung eines außergewöhnlichen Lebens, die in ihrer Tiefe und Vielseitigkeit fasziniert.\""} />
            <Review author="Vogue" stars={4} text={"\"Die filmische Darstellung von Sebastians Leben ist ein kraftvolles Zeugnis dafür, wie Leidenschaft und Positivität die Welt verändern können.\""} />
        </div>
        </article>
        <article className="col-start-4 col-end-10 text-center mt-10">
        <div className="font-mono font-bold text-[30px] flex flex-col gap-20 items-center text-center">
            <Review center={true} author="Sebastian Schütz" stars={1} text={"\"Was für ein Schrott.\""} />
            <Review center={true} author="Jeder" stars={5} text={"\"Der Film über Sebastian Schütz' Leben ist ein triumphaler Sieg der Menschlichkeit und ein unvergessliches Erlebnis, das die Seele berührt.\""} />
            </div>
        </article>
        </Grid>
        </section>

        {/* BILDER */}
        <footer className="grid grid-cols-3">
        <img src={Footer1} alt="" className="object-cover w-full" />
        <img src={Footer2} alt="" className="object-cover w-full" />
        <img src={Footer3} alt="" className="object-cover w-full" />
        </footer>

    </main>
    )
}