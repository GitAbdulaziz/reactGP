// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
// Custom Icons
import { SignInLogo, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  // Detect mobile view (max-width: 768px)
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  // Tooltip State (Only show when mobile)
  const [showTooltip, setShowTooltip] = useState(isMobile);
  const [tooltipAnimation, setTooltipAnimation] = useState("vibrate 0.2s infinite");

  // Stop vibration after 2 seconds
  useEffect(() => {
    if (showTooltip) {
      const timeout = setTimeout(() => {
        setTooltipAnimation("none"); // Stop animation after 2 seconds
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showTooltip]);

  // Chakra Color Mode
  let inputBg = "#0F1535";
  let mainText = "gray.400";
  let navbarIcon = "white";
  let searchIcon = "white";

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {/* Search Input */}
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        borderColor="rgba(226, 232, 240, 0.3)"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
      >
        <InputLeftElement>
          <IconButton
            bg="inherit"
            borderRadius="inherit"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
          />
        </InputLeftElement>
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup>

      {/* Sign In Button */}
      <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <SignInLogo color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <SignInLogo color={navbarIcon} w="22px" h="22px" me="0px" />
            ) : (
              ""
            )
          }
        >
          <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
        </Button>
      </NavLink>

      {/* Sidebar with Vibrating Tooltip (Only on Mobile) */}
      {isMobile ? (
        <Tooltip
          label="اضغط هنا لعرض الصفحات"
          fontSize="md"
          hasArrow
          isOpen={showTooltip}
          placement="bottom"
          bg="black"
          color="white"
          sx={{
            animation: tooltipAnimation, // Apply vibration animation
            "@keyframes vibrate": {
              "0%": { transform: "translateX(0px)" },
              "25%": { transform: "translateX(-2px)" },
              "50%": { transform: "translateX(2px)" },
              "75%": { transform: "translateX(-2px)" },
              "100%": { transform: "translateX(2px)" },
            },
          }}
        >
          <div
            onClick={() => setShowTooltip(false)} // Hide tooltip after first click
          >
            <SidebarResponsive
              iconColor="gray.500"
              logoText={props.logoText}
              secondary={props.secondary}
              routes={routes}
              {...rest}
            />
          </div>
        </Tooltip>
      ) : (
        <SidebarResponsive
          iconColor="gray.500"
          logoText={props.logoText}
          secondary={props.secondary}
          routes={routes}
          {...rest}
        />
      )}

      {/* Settings Icon */}
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />

      {/* Notifications Bell */}
      <Menu>
        <MenuButton align="center">
          <BellIcon color={navbarIcon} mt="-4px" w="18px" h="18px" />
        </MenuButton>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
