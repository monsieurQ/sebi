import { useEffect, useRef, useState } from "react"
import { PlayerAvatar } from "./PlayerAvatar"
import { Title } from "./Title"
import { server_lobby_check, server_lobby_startGame } from "../../util/serverComm"
import { Player } from "../../util/types"
import sound_lobby from '../../assets/sounds/lobby.mp3'
import roundStart from '../../assets/sounds/roundStart.mp3'
import intro from '../../assets/intro.mp3'
import useSound from "use-sound"
import { GAME_STATE } from "../../pages/sebibox"

interface Props {
    name: string
    avatar: number 
    id: number|null
    startRoundIntro: Function
}

const CHECK_INTERVAL = 500

export const Lobby = ({name, avatar, id, startRoundIntro}: Props) => { 
    const [players, setPlayers] = useState<Player[]|null>(null)
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const narratorRef = useRef<HTMLAudioElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    

    useEffect(() => {
        if(audioRef.current) audioRef.current.volume = .1;
        s_lobby();
        intervalRef.current = setInterval(() => {
            server_lobby_check().then(res => {
                // console.log("lobbyCheck res", res)
                if(res.gameState!==GAME_STATE.LOBBY) startRoundIntro()
               if(res.players) setPlayers(res.players)
            })
        }, CHECK_INTERVAL)

        return() => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const startGame = () => {
        console.log("startGame called")
        buttonRef.current?.remove()
        // s_lobbyData.stop()
        audioRef.current?.pause()
        setTimeout(() => {
            if(id==0) s_intro()
            setTimeout(() => {
                server_lobby_startGame()
                startRoundIntro()
            }, s_introData.duration??33000)

        }, data.duration??0)
    }

        /*
    SOUNDS
    */
    const [s_roundStart, data] = useSound(roundStart);
    const [s_lobby, s_lobbyData] = useSound(sound_lobby, {volume:.5});
    const [s_intro, s_introData] = useSound(intro);

    return(
        <div className="w-full">
            {id===0 && <audio src={intro} loop={false} ref={narratorRef} className="" />}
            <Title title="SEBI-FANS" />
            <div className="grid grid-cols-8 mt-8 gap-4">
                {players?.map((player, i) => 
                    <div key={i}>
                        <PlayerAvatar name={player.name} avatar={player.avatar} />
                    </div>
                )} 
            </div>

            <audio src={sound_lobby} ref={audioRef} autoPlay loop className="invisible" />

            {id==0 && 
                <div className="text-end mt-16">
                    <button ref={buttonRef} onClick={()=> {s_roundStart(); startGame()}} className="text-end text-[60px] textShadow underline text-white">Spiel starten!</button>
                </div>
            }
        </div>
    )
}   