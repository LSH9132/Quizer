import {Box, Flex, Heading, IconButton, Image, Text} from "@chakra-ui/react";
import ThemeSwitch from "../../common/ThemeSwitch";
import { MdAdd } from "react-icons/md";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Flex as={"nav"} w={"100%"} px={{base: 18, lg: 20}} my={"18px"} justifyContent={"space-between"}>
        <Link href='/'>
          <Flex>
            {/* <Image
              my={"auto"}
              borderRadius='100%'
              boxSize='42px'
              src='https://bit.ly/dan-abramov'
              alt='Dan Abramov'
            /> */}
            <Text as={"p"} my={"auto"} fontSize={{base:18, lg:24}} fontWeight="bold" pl={{base: 4, lg: 6}}>Quizer</Text>
          </Flex>
        </Link>
        <Flex>
          <Box>
            <ThemeSwitch/>
          </Box>
          <Box marginLeft={2}>
            <Link href={'/createdashboard'}>
              <IconButton aria-label='add quiz' icon={<MdAdd/ >} />
            </Link>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Index;