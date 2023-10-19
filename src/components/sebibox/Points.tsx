import { useEffect, useRef, useState } from "react"
import { PLAYER } from "../../pages/sebibox"
import { Title } from "./Title"
import clsx from "clsx"
import { PlayerAvatar } from "./PlayerAvatar"
import { server_getResults, server_nextQuestion } from "../../util/serverComm"

interface props {
    name: string 
    avatar: number 
    id: number|null
}

export const Points = ({name, avatar, id}:props) => {
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [players, setPlayers] = useState<PLAYER[]>([])

    const sendNextQuestion = () => {
        console.log("Next Question click")
        server_nextQuestion()
    }

    useEffect(() => {
        server_getResults().then(res => {
            if(res.results) setPlayers(res.results)
        })
    }, [])

    return(
        <div>
            <Title title="POINTS" />
            <div className="grid grid-cols-3 mt-8">
                {players?.map((player, i) => 
                    <div key={i} className={clsx(player.id===id && "border-white border-4")}>
                        <PlayerAvatar avatar={player.avatar} name={player.name} pointsDisplay={player.lastPoints ? "+"+player.lastPoints : "LOSER"} />
                    </div>
                )}
            </div>

            {id==0 && <div className="text-end mt-16">
                <button onClick={sendNextQuestion} className="text-end text-[60px] textShadow text-white">Brumm, brumm, weiter gehts!</button>
            </div>}
        </div>
    )
}