import { useEffect, useState } from "react"
import { server_game_answer, server_getQuestion } from "../../util/serverComm"
import { Question } from "../../util/types"
import { QuestionComp } from "./Question"
import useStateCallback from "../../util/useStateCallback"
import { Title } from "./Title"


import s_fail from '../../assets/sounds/fail.mp3'
import s_fail2 from '../../assets/sounds/fail2.mp3'
import s_fail3 from '../../assets/sounds/fail3.mp3'
import s_fail4 from '../../assets/sounds/fail4.mp3'
import s_correct from '../../assets/sounds/rightanswer.mp3'
import useSound from "use-sound"

interface Round {
    playerId: number    
    name: string
    avatar: number
    roundOver: Function
    gameOver: Function
}

const DEFAULT_TIME = 8000 

export const Round = ({playerId, name, avatar, roundOver, gameOver}: Round) => {
    const [qid, setQid] = useStateCallback(5)
    const [rid, setRid] = useState(0)
    const [question, setQuestion] = useState<Question|null>(null)
    const [result, setResult] = useState<string|null>(null)

    const [fail] = useSound(s_fail)
    const [fail2] = useSound(s_fail2)
    const [fail3] = useSound(s_fail3)
    const [fail4] = useSound(s_fail4)
    const [soundCorrect] = useSound(s_correct)


    useEffect(() => {
        getQuestion()
    }, [])

    function getQuestion(){
        setResult(null)
        let getQid = qid+1; 
        setQid(qid+1)
        console.log("getting question, qid:", getQid)
            server_getQuestion(getQid, playerId).then(res => {
                console.log("server_getQuestion in <Rounds> returned", res)
                if(res.roundOver){
                    roundOver()
                }else if(res.gameOver){
                    gameOver()
                }else if(res.question){
                    setQuestion({q:res.question.q, a:res.question.a, time:res.question.time||DEFAULT_TIME, correct:res.question.correct||-1, qid:getQid})
                }
            })
        
    }

    const commitAnswer = (i:number) => {
        console.log(`Answering with playerID ${playerId}, QuestionID ${qid}, Answer #${i}`)
        server_game_answer(playerId, qid, i).then(res => {
            console.log("answer res in <Round />", res.res)
            writeResult(res.res)
        })
    }

    function writeResult(result:number){
        if(result==0){ 
            setResult("Lol, falsch")
            playRandomFailSound()
        }else if(result==1){ 
            soundCorrect()
            setResult("Soooo toll ...")
        }else if(result==-1){ 
            setResult("Ojeeee, zu langsam")
        }
        setTimeout(() => {
            getQuestion()
        }, 2000)
    }

    const onTimeOut = () => {
        writeResult(-1)
    }

    function getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    function playRandomFailSound(){
        let random = getRandomInt(0, 3)
        switch(random){
            case 0: 
                fail()
                break; 
            case 1: 
                fail2()
                break; 
            case 2:
                fail3()
                break; 
            case 3: 
                fail4()
                break; 
            default: 
                fail2()
                break; 
        }
    }


    return (
        <>
        <QuestionComp key={qid} name={name} avatar={avatar} id={playerId} question={question} answer={commitAnswer} onTimeOut={onTimeOut} />
        {result && <div className="text-center mt-8"><Title title={result} /></div>}
        </>
    )
}