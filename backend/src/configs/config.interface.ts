export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
  google:GoogleConfig;
  minio:MinioConfig;
  redis:RedisConfig;
  JWT_ACCESS_SECRET:string;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
  apolloPlayground:object;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface GoogleConfig {
  clientID:string;
  clientSecret:string;
}

export interface MinioConfig {

    endpoint: string,
     port: number,
     accessKey: string,
     secretKey: string,
     bucket: string
   
}


export interface RedisConfig {
  host:string,
  port:number
}

