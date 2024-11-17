import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
    title: "Дошка оголошень",
};

export default function RootLayout({children}) {
    return (
        <html lang="ua">
        <body>
        <Header/>
        {children}
        </body>
        </html>
    );
}
