import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { GameRules } from "./GameRules";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "rgb(79, 42, 116)",
  borderRadius: "10%",
  borderColor: "rgb(79,167,158)",
  borderWidth: "10px",
};

const rules = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "rgb(79, 42, 116)",
  color: "white",
  borderRadius: "15%",
  borderColor: "rgb(79,167,158)",
  borderWidth: "10px",
};

export function GameMenu({ show, handleMenuClose, newGameButtonOnClick, exitRoomOnClick }) {
  const [gameRulesOpen, setGameRulesOpen] = useState(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={handleMenuClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box sx={!gameRulesOpen ? style : rules}>
          <div hidden={gameRulesOpen}>
            <button
              className="newGameButton"
              style={{ width: "100%" }}
              onClick={handleMenuClose}
            >
              Vissza a játékba
            </button>
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
              onClick={() => setGameRulesOpen(true)}
            >
              Játékszabály
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
          </div>
          <div hidden={!gameRulesOpen}>
            <GameRules
              gameRulesBackButtonOnClick={() => setGameRulesOpen(false)}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
