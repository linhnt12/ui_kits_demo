"use client";

import {
  Box,
  Flex,
  IconButton,
  Text,
  Button,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { FiHome, FiSettings, FiMenu, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useThemeColors } from "../constants/theme";

const menuItems = [
  { icon: FiHome, label: "Dashboard", href: "/dashboard" },
  { icon: FiSettings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, onToggle } = useDisclosure({ defaultOpen: true });

  const { bgColor, headerBg, textColor, hoverBg, sidebarBg } = useThemeColors();

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      {/* Header */}
      <Box
        as="header"
        position="fixed"
        w="100%"
        h="16"
        bg={headerBg}
        borderBottom="1px"
        borderColor="gray.700"
        zIndex="sticky"
      >
        <Flex h="16" alignItems="center" px="4" justifyContent="space-between">
          <Flex alignItems="center" gap={2}>
            <IconButton
              aria-label="Toggle sidebar"
              variant="ghost"
              onClick={onToggle}
              color="white"
              _hover={{ bg: hoverBg }}
            >
              <FiMenu />
            </IconButton>
            <Text fontSize="xl" fontWeight="bold" color="white">
              Dashboard
            </Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Link href="/dashboard/profile">
              <Button variant="ghost" color="white" _hover={{ bg: hoverBg }}>
                <Avatar.Root size="xs">
                  <Avatar.Fallback name="John Doe" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
                <Text ml={1}>Profile</Text>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" color="white" _hover={{ bg: hoverBg }}>
                <FiLogOut />
                <Text>Logout</Text>
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>

      {/* Sidebar */}
      <Box
        as="nav"
        position="fixed"
        left="0"
        top="16"
        h="calc(100vh - 4rem)"
        bg={sidebarBg}
        color="white"
        w={open ? "48" : "16"}
        transition="width 0.2s"
        zIndex="sticky"
      >
        <Flex direction="column" h="full">
          <Flex direction="column" gap={4} p={2} alignItems="center">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  as="a"
                  variant="ghost"
                  justifyContent="flex-start"
                  color="white"
                  _hover={{ bg: hoverBg }}
                  w={open ? "40" : "14"}
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
