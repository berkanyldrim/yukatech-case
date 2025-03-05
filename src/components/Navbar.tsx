"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { ColorModeButton } from "@/components/color-mode";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const borderColor = "gray.200";
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Konum Ekle", path: "/konum-ekle" },
    { name: "Konumlar", path: "/konumlar" },
    { name: "Rota Görüntüle", path: "/rota" },
  ];

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="sticky"
      borderBottom="1px"
      borderColor={borderColor}
      shadow="sm"
      px={4}
      py={2}
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="container.xl"
        mx="auto"
      >
        <Heading as="h1" size="md" fontWeight="bold">
          Yukatech Case
        </Heading>

        <Flex gap={4} align="center">
          <ColorModeButton />
          <Flex gap={2}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => router.push(item.path)}
                variant={isActive(item.path) ? "solid" : "ghost"}
                colorScheme={isActive(item.path) ? "blue" : undefined}
                size="sm"
              >
                {item.name}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
