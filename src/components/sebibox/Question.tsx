import { useEffect, useRef, useState } from "react"
import { ProgressBar } from "./ProgressBar"
import { Question } from "../../util/types"
import clsx from "clsx"
import { PlayerAvatar } from "./PlayerAvatar"

import s_timerStart from '../../assets/sounds/timerStart.mp3'
import s_answer from '../../assets/sounds/answer.mp3'
import useSound from "use-sound"
interface props {
    name: string 
    avatar: number 
    id: number|null
    question:Question|null
    answer: Function
    onTimeOut: Function
}

const DEFAULT_TIME = 8000 //AUCH AUF SERVER UMSCHALTEN (logic.ts) und ROUND.tsx

export const QuestionComp = (props:props) => {
    const [commitedAnswer, setCommitedAnswer] = useState<number|null>(null)
    const {question, answer, onTimeOut} = props;
    // const progressRef = useRef<HTMLDivElement>(null)

    const [timerStart] = useSound(s_timerStart)
    const [answerSound] = useSound(s_answer)

    useEffect(() => {
        timerStart()
        console.log("GOt question", question)
    }, [])

    const commitAnswer = (i:number) => {
        console.log("correct question: ", question?.correct, " answer:", i)
        // progressRef.current?.remove()
        setCommitedAnswer(i)
        answer(i)
    }

    function timeOut(){
        setCommitedAnswer(-1)
        onTimeOut()
    }

    return (
        <div>
            {/* <div>ID:{props.id}</div> */}
            <PlayerAvatar avatar={props.avatar} name={props.name} />
                
            {/* PROGRESS-BAR */}
            <div className="mt-4 w-full h-10">
                {commitedAnswer==null && <ProgressBar time={DEFAULT_TIME} timeDepleted={timeOut}/>}
            </div>

            {/* QUESTION */}
            <div className="w-full bg-rose-100 p-4 mt-4 mb-4 text-center text-[32px] font-bold">
                {question?.q||"QUESTION"}
            </div>
            
            {/* ANSWERS */}
            {/* <div className="w-full bg-rose-300 p-4 mt-4 font-bold text-left">
            ANSWERS
            </div> */}
            {question?.a?.map((answer, i) => 
                <button disabled={commitedAnswer!==null} onClick={() => {answerSound(); commitAnswer(i)}} key={i} className={clsx("w-full bg-rose-100 hover:bg-rose-200 p-4 border-b border-[rgba(0,0,0,.1)] font-bold text-left text-[20px]", commitedAnswer && "opacity-50", (commitedAnswer!==null && question.correct===i) && "opacity-100 bg-green-600")}>
                    {answer}
                </button>
            )}
    
        </div>
    )
}