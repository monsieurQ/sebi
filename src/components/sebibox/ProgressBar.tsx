import { useEffect, useRef, useState } from "react"

import s_timeLow from '../../assets/sounds/tiktok.mp3'
import s_timeOut from '../../assets/sounds/timeout.mp3'
import useSound from "use-sound"

interface Props {
    time: number
    timeDepleted: Function
}

const INTERVAL = 20

export const ProgressBar = ({time, timeDepleted}: Props) => {
    const [remainingTime, setRemainingTime] = useState(time)
    const [soundPlaying, setSoundPlaying] = useState(false)
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lowTimeRef = useRef<HTMLAudioElement>(null)

    const [timeLow, timeLowData] = useSound(s_timeLow)
    const [timeOut, timeOutData] = useSound(s_timeOut)


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRemainingTime(prev => prev-INTERVAL)
        }, INTERVAL)

        return() => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    useEffect(() => {
        if(remainingTime<time/3 && !soundPlaying){
            // timeLow()
            lowTimeRef.current?.play() 
            setSoundPlaying(false)
        }
        if(remainingTime<=0){ 
            timeLowData.stop()
            lowTimeRef.current?.pause() 
            timeOut()
            if(intervalRef.current) clearInterval(intervalRef.current) 
            timeDepleted()
        }
    }, [remainingTime, timeDepleted])

    return (
        <div className="h-10 bg-rose-100 w-full overflow-hidden rounded-2xl">
            <audio src={s_timeLow} ref={lowTimeRef} />
            <div className="h-full bg-red-400" style={{width:remainingTime/time*100+"%"}}></div>
        </div>
    )
}