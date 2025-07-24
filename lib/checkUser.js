import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser=async ()=>{
    const user=await currentUser();

    if(!user){
        return null;
    }

    try {
        const loggedInUser=await db.user.findUnique({
        where:{
            clerkUserId:user.id
        },
    });

    if(loggedInUser){
        return loggedInUser;    
    }

    const name=`${user.firstName} ${user.lastName}`

    const newUser=await db.user.create({
        data :{
            clerkUserId:user.id,
            name,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress,
        }
    });
    return newUser;
    } catch (error) {
        console.log(error.message);
    }
}


// Gets the current user from Clerk.

// Checks if that user is in your database.

// If yes → returns the existing user.

// If not → creates a new user using Clerk info and returns it.

// Helps you sync Clerk users with your Prisma database.