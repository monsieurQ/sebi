
import { useState } from 'react';
import './App.css';
import { Login } from '../components/sebibox/Login';
import { Lobby } from '../components/sebibox/Lobby';
import { QuestionComp } from '../components/sebibox/Question';
import { Points } from '../components/sebibox/Points';
import useStateCallback from '../util/useStateCallback';
import { VictoryScreen } from '../components/sebibox/VictoryScreen';
const SERVER_URL = "http://localhost:8080"

export type PLAYER = {
  name:string 
  avatar:number
  id:number
  points:number
  lastPoints:number|null
}

type Question = {
  q: string 
  a: string[]
  correct: number
  time:number
}

enum STATES {
  LOGIN, LOBBY, QUESTION, POINTS, VICTORY 
} 

function Sebibox() {
  const [playerID, setPlayerID] = useStateCallback<number|null>(null)
  const [playerName, setPlayerName] = useState<string|null>(null)
  const [playerAvatar, setPlayerAvatar] = useState<number|null>(null)

  const [question, setQuestion] = useState<Question|null>(null)
  const [commitedAnswer, setCommitedAnswer] = useState<number|null>(null)

  const [currentState, setCurrentState] = useState<STATES>(STATES.LOGIN)

  const [players, setPlayers] = useStateCallback<PLAYER[]>([])

  const [loggedIn, setLoggedIn] = useState(false)


  const timeDepleted = () => {
    console.log("Commited Answer: ", commitedAnswer)
    console.log("Correct Answer: ", question?.correct)
    if(commitedAnswer===null) alert("ZU LANGSAM")
    else{
      alert(commitedAnswer===question?.correct ? "RICHTIG" : "FALSCH")
    }
  }

  const commitAnswer = (index:number) => {
    setCommitedAnswer(index)
  }

  const login = async (name:string, avatar:number) => {
    const id = await fetch(`${SERVER_URL}/getPlayerId?name=${name}&avatar=${avatar}`)
          .then(res => res.json())
          .then(res => res.id)
    console.log(`Got Player ID ${id}`)
    setPlayerName(name)
    setPlayerAvatar(avatar)
    setPlayerID(id, () => {
      setCurrentState(STATES.LOBBY)
    })
    // setPlayerID(server_sendPlayerInfoAndGetID(name, avatar))
  }

  const gameStart = () => {
    setCurrentState(STATES.QUESTION)
  }

  const roundEnded = (players:PLAYER[]) => {
    setPlayers(players, () => {
      setCurrentState(STATES.POINTS)
    })
  }

  const nextRound = () => {
    setCurrentState(STATES.QUESTION)
  }

  const goToVictoryScreen = (players:PLAYER[]) => {
    setPlayers(players, () => {
      setCurrentState(STATES.VICTORY)
    })
  }

  const startNextGame = () => {
    setCurrentState(STATES.LOBBY)
  }

  const componentToDisplay = () => {
    switch(currentState){
      case STATES.LOGIN:
        return <Login login={login} /> 
      case STATES.LOBBY: 
        return <Lobby name={playerName||""} avatar={playerAvatar||0} id={playerID} gameStart={gameStart} /> 
      case STATES.QUESTION: 
        return <QuestionComp name={playerName||""} avatar={playerAvatar||0} id={playerID} roundEnded={roundEnded} goToVictoryScreen={goToVictoryScreen} />
      case STATES.POINTS:
        return <Points name={playerName||""} avatar={playerAvatar||0} id={playerID} roundEnded={roundEnded} players={players||[]} startNextRound={nextRound} /> 
      case STATES.VICTORY: 
        return <VictoryScreen name={playerName||""} avatar={playerAvatar||0} id={playerID} roundEnded={roundEnded} players={players||[]} startNextGame={startNextGame}/> 
      default: 
        return <Login login={login} />
    }
  }

  const display = componentToDisplay()

  return (
    <div className="App grid grid-cols-1 grid-rows-[max-content,auto] h-screen">
      <header className="bg-red-800 text-white text-2xl p-4 text-center">SEBIBOX</header>
      <div className="bg-red-700 p-10 flex flex-col items-center">
        {display}        
      </div>
    </div>
  );
}

export default Sebibox;
