import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles({
    root: {
      '&$error': {
          color: 'white'
        },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffcccb"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-input": {
        color: "white"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#ffcccb"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-outlined": {
        color: "white"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "#ffcccb"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "white"
      }
    }
    ,error: {}
  });
  