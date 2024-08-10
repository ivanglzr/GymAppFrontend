import "@/css/index.css";

import { poppins } from "@/css/fonts";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymApp",
  description:
    "An amazing app to save all of your trainings in the gym! You can also create new exercises and save them",
  keywords: "gym, training, exercise",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>GymApp</title>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
