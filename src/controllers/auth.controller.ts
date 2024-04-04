import {Request} from "express";
import {Response as ExpressResponse} from "express"
import * as ResponseManager from "../helpers/response.manager"
import {verifyAddressRequest} from "../interfaces";
import * as authService from "../services/auth.service"

export async function handleVerifyMetaMask(req:Request,res:ExpressResponse){
    const body: verifyAddressRequest = req.body
    try{

        await authService.verifyMetMask(body)

    }catch (err:any){
        ResponseManager.handleError(res,err)
    }

}