import { Body, ConflictException, Controller, ForbiddenException, HttpCode, HttpException, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessGuard, RefreshGuard } from 'src/guard';
import { AuthService } from './auth.service';
import { ParticipantDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private service:AuthService){}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: ParticipantDto): Promise<Tokens | ConflictException> {
        return this.service.signup(dto)
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: ParticipantDto): Promise<Tokens | UnauthorizedException> {
        return this.service.signin(dto)
    }

    @UseGuards(AccessGuard)
    @Post('/signout')
    @HttpCode(HttpStatus.OK)
    signout(@Req() req: Request): Promise<boolean | UnauthorizedException> {
        const user = req.user
        console.log(user)
        return this.service.signout(user['sub'])
    }

    @UseGuards(RefreshGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refresh(@Req() req: Request): Promise<Tokens | ForbiddenException> {
        const user = req.user
        return this.service.refresh(user['sub'],user['refreshToken'])
    }
}
