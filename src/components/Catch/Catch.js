import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import gradient from "../../assets/img/gradient.png";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define the theme
const THEME = createTheme({
  palette: {
    primary: {
      main: "#1976d2", 
    },
    secondary: {
      main: "#dc004e", 
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default function Catch() {
  const history = useHistory();
  const [countdown, setCountdown] = useState(5); // Initial countdown of 5 seconds

  useEffect(() => {
    let timer;

    // Trigger SweetAlert2 with countdown updates
    Swal.fire({
      title: "You have not chosen a neighborhood!",
      html: `
        <div style="font-size: 1.5rem; color: gray;">
          Redirecting to the search page <br></br>
          <span id="countdown-timer" style="font-size: 3rem; font-weight: bold; color: black;">${countdown}</span>
        </div>
      `,
      icon: "warning",
      background: "#ffffff",
      showConfirmButton: false,
      allowOutsideClick: false, 
      didOpen: () => {
        // Start countdown interval
        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer); // Clear the interval when countdown finishes
              history.push("/search"); // Redirect to search
              Swal.close(); 
              return 0;
            }
            return prev - 1; // Decrease countdown
          });
        }, 1000);
      },
    });

    // Cleanup the timer on component unmount
    return () => {
      clearInterval(timer);
      Swal.close(); 
    };
  }, [countdown, history]);

  return (
    <ThemeProvider theme={THEME}>
      {/* Gradient Background Section */}
      <div
        style={{
          backgroundImage: `url(${gradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
    </ThemeProvider>
  );
}
