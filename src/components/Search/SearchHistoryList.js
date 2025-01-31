import React from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
} from "@chakra-ui/react";

const SearchHistoryList = ({ history, avatar }) => {
  return (
    <Box
      borderRadius="12px"
      p={6}
      boxShadow="lg"
      width="100%"
      overflowX="auto"
    >
      <Table variant="simple" colorScheme="whiteAlpha" size="lg" fontWeight="bold">
        <Thead>
          <Tr>
            <Th color="white" fontSize="md">
              User
            </Th>
            <Th color="white" fontSize="md">
              Neighborhood
            </Th>
            <Th color="white" fontSize="md">
              Activity
            </Th>
            <Th color="white" fontSize="md">
              Date
            </Th>
            <Th color="white" fontSize="md">
              Time
            </Th>
            <Th color="white" fontSize="md">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.map((item, index) => {
            const timestamp = item.timestamp.seconds * 1000;
            const date = new Date(timestamp);
            const formattedDate = date.toISOString().split("T")[0];
            const formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            return (
              <Tr key={index} bg="white.300" _hover={{ bg: "linear-gradient(135deg, #5D1BF4, #A95AFF)" }}>
                <Td>
                  <Avatar
                    size="sm"
                    src={avatar}
                    name="User Avatar"
                    bg="gray.200"
                  />
                </Td>
                <Td color="gray.300" fontSize="md">
                  {item.neighborhood}
                </Td>
                <Td color="gray.300" fontSize="md">
                  {item.activity}
                </Td>
                <Td color="gray.300" fontSize="md">
                  {formattedDate}
                </Td>
                <Td color="gray.300" fontSize="md">
                  {formattedTime}
                </Td>
                <Td>
                  <Button size="sm" colorScheme="blue">
                    Details
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchHistoryList;
