import { useEffect, useRef } from "react"
import { PLAYER } from "../../pages/sebibox"
import { Title } from "./Title"
import clsx from "clsx"
import { PlayerAvatar } from "./PlayerAvatar"
import { server_nextRound, server_roundsCheck } from "../../util/serverComm"

interface props {
    name: string 
    avatar: number 
    id: number|null
    roundEnded: Function
    players: PLAYER[]
    startNextRound: () => void
}

export const Points = ({name, avatar, id, players, startNextRound}:props) => {
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        setTimeout(() => {
            intervalRef.current = setInterval(() => {
                server_roundsCheck().then(res => {
                    if(res.nextRoundStarted){ 
                        if(intervalRef.current) clearInterval(intervalRef.current)
                        startNextRound()
                    }
                })
            }, 500)
        }, 3000)

        return() => {
            console.log("Unmounting <Points />")
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const sendNextRound = () => {
        server_nextRound()
    }

    return(
        <div>
            <Title title="POINTS" />
            <div className="grid grid-cols-3 mt-8">
                {players?.map((player, i) => 
                    <div key={i} className={clsx(player.id===id && "border-white border-4")}>
                        <PlayerAvatar name={player.name} pointsDisplay={player.lastPoints ? "+"+player.lastPoints : "LOSER"} />
                    </div>
                )}
            </div>

            <div className="text-end mt-16">
                <button onClick={sendNextRound} className="text-end text-[60px] textShadow text-white">Start Next Round!</button>
            </div>
        </div>
    )
}