import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import UserHeader from "../Dashboard/userHeader";
import QuoteListRow from "./ListRow";
import { HeaderBackground, primaryColor } from "../../Constants/Colors";
import { sendMessage, startChat } from "../../utils/socketClient";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setActiveConversation,
  setChatLoader,
  setConversationMessages,
  setListingsPaneOpen,
} from "../../Store/chatReducer";
import { fetchConversationMessages } from "../../utils/httpClient";
export default function AllListings() {
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.chat || {});
  const {conversations, activeConversationId, chatLoader,isListingsPaneOpen} = useSelector((state) => state.chat || {});
  const authState = useSelector((state) => state.authentication || {});
  const [activeListing, setActiveListing] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);

  const handleEdit = (item) => console.log("Edit:", item);
  const handleDelete = (item) => console.log("Delete:", item);
  const handleView = (item) => console.log("View:", item);
  const ME = JSON.parse(localStorage.getItem("user") || "null")?.id;
  
  const handleChat = async (item) => {
    startChat(item.createdBy || "");
    setActiveListing(item);
    setToUserId(item.createdBy || "");


    dispatch(setListingsPaneOpen(true));

    // setIsChatOpen(true);
   
    dispatch(setChatLoader(true));  
  };


  const handleCloseChat = () => {
    dispatch(setListingsPaneOpen(false));
    // setIsChatOpen(false);
    setDraftMessage("");
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!draftMessage.trim() || !activeListing) return;

    const conversationId = activeConversationId;
    const newMessage = {
      id: `${conversationId}-${Date.now()}`,
      sender: ME,
      text: draftMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    dispatch(
      addMessage({
        conversationId,
        message: newMessage,
        isActive: true,
      })
    );
    setDraftMessage("");
    console.log("Sending message to user:", toUserId);
    sendMessage(null, newMessage.text, activeListing.id,conversationId);

  };

  const currentMessages = useMemo(() => {
    if (!activeListing) return [];
    const conversationId = activeListing.id;
    return chatState.conversations?.[conversationId]?.messages || [];
  }, [activeListing, chatState.conversations]);

  useEffect(() => {
  console.log("Conversations updated:", conversations);
  }, [conversations]);
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header isAuthenticated={true} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fafc",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          All Listings
        </Typography>

        <Box sx={{ width: "80%", maxWidth: "1000px" }}>
          {sampleData.map((item, index) => (
            <QuoteListRow
              key={index}
              data={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onChat={handleChat}
            />
          ))}
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={isListingsPaneOpen}
        onClose={handleCloseChat}
        PaperProps={{
          sx: { width: { xs: 320, sm: 380 }, p: 0, display: "flex", flexDirection: "column" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #e5e7eb",
            background: "#f8fafc",
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: `${HeaderBackground}dd` }}>
              {activeListing?.pickupLocation?.city?.charAt(0)}
              {activeListing?.deliveryLocation?.city?.charAt(0)}
            </Avatar>
            <Box>
              <Typography fontWeight={800} color="#0f172a">
                {activeListing
                  ? `${activeListing.pickupLocation?.city} -> ${activeListing.deliveryLocation?.city}`
                  : "Chat"}
              </Typography>
              <Typography variant="body2" color="#6b7280">
                {activeListing?.id || "Select a listing to chat"}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={handleCloseChat}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            flex: 1,
            overflowY: "auto",
            background: "linear-gradient(135deg, #fdfcfb 0%, #f5f7fb 100%)",
          }}
        >
          {chatState.chatLoader && (
            <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, py: 3 }}>
              <CircularProgress size={28} />
            </Stack>
          )}

          {!chatState.chatLoader && conversations && Object.keys(conversations).length === 0 && (
            <Box
              sx={{
                border: "1px dashed #e5e7eb",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                background: "#fff",
              }}
            >
              <Typography color="#1f2937" fontWeight={700}>
                Start a 1:1 chat
              </Typography>
              <Typography variant="body2" color="#6b7280">
                Messages for this listing will appear here.
              </Typography>
            </Box>
          )}

          {conversations[activeConversationId]?.messages?.map((message,index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent={message.sender === ME ? "flex-end" : "flex-start"}
            >
              <Box
                sx={{
                  maxWidth: "78%",
                  backgroundColor: message.sender === ME ? HeaderBackground : "#f3f4f6",
                  color: message.sender === ME ? "#fff" : "#111827",
                  px: 1.75,
                  py: 1.25,
                  borderRadius: 2,
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.12)",
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: message.sender === "me" ? "#e5e7eb" : "#6b7280",
                    display: "block",
                    textAlign: "right",
                    mt: 0.5,
                  }}
                >
                  {message.time}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>

        <Divider />

        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            background: "#fff",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <TextField
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            placeholder="Type a message..."
            size="small"
            fullWidth
          />
          <IconButton
            type="submit"
            disabled={!draftMessage.trim() || !activeListing}
            sx={{
              backgroundColor: HeaderBackground,
              color: "#fff",
              "&:hover": { backgroundColor: primaryColor },
              "&.Mui-disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af" },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

const sampleData = [
  {
    "id": "6900f9a1bc440a0ffd502e7b",
    "trailerType": "OPEN",
    "pickupLocation": {
      "_id": "6900f9a0bc440a0ffd502e75",
      "type": "RESIDENCE",
      "name": null,
      "addressLine": null,
      "city": "Dallas",
      "stateOrProvince": "TX",
      "postalCode": "75201",
      "country": "USA",
      "contactName": null,
      "contactEmail": null,
      "contactPhone": null,
      "contactCell": null,
      "buyerReferenceNumber": null,
      "twicRequired": false,
      "createdAt": "2025-10-28T17:13:04.638Z",
      "updatedAt": "2025-10-28T17:13:04.638Z",
      "__v": 0
    },
    "deliveryLocation": {
      "_id": "6900f9a0bc440a0ffd502e77",
      "type": "RESIDENCE",
      "name": null,
      "addressLine": null,
      "city": "Miami",
      "stateOrProvince": "FL",
      "postalCode": "33101",
      "country": "USA",
      "contactName": null,
      "contactEmail": null,
      "contactPhone": null,
      "contactCell": null,
      "buyerReferenceNumber": null,
      "twicRequired": false,
      "createdAt": "2025-10-28T17:13:04.876Z",
      "updatedAt": "2025-10-28T17:13:04.876Z",
      "__v": 0
    },
    "quotedPriceUsd": 1300,
    "agreedToTerms": true,
    "status": "Not Signed",
    "createdBy": "6900f8f1bc440a0ffd502e6c",
    "updatedBy": null,
    "carrier": "6900f5dff7c93350d6b86d77",
    "removeCarrierBy": null,
    "assignedCarrierBy": "6900f8f1bc440a0ffd502e6c",
    "vehicles": [
      {
        "_id": "6900f9a1bc440a0ffd502e79",
        "vinAvailable": true,
        "vin": "1HGCM82633A004352",
        "type": "CAR",
        "year": 2020,
        "make": "Toyota",
        "model": "Camry",
        "color": "Blue",
        "lotNumber": "A123",
        "licensePlate": "TX1234",
        "licenseStateOrProvince": "TX",
        "notes": "No visible damage",
        "inoperable": false,
        "oversized": false,
        "availableDate": "2025-10-29T00:00:00.000Z",
        "desiredDeliveryDate": "2025-11-02T00:00:00.000Z",
        "expirationDate": "2025-11-10T00:00:00.000Z",
        "createdAt": "2025-10-28T17:13:05.117Z",
        "updatedAt": "2025-10-28T17:13:05.117Z",
        "__v": 0
      }]
  },
  {
    id: "Q-001",
    trailerType: "OPEN",
    availableDate: "2025-10-10",
    pickupLocation: {
      city: "Dallas",
      stateOrProvince: "TX",
      country: "US",
      name: "AutoHub Dallas (Dock 3)",
    },
    deliveryLocation: {
      city: "Miami",
      stateOrProvince: "FL",
      country: "US",
      name: "Port of Miami - Gate B",
    },
  },
  {
    id: "Q-002",
    trailerType: "ENCLOSED",
    availableDate: "2025-10-12",
    pickupLocation: {
      city: "Atlanta",
      stateOrProvince: "GA",
      country: "US",
      name: "Peach Logistics Hub",
    },
    deliveryLocation: {
      city: "New York",
      stateOrProvince: "NY",
      country: "US",
      name: "Harbor Freight Terminal",
    },
  },
  {
    id: "Q-003",
    trailerType: "FLATBED",
    availableDate: "2025-10-15",
    pickupLocation: {
      city: "Houston",
      stateOrProvince: "TX",
      country: "US",
      name: "Bay Area Freight Yard",
    },
    deliveryLocation: {
      city: "Chicago",
      stateOrProvince: "IL",
      country: "US",
      name: "Midwest Distribution Center",
    },
  },
];
