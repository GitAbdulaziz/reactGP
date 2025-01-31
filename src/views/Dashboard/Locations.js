import React, { useEffect, useState } from "react";
import {
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Grid,
  Box,
  Text,
  Icon,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaThList, FaThLarge } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "components/Card/Card.js";

function Locations() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState(null);
  const [viewMode, setViewMode] = useState("compact");

  const center = useSelector((state) => state.app.center);
  const results = useSelector((state) => state.app.results);
  const selectedNeighborhood = useSelector((state) => state.app.selectedNeighborhood);

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    onOpen();
  };

  useEffect(() => {
    if (window.google && center) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 12,
      });

      new window.google.maps.Circle({
        map,
        center,
        radius: 3000,
        fillColor: "#AA00FF",
        fillOpacity: 0.2,
        strokeColor: "#AA00FF",
        strokeOpacity: 0.4,
        strokeWeight: 2,
      });

      results.forEach((result) => {
        new window.google.maps.Marker({
          position: result.geometry.location,
          map,
          title: result.name,
        });
      });
    }
  }, [center, results]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr" }} gap="24px">
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <Flex direction="column">
          <Text fontSize="x-large" color="#fff" fontWeight="bold" pb="8px">
      نتائجك التي قمت في البحث عنها :{" "}
      <Text
        as="span"
        textDecoration="underline"
        color="teal.300"
        cursor="pointer"
        onClick={() => history.push("/locations")} // Redirect to Locations page
      >
        {results.length} نتائج
      </Text>
    </Text>
            <Flex align="center">
              <Icon
                as={IoCheckmarkDoneCircleSharp}
                color="teal.300"
                w={4}
                h={4}
                pe="3px"
              />
              <Text fontSize="xx-large" color="teal.300" fontWeight="normal">
                {selectedNeighborhood}
              </Text>
            </Flex>
          </Flex>
          <Box id="map" height="400px" width="100%" bg="gray.800" borderRadius="md"></Box>
        </Card>
      </Grid>

      <Flex justify="flex-start" mb="16px" mt="16px">
        <Menu>
          <MenuButton as={Button} colorScheme="gray">
            View: {viewMode === "compact" ? "Compact" : "Card"}
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaThList />} onClick={() => setViewMode("compact")}>
              Compact
            </MenuItem>
            <MenuItem icon={<FaThLarge />} onClick={() => setViewMode("card")}>
              Card
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {viewMode === "compact" ? (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <Text fontSize="lg" color="#fff" fontWeight="bold" p="16px">
            Locations
          </Text>
          <Table variant="simple" color="#fff">
            <Thead>
              <Tr my=".8rem" ps="0px" color="gray.400">
                <Th>Image</Th>
                <Th>Location</Th>
                <Th>Rating</Th>
                <Th>Reviews</Th>
                <Th>Status</Th>
                <Th>Website/Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result, index) => (
                <Tr key={index}>
                  <Td>
                    <Box
                      height="100px"
                      width="100px"
                      borderRadius="md"
                      overflow="hidden"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={result.photos?.[0]?.getUrl({ maxWidth: 100 }) || "https://via.placeholder.com/100"}
                        objectFit="cover"
                        height="100%"
                        width="100%"
                        cursor="pointer"
                        onClick={() => handleImageClick(result.photos?.[0]?.getUrl({ maxWidth: 400 }))}
                      />
                    </Box>
                  </Td>
                  <Td color="gray.200">{result.name || "Unknown"}</Td>
                  <Td color="gray.200">{result.rating || "N/A"}</Td>
                  <Td color="gray.200">{result.user_ratings_total || "0"}</Td>
                  <Td>
                    <Badge
                      bg={result.opening_hours?.open_now ? "green.400" : "red.400"}
                      color="white"
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                      fontWeight="bold"
                    >
                      {result.opening_hours?.open_now ? "Open" : "Closed"}
                    </Badge>
                  </Td>
                  <Td>
                    {result.website ? (
                      <a href={result.website} target="_blank" rel="noreferrer">
                        Visit Site
                      </a>
                    ) : result.email ? (
                      result.email
                    ) : (
                      "N/A"
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="16px">
          {results.map((result, index) => (
            <Card key={index} p="16px" display="flex" flexDirection="column" justifyContent="space-between">
              <Box
                height="150px"
                width="100%"
                borderRadius="md"
                overflow="hidden"
                mb="16px"
              >
                <Image
                  src={result.photos?.[0]?.getUrl({ maxWidth: 300 }) || "https://via.placeholder.com/300"}
                  objectFit="cover"
                  height="100%"
                  width="100%"
                  cursor="pointer"
                  onClick={() => handleImageClick(result.photos?.[0]?.getUrl({ maxWidth: 400 }))}
                />
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="#fff" mb="8px" textAlign="center">
                {result.name || "Unknown"}
              </Text>
              <Text color="gray.200" mb="8px" textAlign="center">
                Rating: {result.rating || "N/A"}
              </Text>
              <Text color="gray.200" mb="8px" textAlign="center">
                Reviews: {result.user_ratings_total || "0"}
              </Text>
              <Flex justify="center" mt="auto">
                <Badge
                  bg={result.opening_hours?.open_now ? "green.400" : "red.400"}
                  color="white"
                  fontSize="sm"
                  p="3px 10px"
                  borderRadius="8px"
                  fontWeight="bold"
                >
                  {result.opening_hours?.open_now ? "Open" : "Closed"}
                </Badge>
              </Flex>
            </Card>
          ))}
        </Grid>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="600px">
          <ModalBody p={4}>
            <Image src={currentImage} alt="Enlarged view" borderRadius="md" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Locations;
