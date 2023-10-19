import { useEffect, useRef, useState } from "react"
import { GAME_STATE, PLAYER } from "../../pages/sebibox"
import { Title } from "./Title"
import clsx from "clsx"
import { PlayerAvatar } from "./PlayerAvatar"
import { server_getResults, server_nextRound, server_state_check } from "../../util/serverComm"
import useStateCallback from "../../util/useStateCallback"

interface props {
    id: number|null
    nextRound: Function
}

export const RoundPoints = ({id, nextRound}:props) => {
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const intervalRef2 = useRef<ReturnType<typeof setTimeout> | null>(null)
    const audioRef = useRef<HTMLAudioElement|null>(null)
    const [players, setPlayers] = useState<PLAYER[]>([])
    const [allDone, setAllDone] = useStateCallback(false)
    const [showNextButton, setShowNextButton] = useState(false)

    const startNextRound = () => {
        server_nextRound().then(res => {
            console.log("Next Roudn res", res)
            nextRound()
        })
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            server_getResults().then(res => {
                if(res.players) setPlayers(res.players)
                if(res.allDone){ 
                    if(intervalRef.current) clearInterval(intervalRef.current)
                    if(id==0) audioRef.current?.play()
                    setTimeout(() => {
                        setAllDone(res.allDone, () => {
                            setTimeout(() => {
                                console.log("checking for next round", res.players.length)
                                setShowNextButton(true)
                                checkForNextRound()
                            }, res.players.length*1500)
                        })
                    }, 610)
                    
                }
            })
        }, 1000)

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current)
            if(intervalRef2.current) clearInterval(intervalRef2.current)
        }
    }, [])

    function checkForNextRound(){
        intervalRef2.current = setInterval(() => {
            // console.log("checking server")
            server_state_check().then(res => {
                console.log("res", res, GAME_STATE.ROUND_INTRO)
                console.log("check", res.gameState==GAME_STATE.ROUND_INTRO)
                if(res.gameState==GAME_STATE.ROUND_INTRO){
                    if(intervalRef2.current) clearInterval(intervalRef2.current)
                    nextRound()
                }
            })
        }, 1000)
    }

    return(
        <div>
            <Title title="RUNDE IST JETZT FERTIG BITTE" />

            {/* process.env.PUBLIC_URL+`/narrator/round${roundIndex}/intro.mp3` */}
            {id===0 && <audio src={process.env.PUBLIC_URL+"/sounds/drumroll.mp3"} loop={false} ref={audioRef} className="" />}
            
            {!allDone && (<><div className="grid grid-cols-8 mt-8 gap-4">
                {players?.map((player, i) => 
                    <div key={i} 
                        // className={clsx(player.id===id && "border-white border-4")}
                    >
                        <PlayerAvatar avatar={player.avatar} name={player.name} pointsDisplay={allDone ? player.points+"" : ""} />
                    </div>
                )}
            </div>
            <div className="text-white mt-8 text-[32px] text-center">Da braucht noch jemand ...</div></>)}

            {allDone && <>
                <div className="grid grid-cols-8 mt-8 gap-4">
                    {players.sort((a, b) => a.points - b.points).map((player, i) => 
                        <div key={i} 
                            className="pointsAvatar" 
                        >
                            <div style={{animationDelay: `${i*1.5}s`}}><PlayerAvatar avatar={player.avatar} name={player.name} pointsDisplay={allDone ? player.points+"" : ""} /></div>
                        </div> 
                    )}
                    </div>
                    {showNextButton && id==0 && <div className="text-end mt-16">
                        <button onClick={startNextRound} className="text-end text-[60px] textShadow text-white">Brumm, brumm, weiter gehts!</button>
                    </div>}
                </>
            }

            {/* {(id==0 && allDone )&& <div className="text-end mt-16">
                <button onClick={startNextRound} className="text-end text-[60px] textShadow text-white">Brumm, brumm, weiter gehts!</button>
            </div>} */}

        </div>
    )
}