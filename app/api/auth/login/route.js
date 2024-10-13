import connectToDatabase  from "../../../../lib/mongodb";
import User  from "../../../models/Users";
import bcrypt from 'bcrypt';

export async function POST(req){
    const {username,password,userType} = await req.json();

    let dbname;
    switch(userType){
        case 'Raw Material Suppliers':
            dbname = 'suppliers'
            break;
        case 'Hospitals':
            dbname = 'hospitals' 
            break;
        case 'Manufacturers':
            dbname = 'manufacture'
            break;
        case 'Pharmacies':
            dbname = 'pharmacies'
            break;
        // default:
        //     return new Response(JSON.stringify({ error: 'Invalid user type' }), { status: 400 });

    }

    try{
        await connectToDatabase(dbname);
        console.log(`${dbname}`)
        const user_details = await User.findOne({username});
        console.log(`${username}`)
        if(!user_details){
            return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user_details.password);
        console.log(`Password match: ${isMatch}`);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
        }
        return new Response(JSON.stringify({message: 'USer login successful'}),{status:200});
    }catch(error){
        return new Response(JSON.stringify({error:'User login failed'}),{status:500});
    }
}