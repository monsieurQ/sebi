import { useEffect, useRef, useState } from "react"
import { server_getFinalResults, server_getIntro, server_getPlayers, server_skipRoundIntro, server_state_check } from "../../util/serverComm"
import { GAME_STATE } from "../../pages/sebibox"
import { Title } from "./Title"
import { Player } from "../../util/types"
import { PlayerAvatar } from "./PlayerAvatar"

interface props {
    playerId:number
    introOver: Function
}

export const RoundIntro = (props:props) => {
    const audioRef = useRef<HTMLAudioElement|null>(null)
    // const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [roundIndex, setRoundIndex] = useState(null)
    const [audioSRC, setAudioSRC] = useState("")
    const [players, setPlayers] = useState<Player[]>()
    
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function getNarratorSRC(roundIndex:number|string){
        return process.env.PUBLIC_URL+`/narrator/round${roundIndex}.mp3`
    }

    const skipIntro = () => {
        server_skipRoundIntro()
        props.introOver()
    }

    useEffect(() => {
        if(roundIndex!==-1 && props.playerId==0){
            audioRef.current?.play()
            audioRef.current?.addEventListener('ended', () => {
                console.log("Audio ended")
                skipIntro()
            })
        }
    }, [audioRef, roundIndex])

    useEffect(() => {
        if(roundIndex!==null) setAudioSRC(getNarratorSRC(roundIndex))
    }, [roundIndex])

    useEffect(() => {
        server_getFinalResults().then(res => {
            setPlayers(res.players)
        })

        server_getIntro().then(res => {
            // setText(res.roundIntro)
            setTitle(res.title)
            setRoundIndex(res.roundIndex)
        })

        intervalRef.current = setInterval(() => {
            server_state_check().then(res => {
                if(res.gameState!==GAME_STATE.ROUND_INTRO){
                    if(intervalRef.current) clearInterval(intervalRef.current)
                    props.introOver()
                }
            })
        }, 2000)

        return() => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])
 
    return (
        <div>
            {/* <div>Intro:{text}</div>
            <div>RoundIndex:{roundIndex}</div>
            <div>AudioSRC:{audioSRC}</div>
            <div>PlayerId:{props.playerId}</div> */}
            <Title title={`Runde ${(roundIndex??0)+1} - ${title}`} />
            <div className="grid grid-cols-8 mt-8 gap-4">
                {players?.map((player, i) => 
                    <div key={i}>
                        <PlayerAvatar name={player.name} avatar={player.avatar} />
                    </div>
                )}
            </div>
            {(props.playerId===0 && audioSRC!=="") && <audio src={audioSRC} ref={audioRef} autoPlay />}
            {props.playerId===0 && <div className="text-end mt-16">
                <button onClick={skipIntro} className="text-end text-[60px] textShadow text-white">Halt die Klappe!</button>
            </div>}
        </div>
    )
}