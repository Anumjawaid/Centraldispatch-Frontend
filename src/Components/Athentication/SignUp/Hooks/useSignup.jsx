import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupvalidationMap } from '../validationMap.js'; // Your map of functions
import { register_user } from '../../../../Store/authenticationReducer';

const requiredFields = [
    'name',
    'email',
    'confirmEmail',
    'password',
    'businessType',
    'companyLegalName',
    'companyAddress',
    'city',
    'state',
    'zipCode',
    'country',
    'operationHoursStart',
    'operationHoursEnd',
    'businessPhone',
];


export const useSignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        confirmEmail: "",
        password: "",
        businessType: "Shipper",
        companyLegalName: "",
        country: "",
        state: "",
        city: "",
        companyAddress: "",
        zipCode: "",
        operationHoursStart: "",
        operationHoursEnd: "",
        businessPhone: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [status, setStatus] = useState({ success: '', error: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 1. Update Data
        setFormData(prev => ({ ...prev, [name]: value }));

        // 2. Run Validation Logic
        if (signupvalidationMap[name]) {
            const { isValid, errorMessage } = signupvalidationMap[name](value, formData); // Pass formData for confirmEmail logic
            console.log(`Validating ${name}:`, value, "Error:", errorMessage);
            setFormErrors(prev => ({
                ...prev,
                [name]: errorMessage // If null/empty, error is cleared
            }));
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("In hadnle submit")
        e.preventDefault();

        const validationErrors = {};

        requiredFields.forEach((name) => {
            const { isValid, errorMessage } = signupvalidationMap[name](
                formData[name],
                formData
            );

            if (!isValid) {
                validationErrors[name] = errorMessage;
            }
        });

        if (
            formData.operationHoursStart &&
            formData.operationHoursEnd &&
            formData.operationHoursEnd <= formData.operationHoursStart
        ) {
            validationErrors.operationHoursEnd = 'Closing time must be after opening time';
        }

        if (Object.keys(validationErrors).length) {
            setFormErrors(prev => ({
                ...prev,
                ...validationErrors,
                success: '',
                error: '',
            }));
            return;
        }
        
        // Show disclaimer modal after validation passes
        setShowDisclaimer(true);
    };

    const handleDisclaimerAgree = async () => {
        setShowDisclaimer(false);
        setIsLoading(true);

        try {
            const result = await dispatch(register_user(formData)).unwrap();
            console.log("Registration result:", result);
            const message = result?.message || 'Registration successful';
            const isError = result?.status === 'error' || result?.error;

            setStatus(prev => ({
                ...prev,
                success: isError ? '' : message,
                error: isError ? message : '',
            }));
            setIsLoading(false);

            // Redirect to login after successful registration
            if (!isError) {
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (submitError) {
            console.log("Registration error:", submitError);
            setStatus(prev => ({
                ...prev,
                success: '',
                error: submitError?.message || 'Unable to register at this time.',
            }));
            setIsLoading(false);
        }
    };

    const handleDisclaimerClose = () => {
        setShowDisclaimer(false);
    };

    return { formData, formErrors, status, handleChange, handleSubmit, isLoading, showDisclaimer, handleDisclaimerAgree, handleDisclaimerClose };
};