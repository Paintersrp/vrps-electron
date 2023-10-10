import { CircularProgress, Box, Fade } from "@mui/material";

export const Loading: React.FC = () => {
  return (
    <Fade in={true} timeout={300}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        bgcolor="rgba(0, 0, 0, 0.8)"
      >
        <CircularProgress size={90} color="primary" />
      </Box>
    </Fade>
  );
};

export default Loading;
