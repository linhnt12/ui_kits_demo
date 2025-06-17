"use client";

import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Textarea,
  Text,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useThemeColors } from "../../constants/theme";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
};

const mockProfileData: ProfileFormData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  address: "123 Main St, City, Country",
  bio: "Software developer with 5 years of experience in web development.",
};

export default function Profile() {
  const {
    textColor,
    inputBorderColor,
    inputFocusBorderColor,
  } = useThemeColors();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setFormData(mockProfileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setAlertStatus("error");
        setAlertMessage("Failed to load profile data");
        setShowAlert(true);
      }
    };

    fetchProfileData();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<ProfileFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ProfileFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log(formData);
      setAlertStatus("success");
      setAlertMessage("Profile updated successfully!");
      setShowAlert(true);
    } catch {
      setAlertStatus("error");
      setAlertMessage("Something went wrong. Please try again.");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="container.md" mx="auto" py={8} px={4}>
      <Heading mb={8} color={textColor}>Profile Settings</Heading>

      {showAlert && (
        <Alert.Root status={alertStatus} mb={4} alignItems="center" py={1}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{alertMessage}</Alert.Title>
          </Alert.Content>
          <CloseButton 
            pos="relative" 
            onClick={() => setShowAlert(false)} 
            size="sm" 
          />
        </Alert.Root>
      )}

      <form onSubmit={handleSubmit}>
        <Stack gap={6}>
          <Box>
            <Text mb={2} color={textColor}>First Name</Text>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
              _invalid={{ borderColor: "red.500" }}
            />
            {errors.firstName && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.firstName}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2} color={textColor}>Last Name</Text>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
              _invalid={{ borderColor: "red.500" }}
            />
            {errors.lastName && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.lastName}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2} color={textColor}>Email</Text>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
              _invalid={{ borderColor: "red.500" }}
            />
            {errors.email && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.email}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2} color={textColor}>Phone Number</Text>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
              _invalid={{ borderColor: "red.500" }}
            />
            {errors.phone && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.phone}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2} color={textColor}>Address</Text>
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
            />
          </Box>

          <Box>
            <Text mb={2} color={textColor}>Bio</Text>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
            />
          </Box>

          <Button
            type="submit"
            size="md"
            loading={isLoading}
          >
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
