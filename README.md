# Konum Yönetim Uygulaması

Bu uygulama, konum ekleme, listeleme, düzenleme ve harita üzerinde rota oluşturma işlevlerine sahip bir web uygulamasıdır.

## Özellikler

- **Konum Ekleme**: Harita üzerinden konum seçme, konum adı ve marker rengi belirleme
- **Konum Listeleme**: Kaydedilmiş konumları listeleme, konum detaylarını görüntüleme
- **Konum Düzenleme**: Mevcut konumları düzenleme ve silme
- **Rota Görüntüleme**: Kullanıcının mevcut konumundan başlayarak en yakın noktadan itibaren tüm konumlara uğrayan bir rota oluşturma

## Teknolojiler

- Next.js 15
- Chakra UI
- Zustand (State yönetimi)
- Google Maps API

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/berkanyldrim/yukatech-case.git
cd yukatech-case
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env.local` dosyasını oluşturun ve Google Maps API anahtarınızı ekleyin:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

4. Uygulamayı başlatın:

```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## Google Maps API Anahtarı Alma

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin.
2. Yeni bir proje oluşturun veya mevcut bir projeyi seçin.
3. "API ve Servisler" > "Kütüphane" bölümüne gidin.
4. "Maps JavaScript API" ve "Geocoding API" servislerini etkinleştirin.
5. "API ve Servisler" > "Kimlik Bilgileri" bölümüne gidin.
6. "Kimlik Bilgisi Oluştur" > "API Anahtarı" seçeneğini tıklayın.
7. Oluşturulan API anahtarını `.env.local` dosyasına ekleyin.

## Sayfalar

- `/`: Ana sayfa
- `/konum-ekle`: Konum ekleme sayfası
- `/konumlar`: Konum listeleme sayfası
- `/konum-duzenle/[id]`: Konum düzenleme sayfası
- `/rota`: Rota görüntüleme sayfası

## Notlar

- Uygulama, tarayıcı yerel depolama alanını kullanarak konumları saklar.
- Rota hesaplaması kuş uçuşu mesafeye göre yapılır ve gerçek yol koşullarını dikkate almaz.
