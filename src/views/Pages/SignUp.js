import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase/firebaseConfig";
import { Link as RouterLink, useHistory } from "react-router-dom"; 
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
// Custom Components
import AuthFooter from "components/Footer/AuthFooter";
import GradientBorder from "components/GradientBorder/GradientBorder";

// Assets
import signUpImage from "assets/img/signUpImage.png";

function SignUp() {
  const titleColor = "white";
  const textColor = "gray.400";
  const history = useHistory();

  // Authentication states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email. Please include '@' and '.com'.");
      setSuccess(""); 

      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setSuccess(""); 

      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set the displayName for the user
      await updateProfile(user, {
        displayName: name, 
      });

      setSuccess("Registration successful!");
      setError(""); 

      setTimeout(() => {
        history.push("/auth/signin"); 
      }, 2000); // 2000ms = 2 seconds
    } catch (err) {
      const filteredErrorMessage = err.message.replace("Firebase:", "").trim();
      setError(filteredErrorMessage); 
      setSuccess(""); 
    }
  };

  return (
    <Flex position="relative" overflow={{ lg: "hidden" }}>
      <Flex
        flexDirection="column"
        h={{ sm: "initial", md: "unset" }}
        w={{ base: "90%" }}
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ sm: "100px", md: "0px" }}
        me={{ base: "auto", lg: "50px", xl: "auto" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          flexDirection="column"
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb="50px"
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
            mt={{ base: "60px", md: "140px", lg: "200px" }}
            mb="50px"
          >
            <Text
              fontSize="4xl"
              lineHeight="39px"
              color="white"
              fontWeight="bold"
            >
              Welcome!
            </Text>
            <Text
              fontSize="md"
              color="white"
              fontWeight="normal"
              mt="10px"
              w={{ base: "100%", md: "90%", lg: "90%", xl: "80%" }}
            >
              Use these awesome forms to login or create new account in your
              project for free.
            </Text>
          </Flex>
          <GradientBorder p="2px" me={{ base: "none", lg: "30px", xl: "none" }}>
            <Flex
              background="transparent"
              borderRadius="30px"
              direction="column"
              p="40px"
              minW={{ base: "unset", md: "430px", xl: "450px" }}
              w="100%"
              mx={{ base: "0px" }}
              bg={{
                base: "rgb(19,21,56)",
              }}
            >
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign="center"
                mb="22px"
              >
                Register With
              </Text>
              <HStack spacing="15px" justify="center" mb="22px">
                <GradientBorder borderRadius="15px">
                  <Flex
                    _hover={{ filter: "brightness(120%)" }}
                    transition="all .25s ease"
                    cursor="pointer"
                    justify="center"
                    align="center"
                    bg="rgb(19,21,54)"
                    w="71px"
                    h="71px"
                    borderRadius="15px"
                  >
                    <Link href="#">
                      <Icon
                        color={titleColor}
                        as={FaFacebook}
                        w="30px"
                        h="30px"
                        _hover={{ filter: "brightness(120%)" }}
                      />
                    </Link>
                  </Flex>
                </GradientBorder>
                <GradientBorder borderRadius="15px">
                  <Flex
                    _hover={{ filter: "brightness(120%)" }}
                    transition="all .25s ease"
                    cursor="pointer"
                    justify="center"
                    align="center"
                    bg="rgb(19,21,54)"
                    w="71px"
                    h="71px"
                    borderRadius="15px"
                  >
                    <Link href="#">
                      <Icon
                        color={titleColor}
                        as={FaApple}
                        w="30px"
                        h="30px"
                        _hover={{ filter: "brightness(120%)" }}
                      />
                    </Link>
                  </Flex>
                </GradientBorder>
                <GradientBorder borderRadius="15px">
                  <Flex
                    _hover={{ filter: "brightness(120%)" }}
                    transition="all .25s ease"
                    cursor="pointer"
                    justify="center"
                    align="center"
                    bg="rgb(19,21,54)"
                    w="71px"
                    h="71px"
                    borderRadius="15px"
                  >
                    <Link href="#">
                      <Icon
                        color={titleColor}
                        as={FaGoogle}
                        w="30px"
                        h="30px"
                        _hover={{ filter: "brightness(120%)" }}
                      />
                    </Link>
                  </Flex>
                </GradientBorder>
              </HStack>
              <Text
                fontSize="lg"
                color="gray.400"
                fontWeight="bold"
                textAlign="center"
                mb="22px"
              >
                or
              </Text>
              <FormControl>
                <FormLabel
                  color={titleColor}
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                >
                  Name
                </FormLabel>
                <GradientBorder
                  mb="24px"
                  h="50px"
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius="20px"
                >
                  <Input
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border="transparent"
                    borderRadius="20px"
                    fontSize="sm"
                    size="lg"
                    w={{ base: "100%", md: "346px" }}
                    maxW="100%"
                    h="46px"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                >
                  Email
                </FormLabel>
                <GradientBorder
                  mb="24px"
                  h="50px"
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius="20px"
                >
                  <Input
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border="transparent"
                    borderRadius="20px"
                    fontSize="sm"
                    size="lg"
                    w={{ base: "100%", md: "346px" }}
                    maxW="100%"
                    h="46px"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                >
                  Password
                </FormLabel>
                <GradientBorder
                  mb="24px"
                  h="50px"
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius="20px"
                >
                  <Input
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border="transparent"
                    borderRadius="20px"
                    fontSize="sm"
                    size="lg"
                    w={{ base: "100%", md: "346px" }}
                    maxW="100%"
                    h="46px"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </GradientBorder>
                <Button
                  onClick={handleSignUp}
                  variant="brand"
                  fontSize="10px"
                  type="submit"
                  w="100%"
                  maxW="350px"
                  h="45"
                  mb="20px"
                  mt="20px"
                >
                  SIGN UP
                </Button>

                {(error || success) && (
                  <Box
                    mt="4"
                    textAlign="center" 
                    w="100%"
                  >
                    {error && <Text color="red.500">{error}</Text>}
                    {success && <Text color="green.500">{success}</Text>}
                  </Box>
                )}
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColor} fontWeight="medium">
                  Already have an account?
                  <Link
                    as={RouterLink} 
                    to="/auth/signin"
                    color={titleColor}
                    ms="5px"
                    fontWeight="bold"
                  >
                    Sign In
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </GradientBorder>
        </Flex>
        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb="90px"
        >
          <AuthFooter />
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX="hidden"
          h="1300px"
          maxW={{ md: "50vw", lg: "48vw" }}
          w="960px"
          position="absolute"
          left="0px"
        >
          <Box
            bgImage={signUpImage}
            w="100%"
            h="1300px"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              textAlign="center"
              color="white"
              letterSpacing="8px"
              fontSize="20px"
              fontWeight="500"
            >
              INSPIRED BY THE FUTURE:
            </Text>
            <Text
              textAlign="center"
              color="transparent"
              letterSpacing="8px"
              fontSize="36px"
              fontWeight="bold"
              bgClip="text !important"
              bg="linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)"
            >
              THE BusinessMap DASHBOARD
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;
