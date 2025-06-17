"use client";

import { Button, Box, Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Center gap="4">
        <Box p={8} position="relative">
            <Button colorScheme="teal" size="lg" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
        </Box>
      </Center>
    </>
  );
}
