const SERVER_URL = "http://localhost:8080"

async function sendAndReturn(uri:string, query?: string){
    let url = `${SERVER_URL}/${uri}`
    if(query) url+= `?${query}`
    const response = await fetch(url)
    const json = await response.json() 
    return json
}

export async function server_sendPlayerInfoAndGetID(name:string, avatar:number){
    const response = await fetch(`${SERVER_URL}/getPlayerId?name=${name}&avatar=${avatar}`)
        .then(res => res.json())
    console.log(response)
    return response.id
}

export async function server_getPlayers(){
    const response = await fetch(`${SERVER_URL}/getPlayers`)
    const json = await response.json()
    return json
}

export async function server_getQuestion(){
    const response = await fetch(`${SERVER_URL}/getQuestion`)
    const json = await response.json()
    return json
}

export async function server_lobby_check(){
    const response = await fetch(`${SERVER_URL}/lobbyCheck`)
    const json = await response.json()
    return json
}

export async function server_lobby_startGame(){
    const response = await fetch(`${SERVER_URL}/startGame`)
    const json = await response.json()
    return json
}


export async function server_roundsCheck(){
    const response = await fetch(`${SERVER_URL}/roundsCheck`)
    const json = await response.json()
    return json
}

export async function server_nextRound(){
    const response = await fetch(`${SERVER_URL}/nextRound`)
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
export async function server_game_answer(pid:number, index:number){
    const response = await fetch(`${SERVER_URL}/answerQuestion?pid=${pid}&a=${index}`)
    const json = await response.json()
    return json
}

export async function server_question_check(){
    const response = await fetch(`${SERVER_URL}/questionCheck`)
    const json = await response.json() 
    return json 
}

