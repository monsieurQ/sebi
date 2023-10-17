// import Person from './assets/person.svg'

import { Title } from "./Title"

interface Props {
    name: string
    pointsDisplay?: string
}

export const PlayerAvatar = ({name, pointsDisplay}:Props) => {
    return (
        <div className="flex flex-col items-center gap">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-white bg-black p-2 w-10" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            <span className="text-white text-[20px] textShadow">{name}</span>
            {pointsDisplay && <Title title={pointsDisplay} />}
        </div>
    )
} 