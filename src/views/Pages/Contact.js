import React, { useRef, useState } from "react";
import {
  useToast,
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import emailjs from "emailjs-com"; 

// Framer Motion
import { motion } from "framer-motion";

import NavBar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../styles/Contact.css";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const toast = useToast();
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_887z7sz",
        "template_iqbfen3",
        formRef.current,
        "D2rEvHFR51xXEywp9"
      )
      .then(
        () => {
          toast({
            title: "Message Sent",
            description: "Thank you for contacting us! We’ll get back to you soon.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          console.error("EmailJS error:", error.text);
          toast({
            title: "Error",
            description: "Failed to send message. Please try again later.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      );
  };

  return (
    <>
      <NavBar />
      {/* Give the MotionFlex 100% width & full viewport height */}
      <MotionFlex
        className="contact-background"
        style={{
          
          
          minHeight: "100vh",
          width: "100%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        align="center"    
        justify="center" 
      >
        <MotionBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex="1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          <Box className="contact-form-container">
            <MotionHeading
              className="contact-title"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Contact Us
            </MotionHeading>

            <form ref={formRef} onSubmit={handleSubmit}>
              <MotionFormControl
                mb={4}
                isRequired
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </MotionFormControl>

              <MotionFormControl
                mb={4}
                isRequired
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </MotionFormControl>

              <MotionFormControl
                mb={4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </MotionFormControl>

              <MotionFormControl
                mb={6}
                isRequired
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Write your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />
              </MotionFormControl>

              <MotionButton
                type="submit"
                colorScheme="blue"
                className="submit-btn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Submit
              </MotionButton>
            </form>
          </Box>
        </MotionBox>
      </MotionFlex>
      <Footer />
    </>
  );
};

export default ContactPage;