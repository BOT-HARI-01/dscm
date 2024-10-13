'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [isMounted, setIsMounted] = useState(false);
    const [userType, setUserType] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch('/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
                userType
            }),
        });

        const result = await response.json();

        if (response.ok){
            // alert('Login successful');
            localStorage.setItem('userData',JSON.stringify({userType,username:event.target.username.value}));
            setTimeout(() => {
                router.push('/auth/dashboard');
            }, 1000);
            console.log('Redirecting to dashboard...');

            // setUserType('');
            // router.push('/dashboard');
        }else{
            alert(`Error: ${result.error}`);
            setUserType('');
        }
    };

    const handleUserTypeSelect = (type) => {
        setUserType(type);
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-4 text-center">
                    <h1>Select User Type</h1>
                    <div className="btn-group-vertical">
                        {['Raw Material Suppliers', 'Hospitals', 'Manufacturers', 'Pharmacies'].map(type => (
                            <button
                                key={type}
                                className="btn btn-outline-primary mb-2"
                                onClick={() =>  UserTypeSelect(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-md-4">
                    <h1 className="text-center">Welcome Back!!!</h1>
                    <p className="text-center">User Type: <strong>{userType}</strong></p>
                    {userType && (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input type="text" className="form-control" id="username" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" required />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    )}
                    {!userType && <p className="text-center">Please select a user type above.</p>}
                </div>
            </div>
        </div>
    );
}
