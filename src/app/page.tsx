import Image from 'next/image';

import { CateringMenu } from '@/components/catering/catering-menu';
import { HowItWorks } from '@/components/catering/how-it-works';
import { InquiryForm } from '@/components/catering/inquiry-form';
import { Occasions } from '@/components/catering/occasions';
import { OrderProvider } from '@/components/catering/order-context';
import { BuildFirstPrompt, OrderSummary } from '@/components/catering/order-summary';
import { type MarqueeItem, PhotoMarquee } from '@/components/catering/photo-marquee';
import { SiteFooter } from '@/components/catering/site-footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/registry/new-york-v4/ui/accordion';

const WP = 'https://littlebaba.com/wp-content/uploads';

const img = {
    logo: '/images/logo.png',
    logoWhite: '/images/logo-white.png',
    mascotWalk: '/images/mascot-walk.png',
    skyline: '/images/skyline.png',
    wrapPlatter: '/images/wrap-platter.jpg',
    wrapPlatterTall: '/images/wrap-platter-tall.jpg',
    spread: '/images/spread.jpg',
    boxesSpread: '/images/boxes-spread.jpg',
    boxes: '/images/boxes.jpg',
    boxInHand: '/images/box-in-hand.jpg',
    feast: '/images/feast.jpg',
    salad: '/images/salad.jpg',
    sandwichTall: '/images/sandwich-tall.jpg'
};

const galleryItems: MarqueeItem[] = [
    { src: img.spread, alt: 'A Little Baba catering spread with pink boxes', ratio: 2560 / 1708 },
    { src: img.boxInHand, alt: 'The Baba Box', ratio: 720 / 960, video: '/videos/baba-box.mp4' },
    { src: img.feast, alt: 'Lebanese feast with grilled meats and salads', ratio: 2560 / 1707 },
    { src: '/images/ig-sambousek.jpg', alt: 'Cheese sambousek in a Little Baba box', ratio: 1440 / 1920 },
    { src: img.wrapPlatter, alt: 'Baba’s Wrap Party Platter', ratio: 2560 / 1829 },
    { src: img.feast, alt: 'POV: your next catering order', ratio: 720 / 1280, video: '/videos/catering-pov.mp4' },
    { src: img.boxesSpread, alt: 'Little Baba boxes with mezze and pastries', ratio: 2560 / 1708 },
    { src: img.salad, alt: 'Creamy hummus with pita', ratio: 720 / 1280, video: '/videos/hummus.mp4' },
    { src: img.boxes, alt: 'Little Baba pink catering boxes', ratio: 2560 / 1708 },
    { src: img.salad, alt: 'Fresh Lebanese salads and dips', ratio: 1707 / 2560 },
    {
        src: img.wrapPlatterTall,
        alt: 'Chicken shawarma plate with fries',
        ratio: 720 / 1280,
        video: '/videos/shawarma-plate.mp4'
    }
];

const CATERING_MENU_PDF = `${WP}/2026/10/LittleBaba_CateringMenu_NB.pdf`;

const faqs = [
    {
        q: 'How far in advance do I need to order?',
        a: 'Please place catering orders at least 48 hours in advance.'
    },
    {
        q: 'Do you offer pickup and delivery?',
        a: 'Yes. Pick up at 75 Portland St. or choose delivery anywhere in Toronto. Delivery minimums and fees depend on location.'
    },
    {
        q: 'Is there a minimum order?',
        a: 'Individual lunches (Baba Boxes and Wrap Combos) have a minimum of 10 meals, and you can mix and match proteins across your order. Platters, feasts, salads, dips and sides can be ordered per item.'
    },
    {
        q: 'Can you cater for dietary needs and allergies?',
        a: 'Our menu includes vegetarian, vegan, gluten-free and dairy-free options, marked V, VG, GF and DF. Please let us know about any allergies when you order.'
    },
    {
        q: 'Do you provide napkins, cutlery and serving utensils?',
        a: 'Yes, they are available on request.'
    },
    {
        q: 'Do prices include tax and delivery?',
        a: 'Prices are in Canadian dollars and exclude HST, delivery and optional serviceware.'
    },
    {
        q: 'How do I place an order?',
        a: 'Fill in the form on this page, email info@littlebaba.com or call (647) 265-8237.'
    }
];

