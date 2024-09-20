import {Md5} from 'ts-md5';
import jwt from 'jsonwebtoken';
import { AuthError } from "./autherrors";
import { Id } from "@astypes/id/id";
import Logger from '@logger/logger';

export default class Auth
{
    private md5: Md5;

    async login <T extends {id: Id, password?: string}>(user: T, foundedpass: string): Promise<any> 
    {
        if (user.password === undefined)
        {
            Logger.warn("There is no information about password");
            throw Error(AuthError.noUserPass);
        }
        
        this.md5 = new Md5();
        this.md5.appendStr(user.password)
        let buf = this.md5.end()
        
        if ( buf !== foundedpass) 
        {
            Logger.warn("Password incorrect");
            throw Error(AuthError.incorrectPass);
        }

        return jwt.sign({ id: user.id.getStringVersion() }, process.env.SECRET_KEY, { expiresIn: '1h' });
    }

    async hashPassword <T extends {password?: string}>(user: T): Promise<any> 
    {
        this.md5 = new Md5();
        this.md5.appendStr(user.password);
        let buf: any = this.md5.end();
        user.password = buf;
    }

    async validatePassword <T extends {password?: string}>(user: T, actualHash: string): Promise<boolean> {
        this.md5 = new Md5();
        this.md5.appendStr(user.password);
        return user.password && this.md5.end() == actualHash;
    }

    verifyToken(token: any, secret: string = process.env.SECRET_KEY): boolean
    {
        try {
            jwt.verify(token, secret);
            return true;
        } catch(err) {
            return false;
        }
    }
}