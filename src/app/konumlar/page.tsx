"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Map from "@/components/Map";
import { useLocationStore } from "@/store/locationStore";

export default function LocationsList() {
  const router = useRouter();
  const { locations } = useLocationStore();
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  const handleLocationClick = (id: string) => {
    if (expandedLocation === id) {
      setExpandedLocation(null);
    } else {
      setExpandedLocation(id);
    }
  };

  const handleEditClick = (id: string) => {
    router.push(`/konum-duzenle/${id}`);
  };

  const handleShowRouteClick = () => {
    router.push("/rota");
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          Konumlar
        </Heading>

        <Button
          colorScheme="blue"
          onClick={handleShowRouteClick}
          disabled={locations.length < 2}
        >
          Rota Göster
        </Button>
      </Flex>

      {locations.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" mb={4}>
            Henüz kaydedilmiş konum bulunmamaktadır.
          </Text>
          <Button colorScheme="blue" onClick={() => router.push("/konum-ekle")}>
            Konum Ekle
          </Button>
        </Box>
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              height="500px"
              overflowY="auto"
            >
              {locations.map((location) => (
                <Box
                  key={location.id}
                  p={3}
                  mb={2}
                  borderWidth={1}
                  borderRadius="md"
                  cursor="pointer"
                >
                  <Flex justify="space-between" align="center">
                    <Flex
                      align="center"
                      gap={3}
                      onClick={() => handleLocationClick(location.id)}
                      cursor="pointer"
                    >
                      <Box
                        width="24px"
                        height="24px"
                        borderRadius="full"
                        bg={location.color}
                        border="1px solid"
                        borderColor="gray.300"
                      />
                      <Text fontWeight="bold">{location.name}</Text>
                    </Flex>

                    <Button
                      aria-label="Düzenle"
                      size="sm"
                      onClick={() => handleEditClick(location.id)}
                    >
                      →
                    </Button>
                  </Flex>

                  {expandedLocation === location.id && (
                    <Box mt={3} ml={10}>
                      <Text>Enlem: {location.latitude.toFixed(6)}</Text>
                      <Text>Boylam: {location.longitude.toFixed(6)}</Text>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </GridItem>
          <GridItem>
            <Box
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              height="500px"
            >
              <Map markers={locations} onMapClick={() => {}} />
            </Box>
          </GridItem>
        </Grid>
      )}
    </Container>
  );
}
