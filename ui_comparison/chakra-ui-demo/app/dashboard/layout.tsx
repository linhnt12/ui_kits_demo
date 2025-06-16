"use client";

import {
  Box,
  Flex,
  IconButton,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiSettings, FiUsers, FiMenu } from "react-icons/fi";
import Link from "next/link";

const menuItems = [
  { icon: FiHome, label: "Dashboard", href: "/dashboard" },
  { icon: FiUsers, label: "Users", href: "/dashboard/users" },
  { icon: FiSettings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, onToggle } = useDisclosure({ defaultOpen: true });

  return (
    <Box minH="100vh">
      {/* Header */}
      <Box
        as="header"
        position="fixed"
        w="100%"
        h="16"
        bg="black"
        borderBottom="1px"
        borderColor="gray.200"
        zIndex="sticky"
      >
        <Flex h="16" alignItems="center" px="4">
          <IconButton
            aria-label="Toggle sidebar"
            variant="ghost"
            mr="4"
            onClick={onToggle}
            color="white"
          >
            <FiMenu />
          </IconButton>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Dashboard
          </Text>
        </Flex>
      </Box>

      {/* Sidebar */}
      <Box
        as="nav"
        position="fixed"
        left="0"
        top="16"
        h="calc(100vh - 4rem)"
        bg="black"
        color="white"
        w={open ? "48" : "16"}
        transition="width 0.2s"
        zIndex="sticky"
      >
        <Flex direction="column" h="full">
          <Flex direction="column" gap={4} p={2} alignItems="flex-start">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  as="a"
                  variant="ghost"
                  justifyContent="flex-start"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                >
                  <Flex align="center" gap={2}>
                    <item.icon />
                    {open && <Text>{item.label}</Text>}
                  </Flex>
                </Button>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box pt="16" pl={open ? "48" : "16"} transition="padding-left 0.2s">
        <Box p="4">{children}</Box>
      </Box>
    </Box>
  );
}
