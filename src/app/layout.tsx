"use client";
import { Provider } from "@/components/provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <title>Konum Yönetim Uygulaması</title>
        <meta
          name="description"
          content="Konumlarınızı ekleyin, düzenleyin ve rotalar oluşturun."
        />
      </head>
      <body>
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
