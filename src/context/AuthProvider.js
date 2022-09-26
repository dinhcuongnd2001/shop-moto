import React,{useState, useEffect, createContext} from 'react';
import {} from 'react-router-dom'

import {db, Auth} from '../firebase/config'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {Spin} from 'antd'


const AuthContext = createContext();

// Hàm này được dùng để kiểm soát trạng thái đăng nhập của mỗi user, khi mà có sự thay đổi nào về trạng thái đăg nhập của user thì hàm này sẽ được gọi
function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate= useNavigate();
    // console.log(loading);
    // console.log('re-render');
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(Auth, (user) => {
            if(user){
                // console.log('goi vao if nay')
                const {displayName, email, photoURL, uid} = user;
                setUser({displayName, email, photoURL, uid});
                setLoading(false);
                navigate('/home');
            }
            else{
                // console.log('else')
                setLoading(false);
                navigate('')
            }
        })
        // console.log('unsubcribe: ', unsubcribe);
        return unsubcribe;
    }, [navigate])
  
    return (
    <AuthContext.Provider value={{user}}>
        {loading ? <Spin style={{marginTop:"200px"}}/> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}