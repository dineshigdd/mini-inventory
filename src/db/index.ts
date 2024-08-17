import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

// let prismaClient: PrismaClient;

// const db = () => {
//     if( !prismaClient){
//         prismaClient = new PrismaClient();
//     }

//     return prismaClient;
//   }

//   export default db;
// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
//   } & typeof global;

//   const db = globalThis.prismaGlobal ?? prismaClientSingleton()

//   export default db;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;