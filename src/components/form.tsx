import { TextField, Button, CircularProgress, Box, useMediaQuery, useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Typography } from '@mui/material';

interface Input {
  id: string,
  label: string;
  type: string;
  error?: string | JSX.Element;
}

interface FormProps {
  inputs: Input[];
  onSubmit: SubmitHandler<any>;
  buttonText: string;
  isLoading: boolean;
  error: boolean;
}

const Form: React.FC<FormProps> = ({ inputs, onSubmit, buttonText, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  let paddingValue = "50px";
  let borderRadiusValue = "10px";

  if (isXs) {
    paddingValue = "50px";
    borderRadiusValue = "10px";
  } else if (isSm) {
    paddingValue = "70px";
    borderRadiusValue = "15px";
  } else if (isMd) {
    paddingValue = "100px";
    borderRadiusValue = "20px";
  } else if (isLg) {
    paddingValue = "150px";
    borderRadiusValue = "30px";
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      height="700px"
      margin="0 auto"
    >
      <Box mb={2}>
        <Typography
          align="center"
          style={{
            fontSize: isXs ? "28px" : isSm ? "36px" : isMd ? "42px" : isLg ? "50px" : "28px",
            fontWeight: "bold",
            color: "#434343"
          }}
        >
          Iniciar Sesión
        </Typography>
      </Box>

      <Box
        mb={4}
        px={paddingValue}
        py={"60px"}
        borderRadius={borderRadiusValue}
        border="1px solid #434343"
        sx={{
          background: "rrgba(235, 235, 235, 0)",
          backdropFilter: "blur(10px)",
          height: "300px"
        }}
      >
        {error && (
          <Typography
            color="error"
            mb={"20px"}
            sx={{ fontSize: "20px", fontWeight: "bold", marginTop: "2px" }}
          >
            Usuario o Contraseña invalidos
          </Typography>
        )}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {inputs.map((input, index) => {
            return (
              <div key={`input-${index}`} style={{ marginBottom: "35px" }}>
                {errors[input.id] && (
                  <Typography
                    color="error"
                    mb={1}
                    sx={{ fontSize: "12px", fontWeight: "bold", marginTop: "2px" }}
                  >
                    Este campo es requerido*
                  </Typography>
                )}
                <TextField
                  label={input.label}
                  type={input.type}
                  variant="outlined"
                  {...register(input.id, { required: true })}
                  InputProps={{
                    sx: {
                      borderColor: "#434343",
                      '&:focus': {
                        borderColor: "#4CAF50",
                      },
                      width: isXs ? "300px" : isSm ? "350px" : isMd ? "400px" : isLg ? "500px" : "200px",
                    }
                  }}
                />
              </div>
            );
          })}
          <Box 
            mt={2} 
            sx={{
              display:"flex",
              justifyContent:"center"
            }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              color="primary"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
              size="large"
              sx={{
                width: "50%",
                height: "50px",
                fontWeigth:"bold",
                fontSize:"20px",
                textTransform: "none"
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Form;
