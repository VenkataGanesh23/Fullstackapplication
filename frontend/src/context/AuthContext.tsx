import { createContext, useContext, useEffect, useState } from "react";


interface AuthContectType{
    user:any|null;
    isAuthenticated:boolean;
    login:(token:string)=>void;
    logout:()=>void;
}
const AuthContext=createContext<AuthContectType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log("AuthProvider mounted");
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [user,setUser]=useState<any |null>(null)

 useEffect(()=>{
    const token=localStorage.getItem("token")
    console.log(token)
    setIsAuthenticated(!!token)
    setUser({})
 },[])
 
 const login=(token:string)=>{
    localStorage.setItem("token",token);
    setIsAuthenticated(true)
    setUser({})
 }

 const logout=()=>{
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUser(null)
 }
return(
    <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>
     {children}   
    </AuthContext.Provider>
)
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useauth must be used inside AuthProvider'); // This is what you're hitting
  }
  return ctx;
};
