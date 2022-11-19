import { AuthGuard } from "@nestjs/passport";

export class RefreshGuard extends AuthGuard('rt-jwt') {
    constructor() {
        super()
    }
}