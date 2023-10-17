import { useRef, useState } from "react"
import clsx from "clsx"

interface Props {
    login: Function
}

export const Login = ({login}: Props) => {
    const [avatar, setAvatar] = useState<number|null>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const tryLogin = () => {
        if(!nameRef.current?.value || avatar===null){
            alert("PICK")
            return
        }
        login(nameRef.current.value, avatar)
    }

    return ( 
        <div className="w-full">
            <div className="text-[60px] textShadow text-white">Name</div>
            <input type="text" ref={nameRef} name="name" id="name" className="text-[30px] text-black p-4 w-full" />
        
            <div className="text-[60px] textShadow text-white mt-8">Avatar</div>
            <div className="grid grid-cols-5 gap-4">
                {[0,1,2,3,4,5].map(n => 
                    <div key={n}>
                        <input type="radio" name="avatar" onChange={()=> setAvatar(n)} id={n+""} hidden value={n} key={n} />
                        <label htmlFor={n+""} className={clsx("flex justify-center cursor-pointer items-center text-[30px]", avatar===n ? "bg-rose-400" : "bg-rose-200")}>{n}</label>
                    </div>
                )}
            </div>

            <div className="text-end mt-16"><button onClick={tryLogin} className="text-end text-[60px] textShadow text-white">Go!</button></div>
        </div>
    )
}