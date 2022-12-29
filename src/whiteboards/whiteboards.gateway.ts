import { Logger, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WhiteboardsGuard } from 'src/guard';

@UseGuards(WhiteboardsGuard)
@WebSocketGateway({
  cors: '*',
  namespace: '/whiteboards',
})
export class WhiteboardsGateway implements OnGatewayInit {
  private rooms_storage: {[key: string]: string } = {}

  private logger: Logger = new Logger('WhiteboardsGateway')
  
  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.logger.log('Server initialized!')
  }

  @SubscribeMessage('setData')
  sendMessage(client: Socket, {text,room}: {text: string, room: string}): void {
    //dirty validate room before sendMessage
    if (client.rooms.has(room)) {
      console.log('emitting ' + room + ' ' + text)
      this.wss.to(room).emit('getData',text)
      //save to storage
      this.rooms_storage[room] = text
    }
    else
      client.emit('error','[Forbidden]: you dont have acccess to write message')
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string): void {
    //if room not exist then create new
    this.setRoomData(room)
    client.join(room)
    client.emit('joinedRoom',`joined room: ${room}`)
    client.emit('getData', this.rooms_storage[room])
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string): void {
    client.leave(room)
    client.emit('leftRoom', `left room: ${room}`)
  }

  //helper function
  setRoomData(name) {
    if (!this.rooms_storage.hasOwnProperty(name))
      this.rooms_storage[name] = ''
  }
}
