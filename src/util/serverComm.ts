// const SERVER_URL = "http://localhost:8080"
const SERVER_URL = "https://sebibox-23906.nodechef.com"


async function sendAndReturn(uri:string, query?: string){
    let url = `${SERVER_URL}/${uri}`
    if(query) url+= `?${query}`
    const response = await fetch(url)
    const json = await response.json() 
    return json
}

export async function server_sendPlayerInfoAndGetID(name:string, avatar:number){
    const response = await fetch(`${SERVER_URL}/class-login?name=${name}&avatar=${avatar}`)
    const json = await response.json() 
    return json
}

export async function server_nextRound(){
    const response = await fetch(`${SERVER_URL}/class-nextRound`)
    const json = await response.json() 
    return json
}

export async function server_skipRoundIntro(){
    const response = await fetch(`${SERVER_URL}/class-skipRoundIntro`)
    const json = await response.json() 
    return json
}

export async function server_checkIfPlayerIdExists(id:number){
    const response = await fetch(`${SERVER_URL}/class-checkId?id=${id}`)
    const json = await response.json()
    return json
}

export async function server_getPlayers(){
    const response = await fetch(`${SERVER_URL}/getPlayers`)
    const json = await response.json()
    return json
}

export async function server_getQuestion(qid:number, pid:number){
    const response = await fetch(`${SERVER_URL}/class-getQuestion?qid=${qid}&pid=${pid}`)
    const json = await response.json()
    return json
}

export async function server_lobby_check(){
    const response = await fetch(`${SERVER_URL}/class-lobbyCheck`)
    const json = await response.json()
    return json
}

export async function server_getResults(){
    const response = await fetch(`${SERVER_URL}/class-getResults`)
    const json = await response.json()
    return json
}

export async function server_getFinalResults(){
    const response = await fetch(`${SERVER_URL}/class-getFinalResults`)
    const json = await response.json()
    return json
}


export async function server_state_check(){
    const response = await fetch(`${SERVER_URL}/class-stateCheck`)
    const json = await response.json()
    return json
}

export async function server_lobby_startGame(){
    const response = await fetch(`${SERVER_URL}/class-startGame`)
    const json = await response.json()
    return json
}

export async function server_getIntro(){
    const response = await fetch(`${SERVER_URL}/class-getIntro`)
    const json = await response.json()
    return json
}

export async function server_questionOver(){
    const response = await fetch(`${SERVER_URL}/class-questionOver`)
    const json = await response.json()
    return json
}


export async function server_roundsCheck(){
    const response = await fetch(`${SERVER_URL}/roundsCheck`)
    const json = await response.json()
    return json
}

export async function server_nextQuestion(){
    const response = await fetch(`${SERVER_URL}/class-nextQuestion`)
    const json = await response.json()
    return json
}

export async function server_reset(){
    const response = await fetch(`${SERVER_URL}/reset`)
    const json = await response.json() 
    return json
}


/**
 * 
 * @param pid - Player ID  
 * @param index - Index of chosen answer
 * @returns 
 */
export async function server_game_answer(pid:number, qid:number, index:number){
    const response = await fetch(`${SERVER_URL}/class-answer?pid=${pid}&qid=${qid}&a=${index}`)
    const json = await response.json()
    return json
}

export async function server_question_check(){
    const response = await fetch(`${SERVER_URL}/questionCheck`)
    const json = await response.json() 
    return json
}

