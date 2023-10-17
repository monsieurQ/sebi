import { useEffect, useRef, useState } from "react"
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
    startNextGame: () => void
}

export const VictoryScreen = ({name, avatar, id, players, startNextGame}:props) => {
    const [winners, setWinners] = useState<PLAYER[]>()

    useEffect(() => {
        const maxPoints = players.reduce((prev, current) => (prev.points > current.points) ? prev : current).points
        const winners = players.filter(player => player.points==maxPoints)
        setWinners(winners)
    }, [players])

    return(
        <div>
            <Title title="SPIEL AUS" />
            <div className="grid grid-cols-3 mt-8">
                {players?.map((player, i) => 
                    <div key={i} className={clsx(player.id===id && "border-white border-4")}>
                        <PlayerAvatar name={player.name} pointsDisplay={player.points+""} />
                    </div>
                )}
            </div>

            <div>
                {"WINNERS: "}
                {winners?.map(winner => winner.name + " ")} 
            </div>

            <div className="text-end mt-16">
                <button onClick={startNextGame} className="text-end text-[60px] textShadow text-white">Start Next Game!</button>
            </div>
        </div>
    )
}