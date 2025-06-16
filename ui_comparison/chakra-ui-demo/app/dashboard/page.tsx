"use client";

import {
  Box,
  Text,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { tableData } from "./data/tableData";
import { FixedSizeList as List } from "react-window";

export default function Dashboard() {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = tableData[index];
    return (
      <Flex
        style={style}
        borderBottom="1px"
        borderColor="gray.200"
        alignItems="center"
        bg={index % 2 === 0 ? "white" : "gray.50"}
      >
        <Box w="10%" px={4}>
          {index + 1}
        </Box>
        <Box w="20%" px={4}>
          {`${item.firstName} ${item.lastName}`}
        </Box>
        <Box w="10%" px={4}>
          {item.age}
        </Box>
        <Box w="30%" px={4}>
          {item.address}
        </Box>
        <Box w="30%" px={4}>
          <Flex gap={1} flexWrap="wrap">
            {item.tags.map((tag) => (
              <Tag.Root key={tag}>
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </Flex>
        </Box>
      </Flex>
    );
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        User Data Table
      </Text>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        borderColor="gray.200"
        maxH="calc(100vh - 200px)"
        position="relative"
      >
        {/* Header */}
        <Flex
          bg="gray.100"
          fontWeight="bold"
          borderBottom="1px"
          borderColor="gray.200"
          py={3}
          position="sticky"
          top={0}
          zIndex={1}
        >
          <Box w="10%" px={4}>ID</Box>
          <Box w="20%" px={4}>Name</Box>
          <Box w="10%" px={4}>Age</Box>
          <Box w="30%" px={4}>Address</Box>
          <Box w="30%" px={4}>Tags</Box>
        </Flex>

        {/* Virtual List */}
        <Box overflow="auto" maxH="calc(100vh - 250px)">
          <List
            height={window.innerHeight - 250}
            itemCount={tableData.length}
            itemSize={50}
            width="100%"
            overscanCount={5}
          >
            {Row}
          </List>
        </Box>
      </Box>
    </Box>
  );
}