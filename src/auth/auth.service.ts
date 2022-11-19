import { ConflictException, ForbiddenException, ImATeapotException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service';
import { ParticipantDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService){}
    
    async getTokens(userId: number, name: string): Promise<Tokens> {
        const payload = {
            sub: userId,
            name
        }
        const [at,rt] = await Promise.all([
            this.jwtService.sign(payload,{
                secret: this.config.get('AT_SECRET'),
                expiresIn: 60 //1 min
            }),
            this.jwtService.sign(payload, {
                secret: this.config.get('RT_SECRET'),
                expiresIn: 60*10 //10 min
            })
        ])

        return {
            access_token: at,
            refresh_token: rt
        }
    }

    async updateRT(id:number,refresh_token: string) {
        try {
            await this.prisma.participant.update({
                where: {
                    id
                },
                data: {
                    hash_rt : await argon.hash(refresh_token)
                }
            })
        } catch(err) {
            throw new ImATeapotException('idk man something went wrong!')
        }
    }

    async signup({name,password}: ParticipantDto): Promise<Tokens | ConflictException> {
        //hash password
        const hash = await argon.hash(password)
        //add to database
        try {
            const newParticipant = await this.prisma.participant.create({
                data: {
                    name,
                    password: hash
                }
            })
            //generate and save token to db
            const tokens =  await this.getTokens(newParticipant.id, name)
            await this.updateRT(newParticipant.id,tokens.refresh_token)

            return tokens
            
        } catch(err) {
            //simplified thing, may add proper error handler
            throw new ConflictException('credential taken')
        }
    }

    async signin({name, password}: ParticipantDto): Promise<Tokens|UnauthorizedException> {
        //check email valid
        const participant = await this.prisma.participant.findUnique({
            where: {
                name 
            }
        })
        if (!participant) throw new UnauthorizedException('invalid credential')

        //check password
        const validPassword = await argon.verify(participant.password,password)
        if (!validPassword) throw new UnauthorizedException('invalid credential')

        //generate and update token
        const tokens = await this.getTokens(participant.id, name)
        await this.updateRT(participant.id,tokens.refresh_token)

        return tokens
    }

    async signout(userId: number): Promise<boolean | UnauthorizedException>{
        try {
            await this.prisma.participant.update({
                where: {
                    id: userId
                },
                data: {
                    hash_rt: null
                }
            })
            return true
        } catch {
            throw new UnauthorizedException('false')
        }
    }

    async refresh(userId: number, rt: string): Promise<Tokens|ForbiddenException> {
        try {
            //get participant data
            const {id,name,hash_rt} = await this.prisma.participant.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    hash_rt: true
                }
            })
            //check token
            const validRefresh = await argon.verify(hash_rt,rt)
            if (!validRefresh) throw new ForbiddenException('invalid token!')

            //sign new token
            const tokens = await this.getTokens(id,name)
            await this.updateRT(id,tokens.refresh_token)

            return tokens
        } catch {
            throw new ForbiddenException('invalid token!')
        }
    }
}
