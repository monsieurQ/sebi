import clsx from "clsx"

interface Props {
    title: string
    center?: boolean
}

export const Title = ({title, center=false}: Props) => <div className={clsx("text-[60px] textShadow text-white", center && 'text-center')}>{title}</div>