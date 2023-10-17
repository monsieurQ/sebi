import { useEffect, useRef, useState } from "react"
import { ProgressBar } from "./ProgressBar"
import { Question } from "../../util/types"
import { server_game_answer, server_getQuestion, server_question_check } from "../../util/serverComm"
import clsx from "clsx"
import { PlayerAvatar } from "./PlayerAvatar"
import { Title } from "./Title"

interface props {
    name: string 
    avatar: number 
    id: number|null
    roundEnded: Function
    goToVictoryScreen: Function
}

const DEFAULT_TIME = 4000
const CHECK_INTERVAL = 100;

export const QuestionComp = (props:props) => {
    const [question, setQuestion] = useState<Question|null>(null)
    const [commitedAnswer, setCommitedAnswer] = useState<number|null>(null)
    const [correct, setCorrect] = useState<boolean|null>(null)
    const [noTime, setNoTime] = useState(false)
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    
    // console.log("Player with name "+props.name+" has ID "+props.id)

    useEffect(() => {
        server_getQuestion().then(res => {
            setQuestion({q:res.q, a:res.a, time:res.time||DEFAULT_TIME, correct:res.correct, qid:res.qid})
        })
        intervalRef.current = setInterval(() => {
            server_question_check().then(res => {
                if(res.gameEnded){
                    if(intervalRef.current) clearInterval(intervalRef.current)
                    props.goToVictoryScreen(res.players)
                }
                else if(res.roundEnded){
                    console.log(res)
                    if(intervalRef.current) clearInterval(intervalRef.current)
                    props.roundEnded(res.players)
                }
            })
        }, CHECK_INTERVAL)

        return() => {
            console.log("unmounting <Question />")
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const timeDepleted = () => {
        console.warn("Time depleted");
        setNoTime(true)
    }

    const commitAnswer = (i:number) => {
        console.log("commitAnswer called")
        setCommitedAnswer(i)
        console.log(`Answering with playerID ${props.id}, QuestionID ${question?.qid}, Answer #${i}`)
        server_game_answer(props.id??-1, i).then(res => {
            console.log("answer res", res)
            setCorrect(res.success)
        })
    }

    return (
        <div>
            <div>ID:{props.id}</div>
            <PlayerAvatar name={props.name} />
                
            {/* PROGRESS-BAR */}
            <div className="mt-4 w-full">
                {question?.time && <ProgressBar time={question.time} timeDepleted={timeDepleted}/>}
            </div>

            {/* QUESTION */}
            <div className="w-full bg-rose-100 p-4 mt-4 font-bold">
                {question?.q||"QUESTION"}
            </div>
            
            {/* ANSWERS */}
            {/* <div className="w-full bg-rose-300 p-4 mt-4 font-bold text-left">
            ANSWERS
            </div> */}
            {question?.a.map((answer, i) => 
                <button disabled={commitedAnswer!==null} onClick={() => commitAnswer(i)} key={i} className={clsx("w-full bg-rose-100 hover:bg-rose-200 p-4 border-b border-[rgba(0,0,0,.1)] font-bold text-left", commitedAnswer && "opacity-50", commitedAnswer===i && "bg-rose-400" )}>
                    {answer}
                </button>
            )}
            { noTime && (
                <div className="text-center mt-8"><Title title={correct ? "VICTORY" : "LOSER"} /></div>
            )}
        </div>
    )
}