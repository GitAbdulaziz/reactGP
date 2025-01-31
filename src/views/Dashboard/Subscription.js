import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

// Images
import BackgroundCard1 from "assets/img/billing-background-card.png";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import IconBox from "components/Icons/IconBox";
import InvoicesRow from "components/Tables/InvoicesRow";

// Icons
import { FaPencilAlt } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {
  BillIcon,
  GraphIcon,
  MastercardIcon,
  VisaIcon,
} from "components/Icons/Icons";

// Data
import { invoicesData } from "variables/general";

function Billing() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mx="auto">
      {/* Pricing Plans */}
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr 1fr" }}
        gap="26px"
        mb="40px"
      >
        {/* Free Plan */}
        <Box
          overflow="hidden"
          p="6"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundImage={`url(${BackgroundCard1})`}
          backgroundSize="cover"
          backgroundPosition="center"
          color="white"
          borderRadius="28px"
        >
          <Text fontSize="2xl" fontWeight="bold">
            مجانا
          </Text>
          <Text fontSize="4xl" fontWeight="bold" mt="4">
            $0
          </Text>
          <Text fontSize="lg" mb="4">
            / شهريا
          </Text>
          <VStack spacing="3" align="start" pl="6">
            <Text>✓ 3 tokens</Text>
            <Text>✓ 24/7 Customer support</Text>
            <Text>✓ All widget access</Text>
          </VStack>
          <Button mt="6" colorScheme="purple" alignSelf="center">
            Purchase Plan
          </Button>
        </Box>

        {/* Advanced Plan */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          p="6"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundImage={`url(${BackgroundCard1})`}
          backgroundSize="cover"
          backgroundPosition="center"
          color="white"
          borderRadius="28px"
        >
          <Text fontSize="2xl" fontWeight="bold">
            متوسط
          </Text>
          <Text fontSize="4xl" fontWeight="bold" mt="4">
            $10
          </Text>
          <Text fontSize="lg" mb="4">
            / شهريا
          </Text>
          <VStack spacing="3" align="start" pl="6">
            <Text>✓ Unlimited auto tracking</Text>
            <Text>✓ 1 Day transaction clearing</Text>
            <Text>✓ Priority customer support</Text>
            <Text>✓ All Widget Access</Text>
          </VStack>
          <Button mt="6" colorScheme="purple" alignSelf="center">
            Purchase Plan
          </Button>
        </Box>

        {/* Team Plan */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          p="6"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundImage={`url(${BackgroundCard1})`}
          backgroundSize="cover"
          backgroundPosition="center"
          color="white"
          borderRadius="28px"
        >
          <Text fontSize="2xl" fontWeight="bold">
            متقدم
          </Text>
          <Text fontSize="4xl" fontWeight="bold" mt="4">
            $30
          </Text>
          <Text fontSize="lg" mb="4">
            / شهريا
          </Text>
          <VStack spacing="3" align="start" pl="6">
            <Text>✓ AI Advisor</Text>
            <Text>✓ Unlimited auto tracking</Text>
            <Text>✓ 1 Day transaction clearing</Text>
            <Text>✓ Priority customer support</Text>
            <Text>✓ All Widget Access</Text>
          </VStack>
          <Button mt="6" colorScheme="purple" alignSelf="center">
            Purchase Plan
          </Button>
        </Box>
      </Grid>

      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
        <Box>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
            }}
            gap="26px"
          >
            {/* Mastercard */}
            <Card
              backgroundImage={BackgroundCard1}
              backgroundRepeat="no-repeat"
              bgSize="cover"
              bgPosition="10%"
              p="16px"
            >
              <CardBody h="100%" w="100%">
                <Flex
                  direction="column"
                  color="white"
                  h="100%"
                  p="0px 10px 20px 10px"
                  w="100%"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="md" fontWeight="bold">
                      Al-Rajhi
                    </Text>
                    <Icon
                      as={RiMastercardFill}
                      w="48px"
                      h="auto"
                      color="gray.400"
                    />
                  </Flex>
                  <Spacer />
                  <Flex direction="column">
                    <Box>
                      <Text
                        fontSize={{ sm: "xl", lg: "lg", xl: "xl" }}
                        letterSpacing="2px"
                        fontWeight="bold"
                      >
                        7812 2139 0823 XXXX
                      </Text>
                    </Box>
                    <Flex mt="14px">
                      <Flex direction="column" me="34px">
                        <Text fontSize="xs">VALID THRU</Text>
                        <Text fontSize="xs" fontWeight="bold">
                          05/24
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <Text fontSize="xs">CVV</Text>
                        <Text fontSize="xs" fontWeight="bold">
                          09X
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </Grid>
          <Card p="16px" mt="24px">
            <CardHeader>
              <Flex
                justify="space-between"
                align="center"
                minHeight="60px"
                w="100%"
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  Payment Method
                </Text>
                <Button maxW="135px" fontSize="10px" variant="brand">
                  ADD A NEW CARD
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                align="center"
                w="100%"
                justify="center"
                py="1rem"
              >
                <GradientBorder
                  mb={{ sm: "24px", md: "0px" }}
                  me={{ sm: "0px", md: "24px" }}
                  w="100%"
                  borderRadius="20px"
                >
                  <Flex
                    p="22px"
                    bg="rgb(31, 35, 89)"
                    border="transparent"
                    borderRadius="20px"
                    align="center"
                    w="100%"
                  >
                    <IconBox me="10px" w="25px" h="22px">
                      <MastercardIcon w="100%" h="100%" />
                    </IconBox>
                    <Text color="#fff" fontSize="sm">
                      7812 2139 0823 XXXX
                    </Text>
                    <Spacer />
                    <Button
                      p="0px"
                      bg="transparent"
                      w="16px"
                      h="16px"
                      variant="no-hover"
                    >
                      <Icon as={FaPencilAlt} color="#fff" w="12px" h="12px" />
                    </Button>
                  </Flex>
                </GradientBorder>
                <GradientBorder w="100%" borderRadius="20px">
                  <Flex
                    p="22px"
                    bg="rgb(31, 35, 89)"
                    w="100%"
                    borderRadius="20px"
                    border="transparent"
                    align="center"
                  >
                    <IconBox me="10px" w="25px" h="25px">
                      <VisaIcon w="100%" h="100%" color="#fff" />
                    </IconBox>
                    <Text color="#fff" fontSize="sm">
                      7812 2139 0823 XXXX
                    </Text>
                    <Spacer />
                    <Button
                      p="0px"
                      bg="transparent"
                      w="16px"
                      h="16px"
                      variant="no-hover"
                    >
                      <Icon as={FaPencilAlt} color="#fff" w="12px" h="12px" />
                    </Button>
                  </Flex>
                </GradientBorder>
              </Flex>
            </CardBody>
          </Card>
        </Box>
        {/* Invoices List */}
        <Card
          p="22px"
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}
        >
          <CardHeader>
            <Flex
              justify="space-between"
              align="center"
              mb="1rem"
              w="100%"
              mb="28px"
            >
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                Invoices
              </Text>
              <Button
                variant="brand"
                fontSize="10px"
                fontWeight="bold"
                p="6px 32px"
              >
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              {invoicesData.map((row) => {
                return (
                  <InvoicesRow
                    date={row.date}
                    code={row.code}
                    price={row.price}
                    logo={row.logo}
                    format={row.format}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}></Grid>
    </Flex>
  );
}

export default Billing;
