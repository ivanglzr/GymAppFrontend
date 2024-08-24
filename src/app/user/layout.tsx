import { UserProvider } from "@/context/user";
import { TrainingsProvider } from "@/context/trainings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserProvider>
        <TrainingsProvider>{children}</TrainingsProvider>
      </UserProvider>
      <script
        src="https://kit.fontawesome.com/f6c6e8c516.js"
        crossOrigin="anonymous"
        async
      ></script>
    </>
  );
}
