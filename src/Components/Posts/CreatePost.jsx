import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    FormControlLabel,
    Divider,
    Stepper,
    Alert,
    Step,
    StepLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from "react-redux";
import { add_post } from "../../Store/postReducer";


export default function CreatePost({ currentUser }) {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.authentication);
    console.log(token, "token in Cradte Form");
    const [submitting, setSubmitting] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const [apiError, setApiError] = useState("");
    const redirectTimeoutRef = useRef(null);

    const [formData, setFormData] = useState({
        // General Info
        trailerType: 'ENCLOSED',
        quotedPriceUsd: '',
        agreedToTerms: false,

        // Pickup Location
        pickupLocation: {
            type: 'residential',
            name: '',
            addressLine: '',
            city: '',
            stateOrProvince: '',
            postalCode: '',
            country: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            contactCell: '',
            buyerReferenceNumber: '',
            twicRequired: false,
        },

        // Delivery Location
        deliveryLocation: {
            type: 'residential',
            name: '',
            addressLine: '',
            city: '',
            stateOrProvince: '',
            postalCode: '',
            country: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            contactCell: '',
            buyerReferenceNumber: '',
            twicRequired: false,
        },

        // Vehicle Information
        vehicles: {
            vinAvailable: 'yes',
            vin: '',
            type: '',
            year: '',
            make: '',
            model: '',
            color: '',
            lotNumber: '',
            licensePlate: '',
            licenseStateOrProvince: '',
            notes: '',
            inoperable: false,
            oversized: false,
            availableDate: '',
            desiredDeliveryDate: '',
            expirationDate: '',
        },
    });

    const steps = ['General Info', 'Pickup Location', 'Delivery Location', 'Vehicle Details', 'Review'];

    const handleChange = (e, section, field, index) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        console.log(e.target.value,"value in here")
        console.log(e.target.name,"name in here")
        let targetSection, targetField;
        if (section && field) {
            targetSection = section;
            targetField = field;
        } else {
            const name = e.target.name;
            if (name.startsWith("pickup")) {
                targetSection = "pickupLocation";
                targetField = name.replace("pickup", "").charAt(0).toLowerCase() + name.replace("pickup", "").slice(1);
            } else if (name.startsWith("delivery")) {
                targetSection = "deliveryLocation";
                targetField = name.replace("delivery", "").charAt(0).toLowerCase() + name.replace("delivery", "").slice(1);
            } else if (name.startsWith("vehicles")) {
                targetSection = "vehicles";
                targetField = name.replace("vehicle", "").charAt(0).toLowerCase() + name.replace("vehicle", "").slice(1);
            } else {
                targetSection = null;
                targetField = name;
            }
        }
        if (targetSection) {
            if (targetSection === "vehicles") {
                setFormData({
                    ...formData,
                    vehicles: { ...formData.vehicles, [targetField]: value },
                });
            } else {
                setFormData({
                    ...formData,
                    [targetSection]: { ...formData[targetSection], [targetField]: value },
                });
            }
        } else {
            setFormData({ ...formData, [targetField]: value });
        }
    };

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        window.scrollTo(0, 0);
    };

    // Transform form data to API format
    const transformFormData = (data) => {
        const typeMapping = {
            residential: 'RESIDENCE',
            business: 'BUSINESS',
            dealership: 'DEALERSHIP',
            auction: 'AUCTION',
            port: 'PORT'
        };

        const vehicleTypeMapping = {
            sedan: 'CAR',
            suv: 'SUV',
            truck: 'TRUCK',
            van: 'VAN',
            motorcycle: 'MOTORCYCLE',
            boat: 'BOAT',
            rv: 'RV',
            other: 'OTHER'
        };

        const formatDateToISO = (dateString) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            return date.toISOString();
        };

        return {
            trailerType: data.trailerType,
            quotedPriceUsd: parseFloat(data.quotedPriceUsd),
            agreedToTerms: data.agreedToTerms,
            pickupLocation: {
                type: typeMapping[data.pickupLocation.type] || data.pickupLocation.type.toUpperCase(),
                name: data.pickupLocation.name,
                addressLine: data.pickupLocation.addressLine,
                city: data.pickupLocation.city,
                stateOrProvince: data.pickupLocation.stateOrProvince,
                postalCode: data.pickupLocation.postalCode,
                country: data.pickupLocation.country,
                contactName: data.pickupLocation.contactName,
                contactEmail: data.pickupLocation.contactEmail,
                contactPhone: data.pickupLocation.contactPhone,
                contactCell: data.pickupLocation.contactCell,
                buyerReferenceNumber: data.pickupLocation.buyerReferenceNumber,
                twicRequired: data.pickupLocation.twicRequired
            },
            deliveryLocation: {
                type: typeMapping[data.deliveryLocation.type] || data.deliveryLocation.type.toUpperCase(),
                name: data.deliveryLocation.name,
                addressLine: data.deliveryLocation.addressLine,
                city: data.deliveryLocation.city,
                stateOrProvince: data.deliveryLocation.stateOrProvince,
                postalCode: data.deliveryLocation.postalCode,
                country: data.deliveryLocation.country,
                contactName: data.deliveryLocation.contactName,
                contactEmail: data.deliveryLocation.contactEmail,
                contactPhone: data.deliveryLocation.contactPhone,
                contactCell: data.deliveryLocation.contactCell,
                buyerReferenceNumber: data.deliveryLocation.buyerReferenceNumber,
                twicRequired: data.deliveryLocation.twicRequired
            },
            vehicles: [
                {
                    vinAvailable: data.vehicles.vinAvailable === 'yes',
                    vin: data.vehicles.vin || null,
                    type: vehicleTypeMapping[data.vehicles.type] || data.vehicles.type.toUpperCase(),
                    year: parseInt(data.vehicles.year),
                    make: data.vehicles.make,
                    model: data.vehicles.model,
                    color: data.vehicles.color,
                    lotNumber: data.vehicles.lotNumber,
                    licensePlate: data.vehicles.licensePlate,
                    licenseStateOrProvince: data.vehicles.licenseStateOrProvince,
                    notes: data.vehicles.notes,
                    inoperable: data.vehicles.inoperable,
                    oversized: data.vehicles.oversized,
                    availableDate: formatDateToISO(data.vehicles.availableDate),
                    desiredDeliveryDate: formatDateToISO(data.vehicles.desiredDeliveryDate),
                    expirationDate: formatDateToISO(data.vehicles.expirationDate)
                }
            ]
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");
        setApiMessage("");

        // Validate required fields
        if (!formData.agreedToTerms) {
            setApiError("Please agree to the terms and conditions");
            return;
        }

        if (!formData.trailerType || !formData.quotedPriceUsd) {
            setApiError("Please fill in all required fields");
            return;
        }

        // Get token from Redux or localStorage
        const authToken = token || localStorage.getItem("token");

        if (!authToken) {
            setApiError("Authentication token not found. Please login first.");
            return;
        }

        setSubmitting(true);

        try {
            // Transform data to API format
            const transformedData = transformFormData(formData);
            console.log(transformedData, "transformedData");

            const result = await dispatch(add_post(transformedData)).unwrap();
            setApiMessage(result.message || "Shipping quote submitted successfully!");

            // Redirect to dashboard after short delay
            if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
            redirectTimeoutRef.current = setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

            // Reset form
            setFormData({
                trailerType: 'ENCLOSED',
                quotedPriceUsd: '',
                agreedToTerms: false,
                pickupLocation: {
                    type: 'residential',
                    name: '',
                    addressLine: '',
                    city: '',
                    stateOrProvince: '',
                    postalCode: '',
                    country: '',
                    contactName: '',
                    contactEmail: '',
                    contactPhone: '',
                    contactCell: '',
                    buyerReferenceNumber: '',
                    twicRequired: false,
                },
                deliveryLocation: {
                    type: 'residential',
                    name: '',
                    addressLine: '',
                    city: '',
                    stateOrProvince: '',
                    postalCode: '',
                    country: '',
                    contactName: '',
                    contactEmail: '',
                    contactPhone: '',
                    contactCell: '',
                    buyerReferenceNumber: '',
                    twicRequired: false,
                },
                vehicles: {
                    vinAvailable: 'yes',
                    vin: '',
                    type: '',
                    year: '',
                    make: '',
                    model: '',
                    color: '',
                    lotNumber: '',
                    licensePlate: '',
                    licenseStateOrProvince: '',
                    notes: '',
                    inoperable: false,
                    oversized: false,
                    availableDate: '',
                    desiredDeliveryDate: '',
                    expirationDate: '',
                },
            });
            setActiveStep(0);
        } catch (error) {
            // error is the rejection payload from thunk (string or object)
            const errorMsg = typeof error === "string" ? error : error?.message || "Failed to submit quote";
            setApiError(errorMsg);
            console.error("Submission error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (redirectTimeoutRef.current) {
                clearTimeout(redirectTimeoutRef.current);
            }
        };
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Error Alert */}
            {apiError && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError("")}>
                    {apiError}
                </Alert>
            )}

            {/* Success Alert */}
            {apiMessage && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setApiMessage("")}>
                    {apiMessage}
                </Alert>
            )}

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/dashboard')}
                    sx={{ mb: 3 }}
                >
                    Back to Dashboard
                </Button>

                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom color="primary">
                        Create Shipment Listing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Fill out the details below to post your shipment
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form onSubmit={handleSubmit}>
                        {/* Step 0: General Info */}
                        {activeStep === 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                    General Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={6} >
                                        <TextField
                                            select
                                            fullWidth
                                            required
                                            label="Trailer Type"
                                            name="trailerType"
                                            sx={{ width: '100%' }}
                                            value={formData.trailerType}
                                            onChange={(e) => handleChange(e, null, "trailerType")}
                                        >
                                            {["ENCLOSED", "OPEN", "FLATBED"].map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Quoted Price (USD)"
                                            name="quotedPriceUsd"
                                            type="number"
                                            value={formData.quotedPriceUsd}
                                            onChange={(e) => handleChange(e, null, "quotedPriceUsd")}
                                            required
                                            InputProps={{ startAdornment: '$' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="agreedToTerms"
                                                    checked={formData.agreedToTerms}
                                                    onChange={handleChange}
                                                />
                                            }
                                            label="I agree to the terms and conditions. I understand this platform is not responsible for disputes, damages, or payments."
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Step 1: Pickup Location */}
                        {activeStep === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                    Pickup Location Details
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Location Type</InputLabel>
                                            <Select
                                                value={formData.pickupLocation.type}
                                                onChange={(e) => handleChange(e, "pickupLocation", "type")}
                                                label="Location Type"
                                            >
                                                <MenuItem value="residential">Residential</MenuItem>
                                                <MenuItem value="business">Business</MenuItem>
                                                <MenuItem value="dealership">Dealership</MenuItem>
                                                <MenuItem value="auction">Auction</MenuItem>
                                                <MenuItem value="port">Port</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Location Name"
                                            value={formData.pickupLocation.name}
                                            onChange={(e) => handleChange(e, "pickupLocation", "name")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address Line"
                                            value={formData.pickupLocation.addressLine}
                                            onChange={(e) => handleChange(e, "pickupLocation", "addressLine")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={formData.pickupLocation.city}
                                            onChange={(e) => handleChange(e, "pickupLocation", "city")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="State/Province"
                                            name="pickupStateOrProvince"
                                            value={formData.pickupLocation.stateOrProvince}
                                            onChange={(e) => handleChange(e, "pickupLocation", "stateOrProvince")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Postal Code"
                                            name="pickupPostalCode"
                                            value={formData.pickupLocation.postalCode}
                                            onChange={(e) => handleChange(e, "pickupLocation", "postalCode")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            name="pickupCountry"
                                            value={formData.pickupLocation.country}
                                            onChange={(e) => handleChange(e, "pickupLocation", "country")}
                                            required
                                        />
                                    </Grid>
                                    {/* I need a break here so it appears in next line */}
                                    <Grid item xs={12}>
                                        <br /> <br />
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="subtitle1" gutterBottom>
                                            Contact Information
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Name"
                                            name="pickupContactName"
                                            value={formData.pickupLocation.contactName}
                                            onChange={(e) => handleChange(e, "pickupLocation", "contactName")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Email"
                                            name="pickupContactEmail"
                                            type="email"
                                            value={formData.pickupLocation.contactEmail}
                                            onChange={(e) => handleChange(e, "pickupLocation", "contactEmail")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Phone"
                                            name="pickupContactPhone"
                                            value={formData.pickupLocation.contactPhone}
                                            onChange={(e) => handleChange(e, "pickupLocation", "contactPhone")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Cell"
                                            name="pickupContactCell"
                                            value={formData.pickupLocation.contactCell}
                                            onChange={(e) => handleChange(e, "pickupLocation", "contactCell")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Buyer Reference Number"
                                            name="pickupBuyerReferenceNumber"
                                            value={formData.pickupLocation.buyerReferenceNumber}
                                            onChange={(e) => handleChange(e, "pickupLocation", "buyerReferenceNumber")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="pickupTwicRequired"
                                                    checked={formData.pickupLocation.twicRequired}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            pickupLocation: {
                                                                ...formData.pickupLocation,
                                                                twicRequired: e.target.checked,
                                                            },
                                                        })
                                                    }
                                                />
                                            }
                                            label="TWIC (Transportation Worker Identification Credential) Required"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Step 2: Delivery Location */}
                        {activeStep === 2 && (
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                    Delivery Location Details
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Location Type</InputLabel>
                                            <Select
                                                name="deliveryLocationType"
                                                value={formData.deliveryLocation.type}
                                                onChange={(e) => handleChange(e, "deliveryLocation", "type")}
                                                label="Location Type"
                                            >
                                                <MenuItem value="residential">Residential</MenuItem>
                                                <MenuItem value="business">Business</MenuItem>
                                                <MenuItem value="dealership">Dealership</MenuItem>
                                                <MenuItem value="auction">Auction</MenuItem>
                                                <MenuItem value="port">Port</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Location Name"
                                            name="deliveryLocationName"
                                            value={formData.deliveryLocation.name}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "name")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address Line"
                                            name="deliveryAddressLine"
                                            value={formData.deliveryLocation.addressLine}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "addressLine")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            name="deliveryCity"
                                            value={formData.deliveryLocation.city}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "city")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="State/Province"
                                            name="deliveryStateOrProvince"
                                            value={formData.deliveryLocation.stateOrProvince}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "stateOrProvince")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Postal Code"
                                            name="deliveryPostalCode"
                                            value={formData.deliveryLocation.postalCode}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "postalCode")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            name="deliveryCountry"
                                            value={formData.deliveryLocation.country}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "country")}
                                            required
                                        />
                                    </Grid>
                                    {/* I need a break here so it appears in next line */}
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="subtitle1" gutterBottom>
                                            Contact Information
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Name"
                                            name="deliveryContactName"
                                            value={formData.deliveryLocation.contactName}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "contactName")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Email"
                                            name="deliveryContactEmail"
                                            type="email"
                                            value={formData.deliveryLocation.contactEmail}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "contactEmail")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Phone"
                                            name="deliveryContactPhone"
                                            value={formData.deliveryLocation.contactPhone}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "contactPhone")}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Cell"
                                            name="deliveryContactCell"
                                            value={formData.deliveryLocation.contactCell}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "contactCell")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Buyer Reference Number"
                                            name="deliveryBuyerReferenceNumber"
                                            value={formData.deliveryLocation.buyerReferenceNumber}
                                            onChange={(e) => handleChange(e, "deliveryLocation", "buyerReferenceNumber")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="deliveryTwicRequired"
                                                    checked={formData.deliveryLocation.twicRequired}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            deliveryLocation: {
                                                                ...formData.deliveryLocation,
                                                                twicRequired: e.target.checked,
                                                            },
                                                        })
                                                    }
                                                />
                                            }
                                            label="TWIC (Transportation Worker Identification Credential) Required"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Step 3: Vehicle Details */}
                        {activeStep === 3 && (
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                    Vehicle Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>VIN Available?</InputLabel>
                                            <Select
                                                name="vehicleVinAvailable"
                                                value={formData.vehicles.vinAvailable}
                                                onChange={handleChange}
                                                label="VIN Available?"
                                            >
                                                <MenuItem value="yes">Yes</MenuItem>
                                                <MenuItem value="no">No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="VIN (Vehicle Identification Number)"
                                            name="vehicleVin"
                                            value={formData.vehicles.vin}
                                            onChange={(e) => handleChange(e, "vehicles", "vin")}
                                            disabled={formData.vehicles.vinAvailable === 'no'}
                                            required={formData.vehicles.vinAvailable === 'yes'}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Vehicle Type</InputLabel>
                                            <Select
                                                name="vehicleType"
                                                value={formData.vehicles.type}
                                                onChange={(e) => handleChange(e, "vehicles", "type")}
                                                label="Vehicle Type"
                                            >
                                                <MenuItem value="sedan">Sedan</MenuItem>
                                                <MenuItem value="suv">SUV</MenuItem>
                                                <MenuItem value="truck">Truck</MenuItem>
                                                <MenuItem value="van">Van</MenuItem>
                                                <MenuItem value="motorcycle">Motorcycle</MenuItem>
                                                <MenuItem value="boat">Boat</MenuItem>
                                                <MenuItem value="rv">RV</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Year"
                                            name="vehicleYear"
                                            type="number"
                                            value={formData.vehicles.year}
                                            onChange={(e) => handleChange(e, "vehicles", "year")}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Make"
                                            name="vehicleMake"
                                            value={formData.vehicles.make}
                                            onChange={(e) => handleChange(e, "vehicles", "make")}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Model"
                                            name="vehicleModel"
                                            value={formData.vehicles.model}
                                            onChange={(e) => handleChange(e, "vehicles", "model")}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Color"
                                            name="vehicleColor"
                                            value={formData.vehicles.color}
                                            onChange={(e) => handleChange(e, "vehicles", "color")}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Lot Number"
                                            name="vehicleLotNumber"
                                            value={formData.vehicles.lotNumber}
                                            onChange={(e) => handleChange(e, "vehicles", "lotNumber")}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="License Plate"
                                            name="vehicleLicensePlate"
                                            value={formData.vehicles.licensePlate}
                                            onChange={(e) => handleChange(e, "vehicles", "licensePlate")}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="License State/Province"
                                            name="vehicleLicenseStateOrProvince"
                                            value={formData.vehicles.licenseStateOrProvince}
                                            onChange={(e) => handleChange(e, "vehicles", "licenseStateOrProvince")}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Vehicle Notes"
                                            name="vehicleNotes"
                                            multiline
                                            rows={3}
                                            value={formData.vehicles.notes}
                                            onChange={(e) => handleChange(e, "vehicles", "notes")}
                                            placeholder="Any special notes about the vehicle condition, modifications, etc."
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="vehicleInoperable"
                                                    checked={formData.vehicles.inoperable}
                                                    onChange={(e) => handleChange(e, "vehicles", "inoperable")}
                                                />
                                            }
                                            label="Vehicle is inoperable (not running)"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="vehicleOversized"
                                                    checked={formData.vehicles.oversized}
                                                    onChange={(e) => handleChange(e, "vehicles", "oversized")}
                                                />
                                            }
                                            label="Vehicle is oversized"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="subtitle1" gutterBottom>
                                            Dates
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Available Date"
                                            name="vehicleAvailableDate"
                                            type="date"
                                            value={formData.vehicles.availableDate}
                                            onChange={(e) => handleChange(e, "vehicles", "availableDate")}
                                            InputLabelProps={{ shrink: true }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Desired Delivery Date"
                                            name="vehicleDesiredDeliveryDate"
                                            type="date"
                                            value={formData.vehicles.desiredDeliveryDate}
                                            onChange={(e) => handleChange(e, "vehicles", "desiredDeliveryDate")}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Expiration Date"
                                            name="vehicleExpirationDate"
                                            type="date"
                                            value={formData.vehicles.expirationDate}
                                            onChange={(e) => handleChange(e, "vehicles", "expirationDate")}
                                            InputLabelProps={{ shrink: true }}
                                            helperText="Date when this listing expires"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Step 4: Review */}
                        {activeStep === 4 && (
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                    Review Your Listing
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                General Information
                                            </Typography>
                                            <Typography variant="body2">Trailer Type: {formData.trailerType}</Typography>
                                            <Typography variant="body2">Quoted Price: ${formData.quotedPriceUsd}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Pickup Location
                                            </Typography>
                                            <Typography variant="body2">{formData.pickupLocation.name}</Typography>
                                            <Typography variant="body2">{formData.pickupLocation.addressLine}</Typography>
                                            <Typography variant="body2">
                                                {formData.pickupLocation.city}, {formData.pickupLocation.stateOrProvince} {formData.pickupLocation.postalCode}
                                            </Typography>
                                            <Typography variant="body2">Contact: {formData.pickupLocation.contactName}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Delivery Location
                                            </Typography>
                                            <Typography variant="body2">{formData.deliveryLocation.name}</Typography>
                                            <Typography variant="body2">{formData.deliveryLocation.addressLine}</Typography>
                                            <Typography variant="body2">
                                                {formData.deliveryLocation.city}, {formData.deliveryLocation.stateOrProvince} {formData.deliveryLocation.postalCode}
                                            </Typography>
                                            <Typography variant="body2">Contact: {formData.deliveryLocation.contactName}</Typography>
                                        </Paper>
                                    </Grid>
                                    
                                </Grid>
                            </Box>
                        )}

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                    type="button"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                >
                                    Back
                                </Button>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {activeStep < steps.length - 1 ? (
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={handleNext}
                                        color="primary"
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Submit Listing
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
