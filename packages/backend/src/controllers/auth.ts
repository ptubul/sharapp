import { Request, Response } from "express"
import { req } from "express/lib/response"

const login = async(req : Request , res: Response ) =>{
    res.send("success")
}

const logout = async(req: Request, res: Response) =>{
    res.send("logout")
}

const register = async(req: Request, res: Response) =>{
    res.send("registered")
}

export default {
    login,
    logout,
    register
}