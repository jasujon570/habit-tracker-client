// src/hooks/useAuth.jsx
import { useContext } from "react";
// নিশ্চিত করুন এটি 'AuthContext.jsx' থেকে ইম্পোর্ট হচ্ছে
import { AuthContext } from "../context/AuthContext"; 

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;