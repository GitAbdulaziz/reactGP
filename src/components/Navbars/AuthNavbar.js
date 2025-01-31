// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HomeIcon,
  PersonIcon,
  SignInLogoNav,
  SignUpLogoNav,
} from "components/Icons/Icons";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

// Import the logo
import logoImg from "assets/img/LogoB.png";

export default function AuthNavbar(props) {
  const [open, setOpen] = React.useState(false);

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const { logo = logoImg, logoText = "BusinessMap", secondary, ...rest } = props;

  // Chakra color mode
  let navbarIcon = "white";
  let navbarBg =
    "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)";
  let navbarBorder = "rgba(226, 232, 240, 0.3)";
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(42px)";
  let navbarPosition = "fixed";

  // Render the brand with logo or fallback to text
  const brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Image src={logo} alt="Logo" height="40px" fallback={<Text>{logoText}</Text>} />
    </Link>
  );

  // Navigation links for authentication pages
  const linksAuth = (
    <HStack display={{ sm: "none", lg: "flex" }}>
      <NavLink to="/">
        <Button
          fontSize="sm"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<HomeIcon color={navbarIcon} w="12px" h="12px" />}
        >
          <Text>Home</Text>
        </Button>
      </NavLink>
      <NavLink to="/admin/profile">
        <Button
          fontSize="sm"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<PersonIcon color={navbarIcon} w="12px" h="12px" />}
        >
          <Text>Profile</Text>
        </Button>
      </NavLink>
      <NavLink to="/auth/signup">
        <Button
          fontSize="sm"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<SignUpLogoNav color={navbarIcon} w="15px" h="15px" />}
        >
          <Text>Sign Up</Text>
        </Button>
      </NavLink>
      <NavLink to="/auth/signin">
        <Button
          fontSize="sm"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<SignInLogoNav color={navbarIcon} w="20px" h="15px" />}
        >
          <Text>Sign In</Text>
        </Button>
      </NavLink>
    </HStack>
  );

  return (
    <Flex
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border="2px solid"
      borderColor={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="20px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
        {brand}
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}
        >
          <SidebarResponsive
            iconColor="white"
            logoText={props.logoText}
            secondary={props.secondary}
            routes={routes}
            {...rest}
          />
        </Box>
        {linksAuth}
      </Flex>
    </Flex>
  );
}

AuthNavbar.propTypes = {
  logo: PropTypes.string, // Path to the logo
  logoText: PropTypes.string,
  secondary: PropTypes.bool,
};