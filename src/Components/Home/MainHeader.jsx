import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import shipper from '../Assets/shipper.png'
import {PRIMARY,BACKGROUND,SECONDARY} from "../../Constants/Colors" 

export const MainHeader = () => {
    return (
        <>
            <Box
                sx={{
                    background:` linear-gradient(135deg, ${BACKGROUND} 50%, ${SECONDARY} 100%)`,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        {/* Left Content Box */}
                        <Box sx={{ flex: 1, color: SECONDARY }}>
                            <Typography variant="h3" fontWeight={700} mb={2} fontSize={"25px"}>
                                Connecting Shippers, Carriers & Transporters
                            </Typography>
                             <Typography variant="h2" fontWeight={700} mb={2} fontSize={"40px"}>
                                Welcome to Our Platform
                            </Typography>
                            <Typography variant="body1" mb={3} fontSize={"22px"}>
                                We connect shippers, carriers, and transporters in one easy place.
                                Find trusted drivers, check their ratings, and book directly — all in a few clicks.
                            </Typography>
                            <Box sx={{backgroundColor:PRIMARY,borderRadius:"10px",padding:"5px"}}>
                                <Typography variant="body1" mb={3}>
                               We are only a platform. We are not responsible for any disputes, damages, or payments between users.
                            </Typography>
                            </Box>
                        </Box>

                        {/* Right Image Box */}
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                component="img"
                                src={shipper}
                                alt="Hero"
                                sx={{
                                    width: "100%",
                                    borderRadius: 2,
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}