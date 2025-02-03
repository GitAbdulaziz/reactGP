import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Icon,
  Divider,
  Stack,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const FooterWithBlur = () => {
  // Define an array of links for the "Useful Links" section
  const footerLinks = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Map", url: "/search" },
    { label: "Subscription", url: "/admin/subscription" },
    
  ];

  return (
    <>
        
      {/* Footer Section */}
      <Box
        bg="black"
        color="white"
        position="relative"
        zIndex="1"
        py={20}
        overflow="hidden"
      >
        <Flex
          maxW="1200px"
          mx="auto"
          px={5}
          wrap="wrap"
          justify="space-between"
          gap={10}
          position="relative"
        >
          {/* About BizMap */}
          <Box w={{ base: "100%", md: "20%" }}>
            <Heading fontSize="lg" mb={4}>
              About BusinessMap
            </Heading>
            <Text fontSize="sm" mb={4}>
              BusinessMap is a cutting-edge platform designed to simplify
              location-based data for businesses and individuals. Whether
              you need to find new customers or explore the best local
              services, BizMap helps you navigate with ease.
            </Text>
            <Text fontSize="sm">
              From powerful search features to real-time analytics, BusinessMap
              offers the tools you need to grow and connect.
            </Text>
            
            
          </Box>

          {/* Useful Links */}
          <Box w={{ base: "100%", md: "20%" }}>
            <Heading fontSize="lg" mb={4}>
              Useful Links
            </Heading>
            <Stack spacing={2}>
              {footerLinks.map(({ label, url }) => (
                <Link
                  key={label}
                  href={url}
                  fontSize="sm"
                  color="gray.400"
                  _hover={{ color: "white" }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Quick Contact */}
          <Box w={{ base: "100%", md: "20%" }}>
            <Heading fontSize="lg" mb={4}>
              Quick Contact
            </Heading>

           

            <Box mb={4}>
              <Heading fontSize="sm" mb={2}>
                Email:
              </Heading>
              <Text fontSize="sm">NewBusinessMap@gmail.com
              </Text>
              
            </Box>

            {/* Address */}
            <Box mb={4}>
              <Heading fontSize="sm" mb={2}>
                Address:
              </Heading>
              <Text fontSize="sm">Riyadh, Saudi Arabia</Text>
              <Text fontSize="sm"></Text>
            </Box>
          </Box>
        </Flex>

        <Divider my={6} borderColor="gray.700" />

        {/* Footer Bottom */}
        <Flex
          justify="center"
          textAlign="center"
          fontSize="sm"
          px={5}
          color="gray.400"
        >
          © 2025{" "}
          <Link ml={1} href="/home" color="blue.300">
          BusinessMap
          </Link>
          
        </Flex>
      </Box>
    </>
  );
};

export default FooterWithBlur;
