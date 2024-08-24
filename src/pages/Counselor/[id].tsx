import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import CarouselReviewCard from "@/components/Counselor/ReviewCard";
import CounselorDetail from "@/components/counselor_detail";
import { Navigation } from "@/components/common";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from "next/router";
import { AppContext, CounselorData } from "@/providers/AppContext";

import ReactStars from "react-stars";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#22543D",
  borderRadius: "16px",
  p: 4,
};

export default function Review_Counseling() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const context = useContext(AppContext);
  const selectedCounselor: CounselorData | null = context.currentCounselor;

  const [rating, setRating] = React.useState(0);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Submitted: ${inputValue}`);
    handleClose;
  };

  return (
    <>
      <Navigation />

      <div className="bg-[#FAF6E3] md:px-32 py-12">

        <CounselorDetail counselor={selectedCounselor} />
        <div className="flex justify-between">
          <h1 className="px-8 text-4xl text-black font-bold py-8">Reviews</h1>

          <div
            onClick={handleOpen}
            className=" text-4xl text-leaf hover:cursor-pointer px-5 "
          >
            <AddCircleIcon style={{ fontSize: "32" }} />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                ...style,
                width: { xs: "90%", sm: "80%", md: 600, lg: 1200 },
                p: 4,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: { xs: 24, sm: 28, md: 32 },
                  color: "white",
                }}
              >
                Add Review
              </Typography>
              <TextField
                placeholder="add text in here...."
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
                value={inputValue}
                onChange={handleInputChange}
                inputProps={{ maxLength: 250 }}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <div className="flex justify-center">
                <ReactStars
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  value={rating}
                  onChange={(newRating: number) => setRating(newRating)}
                />
              </div>

              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button
                  onClick={handleSubmit}
                  variant="text"
                  sx={{
                    backgroundColor: "transparent",
                    fontSize: { xs: 14, sm: 16 },
                    fontWeight: "semibold",
                    color: "white",
                    border: "1px solid white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Create Review
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
        <CarouselReviewCard counselor={selectedCounselor} />
      </div>
    </>
  );
}
