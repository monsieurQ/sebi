export type Player = {
    name:string
    avatar:number 
    id:number
    points?:number
}


export type Question = {
    q:string 
    a:string[]
    correct:number
    time?:number   
    qid:number
}