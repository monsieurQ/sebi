// import Person from './assets/person.svg'
import useSound from 'use-sound'
import Avatar from '../../assets/avatar.png'

import boing from '../../assets/sounds/avatar/boing.mp3'
import cow from '../../assets/sounds/avatar/cow.mp3'
import duck from '../../assets/sounds/avatar/duck.mp3'
import goat from '../../assets/sounds/avatar/goat.mp3'
import lamb from '../../assets/sounds/avatar/lamb.mp3'
import pig from '../../assets/sounds/avatar/pig.mp3'
import quack from '../../assets/sounds/avatar/quack.mp3'
import sheep from '../../assets/sounds/avatar/sheep.mp3'
import yeehaw from '../../assets/sounds/avatar/yeehaw.mp3'

import { Title } from "./Title"
import { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
interface Props {
    name: string
    pointsDisplay?: string
    avatar:number
}



export const PlayerAvatar = ({name, pointsDisplay, avatar}:Props) => {
    let timing = 100

    const [s_boing] = useSound(boing)
    const [s_cow] = useSound(cow)
    const [s_duck] = useSound(duck)
    const [s_goat] = useSound(goat)
    const [s_lamb] = useSound(lamb)
    const [s_pig] = useSound(pig)
    const [s_quack] = useSound(quack)
    const [s_sheep] = useSound(sheep)
    const [s_yeehaw] = useSound(yeehaw)

    const [isBooped, setIsBooped] = useState(false);

    const style = useSpring({
        display: 'inline-block',
        // backfaceVisibility: 'hidden',
        transform: isBooped
          ? `rotate(20deg)`
          : `rotate(0deg)`,
        config: {
          tension: 300,
          friction: 10,
        },
      });

    useEffect(() => {
      if (!isBooped) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
      }, timing);

      return () => {
        window.clearTimeout(timeoutId);
      }

    }, [isBooped, timing]);

    const trigger = () => {
      setIsBooped(true);
    };

    let sounds = {
        0: s_boing, 1:s_cow, 2:s_duck, 3:s_goat, 4:s_lamb, 5:s_pig, 6:s_quack, 7:s_sheep, 8:s_yeehaw
    }

    return (
        <animated.div className="flex flex-col items-center gap" onClick={()=>{(sounds as any)[avatar](); trigger()}} style={style}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="text-white bg-black p-2 w-10" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg> */}
            <img src={Avatar} className="w-20 p-2 " /> {/* mit public-folder --> src=PUBLIC/avatar/avatar${avatar}.jpg oder so */}
            <div className="text-black bg-white text-[20px]  text-center">{name}</div>
            {pointsDisplay && <Title center={true} title={pointsDisplay} />}
        </animated.div>
    )
} 