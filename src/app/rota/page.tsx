"use client";

import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Map from "@/components/Map";
import { useLocationStore } from "@/store/locationStore";

export default function RouteView() {
  const router = useRouter();
  const { locations } = useLocationStore();

  if (locations.length < 2) {
    return (
      <Container maxW="container.xl" py={6}>
        <Heading as="h1" size="xl" mb={6}>
          Rota Görüntüle
        </Heading>

        <Box textAlign="center" py={10}>
          <Text fontSize="lg" mb={4}>
            Rota oluşturmak için en az 2 konum eklemelisiniz.
          </Text>

          <Button onClick={() => router.push("/konum-ekle")} colorScheme="blue">
            Konum Ekle
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" size="xl" mb={6}>
        Rota Görüntüle
      </Heading>

      <Text mb={4}>
        Aşağıdaki haritada, mevcut konumunuzdan başlayarak en yakın noktadan
        itibaren tüm konumlarınıza uğrayan bir rota gösterilmektedir.
      </Text>

      <Box mb={6}>
        <Map markers={locations} drawRoute={true} />
      </Box>

      <Text fontSize="sm" color="gray.500" mt={4}>
        Not: Rota kuş uçuşu mesafeye göre hesaplanmıştır. Gerçek yol koşullarını
        dikkate almaz.
      </Text>
    </Container>
  );
}
