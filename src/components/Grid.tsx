import { ReactNode } from "react";

interface GridProps {
    children: ReactNode
    className?: string
}

export const Grid = ({children, className=""}:GridProps) => {
    return (
        <div className={"grid grid-cols-12 gap-10 "+className}>
            {children}
        </div>
    )
}