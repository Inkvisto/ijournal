import { CACHE_MANAGER, Inject, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CommentsService } from "./comments.service";


@WebSocketGateway({
    cors:{
        origin:"*"
    }
})
export class CommentGateway implements  OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server:Server
    private logger: Logger = new Logger('CommentGateway');
    
    constructor(
        private readonly commentService:CommentsService
      ) {
        
      }
      



      handleConnection(client: Socket, payload: string) {
         
        this.logger.log(`Client connected: ${client.id}`);
      }

      afterInit(server: Server) {
        this.logger.log('Init');
       }
      
       handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);

       }

       

      @SubscribeMessage('click')
      async handleMessage(
      @MessageBody() likes:any,
      @ConnectedSocket() socket: Socket) {
       this.commentService.saveMessage(likes[0],likes[1]);
    
      }


   
    
      
      

     
}