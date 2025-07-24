import { PrismaClient } from "./generated/prisma";


export const db=globalThis.prisma || new PrismaClient();  //irst, it checks if globalThis.prisma already exists: //✅ If yes → it reuses that existing connection.
                                                  // If not → it creates a new PrismaClient (new database connection).
if(process.env.NODE_ENV !=="production"){    //This checks if your app is not in production (i.e., you're still developing it).
    globalThis.primsa =db;                   //If true, it saves the database connection in globalThis.prisma, so next time it can reuse it.
}





//In development, Next.js or similar frameworks reload a lot.

// Every reload might create a new Prisma connection, which can crash your app.

// This trick stores the connection globally so you only create it once.

//This code makes sure you reuse the same database connection during development to avoid opening too many Prisma clients.