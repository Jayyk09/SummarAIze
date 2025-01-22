import React, { useState, KeyboardEvent } from "react";
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

interface Message {
  text: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Stores chat messages
  const [input, setInput] = useState<string>(""); // Stores the current input text

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, { text: input }]);
      setInput("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '500px', // Fixed width
        height: '600px', // Fixed height
        mx: 'auto', // Center horizontally
        my: 4, // Vertical margin
        p: 3, // Internal padding
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Push content apart
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Chat Box
      </Typography>

      <List
        sx={{
          flex: 1, // Takes up available vertical space
          overflowY: 'auto',
          mb: 2,
          maxHeight: '450px', // Scrollable list area
        }}
      >
        {messages.map((message, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText primary={message.text} />
          </ListItem>
        ))}
      </List>

      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          fullWidth
          variant="outlined"
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          sx={{
            flexGrow: 1,
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{
            ml: 1,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
          aria-label="send message"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBox;