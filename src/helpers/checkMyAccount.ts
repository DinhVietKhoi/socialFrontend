'use client'
import { useSelector } from "react-redux"

export const checkMyAccout = (id: string,idUser: string) => {
    return id == idUser;
}