"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import Map from "@/components/Map";
import { useLocationStore } from "@/store/locationStore";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

export default function AddLocation() {
  const router = useRouter();
  const { addLocation } = useLocationStore();

  const [locationName, setLocationName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markerColor, setMarkerColor] = useState("#FF0000");

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationName.trim()) {
      toaster.error({
        title: "Hata",
        description: "Lütfen konum adı girin.",
      });
      return;
    }

    if (!selectedLocation) {
      toaster.error({
        title: "Hata",
        description: "Lütfen haritadan bir konum seçin.",
      });
      return;
    }

    addLocation({
      name: locationName,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      color: markerColor,
    });

    setLocationName("");
    setSelectedLocation(null);
    setMarkerColor("#FF0000");

    toaster.success({
      title: "Başarılı",
      description: "Konum başarıyla eklendi.",
    });

    router.push("/konumlar");
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" size="xl" mb={6}>
        Konum Ekle
      </Heading>

      <Box mb={6}>
        <Text mb={2}>Haritadan bir konum seçin:</Text>
        <Map
          onMapClick={handleMapClick}
          markers={
            selectedLocation
              ? [
                  {
                    id: "temp",
                    name: locationName || "Yeni Konum",
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                    color: markerColor,
                  },
                ]
              : []
          }
        />
      </Box>

      <Box as="form" onSubmit={handleSubmit}>
        <Box mb={4}>
          <Text fontWeight="bold" mb={1}>
            Konum Adı
          </Text>
          <Input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Örn: Ev, İş, Okul"
            required
          />
        </Box>

        {selectedLocation && (
          <Box mb={4}>
            <Text fontWeight="bold">Seçilen Konum:</Text>
            <Text>Enlem: {selectedLocation.lat.toFixed(6)}</Text>
            <Text>Boylam: {selectedLocation.lng.toFixed(6)}</Text>
          </Box>
        )}

        <Box mb={4}>
          <Text fontWeight="bold" mb={1}>
            İşaretçi Rengi
          </Text>
          <Flex align="center" gap={2}>
            <Input
              type="color"
              value={markerColor}
              onChange={(e) => setMarkerColor(e.target.value)}
              width="100px"
            />
            <Box
              width="24px"
              height="24px"
              borderRadius="full"
              bg={markerColor}
              border="1px solid"
              borderColor="gray.300"
            />
          </Flex>
        </Box>

        <Button type="submit" colorScheme="blue" mt={2}>
          Konumu Kaydet
        </Button>
      </Box>
    </Container>
  );
}
