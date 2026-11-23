import Image from 'next/image';

import { ArrowUp, Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden>
            <path d='M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.67a5.73 5.73 0 0 0-.8-.06 5.7 5.7 0 0 0-5.7 5.7 5.7 5.7 0 0 0 5.7 5.69 5.7 5.7 0 0 0 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z' />
        </svg>
    );
}

const socials = [
    { href: 'https://www.instagram.com/littlebaba.to/', label: 'Instagram', Icon: Instagram },
    { href: 'https://www.tiktok.com/@littlebaba.to', label: 'TikTok', Icon: TikTokIcon }
];

const linkClass = 'underline-offset-4 transition hover:underline';

export function SiteFooter({ logoSrc }: { logoSrc: string }) {
    return (
        <footer className='bg-pink relative overflow-hidden text-white'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6'>
                {/* Call to action */}
                <div className='flex flex-col gap-6 border-b-2 border-dashed border-white/40 py-10 sm:py-14 md:flex-row md:items-center md:justify-between'>
                    <h2 className='font-display text-4xl leading-none sm:text-6xl'>Hungry for a quote?</h2>
                    <div className='flex flex-wrap items-center gap-3'>
                        <a
                            href='#quote'
                            className='text-pink-deep rounded-full bg-white px-6 py-3 text-sm shadow-[0_4px_0_rgba(0,0,0,0.15)] transition hover:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none sm:px-7 sm:py-3.5'>
                            Request a quote →
                        </a>
                        <a
                            href='tel:+16472658237'
                            className='rounded-full border-2 border-white px-6 py-3 text-sm transition hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none sm:px-7 sm:py-3.5'>
                            Call us
                        </a>
                    </div>
                </div>

                {/* Info grid */}
                <div className='grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10'>
                    <div className='col-span-2 md:col-span-1'>
                        <Image
                            src={logoSrc}
                            alt='Little Baba'
                            width={120}
                            height={120}
                            className='h-20 w-20 md:h-24 md:w-24'
                        />
                        <p className='mt-4 max-w-xs text-sm leading-relaxed text-white/90'>
                            Fresh food. Real ingredients. Big flavour. Signature Lebanese dishes for your office, party
                            or family table.
                        </p>
                    </div>

                    <div>
                        <h3 className='mb-3 text-xs tracking-[0.2em] text-white/75 uppercase'>Opening hours</h3>
                        <p className='flex items-start gap-2 text-sm'>
                            <Clock className='mt-0.5 h-4 w-4 shrink-0' aria-hidden />
                            <span>
                                Every day
                                <br />
                                12PM – 10PM
                            </span>
                        </p>
                    </div>

                    <div>
                        <h3 className='mb-3 text-xs tracking-[0.2em] text-white/75 uppercase'>Contact</h3>
                        <address className='space-y-2 text-sm not-italic'>
                            <p className='flex items-start gap-2'>
                                <MapPin className='mt-0.5 h-4 w-4 shrink-0' aria-hidden />
                                <a
                                    href='https://maps.google.com/?q=75+Portland+St,+Toronto,+ON+M5V+2M9'
                                    className={linkClass}>
                                    75 Portland St.
                                    <br />
                                    Toronto, ON M5V 2M9
                                </a>
                            </p>
                            <p className='flex items-center gap-2'>
                                <Mail className='h-4 w-4 shrink-0' aria-hidden />
                                <a href='mailto:info@littlebaba.com' className={`${linkClass} break-all`}>
                                    info@littlebaba.com
                                </a>
                            </p>
                            <p className='flex items-center gap-2'>
                                <Phone className='h-4 w-4 shrink-0' aria-hidden />
                                <a href='tel:+16472658237' className={linkClass}>
                                    (647) 265-8237
                                </a>
                            </p>
                        </address>
                    </div>

                    <div className='col-span-2 sm:col-span-1'>
                        <h3 className='mb-3 text-xs tracking-[0.2em] text-white/75 uppercase'>Follow us</h3>
                        <ul className='flex gap-2'>
                            {socials.map(({ href, label, Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={`Little Baba on ${label}`}
                                        className='text-pink-deep flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none'>
                                        <Icon className='h-5 w-5' />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href='https://order.toasttab.com/online/little-baba-75-portland-street'
                            className={`mt-4 inline-block text-sm ${linkClass}`}>
                            Order pickup →
                        </a>
                    </div>
                </div>
            </div>

            {/* Big wordmark */}
            <p
                className='font-display pointer-events-none -mb-[0.22em] text-center text-[22vw] leading-none whitespace-nowrap text-white/15 select-none'
                aria-hidden>
                Little Baba
            </p>

            {/* Bottom bar */}
            <div className='relative bg-black/10'>
                <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/85 sm:flex-row sm:px-6'>
                    <p>© {new Date().getFullYear()} Little Baba · Fresh Lebanese Kitchen · Toronto</p>
                    <nav className='flex items-center gap-5' aria-label='Footer'>
                        <a href='#menu' className={linkClass}>
                            Catering menu
                        </a>
                        <a href='#faq' className={linkClass}>
                            FAQ
                        </a>
                        <a href='#top' className='inline-flex items-center gap-1 hover:underline'>
                            Back to top <ArrowUp className='h-3.5 w-3.5' aria-hidden />
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
