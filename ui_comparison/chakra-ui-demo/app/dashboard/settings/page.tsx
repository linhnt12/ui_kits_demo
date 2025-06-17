"use client";

import {
  Box,
  Heading,
  Stack,
  Alert,
  CloseButton,
  Flex,
  Text,
  Switch,
  Icon,
  ColorPicker,
  HStack,
  Portal,
  parseColor,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { useThemeColors } from "../../constants/theme";
import { useState } from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function Settings() {
  const [showAlert, setShowAlert] = useState(false);
  const [primaryColor] = useState("#eb5e41");
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    textColor,
    inputBorderColor,
    inputFocusBorderColor,
  } = useThemeColors();

  const handleThemeToggle = () => {
    toggleColorMode();
    setShowAlert(true);
  };

  return (
    <Box maxW="container.md" mx="auto" py={8} px={4}>
      <Heading mb={8} color={textColor}>
        Theme Settings
      </Heading>

      {showAlert && (
        <Alert.Root status="success" mb={4} alignItems="center" py={1}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Theme settings updated!</Alert.Title>
          </Alert.Content>
          <CloseButton
            pos="relative"
            onClick={() => setShowAlert(false)}
            size="sm"
          />
        </Alert.Root>
      )}

      <Stack gap={6}>
        <Flex justify="space-between" align="center">
          <Text color={textColor} mb={2}>Mode</Text>
          <Switch.Root checked={colorMode === 'dark'} onCheckedChange={handleThemeToggle} size="lg">
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
              <Switch.Indicator
                fallback={<Icon as={FaMoon} color="gray.400" />}
              >
                <Icon as={FaSun} color="yellow.400" />
              </Switch.Indicator>
            </Switch.Control>
            <Switch.Label>
              {colorMode === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Switch.Label>
          </Switch.Root>
        </Flex>

        <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
          <ColorPicker.HiddenInput />
          <ColorPicker.Label color={textColor}>Color</ColorPicker.Label>
          <ColorPicker.Control>
            <ColorPicker.Input
              borderColor={inputBorderColor}
              _focus={{ borderColor: inputFocusBorderColor }}
            />
            <ColorPicker.Trigger />
          </ColorPicker.Control>
          <Portal>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <ColorPicker.Area />
                <HStack>
                  <ColorPicker.EyeDropper size="xs" variant="outline" />
                  <ColorPicker.Sliders />
                </HStack>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </ColorPicker.Root>

        <Box>
          <Text mb={2} color={textColor}>
            Preview
          </Text>
          <Flex gap={4} wrap="wrap">
            <Box
              bg={primaryColor}
              color="white"
              p={4}
              borderRadius="md"
              minW="200px"
            >
              Primary Color
            </Box>
            <Box
              bg={`${primaryColor}20`}
              color={primaryColor}
              p={4}
              borderRadius="md"
              minW="200px"
            >
              Light Variant
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}
