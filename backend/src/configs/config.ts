import { Config } from './config.interface';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core/dist/plugin/landingPage/default';
const config: Config = {
  nest: {
    port: 7777,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: false,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
    apolloPlayground:ApolloServerPluginLandingPageLocalDefault()
  },
  security: {
    expiresIn: '10s',
    refreshIn: '30d',
    bcryptSaltOrRound: 10,
  },
  google: {
    clientID:'214454015268-k926edtnfcb7j91qrpem4a82ohjl4rj5.apps.googleusercontent.com',
    clientSecret:'mySecret'
  },
  minio: {
   endpoint: 'localhost',
    port: 9000,
    accessKey: 'minio',
    secretKey: 'minio123',
    bucket: 'ij-backend-images'
  },
  redis:{
    host:'localhost',
    port:6379
  },
  JWT_ACCESS_SECRET:'secret'
};


export default (): Config => config;
