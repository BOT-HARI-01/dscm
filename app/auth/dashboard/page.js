// app/dashboard/page.js
'use client'; // Make sure this is a client component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [userType, setUserType] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching user data, you can replace this with your actual logic
        const fetchUserData = async () => {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedData = JSON.parse(userData);
                setUserType(parsedData.userType);
            } else {
                // Redirect to login if no user data found
                // router.push('/Login');
                
            }
        };

        fetchUserData();
    }, [router]);

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6 text-center">
                    <h1>Dashboard</h1>
                    {userType && <p>Welcome, <strong>{userType}</strong>!</p>}
                    <p>This is your dashboard. You can add more functionality here.</p>
                </div>
            </div>
        </div>
    );
}
