'use server';

import { auth } from "@clerk/nextjs/server";

  
//validations/server actions similar to controller.js

const serializeTransaction=(obj)=>{
    const serialized={...obj}

    if(obj.balance){
        serialized.balance=obj.balance.toNumber();
    }
}


export async function createAccount(data) {
   

    try {
         const {userId}=await auth();

    if(!userId) throw new Error("Unauthorized");

    const user=await db.user.findUnique({
        where:{clerkUserId:userId},
    });

    if(!user){
        throw new Error("User not found");
    }
        //converting balance to float and seeing if balance exist
        const balanceFloat=parseFloat(data.balance);
        if(isNaN(balanceFloat)){
            throw new Error("Invalid Balance amount");
        }

        //checking if its user first account
        const existingAccounts=await db.account.findMany({
            where:{userId:user.id}
        });

        //if not ,making it default
        const shouldBeDefault=existingAccounts.length==0?true:data.isDefault;

        //making rest not default
        if(shouldBeDefault){
            await db.account.updateMany({
                where :{userId:user.id,isDefault:true},
                data:{isDefault:false},
            });
        }

        //if all set finaly creating account
        const account=await db.account.create({
            data:{
                ...data,
            balance:balanceFloat,
            userId:user.id,
            isDefault:shouldBeDefault,
            },
        });

        const serializedAccount=serializeTransaction(account);

         revalidatePath("/dashboard");

         return {success:true,data:serializedAccount};


    } catch (error) {
        throw new Error(error.message);
    }
}

