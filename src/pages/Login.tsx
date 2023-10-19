import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import '../App.css';
import { LOCAL_STORAGE_KEY } from "./sebibox"
import { server_sendPlayerInfoAndGetID } from "../util/serverComm"
import { useNavigate } from "react-router-dom";
import Avatar from '../assets/avatar.png'

import boing from '../assets/sounds/avatar/boing.mp3'
import cow from '../assets/sounds/avatar/cow.mp3'
import duck from '../assets/sounds/avatar/duck.mp3'
import goat from '../assets/sounds/avatar/goat.mp3'
import lamb from '../assets/sounds/avatar/lamb.mp3'
import pig from '../assets/sounds/avatar/pig.mp3'
import quack from '../assets/sounds/avatar/quack.mp3'
import sheep from '../assets/sounds/avatar/sheep.mp3'
import yeehaw from '../assets/sounds/avatar/yeehaw.mp3'
import useSound from "use-sound";

import { Wiggle } from "../components/sebibox/wiggle";
import { Title } from "../components/sebibox/Title";
import { PlayerAvatar } from "../components/sebibox/PlayerAvatar";
import { useSpring, animated } from "react-spring";


export const Login = () => {
    const [avatar, setAvatar] = useState<number|null>(null)
    const [isBooped, setIsBooped] = useState(false)

    const nameRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const [s_boing] = useSound(boing)
    const [s_cow] = useSound(cow)
    const [s_duck] = useSound(duck)
    const [s_goat] = useSound(goat)
    const [s_lamb] = useSound(lamb)
    const [s_pig] = useSound(pig)
    const [s_quack] = useSound(quack)
    const [s_sheep] = useSound(sheep)
    const [s_yeehaw] = useSound(yeehaw)

    const tryLogin = () => {
        if(!nameRef.current?.value || avatar===null){
            alert("PICK")
            return
        }
        server_sendPlayerInfoAndGetID(nameRef.current.value, avatar).then(res => {
            console.log("server response", res)
            if("playerId" in res){
                console.log("setting mama")
                if(localStorage){
                    console.log("setting localstorage")
                    localStorage.setItem(LOCAL_STORAGE_KEY, res.playerId)
                    navigate("/sebibox")
                }else{
                    alert("No Local Storage");
                    console.warn("no local storage")
                }
            }else{
                console.warn("No id in res???")
                console.log(res.playerId)
            }
        })
    }

    let avatars = [
        {sound:()=>s_boing(), imgSrc:Avatar},
        {sound:()=>s_cow(), imgSrc:Avatar},
        {sound:()=>s_duck(), imgSrc:Avatar},
        {sound:()=>s_goat(), imgSrc:Avatar},
        {sound:()=>s_lamb(), imgSrc:Avatar},
        {sound:()=>s_pig(), imgSrc:Avatar},
        {sound:()=>s_quack(), imgSrc:Avatar},
        {sound:()=>s_sheep(), imgSrc:Avatar},
        {sound:()=>s_yeehaw(), imgSrc:Avatar},
    ]


    return ( 
        <div className="App grid grid-cols-1 grid-rows-[max-content,auto] h-screen">

            {/* <div>PlayerID:{playerID}</div> */}
            <header className="bg-red-800 text-white text-2xl p-4 text-center">SEBIBOX</header>
            <div className="bg-red-700 p-10 flex flex-col items-center">
                <div className="w-full">
                    <div className="text-[60px] textShadow text-white">Name</div>
                    <input type="text" ref={nameRef} name="name" id="name" className="text-[30px] text-black p-4 w-full" />
                
                    <div className="text-[60px] textShadow text-white mt-8">Avatar</div>
                    <div className="grid grid-cols-4 gap-6 gap-y-10">
                            {avatars.map((a, i) => 
                                <div key={i}>
                                    <input type="radio" name="avatar" onChange={()=> setAvatar(i)} id={i+""} hidden value={i} />
                                    <label htmlFor={i+""} onClick={a.sound} className={clsx("flex justify-center cursor-pointer items-center text-[30px]", avatar==i ? "bg-rose-400" : "bg-rose-200")}>
                                        <Wiggle rotation={Math.random()*100}><img src={a.imgSrc} className="w-fit" /></Wiggle>
                                    </label>
                                </div>
                            )}
                    </div>

                    <div className="text-end mt-16"><button onClick={tryLogin} className="text-end text-[60px] textShadow text-white">Go!</button></div>
                </div>
            </div>
        </div>
    )
}