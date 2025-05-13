import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupformdata, signupschema } from "../../validations/Signupschema";
import ReusableTextField from "../reusable/ReusableTextfield";

const Signup: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<signupformdata>({
    resolver: zodResolver(signupschema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      Password: "",
      ConfirmPassword: "",
      DateofBirth: "",
    },
  });
  const onsubmit = (data: signupformdata) => {
    console.log(data), reset();
  };

  return (
    <Box className="signup-container">
      <Box className="signup-left">
        <img
          src="/src/assets/porshe.jpeg"
          alt="login visual"
          className="login-left-image"
        />
      </Box>
      <div className="signupcontainer">
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* <Box> */}
          <div className="signuppaper">
            <Typography
              variant="h4"
              gutterBottom
              className="signuptitle"
              sx={{ marginBottom: "20px" }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              className="signupsubtitle"
              // sx={{ marginBottom: "0px" }}
            >
              Sign up to create your account
            </Typography>
            <div className="signuptextfielddiv">
              <ReusableTextField
                className="signuptextfield"
                name="FirstName"
                label="FirstName"
                control={control}
                placeholder="Enter the FirstName"
                width={350}
              />
              <ReusableTextField
                className="signuptextfield"
                name="LastName"
                label="LastName"
                control={control}
                width={350}
                placeholder="Enter the LastName"
              />
              <ReusableTextField
                className="signuptextfield"
                name="EmailAddress"
                label="Email address"
                control={control}
                placeholder="Enter the Emailaddress"
                width={350}
              />
              <ReusableTextField
                className="signuptextfield"
                name="Password"
                type="password"
                label="Password"
                control={control}
                width={350}
                placeholder="Enter the Password"
              />
              <ReusableTextField
                className="signuptextfield"
                name="ConfirmPassword"
                type="password"
                label="Confirm Password"
                control={control}
                placeholder="Enter the Confirmpassword"
                width={350}
              />
              <ReusableTextField
                className="signuptextfield"
                name="DateofBirth"
                type="date"
                control={control}
                width={350}
              />
            </div>
            <Box className="signup-subtext-container">
              <Typography variant="h6" sx={{ marginRight: "8px" }}>
                Already have an account?
              </Typography>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                Log in
              </Link>
            </Box>
            <div className="signupbtn">
              <Button
                className="signupbtnmain"
                type="submit"
                variant="contained"
                sx={{ marginBottom: "20px", width: "300px" }}
              >
                Sign up
              </Button>
            </div>
          </div>
          {/* </Box> */}
        </form>
      </div>
    </Box>
  );
};

export default Signup;
