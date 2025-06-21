import { Box, Button, Typography } from "@mui/material";

type Props = {
  image: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string; // used to pass custom styles
  width?: number | string;
  height?: number;
};

const Imagecard = ({
  image,
  title,
  subtitle,
  buttonText,
  onClick,
  className,
  width = "600px",
  height = 500,
}: Props) => {
  return (
    <Box
      className={className} // <-- Apply className here
      sx={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay Text */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          p: 5,
          color: "#fff",
        }}
      >
        <Typography className="subtitle" sx={{ fontSize: "1rem", fontWeight: 500 }}>
          {subtitle}
        </Typography>
        <Typography className="title" sx={{ fontSize: "2rem", fontWeight: 700 }}>
          {title}
        </Typography>

        {buttonText && (
          <Button
            variant="contained"
            className="imagecard-button" // <-- Always use this for custom styling
            onClick={onClick}
            sx={{
              mt: 2,
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              borderRadius: 20,
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Imagecard;
