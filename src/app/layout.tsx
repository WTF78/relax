import type {Metadata} from "next";
import "./globals.css";
import React from "react";


export const metadata: Metadata = {
    title: "Relax",
    description: "Information site for Relax",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>Xo-Xo</title>
        </head>
        <body data-theme="halloween">
        {children}
        </body>
        </html>
    );
}
