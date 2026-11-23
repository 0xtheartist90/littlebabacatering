import Image from 'next/image';

import { ArrowRight, ChefHat, Clock, MessageCircleHeart, Truck } from 'lucide-react';

const steps = [
    {
        n: '1',
        Icon: MessageCircleHeart,
        title: 'Tell us about your event',
        text: 'Date, number of guests, the vibe and any dietary needs. Build your spread above or just send us a message.',
        tilt: 'md:-rotate-2'
    },
    {
        n: '2',
        Icon: ChefHat,
        title: 'We cook it fresh',
        text: 'We confirm the details with you, then prepare everything fresh in our kitchen at 75 Portland St.',
        tilt: 'md:rotate-1'
    },
    {
        n: '3',
        Icon: Truck,
        title: 'Pickup or delivery',
        text: 'Grab it yourself or have it delivered anywhere in Toronto. Packed to travel well, ready to serve.',
        tilt: 'md:-rotate-1'
    }
];

export function HowItWorks({ mascotSrc }: { mascotSrc: string }) {
    return (
        <section
            id='how'
            className='bg-pink relative scroll-mt-20 overflow-hidden py-14 text-white sm:py-20 lg:py-28'
            aria-labelledby='how-title'>
            {/* soft brand mesh over the pink */}
            <div className='bg-mesh pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen' aria-hidden />

            <div className='relative mx-auto max-w-7xl px-4 sm:px-6'>
                <h2 id='how-title' className='font-display text-4xl sm:text-7xl'>
                    Easy as 1, 2, 3.
                </h2>

                <ol className='relative mt-10 grid gap-5 sm:mt-16 md:grid-cols-3 md:gap-8'>
                    {steps.map(({ n, Icon, title, text, tilt }, i) => (
                        <li key={n} className='relative'>
                            <div
                                className={`bg-cream text-ink relative rounded-[2rem] p-6 pt-8 shadow-[8px_8px_0_rgba(0,0,0,0.12)] transition duration-300 hover:rotate-0 sm:p-8 sm:pt-10 ${tilt}`}>
                                {/* number sticker */}
                                <span className='font-display bg-pink-deep absolute -top-5 left-6 flex h-12 w-12 -rotate-6 items-center justify-center rounded-full border-4 border-white text-2xl text-white shadow-md sm:h-14 sm:w-14 sm:text-3xl'>
                                    {n}
                                </span>
                                <span className='bg-pink-soft/70 text-pink-deep absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-2xl sm:static sm:h-16 sm:w-16'>
                                    <Icon className='h-7 w-7 sm:h-8 sm:w-8' strokeWidth={1.75} aria-hidden />
                                </span>
                                <h3 className='font-display text-pink-deep pr-14 text-2xl sm:mt-5 sm:pr-0 sm:text-3xl'>
                                    {title}
                                </h3>
                                <p className='text-ink/75 mt-2 text-sm leading-relaxed'>{text}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <span
                                    className='text-pink-deep absolute top-1/2 -right-7 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md md:flex'
                                    aria-hidden>
                                    <ArrowRight className='h-5 w-5' />
                                </span>
                            )}
                        </li>
                    ))}
                </ol>

                <div className='mt-10 flex items-end justify-between gap-6 sm:mt-14'>
                    <p className='text-pink-deep inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs shadow-sm sm:rounded-full sm:px-5 sm:text-sm'>
                        <Clock className='h-4 w-4 shrink-0' aria-hidden />
                        Catering orders must be placed 48 hours in advance.
                    </p>
                    <Image
                        src={mascotSrc}
                        alt=''
                        width={180}
                        height={195}
                        className='animate-wobble hidden w-28 shrink-0 brightness-0 invert md:block lg:w-36'
                    />
                </div>
            </div>
        </section>
    );
}
