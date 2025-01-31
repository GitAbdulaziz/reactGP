// Chakra imports
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Link,
  Text,
  useToast, 
} from "@chakra-ui/react";
// Images

import bgProfile from "assets/img/bgProfile.png";

// Custom components
import SearchHistoryList from "../../components/Search/SearchHistoryList"; 
import { useHistory } from "react-router-dom"; 

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { Separator } from "components/Separator/Separator";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaPencilAlt,
  FaTwitter,
} from "react-icons/fa";
// Data

import { auth ,db} from "../../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";
 
function Profile() {
  const user = useSelector((state) => state.user.user); 

  const [avatar, setAvatar] = useState(); 
  const toast = useToast();
  const [searchHistory, setSearchHistory] = useState([]); 

  const history = useHistory(); 


  useEffect(() => {
    if (!user) {
      toast({
        title: "Unauthorized",
        description: "You need to sign in to access this page.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const fetchSearchHistory = async () => {
      try {
        const searchRef = collection(db, "users", user.uid, "searchHistory");
        const q = query(searchRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const history = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSearchHistory(history);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load search history.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchSearchHistory();
  }, [user, toast, history]);

  // Function to handle avatar change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result); 
        toast({
          title: "Avatar Updated",
          description: "Your avatar has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex direction="column" mt={{ sm: "25px", md: "0px" }}>
      <Box
        mb={{ sm: "24px", md: "50px", xl: "20px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        {/* Header */}
        <Card
          direction={{ sm: "column", md: "row" }}
          mx="auto"
          maxH="330px"
          w={{ sm: "90%", xl: "100%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          p="24px"
          borderRadius="20px"
          mt="100px"
        >
          <Flex align="center" direction={{ sm: "column", md: "row" }}>
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Avatar
                me={{ md: "22px" }}
                src={avatar} 
                w="80px"
                h="80px"
                borderRadius="15px"
              >
                <AvatarBadge
                  cursor="pointer"
                  borderRadius="8px"
                  border="transparent"
                  bg="linear-gradient(138.78deg, rgba(6, 11, 40, 0.94) 17.44%, rgba(10, 14, 35, 0.49) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)"
                  boxSize="26px"
                  backdropFilter="blur(120px)"
                  as="label"
                  htmlFor="avatar-upload" 
                >
                  <Icon h="12px" w="12px" color="#fff" as={FaPencilAlt} />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange} 
                  />
                </AvatarBadge>
              </Avatar>
              <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color="#fff"
                  fontWeight="bold"
                  ms={{ sm: "8px", md: "0px" }}
                >
                  {user?.displayName || "Anonymous"}
                </Text>
                <Text fontSize={{ sm: "sm", md: "md" }} color="gray.400">
                  {user?.email || "No email available"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Box>

      <Grid
        templateColumns={{
          sm: "1fr", 
          xl: "1fr 3fr",
        }}
        templateRows={{
          sm: "auto auto auto", 
          xl: "auto auto",
        }}
        gap="22px"
        mb="24px"
      >
        {/* Welcome Card */}
        <Card
          bgImage={bgProfile}
          bgSize="cover"
          maxW="100%"
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{
            sm: "1 / 1 / 2 / 2", 
            xl: "1 / 1 / 2 / 2", 
          }}
        >
          <Flex direction="column" h="100%">
            <Text color="#fff" fontSize="30px" fontWeight="bold" mb="3px">
              Welcome back!
            </Text>
            <Text color="#fff" fontSize="sm" mb="auto">
              Nice to see you, {user?.displayName || "Visitor"}!
            </Text>
            <Button
              alignSelf="flex-start"
              variant="no-hover"
              bg="transparent"
              p="0px"
            >
              <Text
                fontSize="xx-large"
                color="#fff"
                me="5px"
                cursor="pointer"
                transition="all .3s ease"
                _hover={{ me: "6px" }}
                onClick={() => history.push("/search")} 

              >
                Press me to start analyzing
              </Text>
              <Icon
                as={BsArrowRight}
                w="13px"
                h="13px"
                color="#fff"
                transition="all .3s ease"
                cursor="pointer"
                _hover={{ transform: "translateX(20%)" }}
              />
            </Button>
          </Flex>
        </Card>

         {/* Search History Card */}
      <Card
        p="16px"
        maxW="100%"
        gridArea={{
          sm: "2 / 1 / 3 / 2",
          xl: "1 / 2 / 3 / 3",
        }}
      >
        <CardHeader p="12px 5px" mb="12px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Search History
          </Text>
        </CardHeader>
        <CardBody px="5px">
          {searchHistory.length > 0 ? (
            <SearchHistoryList history={searchHistory}   avatar={avatar} />
          ) : (
            <Text fontSize="sm" color="gray.400">
              No search history available.
            </Text>
          )}
        </CardBody>
      </Card>

        {/* Profile Information */}
        <Card
          p="16px"
          maxW="100%"
          gridArea={{
            sm: "3 / 1 / 4 / 2",
            xl: "2 / 1 / 3 / 2",
          }}
        >
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="sm" color={"gray.400"} fontWeight="400" mb="15px">
                Hi, I’m {user?.displayName || "Anonymous"}. Choosing the right
                business location is pivotal. If faced with two similarly viable
                options, prioritize the one that challenges your assumptions or
                reveals untapped market potential, even if it seems less
                appealing initially. Avoid relying solely on intuition
              </Text>
              <Separator mb="30px" />
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Name:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  {user?.displayName || "Anonymous"}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Mobile:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  (966) 123 1234 123
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Email:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  {user?.email || "No email available"}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Location:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  Saudi Arabia
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Social Media:{" "}
                </Text>
                <Flex>
                  <Link
                    href="#"
                    color="teal.300"
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "teal.300" }}
                  >
                    <Icon color="white" as={FaFacebook} w="12px" h="12px" />
                  </Link>
                  <Link
                    href="#"
                    color="teal.300"
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "teal.300" }}
                  >
                    <Icon color="white" as={FaInstagram} w="12px" h="12px" />
                  </Link>
                  <Link
                    href="#"
                    color="teal.300"
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "teal.300" }}
                  >
                    <Icon color="white" as={FaTwitter} w="12px" h="12px" />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
