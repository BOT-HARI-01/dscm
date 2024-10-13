'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export default function Signup() {
    const [isMounted, setIsMounted] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
                email: event.target.email.value,
                userType,
            }),
        });
        
        const result = await response.json();

        if (response.ok) {
            alert('User created successfully');
        } else {
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
                                onClick={() => handleUserTypeSelect(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-md-4">
                    <h1 className="text-center">Welcome !!!</h1>
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
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Signup</button>
                            </div>
                        </form>
                    )}
                    {!userType && <p className="text-center">Please select a user type above.</p>}
                </div>
            </div>
        </div>
    );
}
