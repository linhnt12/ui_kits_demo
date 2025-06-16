"use client";

import { Button, Box, Center, HStack, Circle, Float } from "@chakra-ui/react";
import { LuArrowRight, LuPhone, LuPhoneForwarded } from "react-icons/lu";

export default function Home() {
  return (
    <>
      <Center gap="4">
        <Box p={8} borderWidth="1px" position="relative">
          <Float placement="bottom-end">
            <Circle size="5" bg="blue.700" color="white">
              3
            </Circle>
          </Float>
          <HStack>
            <Center w="40px" h="40px" bg="tomato" color="white">
              <LuPhone />
            </Center>
            <Button colorScheme="teal" size="lg">
              Button
            </Button>
          </HStack>
        </Box>

        <Circle size="10" bg="blue.700" color="white">
          <LuPhoneForwarded />
        </Circle>
      </Center>

      <Center inline gap="4">
        <Box>ABC</Box>
        <LuArrowRight />
      </Center>
    </>
  );
}
