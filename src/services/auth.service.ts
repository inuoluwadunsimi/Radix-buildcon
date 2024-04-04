import {BadRequestError, verifyAddressRequest} from "../interfaces";
import Web3 from 'web3'

const web3 = new Web3()
export async function verifyMetMask(body:verifyAddressRequest){
    const {message,signature,address}= body
    const prefixedMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`
    const messageHash = web3.utils.sha3(prefixedMessage)
    if(!messageHash){
        throw new BadRequestError('invalid message')
    }
    const recoveredAddress = web3.eth.accounts.recover(messageHash,signature)

    if(recoveredAddress.toLowerCase() !== address.toLowerCase()){
        throw new  BadRequestError("failed to verify signature")
    }
}