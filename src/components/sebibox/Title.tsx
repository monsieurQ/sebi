interface Props {
    title: string
}

export const Title = ({title}: Props) => <div className="text-[60px] textShadow text-white">{title}</div>