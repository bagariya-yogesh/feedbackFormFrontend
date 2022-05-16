import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RadioGroupRating from "./rating";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./feedbackForm.css";
import axios from "axios";

const BACKEND = "https://yogesh-feedback.herokuapp.com";

function FeedbackForm() {
  const [rating, setRating] = useState(3);
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [table, setTable] = useState({ show: false, data: [] });

  const allFeedback = async () => {
    try {
      const getData = await axios.get(`${BACKEND}/feedback`);
      setTable({ show: !table.show, data: getData.data });
    } catch (e) {
      alert(`Some error occured`);
    }
  };

  const onFeedbackCategory = (e) => {
    if (feedbackCategory.length) {
      const prevButton = document.getElementById(`${feedbackCategory}`);
      prevButton.classList.remove("selected");
      prevButton.classList.add("not-selected");
    }

    const button = document.getElementById(e.target.id);
    button.classList.add("selected");
    button.classList.remove("not-selected");
    setFeedbackCategory(e.target.id);
  };

  const sendRequest = async () => {
    let feedCat = feedbackCategory;
    if (feedCat === "notright") feedCat = "something is not quite right";

    const data = {
      rating,
      username,
      feedback,
      feedbackCategory: feedCat,
    };

    console.log("backend", BACKEND);
    try {
      const postData = await axios.post(`${BACKEND}/feedback`, data);
      alert("Data saved!");
    } catch (e) {
      console.log("Error", e);
      alert(`Some error occured`);
    }
  };
  return (
    <>
      <Box
        mx="auto"
        sx={{
          maxWidth: "50%",
          border: 1,
          borderRadius: 1,
          my: 1,
        }}
      >
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Box>
            PaddleBoat <AccountBoxIcon />
          </Box>
          <Box>Your Feedback</Box>
        </Box>

        <Divider />

        <p>We would like your feedback to improve our website</p>
        <p>What is your opinion of this page</p>

        <RadioGroupRating setRating={setRating} />

        <Divider />

        <p>Please select your feedback category below.</p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{ border: 1, borderRadius: 1, p: 1, cursor: "pointer" }}
            id="suggestion"
            onClick={(e) => onFeedbackCategory(e)}
          >
            Suggestion
          </Box>
          <Box
            sx={{ border: 1, borderRadius: 1, p: 1, cursor: "pointer" }}
            id="notright"
            onClick={(e) => onFeedbackCategory(e)}
          >
            Something is not quite right
          </Box>
          <Box
            sx={{ border: 1, borderRadius: 1, p: 1, cursor: "pointer" }}
            id="compliment"
            onClick={(e) => onFeedbackCategory(e)}
          >
            Compliment
          </Box>
        </Box>

        <Divider />
        <TextField
          required
          id="username"
          fullWidth
          label="Username"
          variant="outlined"
          sx={{ width: "80%", m: 1 }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Please leave your feedback below</p>
        <TextField
          required
          id="feedback"
          sx={{ width: "80%", m: 1 }}
          fullWidth
          label="Feedback"
          variant="outlined"
          multiline
          rows={4}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Box>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ m: 1 }}
            onClick={sendRequest}
          >
            Send
          </Button>
        </Box>
      </Box>
      <Button onClick={allFeedback}>All Feedbacks!</Button>

      {table.show && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: "2",
            p: "2",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Feedback Category</th>
              </tr>
            </thead>
            <tbody>
              {table.data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.username}</td>
                    <td>{val.rating}</td>
                    <td>{val.feedback}</td>
                    <td>{val.feedbackCategory}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
    </>
  );
}

export default FeedbackForm;
