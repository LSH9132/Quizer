import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box color="" py={4}>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">Quizer</Text>
        <Text mx={2}>|</Text>
        <Text fontSize="sm">© lshworkspace</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
