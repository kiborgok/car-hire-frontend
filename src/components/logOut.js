import { useEffect } from 'react';
import { logOut } from '../services/authService';

function LogOut() {
    useEffect(() => {
        logOut();
        window.location = "/";
    },[])
    return null;
}

export default LogOut;