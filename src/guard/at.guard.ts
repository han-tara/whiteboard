import { AuthGuard } from "@nestjs/passport";

export class AccessGuard extends AuthGuard('at-jwt') {
    constructor(){
        super()
    }
}