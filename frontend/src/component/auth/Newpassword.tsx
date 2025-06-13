import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ReusableTextField from "../reusable/ReusableTextfield";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Passwordschema, Passworddata } from "../../validations/Passwordschema";
import { useMutation } from "@apollo/client";
import { NEW_PASSWORD} from "../graphql/queries";  // Your resetPassword mutation
import { useSearchParams } from "react-router-dom";

const Newpassword: React.FC = () => {
  const { handleSubmit, reset, control } = useForm<Passworddata>({
    resolver: zodResolver(Passwordschema),
    defaultValues: {
      Password: "",
      ConfirmPassword: ""
    }
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [resetPassword] = useMutation(NEW_PASSWORD);

  const onsubmit = async (data: Passworddata) => {
    try {
      if (!token) {
        throw new Error("Invalid or missing token.");
      }

      await resetPassword({
        variables: {
          token,
          newPassword: data.Password,
        },
      });

      alert("Password updated successfully.");
      reset();
    } catch (error: any) {
      alert(error.message || "Failed to update password");
    }
  };

  return (
    <Box className="newpassword-container">
      <Box className="newpassword-left">
        <img
          src="/src/assets/porshe.jpeg"
          alt="login visual"
          className="newpassword-left-image"
        />
      </Box>
      <div className="newpasswordcontainer">
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="newpasswordpaper">
            <Typography
              variant="h4"
              className="newpasswordtitle"
              sx={{ marginBottom: "20px" }}
            >
              Create a strong password
            </Typography>
            <Typography
              className="newpasswordsubtitle"
              sx={{ marginBottom: "20px" }}
            >
              Your password must be at least six characters and <br />
              should include a combination of numbers, letters and<br />
              special characters (!$@%)
            </Typography>
            <div className="newpasswordtextfielddiv">
              <ReusableTextField
                className="newpasswordtextfield"
                name="Password"
                type="password"
                label="Password"
                control={control}
                placeholder="Enter the Password"
                width={310}
              />
              <ReusableTextField
                className="newpasswordtextfield"
                name="ConfirmPassword"
                type="password"
                label="Confirm Password"
                control={control}
                width={310}
                placeholder="Enter the Confirm Password"
              />
            </div>
            <div className="newpasswordbtn">
              <Button
                variant="contained"
                type="submit"
                className="newpasswordbutton"
                sx={{ margin: "20px", width: "300px" }}
              >
                Save Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default Newpassword;
