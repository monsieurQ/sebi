const PLAYER_NAME_KEY = "playerName"
const AVATAR_KEY = "avatar"
const GAME_ID_KEY = "gameID"
const PLAYER_ID_KEY = "playerID"

export const LS_checkGameID = () => {

}

export const LS_savePlayerInfo = (name: string, avatar:number, id?: number) => {
    if(!localStorage) return -1;
    localStorage.setItem(PLAYER_NAME_KEY, name) 
    localStorage.setItem(AVATAR_KEY, avatar+"")
    if(id) localStorage.setItem(PLAYER_ID_KEY, id+"")
}

export const LS_getPlayerID = () => {
    if(!localStorage) return -1; 
    return localStorage.getItem(PLAYER_ID_KEY)
}