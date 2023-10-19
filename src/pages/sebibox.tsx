
import { useEffect, useState } from 'react';
import '../App.css';
import { Lobby } from '../components/sebibox/Lobby';
import useStateCallback from '../util/useStateCallback';
import { VictoryScreen } from '../components/sebibox/VictoryScreen';
import { RoundIntro } from '../components/sebibox/RoundIntro';
import { server_checkIfPlayerIdExists, server_reset } from '../util/serverComm';
import { RoundPoints } from '../components/sebibox/RoundPoints';
import { Round } from '../components/sebibox/Round';
import { useNavigate } from "react-router-dom";

export const LOCAL_STORAGE_KEY = 'PLAYER_ID'

export enum GAME_STATE {
  LOBBY="LOBBY", 
  ROUND_INTRO="ROUND_INTRO", 
  ROUND="ROUND",
  QUESTION="QUESTION", 
  POINTS_ROUND="POINTS_ROUND", 
  VICTORY="VICTORY" 
}

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


function Sebibox() {

  const [playerID, setPlayerID] = useStateCallback<number>(-1)
  const [playerName, setPlayerName] = useState<string|null>(null)
  const [playerAvatar, setPlayerAvatar] = useState<number|null>(null)
  const [currentState, setCurrentState] = useState<GAME_STATE>(GAME_STATE.LOBBY)
  const [players, setPlayers] = useStateCallback<PLAYER[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem(LOCAL_STORAGE_KEY)){
      console.log("Foudn local storage, checking server ...")
      server_checkIfPlayerIdExists(Number(localStorage.getItem(LOCAL_STORAGE_KEY))).then(res => {
        console.log("Found player", res)
        if(res.sucess){
          console.log("sucessful")
          setPlayerName(res.player.name)
          setPlayerAvatar(res.player.avatar)
          setPlayerID(res.player.id, () => {
            setCurrentState(res.gameState)
          })
          // intervalRef.current = setInterval(check_gameState, 2000)
        }
      })
    }else{
      alert("NO local storage found")
      console.warn("no local storage found")
    }
  }, [])

  useEffect(() => {
    if(localStorage){
      localStorage.setItem(LOCAL_STORAGE_KEY, ""+playerID)
    }
  }, [playerID])


  // const login = async (name:string, avatar:number) => {
  //   const id = await fetch(`${SERVER_URL}/class-login?name=${name}&avatar=${avatar}`)
  //         .then(res => res.json())
  //         .then(res => res.id)
  //   console.log(`Got Player ID ${id}`)
  //   if(localStorage){
  //     localStorage.setItem(LOCAL_STORAGE_KEY, id)
  //   }
  //   setPlayerName(name)
  //   setPlayerAvatar(avatar)
  //   setPlayerID(id, () => {
  //     setCurrentState(GAME_STATE.LOBBY)
  //   })
  // }

  const startNextGame = () => {
    setCurrentState(GAME_STATE.LOBBY)
  }

  /*
  SOUNDS
   */
  // const [darknessSong] = useSound(
  //   darkness,
  //   { volume: 1 }
  // );


  const componentToDisplay = () => {
    switch(currentState){
      case GAME_STATE.LOBBY: 
        return <Lobby name={playerName||""} avatar={playerAvatar||0} id={playerID} startRoundIntro={() => setCurrentState(GAME_STATE.ROUND_INTRO)} /> 
      case GAME_STATE.ROUND_INTRO:
        return <RoundIntro playerId={playerID} introOver={() => setCurrentState(GAME_STATE.ROUND)} />
      case GAME_STATE.ROUND:
        return <Round playerId={playerID} name={playerName??"Name doesnt work"} avatar={playerAvatar??-1} roundOver={() => setCurrentState(GAME_STATE.POINTS_ROUND)} gameOver={() => setCurrentState(GAME_STATE.VICTORY)}/> 
      case GAME_STATE.POINTS_ROUND:
        return <RoundPoints id={playerID} nextRound={()=>setCurrentState(GAME_STATE.ROUND_INTRO)}/> 
      case GAME_STATE.VICTORY: 
        return <VictoryScreen id={playerID} /> 
    }
  }

  const display = componentToDisplay()

  return (
    <div className="App grid grid-cols-1 grid-rows-[max-content,auto] h-screen">
      <button onClick={() => server_reset().then(res => navigate("/sebibox/login"))} className="fixed right-0 p-4 bg-white top-0">Reset</button>
      {/* <audio src={darkness} autoPlay loop className="invisible" /> */}
      {/* <div>PlayerID:{playerID}</div> */}
      <header className="bg-red-800 text-white text-2xl p-4 text-center">SEBIBOX</header>
      <div className="bg-red-700 p-10 flex flex-col items-center">
        {display}        
      </div>
    </div>
  );
}

export default Sebibox;