function PillLink({
    href,
    children,
    variant = 'solid',
    size = 'md'
}: {
    href: string;
    children: React.ReactNode;
    variant?: 'solid' | 'outline' | 'white';
    size?: 'sm' | 'md';
}) {
    const styles = {
        solid: 'bg-pink text-white shadow-[0_4px_0_var(--baba-pink-deep)] hover:translate-y-0.5 hover:shadow-[0_2px_0_var(--baba-pink-deep)]',
        outline: 'border-2 border-pink text-pink-deep hover:bg-pink hover:text-white',
        white: 'bg-white text-pink-deep shadow-[0_4px_0_rgba(0,0,0,0.15)] hover:translate-y-0.5'
    }[variant];

    return (
        <a
            href={href}
            className={`focus-visible:ring-pink/30 inline-flex items-center justify-center rounded-full text-center tracking-wide transition focus-visible:ring-4 focus-visible:outline-none ${size === 'sm' ? 'px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm' : 'px-6 py-3 text-sm sm:px-7 sm:py-3.5'} ${styles}`}>
            {children}
        </a>
    );
}

export default function CateringPage() {
    const marquee = [
        'Office lunches',
        'Corporate meetings',
        'Family gatherings',
        'Celebrations',
        'Pickup & delivery',
        '48h notice'
    ];

    return (
        <div className='text-ink overflow-x-clip'>
            {/* Header */}
            <header className='bg-cream/90 border-pink/15 sticky top-0 z-40 border-b backdrop-blur'>
                <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6'>
                    <a href='#top' className='shrink-0' aria-label='Little Baba – home'>
                        <Image
                            src={img.logo}
                            alt='Little Baba – Fresh Lebanese Kitchen'
                            width={72}
                            height={72}
                            priority
                            className='h-12 w-12 sm:h-16 sm:w-16'
                        />
                    </a>
                    <nav className='hidden items-center gap-8 text-sm md:flex' aria-label='Main'>
                        {[
                            ['#menu', 'Catering menu'],
                            ['#how', 'How it works'],
                            ['#faq', 'FAQ']
                        ].map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                className='hover:text-pink-deep underline-offset-8 transition hover:underline'>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <PillLink href='#quote' size='sm'>
                        Request a quote
                    </PillLink>
                </div>
            </header>

            <main id='top'>
                <OrderProvider>
                    {/* Hero + marquee together fill the first viewport (below the sticky header) */}
                    <div className='flex min-h-[calc(100svh-81px)] flex-col sm:min-h-[calc(100svh-89px)]'>
                        {/* Hero */}
                        <section className='relative flex flex-1 items-end py-6 lg:items-center'>
                            <Image
                                src={img.spread}
                                alt='A Little Baba catering spread with pink boxes, wraps, salads and dips'
                                fill
                                priority
                                sizes='100vw'
                                className='object-cover'
                            />
                            <div className='relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-0'>
                                <div className='bg-cream border-pink relative max-w-xl rounded-[2rem] border-[3px] p-6 shadow-[10px_10px_0_var(--baba-pink)] sm:p-10'>
                                    <p className='text-pink-deep text-xs tracking-[0.1em] uppercase sm:tracking-[0.2em]'>
                                        Little Baba Catering · Toronto
                                    </p>
                                    <h1 className='font-display text-pink mt-2 text-[2.75rem] leading-[0.95] sm:mt-3 sm:text-7xl'>
                                        Cater your
                                        <br />
                                        next event.
                                    </h1>
                                    <p className='mt-3 max-w-md text-sm leading-relaxed sm:mt-5 sm:text-base'>
                                        Fresh Lebanese food for office lunches, meetings, family gatherings and
                                        celebrations. Pickup or delivery across Toronto.
                                    </p>
                                    <div className='mt-5 flex flex-wrap gap-3 sm:mt-7 sm:pr-28'>
                                        <PillLink href='#menu'>Plan my catering</PillLink>
                                    </div>
                                    <Image
                                        src={img.mascotWalk}
                                        alt=''
                                        width={180}
                                        height={195}
                                        className='animate-wobble absolute right-6 bottom-6 hidden w-24 sm:block'
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Marquee */}
                        <div className='bg-pink-soft text-pink-deep overflow-hidden py-4' aria-hidden>
                            <div className='animate-marquee flex w-max gap-10 whitespace-nowrap'>
                                {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
                                    <span
                                        key={i}
                                        className='font-display flex items-center gap-10 text-2xl sm:text-3xl'>
                                        {t}
                                        <span className='text-white'>✦</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Occasions */}
                    <Occasions />

                    {/* Catering menu */}
                    <section
                        id='menu'
                        className='bg-mesh scroll-mt-20 py-12 sm:py-16 lg:py-24'
                        aria-labelledby='menu-title'>
                        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
                            <div className='mb-8 text-center'>
                                <p className='text-pink-deep text-xs tracking-[0.25em] uppercase'>The catering menu</p>
                                <h2 id='menu-title' className='font-display text-pink mt-2 text-5xl sm:text-6xl'>
                                    Build your spread
                                </h2>
                            </div>

                            <CateringMenu pdfHref={CATERING_MENU_PDF} />
                        </div>
                    </section>

                    {/* How it works */}
                    <HowItWorks mascotSrc={img.mascotWalk} />

                    {/* Photo + video marquee (click to enlarge) */}
                    <PhotoMarquee items={galleryItems} />

                    {/* Quote form */}
                    <section
                        id='quote'
                        className='bg-pink scroll-mt-20 py-14 text-white sm:py-20 lg:py-28'
                        aria-labelledby='quote-title'>
                        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
                            <BuildFirstPrompt />
                            <div className='grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]'>
                                <div>
                                    <h2 id='quote-title' className='font-display text-4xl leading-none sm:text-6xl'>
                                        Let’s feed your people.
                                    </h2>
                                    <p className='mt-4 text-sm leading-relaxed sm:mt-5 sm:text-base'>
                                        Tell us a little about your event and we’ll get back to you with a tailored
                                        proposal.
                                    </p>

                                    <div className='mt-6 sm:mt-8'>
                                        <OrderSummary />
                                    </div>
                                </div>
                                <div className='bg-cream text-ink rounded-[2rem] border-[3px] border-white p-5 shadow-[8px_8px_0_rgba(255,255,255,0.45)] sm:p-10 sm:shadow-[10px_10px_0_rgba(255,255,255,0.45)]'>
                                    <InquiryForm />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ, with the Toronto skyline drawing as a full-width backdrop */}
                    <section
                        id='faq'
                        className='bg-cream relative scroll-mt-20 overflow-hidden'
                        aria-labelledby='faq-title'>
                        <Image
                            src={img.skyline}
                            alt=''
                            width={2560}
                            height={976}
                            sizes='100vw'
                            className='pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-60 select-none'
                        />
                        <div className='relative mx-auto max-w-6xl px-4 pt-12 pb-[12vw] sm:px-6 sm:pt-16 lg:pt-20 lg:pb-[7vw]'>
                            <div className='bg-cream/95 border-pink/20 grid gap-2 rounded-3xl border-2 px-5 pt-6 pb-1 shadow-[0_10px_40px_rgba(239,80,138,0.12)] backdrop-blur-sm sm:px-8 sm:pt-8 md:grid-cols-[0.6fr_1.4fr] md:gap-10 md:py-6'>
                                <h2
                                    id='faq-title'
                                    className='font-display text-pink text-4xl leading-[0.95] sm:text-5xl md:pt-3'>
                                    Good questions
                                </h2>
                                <Accordion type='single' collapsible>
                                    {faqs.map((f, i) => (
                                        <AccordionItem
                                            key={f.q}
                                            value={`f${i}`}
                                            className='border-pink/30 border-b-2 border-dashed last:border-b-0'>
                                            <AccordionTrigger className='text-ink [&>svg]:text-pink py-3.5 text-sm hover:no-underline sm:text-[15px]'>
                                                {f.q}
                                            </AccordionTrigger>
                                            <AccordionContent className='text-ink/75 pb-3.5 text-sm leading-relaxed'>
                                                {f.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </section>
                </OrderProvider>
            </main>

            {/* Footer */}
            <SiteFooter logoSrc={img.logoWhite} />
        </div>
    );
}
