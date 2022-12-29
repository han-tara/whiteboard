const util = require('util')

import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class WhiteboardsGuard implements CanActivate {
    constructor(private jwtService: JwtService, private config: ConfigService){}
    private logger: Logger = new Logger('Data Log')
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {

        const access_token = ctx.getArgByIndex(0).handshake.auth.token
        this.logger.log(access_token)

        //verify token
        try {
            const verified = this.jwtService.verify(access_token, {
                secret: this.config.get('AT_SECRET')
            })
            console.log(verified)
            if (!verified) return false
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }
}