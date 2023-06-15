import { Paper, Box } from "@mui/material";
import { ReactNode } from 'react';


const Section = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      height="800px"
      margin="0 auto"
    >
      <Paper 
        elevation={24}
        sx={{
          width:"80%",
          height:"100%",
          borderRadius:"20px",
          paddingX:"50px",
          paddingY:"20px",
          marginTop:"50px"
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default Section;
