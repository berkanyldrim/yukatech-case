"use client";
import { useEffect, useState, useCallback, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Location } from "@/store/locationStore";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 41.0082, // İstanbul'un yaklaşık koordinatları
  lng: 28.9784,
};

interface MapProps {
  markers?: Location[];
  onMapClick?: (lat: number, lng: number) => void;
  drawRoute?: boolean;
  children?: ReactNode;
}

export default function Map({
  markers = [],
  onMapClick,
  drawRoute = false,
  children,
}: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Tarayıcı ortamında olduğumuzu kontrol et
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Kullanıcının konumunu al
  useEffect(() => {
    if (!isBrowser) return; // Sadece tarayıcı ortamında çalıştır

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(false);
        },
        () => {
          console.log(
            "Konum erişimi reddedildi, varsayılan konum kullanılıyor"
          );
          setLocationError(true);
          // Varsayılan konumu kullan
          setUserLocation(defaultCenter);
        }
      );
    } else {
      console.log("Tarayıcı konum desteği yok, varsayılan konum kullanılıyor");
      setLocationError(true);
      setUserLocation(defaultCenter);
    }
  }, [isBrowser]); // isBrowser değiştiğinde çalıştır

  // Rota çizgisi oluştur
  useEffect(() => {
    if (
      !isBrowser ||
      !isLoaded ||
      !map ||
      !drawRoute ||
      markers.length < 2 ||
      !userLocation
    )
      return;

    // Eski polyline'ı temizle
    if (polyline) {
      polyline.setMap(null);
    }

    // Konumları mesafeye göre sırala (kuş uçuşu)
    const sortedMarkers = [...markers].sort((a, b) => {
      const distA = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        a.latitude,
        a.longitude
      );
      const distB = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        b.latitude,
        b.longitude
      );
      return distA - distB;
    });

    // Rota noktalarını oluştur
    const path = sortedMarkers.map((marker) => ({
      lat: marker.latitude,
      lng: marker.longitude,
    }));

    // Polyline oluştur
    const newPolyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    newPolyline.setMap(map);
    setPolyline(newPolyline);

    // Tüm markerları görecek şekilde haritayı ayarla
    const bounds = new google.maps.LatLngBounds();
    path.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds);
  }, [isBrowser, isLoaded, map, markers, drawRoute, userLocation]);

  // İki nokta arasındaki mesafeyi hesapla (Haversine formülü)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Dünya yarıçapı (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (onMapClick && e.latLng) {
      onMapClick(e.latLng.lat(), e.latLng.lng());
    }
  };

  if (!isBrowser) return null; // Sunucu tarafında hiçbir şey render etme
  if (!isLoaded) return <Box>Harita yükleniyor...</Box>;

  return (
    <Box position="relative" width="100%" height="500px">
      {locationError && (
        <Box
          position="absolute"
          top={2}
          left={2}
          zIndex={10}
          bg="yellow.100"
          p={2}
          borderRadius="md"
          fontSize="sm"
          color="yellow.800"
        >
          Konum erişimi sağlanamadı. Varsayılan konum kullanılıyor.
        </Box>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {/* Kullanıcı konumu */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}

        {/* Konum işaretçileri */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => setSelectedMarker(marker)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: marker.color,
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#000",
              scale: 10,
            }}
          />
        ))}

        {/* Seçili işaretçi bilgisi */}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>Enlem: {selectedMarker.latitude.toFixed(6)}</p>
              <p>Boylam: {selectedMarker.longitude.toFixed(6)}</p>
            </div>
          </InfoWindow>
        )}

        {children}
      </GoogleMap>
    </Box>
  );
}
