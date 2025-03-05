"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import Map from "@/components/Map";
import { useLocationStore } from "@/store/locationStore";
import { toaster } from "@/components/ui/toaster";

export default function EditLocation() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getLocationById, updateLocation } = useLocationStore();

  const [locationName, setLocationName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markerColor, setMarkerColor] = useState("#FF0000");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params || !params.id) {
      setError("Konum ID bulunamadı.");
      setIsLoading(false);
      return;
    }

    const location = getLocationById(params.id);

    if (!location) {
      setError("Konum bulunamadı.");
      setIsLoading(false);
      return;
    }

    setLocationName(location.name);
    setSelectedLocation({ lat: location.latitude, lng: location.longitude });
    setMarkerColor(location.color);
    setIsLoading(false);
  }, [params, getLocationById]);

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

    updateLocation(params.id, {
      name: locationName,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      color: markerColor,
    });

    toaster.success({
      title: "Başarılı",
      description: "Konum başarıyla güncellendi.",
    });

    router.push("/konumlar");
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>Yükleniyor...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text color="red.500">{error}</Text>
        <Button onClick={() => router.push("/konumlar")} mt={4}>
          Konumlara Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" size="xl" mb={6}>
        Konum Düzenle
      </Heading>

      <Box mb={6}>
        <Text mb={2}>Haritadan bir konum seçin:</Text>
        <Map
          onMapClick={handleMapClick}
          markers={
            selectedLocation
              ? [
                  {
                    id: params.id,
                    name: locationName,
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

        <Flex gap={4} mt={4}>
          <Button type="submit" colorScheme="blue">
            Güncelle
          </Button>

          <Button variant="outline" onClick={() => router.push("/konumlar")}>
            İptal
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
