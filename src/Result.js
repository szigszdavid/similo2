import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { GameRules } from "./GameRules";

const won = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "rgb(79, 42, 116)",
  borderRadius: "10%",
  borderColor: "rgb(79,167,158)",
  borderWidth: "10px",
  height: 300,
  color: "white",
};

const lost = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "red",
    borderRadius: "10%",
    borderColor: "white",
    borderWidth: "10px",
    height: 300,
    color: "white",
  };
export function Result({end, handleResultClose, answer, newGameButtonOnClick, exitRoomOnClick}) {
    return(
        <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={end !== ""}
      onClose={handleResultClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={end !== ""}>
        <Box sx={end === "won" ? won : lost}>
          <div hidden={end === "lost"}>
            <h1>Gratulálunk!</h1>
            <h2>Nyertetek</h2>
          </div>
          <div hidden={end === "won"}>
            <h2>Sajnos most vesztettetek!</h2>
            <h3>A megoldás ez volt: {answer}</h3>
          </div>
          <button
              className="newGameButton"
              style={{ width: "100%" }}
              onClick={newGameButtonOnClick}
            >
              {" "}
              Új játék{" "}
            </button>
            <button
                className="newGameButton"
                style={{ width: "100%" }}
                onClick={exitRoomOnClick}>
              Kilépés a szobából
            </button>
            <button className="newGameButton" style={{ width: "100%" }}>
              Kilépés a játékból
            </button>
          
        </Box>
      </Fade>
    </Modal>        
    )
}