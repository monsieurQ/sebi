import { useEffect, useRef, useState } from "react"
import { PlayerAvatar } from "./PlayerAvatar"
import { Title } from "./Title"
import { server_getPlayers, server_lobby_check, server_lobby_startGame } from "../../util/serverComm"
import { Player } from "../../util/types"
import clsx from "clsx"

interface Props {
    name: string
    avatar: number 
    id: number|null
    gameStart: Function
}

const CHECK_INTERVAL = 500

export const Lobby = ({name, avatar, id, gameStart}: Props) => { 
    const [players, setPlayers] = useState<Player[]|null>(null)
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            server_lobby_check().then(res => {
                if(res.gameStarted){
                    gameStart()
                }else{
                    console.log("lobbyCheck players", res);
                    setPlayers(res)
                }
            })
        }, CHECK_INTERVAL)

        return() => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const startGame = () => {
        console.log("start game")
        server_lobby_startGame().then(res => {
            console.log("gameStart res", res)
            gameStart()
        })
    }

    return(
        <div className="w-full">
            <Title title="PLAYERS" />
            <div>ID: {id}</div>
            <div className="grid grid-cols-3 mt-8">
                {players?.map((player, i) => <div key={i} className={clsx(player.id===id && "border-white border-4")}><PlayerAvatar name={player.name} /></div>)}
            </div>

            <div className="text-end mt-16"><button onClick={startGame} className="text-end text-[60px] textShadow text-white">Start Game!</button></div>
        </div>
    )
}   