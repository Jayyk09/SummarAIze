import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]); // Stores chat messages
  const [input, setInput] = useState<string>(""); // Stores the current input text

  const handleSend = (): void => {
    if (input.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, input]);
      setInput("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, mx: "auto", my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Chat Box
      </Typography>

      <List sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
        {messages.map((message, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>

      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          multiline
          maxRows={4}
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{ ml: 1 }}
          aria-label="send message"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBox;
