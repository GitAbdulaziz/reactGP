/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function CopyRight(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'>
      <Text
        fontSize='sm'
        color='white'
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as='span'>
          {document.documentElement.dir === "rtl"
            ? " مصنوع من ❤️ بواسطة"
            : "Made with ❤️ by "}
        </Text>
        <Link href='https://www.rcrc.gov.sa/' target='_blank'>
          {document.documentElement.dir === "rtl"
            ? " "
            : " BusinessMap Team "}
        </Link>
       
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          
        </ListItem>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link color='white' fontSize='17px' href='https://www.rcrc.gov.sa/'>
            {document.documentElement.dir === "rtl" ? "الهيئة الملكية بمدينة الرياض" : "الهيئة الملكية بمدينة الرياض"}
          </Link>
        </ListItem>
        
        <ListItem>
          <Link
            color='white'
            href="/home">
            {document.documentElement.dir === "rtl" ? "الرئيسية" : "Home"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}

