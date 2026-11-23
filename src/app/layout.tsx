import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { DM_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import '@/app/globals.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

// Brand display font, self-hosted with Little Baba's permission.
const display = localFont({
    src: [
        { path: './fonts/ATP-Pleasurize.woff2', weight: '400', style: 'normal' },
        { path: './fonts/ATP-Pleasurize.woff', weight: '400', style: 'normal' }
    ],
    variable: '--font-pleasurize',
    display: 'swap'
});

// Body font is Degular Mono from Little Baba's Adobe Fonts kit (ebh3iqk). Adobe kits only serve
// fonts on domains added to the kit, so DM Mono is the fallback until this site's domain is added.
const ADOBE_FONTS_KIT = 'https://use.typekit.net/ebh3iqk.css';
const monoFallback = DM_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-mono' });

export const metadata: Metadata = {
    title: 'Catering – Little Baba | Fresh Lebanese Kitchen, Toronto',
    description:
        'Lebanese catering in Toronto: wrap platters, Baba Boxes, little bites and dips for office lunches, meetings, family gatherings and celebrations. Pickup & delivery, order 48 hours ahead.',
    icons: { icon: '/images/favicon.png' }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en'>
            <head>
                <link rel='preconnect' href='https://use.typekit.net' crossOrigin='' />
                <link rel='stylesheet' href={ADOBE_FONTS_KIT} />
            </head>
            <body className={`${display.variable} ${monoFallback.variable} font-mono antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
};

export default Layout;
