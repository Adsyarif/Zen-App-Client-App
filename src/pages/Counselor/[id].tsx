import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import CarouselReviewCard from "@/components/Counselor/ReviewCard";
import CounselorDetail from "@/components/counselor_detail";
import { Navigation } from "@/components/common";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AppContext, CounselorData, Review } from "@/providers/AppContext";
import ReactStars from "react-stars";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { ListSchedule } from "@/components/Counselor";

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
  const { currentUser } = useContext(AppContext);
  const [review, setReview] = useState<Review[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const fetchReviewCounselor = async () => {
    if (!selectedCounselor) return;

    try {
      const response: AxiosResponse<{
        data: Review[];
        status: {
          code: number;
          status: string;
        };
      }> = await axios.get(
        `${API_BASE}/review_counselor/${selectedCounselor.counselor_id}`
      );

      const listReview = response.data.data;

      if (Array.isArray(listReview)) {
        const sortedReview = listReview.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        const filteredReview = sortedReview.filter(
          (review: any) => review.deleted_at === null
        );

        setReview(filteredReview);
      }
    } catch (error) {
      console.error("fetch diary list failed:", error);
    }
  };

  useEffect(() => {
    fetchReviewCounselor();
  }, [selectedCounselor]);

  const handleSubmitReview = async () => {
    if (!selectedCounselor) {
      alert("No counselor selected");
      return;
    }

    if (!currentUser) {
      alert("User is not logged in");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/review_counselor/${currentUser.account_id}/${selectedCounselor.counselor_id}`,
        {
          content: inputValue,
          rating,
        }
      );
      alert("Review submitted successfully");
      handleClose();
      setInputValue("");
      setRating(0);

      await fetchReviewCounselor();
    } catch (error) {
      console.error("Error posting review:", error);
      alert("There was an error posting your review. Please try again.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-[#FAF6E3] md:px-32 py-12 min-h-screen">
        {selectedCounselor ? (
          <>
            <CounselorDetail counselor={selectedCounselor} review={review} />
            <div className="flex justify-between">
              <h1 className="px-8 text-4xl text-black font-bold py-8">
                Reviews
              </h1>

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
                      size={64}
                      color2={"#ffd700"}
                      value={rating}
                      onChange={(newRating: number) => setRating(newRating)}
                    />
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <Button
                      onClick={handleSubmitReview}
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
            <CarouselReviewCard reviews={review} />
          </>
        ) : (
          <div>Loading counselor data...</div>
        )}
      </div>
    </>
  );
}
