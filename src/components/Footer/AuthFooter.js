/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function AuthFooter(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
      }}
      alignItems={{
        base: "center",
      }}
      justifyContent='space-between'
      pb='20px'
      fontSize='sm'>
      <Text
        color='white'
        textAlign={{
          base: "center",
        }}
        mb={{ base: "20px" }}>
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as='span' mx='2px'>
          {document.documentElement.dir === "rtl"
            ? " مصنوع من ❤️ بواسطة"
            : "Made with ❤️ by "}
        </Text>
        <Link href='https://www.rcrc.gov.sa/' target='_blank'>
          {document.documentElement.dir === "rtl"
            ? ""
            : "BusinessMap Team "}
        </Link>
      
       
        
      </Text>
      <List display='flex'>
       
        
        
       <ListItem>
         <Link  me={{
           base: "20px",
           md: "44px",
         }}
           color='white'
           href="/home">
           {document.documentElement.dir === "rtl" ? "الرئيسية" : "Home"}
         </Link>
       </ListItem>

       <ListItem
         me={{
           base: "20px",
           md: "44px",

         }}>
         <Link color='white'  href='/about'>
           {document.documentElement.dir === "rtl" ? "About" : "About"}
         </Link>
       </ListItem>

       <ListItem
         me={{
           base: "20px",
           md: "44px",

         }}>
         <Link color='white'  href='/contact'>
           {document.documentElement.dir === "rtl" ? "Contact" : "Contact"}
         </Link>
       </ListItem>
     </List>
    </Flex>
  );
}
