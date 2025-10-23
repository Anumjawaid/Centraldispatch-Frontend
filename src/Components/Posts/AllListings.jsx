import React from "react";
import { Box, Typography } from "@mui/material";
import UserHeader from "../Dashboard/userHeader";
import QuoteListRow from "./ListRow";

export default function AllListings() {
  const handleEdit = (item) => console.log("Edit:", item);
  const handleDelete = (item) => console.log("Delete:", item);
  const handleView = (item) => console.log("View:", item);

  return (
    <React.Fragment>
      <UserHeader />

      {/* ✅ Center container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // vertical center
          alignItems: "center", // horizontal center
          backgroundColor: "#f9fafc",
          
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          All Listings
        </Typography>

        {/* ✅ Map through multiple rows */}
        <Box sx={{ width: "80%", maxWidth: "1000px" }}>
          {sampleData.map((item, index) => (
            <QuoteListRow
              key={index}
              data={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
}


let sampleData=[
  {
    "id": "Q-001",
    "trailerType": "OPEN",
    "availableDate": "2025-10-10",
    "pickupLocation": {
      "city": "Dallas",
      "stateOrProvince": "TX",
      "country": "US",
      "name": "AutoHub Dallas (Dock 3)"
    },
    "deliveryLocation": {
      "city": "Miami",
      "stateOrProvince": "FL",
      "country": "US",
      "name": "Port of Miami - Gate B"
    }
  },
  {
    "id": "Q-002",
    "trailerType": "ENCLOSED",
    "availableDate": "2025-10-12",
    "pickupLocation": {
      "city": "Atlanta",
      "stateOrProvince": "GA",
      "country": "US",
      "name": "Peach Logistics Hub"
    },
    "deliveryLocation": {
      "city": "New York",
      "stateOrProvince": "NY",
      "country": "US",
      "name": "Harbor Freight Terminal"
    }
  },
  {
    "id": "Q-003",
    "trailerType": "FLATBED",
    "availableDate": "2025-10-15",
    "pickupLocation": {
      "city": "Houston",
      "stateOrProvince": "TX",
      "country": "US",
      "name": "Bay Area Freight Yard"
    },
    "deliveryLocation": {
      "city": "Chicago",
      "stateOrProvince": "IL",
      "country": "US",
      "name": "Midwest Distribution Center"
    }
  }
]
