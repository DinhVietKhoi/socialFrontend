export const checkLike = (arrLike: string[],idUser: string|null) => {
    if (idUser !== null) {
        return arrLike.includes(idUser)    
    }
    return false;
}