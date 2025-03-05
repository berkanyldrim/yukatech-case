"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useLocationStore } from "@/store/locationStore";

export default function Home() {
  const router = useRouter();
  const { locations } = useLocationStore();
  const bgGradient = "linear(to-r, blue.400, teal.500)";
  const cardBg = "white";
  const cardBorder = "gray.200";

  return (
    <Container maxW="container.xl" py={8}>
      <Box
        borderRadius="lg"
        p={8}
        mb={10}
        bgGradient={bgGradient}
        boxShadow="xl"
      >
        <Heading as="h1" size="2xl" mb={4}>
          Konum Yönetim Uygulaması
        </Heading>
        <Text fontSize="xl" maxW="container.md">
          Bu uygulama ile önemli konumlarınızı kaydedebilir, düzenleyebilir ve
          aralarında rota oluşturabilirsiniz.
        </Text>
        <Flex mt={6} gap={4} flexWrap="wrap">
          <Button
            size="lg"
            colorScheme="whiteAlpha"
            onClick={() => router.push("/konum-ekle")}
          >
            Konum Ekle
          </Button>
          <Button
            size="lg"
            colorScheme="blackAlpha"
            onClick={() => router.push("/konumlar")}
          >
            Konumları Görüntüle
          </Button>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mb={10}>
        <Box
          p={6}
          borderRadius="md"
          borderWidth="1px"
          borderColor={cardBorder}
          boxShadow="md"
        >
          <VStack align="start" gap={4}>
            <Heading as="h3" size="md">
              Konum Ekleme
            </Heading>
            <Text>
              Harita üzerinden tıklayarak veya koordinatları girerek yeni
              konumlar ekleyebilirsiniz.
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => router.push("/konum-ekle")}
            >
              Konum Ekle
            </Button>
          </VStack>
        </Box>

        <Box
          p={6}
          borderRadius="md"
          borderWidth="1px"
          borderColor={cardBorder}
          boxShadow="md"
        >
          <VStack align="start" gap={4}>
            <Heading as="h3" size="md">
              Konum Listesi
            </Heading>
            <Text>
              Kaydettiğiniz tüm konumları görüntüleyin, düzenleyin veya silin.
            </Text>
            <Text fontWeight="bold">
              Mevcut Konum Sayısı: {locations.length}
            </Text>
            <Button colorScheme="blue" onClick={() => router.push("/konumlar")}>
              Konumları Görüntüle
            </Button>
          </VStack>
        </Box>

        <Box
          p={6}
          borderRadius="md"
          borderWidth="1px"
          borderColor={cardBorder}
          boxShadow="md"
        >
          <VStack align="start" gap={4}>
            <Heading as="h3" size="md">
              Rota Görüntüleme
            </Heading>
            <Text>
              Mevcut konumunuzdan başlayarak, en yakın konumdan en uzağa doğru
              otomatik rota oluşturun.
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => router.push("/rota")}
              disabled={locations.length < 2}
            >
              Rota Görüntüle
            </Button>
            {locations.length < 2 && (
              <Text fontSize="sm" color="red.500">
                Rota oluşturmak için en az 2 konum gereklidir.
              </Text>
            )}
          </VStack>
        </Box>
      </SimpleGrid>

      <Box
        p={6}
        borderRadius="md"
        borderWidth="1px"
        borderColor={cardBorder}
        boxShadow="md"
      >
        <Heading as="h3" size="md" mb={4}>
          Uygulama Hakkında
        </Heading>
        <Text mb={4}>
          Bu uygulama, Next.js, Chakra UI, Zustand ve Google Maps API
          kullanılarak geliştirilmiştir. Konumlarınızı kaydetmek, düzenlemek ve
          aralarında rota oluşturmak için kullanabilirsiniz.
        </Text>
        <Text>
          Uygulamayı kullanmak için öncelikle konum ekleyerek başlayın. Daha
          sonra eklediğiniz konumları listeleyebilir, düzenleyebilir veya
          silebilirsiniz. En az iki konum eklediğinizde, bu konumlar arasında
          otomatik rota oluşturabilirsiniz.
        </Text>
      </Box>
    </Container>
  );
}
