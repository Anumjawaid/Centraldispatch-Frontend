import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';



export default function ChatScreen({
  open,
  onClose,
  driver,
  shipment,
}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'driver',
      text: 'Hello! I saw your listing and I am interested in transporting your vehicle. I have 10 years of experience in auto transport.',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi! Thank you for reaching out. Can you share your insurance information and DOT number?',
      timestamp: '10:35 AM',
    },
    {
      id: 3,
      sender: 'driver',
      text: 'Of course! My DOT number is 12345678. I will send you a copy of my insurance certificate.',
      timestamp: '10:37 AM',
    },
  ]);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const driverName = driver?.name || 'Driver';
  const driverCompany = driver?.company;
  const shipmentTitle = shipment?.title;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate driver response after 2 seconds
    setTimeout(() => {
      const driverResponse = {
        id: messages.length + 2,
        sender: 'driver',
        text: 'Thank you for the message. I will get back to you shortly.',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, driverResponse]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock file upload
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: `Sent a file: ${file.name}`,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        attachment: {
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: URL.createObjectURL(file),
          name: file.name,
        },
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: '800px',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">{driverName}</Typography>
            {driverCompany && (
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {driverCompany}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Shipment Info */}
      {shipmentTitle && (
        <Box sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">
            Discussing: <strong>{shipmentTitle}</strong>
          </Typography>
        </Box>
      )}

      <Divider />

      {/* Messages Area */}
      <DialogContent
        sx={{
          flex: 1,
          overflow: 'auto',
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
              }}
            >
              {msg.sender === 'driver' && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {driverName}
                </Typography>
              )}
              <Paper
                sx={{
                  p: 2,
                  bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                  color: msg.sender === 'user' ? 'white' : 'text.primary',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
                {msg.attachment && (
                  <Box sx={{ mt: 1 }}>
                    {msg.attachment.type === 'image' ? (
                      <img
                        src={msg.attachment.url}
                        alt={msg.attachment.name}
                        style={{
                          maxWidth: '100%',
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    ) : (
                      <Chip
                        icon={<AttachFileIcon />}
                        label={msg.attachment.name}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                )}
              </Paper>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  mt: 0.5,
                  mx: 1,
                }}
              >
                {msg.timestamp}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </DialogContent>

      <Divider />

      {/* Input Area */}
      <Box sx={{ p: 2, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Button
            size="small"
            startIcon={<ImageIcon />}
            onClick={handleAttachFile}
          >
            Image
          </Button>
          <Button
            size="small"
            startIcon={<AttachFileIcon />}
            onClick={handleAttachFile}
          >
            File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={message.trim() === ''}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { bgcolor: 'grey.300' },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Press Enter to send, Shift+Enter for new line
        </Typography>
      </Box>
    </Dialog>
  );
}