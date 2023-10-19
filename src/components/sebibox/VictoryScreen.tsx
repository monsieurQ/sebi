import { useEffect, useRef, useState } from "react"
import { GAME_STATE, PLAYER } from "../../pages/sebibox"
import { Title } from "./Title"
import clsx from "clsx"
import { PlayerAvatar } from "./PlayerAvatar"
import { server_getResults, server_nextRound, server_reset, server_state_check } from "../../util/serverComm"
import useStateCallback from "../../util/useStateCallback"
import s_applause from '../../assets/sounds/applause.mp3'
import s_drumroll from '../../assets/sounds/drumroll.mp3'
import useSound from "use-sound"
import { useSpring,animated } from "react-spring"

interface props {
    id: number|null
}



export const VictoryScreen = ({id}:props) => {
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const audioRef = useRef<HTMLAudioElement|null>(null)
    const drumrollRef = useRef<HTMLAudioElement|null>(null)
    const applauseRef = useRef<HTMLAudioElement|null>(null)
    const [players, setPlayers] = useStateCallback<PLAYER[]>([])
    const [allDone, setAllDone] = useStateCallback<boolean|PLAYER[]>(false)
    const [isBooped, setIsBooped] = useState(false)
    const [winnerShown, setWinnerShown] = useState(false)

    const [applause] = useSound(s_applause)
    const [drumroll] = useSound(s_drumroll)

    const style = useSpring({
        display: 'inline-block',
        // backfaceVisibility: 'hidden',
        transform: isBooped
          ? `rotate(0deg)`
          : `rotate(720deg)`,
        scale: isBooped
          ? "1"
          : "0",
        config: {
            duration:2000,
            tension: 1,
            mass: 5,
            friction: 100,
        },
        
    });


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            server_getResults().then(res => {
                if(res.players) setPlayers(res.players)
                if(res.allDone){ 
                    if(intervalRef.current) clearInterval(intervalRef.current)
                    if(id==0){ 
                        audioRef.current?.play()
                    }
                    console.log("setting players to", res.players)
                    setPlayers(res.players)
                    const maxPoints = (res.players as PLAYER[]).reduce((prev, current) => (prev.points > current.points) ? prev : current).points
                    const winners = (res.players as PLAYER[]).filter(player => player.points==maxPoints)
                    setTimeout(() => {
                        // drumroll()
                        drumrollRef.current?.play()
                        setAllDone(winners)
                        setIsBooped(true)
                        setTimeout(() => {
                            // applause()
                            applauseRef.current?.play()
                            setWinnerShown(true)
                        }, 2000)
                        setTimeout(() => {
                            setAllDone(false)
                        }, 6000)
                    }, 38000)
                    
                    
                    
                }
            })
        }, 1000)

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])


    return(
        <div>
            <Title title={winnerShown ? "SPIEL IST JETZT FERTIG BITTE" : "SPIEL IST JETZT GLEICH FERTIG BITTE"} />

            {id===0 && <audio src={process.env.PUBLIC_URL+"/narrator/victory.mp3"} loop={false} ref={audioRef} className="" />}
            <audio src={s_drumroll} ref={drumrollRef} />  
            <audio src={s_applause} ref={applauseRef} />  
            
            {!allDone && (<><div className="grid grid-cols-8 mt-8 gap-4">
                {players?.map((player, i) => 
                    <div key={i} 
                        // className={clsx(player.id===id && "border-white border-4")}
                    >
                        <PlayerAvatar avatar={player.avatar} name={player.name} pointsDisplay={winnerShown ? player.points+"" : ""} />
                    </div>
                )}
            </div>
            {/* <div className="text-white mt-8 text-[32px] text-center">Da braucht noch jemand ...</div> */}
            
            </>)}

            {allDone && 
                <div className="fixed inset-0 h-screen z-20 w-screen bg-[rgba(0,0,0,.3)] flex items-center justify-center px-10 winnerAnimation">
                    <animated.div className="bg-slate-800 inline-block w-full text-center py-10" style={style}>
                        <Title title="GEWINNER" />
                        <div className="mt-8 flex flex-row flex-wrap gap-4 justify-center">
                        {
                            (allDone as PLAYER[]).map((player, i) => 
                                <PlayerAvatar name={player.name} avatar={player.avatar} pointsDisplay={player.points+""} />
                            )
                        }
                        </div>
                    </animated.div>
                </div>}
        </div>
    )
}