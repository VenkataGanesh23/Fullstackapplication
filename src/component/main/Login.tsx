import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ReusableTextField from "../reusable/ReusableTextfield";
import { useForm } from "react-hook-form";
import { loginformdata, Loginschema } from "../../validations/Loginschema";
import { zodResolver } from "@hookform/resolvers/zod";

const Loginpage: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<loginformdata>({
    resolver: zodResolver(Loginschema),
    defaultValues: {
      EmailAddress: "",
      Password: "",
    },
  });

  const onsubmit = (data: loginformdata) => {
    console.log(data);
    reset({
      EmailAddress: "",
      Password: "",
    });
  };

  return (
    <Box className="login-container">
      <Box className="login-left">
        <img
          src="/src/assets/porshe.jpeg"
          alt="login visual"
          className="login-left-image"
        />
      </Box>
      <div className="login-right-side">
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* <Box className="loginbox">
          <Paper className="loginpaper"> */}
          <div className="logindiv">
            <Typography
              variant="h4"
              gutterBottom
              className="logintitle"
              sx={{ marginBottom: "20px" }}
            >
              Login
            </Typography>
            <ReusableTextField
              className="loginresuableemail"
              name="EmailAddress"
              label="Email Address"
              control={control}
              width={380}
              error={!!errors.EmailAddress}
              rules={{ required: "Email Address is required" }}
              placeholder="Enter the Emailaddress"
              helperText={errors.EmailAddress?.message}
            />
            <ReusableTextField
            className="loginresuableemail"
              name="Password"
              type="password"
              label="Password"
              control={control}
              width={380}
              error={!!errors.Password}
              rules={{ required: "Password is required" }}
              placeholder="Enter the Password"
              helperText={errors.Password?.message}
            />

            <Typography className="logintextlinkforgetpassword">
              <Link
                className="logintextlinkforgetpassword"
                to="/Forgetpassword"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                }}
              >
                Forget Password?
              </Link>
            </Typography>

            <div className="logindivbtn">
              <Button variant="contained" type="submit" className="loginbtn">
                Log in
              </Button>
            </div>
            <Typography className="logintextlink">
              <Typography
                variant="h6"
                gutterBottom
                className="auth-subtitle-small"
                sx={{ textAlign: "center", marginBottom: "20px" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="auth-link"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                    fontSize: 18,
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Typography>
          </div>
          {/* </Paper>
        </Box> */}
        </form>
      </div>
    </Box>
  );
};

export default Loginpage;
