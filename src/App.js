import React, { useEffect, useMemo, useState } from "react";
import {
  ChakraProvider,
  Text,
  Box,
  Flex,
  Input,
  Button,
  ScaleFade,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [person, setPerson] = useState("");
  const [data, setData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const getHouse = async (name) => {
    await axios
      .get(
        `https://sheetdb.io/api/v1/7gzvkxm11rgjz/search?sheet=program&nome=${name}`
      )
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
        setShowMessage(true);
      })
      .catch((error) => console.log(error));
  };

  const handleColor = useMemo(() => {
    if (data?.casa === "IMPÉRIO EGÍPCIO") return "#00FF00";
    if (data?.casa === "IMPÉRIO GREGO") return "#FF9902";
    if (data?.casa === "IMPÉRIO PERSA") return "#614C99";
    if (data?.casa === "IMPÉRIO ROMANO") return "#A64D79";
  }, [data]);

  const handleBack = () => {
    setData(null);
    setPerson("");
    setShowMessage(false);
  };

  return (
    <ChakraProvider>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        w="100vw"
        h="80vh"
      >
        {!data ? (
          <>
            <Box mb={12} textAlign="center">
              <Text fontSize={32} fontWeight="900" mb={2}>
                Bem vindo a Zion!
              </Text>
              <Text fontSize={18} fontWeight="600" px={12}>
                Digite seu nome e sobrenome na caixa e descubra sua casa!
              </Text>
            </Box>

            <Flex flexDir="column" alignItems="stretch">
              <Input
                placeholder="Ex.: Lucas Azevedo"
                mb={2}
                value={person}
                onChange={(event) => setPerson(event.target.value)}
              />

              <Button
                px={12}
                mb={4}
                color="white"
                backgroundColor="blue.700"
                disabled={!person || person === ""}
                _disabled={{ opacity: 0.5 }}
                onClick={() => getHouse(person)}
              >
                Descobrir
              </Button>
            </Flex>

            <Text
              color="red.300"
              fontSize={12}
              fontWeight="600"
              textAlign="center"
              px={6}
            >
              Se sua casa não for encontrada, pode ter acontecido algum erro no
              nosso banco de dados. Por favor, procure um líder.
            </Text>
          </>
        ) : (
          <ScaleFade in={showMessage} transition={{ duration: 2 }}>
            <Box textAlign="center">
              <Text color="gray.600" fontSize={22} fontWeight="600" mb={1}>
                {data?.nome}, sua casa é:
              </Text>

              <Text color={handleColor} fontSize={24} fontWeight="800" mb={8}>
                {data?.casa}
              </Text>

              <Button
                px={12}
                color="white"
                backgroundColor="blue.700"
                onClick={() => handleBack()}
              >
                Voltar
              </Button>
            </Box>
          </ScaleFade>
        )}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
