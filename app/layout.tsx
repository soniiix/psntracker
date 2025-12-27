import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const sst = localFont({
    src: [
        {
            path: "../public/fonts/sst/SSTLight.ttf",
            weight: "300"
        },
        {
            path: "../public/fonts/sst/SSTRegular.ttf",
            weight: "400"
        },
        {
            path: "../public/fonts/sst/SSTMedium.ttf",
            weight: "500"
        },
        {
            path: "../public/fonts/sst/SSTBold.ttf",
            weight: "700"
        },
        {
            path: "../public/fonts/sst/SSTHeavy.ttf",
            weight: "800"
        },
    ],
    variable: "--font-sst"
});

const mont = localFont({
    src: '../public/fonts/MontBold.ttf',
    variable: "--font-mont"
})

export const metadata: Metadata = {
    title: "PSN Tracker",
    description: "Track and analyze your PlayStation trophy progress.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${sst.variable} ${mont.variable} antialiased`}
        >
            <body className="font-sst bg-primary-bg text-white selection:bg-blue selection:text-white">{children}</body>
        </html>
    );
}
