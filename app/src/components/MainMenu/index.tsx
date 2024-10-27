import { Box, SimpleGrid, Heading, Text, Image, Center } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { BackendURL } from "../../../config";
import Link from "next/link";

type dataType = {
  title: string;
  des: string;
  emb: string;
};

const Index = () => {
  const [data, setData] = useState<dataType[] | null>(null);
  const [items, setItems] = useState<ReactElement[] | null>(null);

  const getMenuElements = (_data: dataType[] | null) => {
    if (!_data) {
      return null;
    }

    return _data.map((val, index) => (
      <Link href={`/quiz/${index + 1}`}>
        <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Center>
            <Image src={`data:image/png;base64,${val.emb}`} alt={val.title} />
          </Center>
          <Heading size="md" mb={2}>{val.title}</Heading>
          <Text mb={2}>{val.des}</Text>
        </Box>
      </Link>
    ));
  };

  useEffect(() => {
    setItems(getMenuElements(data));
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BackendURL}/dashboard`);
      const result = await res.json();
      return result;
    };
    fetchData().then(res => setData(res));
  }, []);

  return (
    <Box w="100%">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        {items ?? "Error: Couldn't get any data :("}
      </SimpleGrid>
    </Box>
  );
};

export default Index;
