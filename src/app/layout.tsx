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
        <title>GymApp</title>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
