import { Typography, Button, Box } from "@mui/material";
import React from "react";
import ReusableTextField from "../reusable/ReusableTextfield";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Forgetschema,Forgetdata} from "../../validations/Forgetvalidation"


const Forgetpassword:React.FC = () => {
  const {handleSubmit,control,reset,formState:{errors}}=useForm<Forgetdata>({
    resolver:zodResolver(Forgetschema),
    defaultValues:{
      EmailAddress:"",
    }
  });

  const onsubmit=(data:Forgetdata)=>{
    console.log(data)
    reset();
  }
  return (
    <Box className="forgetpassword-container">
      <Box className="forgetpassword-left">
        <img
          src="/src/assets/porshe.jpeg"
          alt="login visual"
          className="forgetpassword-left-image"
        />
      </Box>
    <div className="forgetpasswordcontainer">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="forgetpasswordpaper" >
          <Typography variant="h4"  className="forgetpasswordtitle" sx={{marginBottom:'20px'}}>
            Forget Password
          </Typography>
          <Typography variant="h6"  className="forgetpasswordsubtitle" sx={{marginBottom:'20px'}}>
            Enter your email to reset your password
          </Typography>
          <ReusableTextField name="EmailAddress"  label="Email Address" control={control} width={400} error={!!errors.EmailAddress} rules={{required:"EmailAdrress is required"}} placeholder="Enter the Emailaddress" helperText={errors.EmailAddress?.message} />
          <div className="forgetpasswordbtn">
          <Button type="submit" variant="contained" className="forgetpasswordbutton">Reset password</Button>
          </div>
        </div>
      </form>
    </div>
    </Box>
  );
};

export default Forgetpassword;
