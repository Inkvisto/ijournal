import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { ServerOptions } from "socket.io";


export const GET_COMMENTS_CACHE_KEY = 'GET_COMMENTS_CACHE';

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;
  
    async connectToRedis(): Promise<void> {
      const pubClient = createClient   ({ url: `redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@localhost:6379` });
      const subClient = pubClient.duplicate();
  
      await Promise.all([pubClient.connect(),subClient.connect()]);
      this.adapterConstructor = createAdapter(pubClient, subClient);
    }
  
    createIOServer(port: number, options?: ServerOptions): any {
      const server = super.createIOServer(port, options);
      server.adapter(this.adapterConstructor);
      return server;
    }
  }