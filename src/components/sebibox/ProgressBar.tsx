import { useEffect, useRef, useState } from "react"

interface Props {
    time: number
    timeDepleted: Function
}

const INTERVAL = 20

export const ProgressBar = ({time, timeDepleted}: Props) => {
    const [remainingTime, setRemainingTime] = useState(time)

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRemainingTime(prev => prev-INTERVAL)
        }, INTERVAL)

        return() => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    useEffect(() => {
        if(remainingTime<=0){ 
            if(intervalRef.current) clearInterval(intervalRef.current) 
            timeDepleted()
        }
    }, [remainingTime, timeDepleted])

    return (
        <div className="h-10 bg-rose-100 w-full overflow-hidden rounded-2xl">
            <div className="h-full bg-red-400" style={{width:remainingTime/time*100+"%"}}></div>
        </div>
    )
}