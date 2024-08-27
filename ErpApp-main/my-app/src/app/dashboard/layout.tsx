import { Sidebar } from "@/containers/Sidebar";
// import { AuthLeftContainer } from "@/containers/AuthLeftContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex w-screen h-screen border">
    {/* <AuthLeftContainer /> */}
    <Sidebar />
    {children}
    </div>;
}
