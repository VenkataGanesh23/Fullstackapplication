import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
  const navigate=useNavigate()
  const { logout } = useAuth();
  const handleLogout=()=>{
    logout()
    navigate('/')
  }

  return (
    <div>
      <Button  onClick={handleLogout} >Logout</Button>
      hiii
    </div>
  )
}

export default Dashboard
