import { Request, Response } from "express"
import User from '../models/user_model'

interface RegisterRequestBody {
    email: string;
    // Add other properties if needed
}

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