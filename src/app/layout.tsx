import "@/css/index.css";

import { poppins } from "@/css/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          src="https://kit.fontawesome.com/c7812e7e0b.js"
          crossOrigin="anonymous"
          defer
        ></script>
        <title>GymApp</title>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
