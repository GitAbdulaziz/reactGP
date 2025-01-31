import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import SidebarHelpImage from "assets/img/SidebarHelpImage.png";
import IconBox from "components/Icons/IconBox";
import React from "react";
import { useHistory } from "react-router-dom"; // Import useHistory

export function SidebarHelp(props) {
  const history = useHistory(); // Initialize history

  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius='15px'
      flexDirection='column'
      bgImage={SidebarHelpImage}
      bgSize='cover'
      bgPosition='center'
      justifyContent='flex-start'
      alignItems='start'
      p='16px'
      minH='170px'
      minW='218px'>
      <IconBox width='35px' h='35px' bg='white' mb='auto'>
        <QuestionIcon color='brand.200' h='18px' w='18px' />
      </IconBox>
      <Text fontSize='sm' color='white' fontWeight='bold'>
        Need help?
      </Text>
      <Text fontSize='xs' color='white' mb='10px'>
        Press Contact Button
      </Text>
      <Link
        w='100%'
        href=''>
        <Button
          fontSize='10px'
          fontWeight='bold'
          w='100%'
          bg='linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)'
          _hover='none'
          _active={{
            bg: "white",
            transform: "none",
            borderColor: "transparent",
          }}
          _active='none'
          _focus={{
            boxShadow: "none",
          }}
          color='white'
          onClick={() => history.push("/contact")} // Redirect using history
>
          Contact US
        </Button>
      </Link>
    </Flex>
  );
}
