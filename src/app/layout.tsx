import "./globals.css";
import {Providers} from "@/components/Providers/Providers";
import {NavBar} from "@/components/NavBar/NavBar";
import {LikedJobsProvider} from "@/context/LikedJobContext";
import {ProfileProvider} from "@/context/ProfileContext";
import {AuthContextProvider} from "@/context/AuthContext";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <Providers>
            <LikedJobsProvider>
                <ProfileProvider>
                    <AuthContextProvider>
                    <NavBar/>
                    <main className="flex-grow pb-16 md:pb-0">
                        {children}
                    </main>
                    </AuthContextProvider>
                </ProfileProvider>
            </LikedJobsProvider>
        </Providers>
        </body>
        </html>
    );
}
