import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute =({children}) => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/getAdmin`, {withCredentials: true});
                if(res.data.success){
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch {
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, []);

    if(isAdmin === null) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;