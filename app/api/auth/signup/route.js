import connectToDatabase from '../../../../lib/mongodb'; // Adjust the path as needed
import User from '../../../models/Users'; // Adjust the path as needed
import bycrypt from 'bcrypt';

export async function POST(req) {
    const { username, password, email, userType } = await req.json();

    let dbname;
    switch(userType){
        case 'Raw Material Suppliers':
            dbname = 'suppliers'
            break;
        case 'Hospitals':
            dbname = 'hospitals'
            break;
        case 'Manufacturers':
            dbname = 'manufactures'
            break;
        case 'Pharmacies':
            dbname = 'pharmacies'
            break;
        default:
            return resizeBy.status(400).json({error:'invald user type'});
    }
    
    try {
        await connectToDatabase(dbname);
        
        const hashedpassword = await bycrypt.hash(password,10);
        const newUser = new User({
            username,
            password:hashedpassword,
            email,
            userType,
        });

        // const result = await db.collection('users').insertOne(newUser);
        await newUser.save();
        // console.log(result);

        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'User creation failed' }), { status: 500 });
    }
}
