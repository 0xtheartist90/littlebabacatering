import Image from 'next/image';

import { ArrowRight, Briefcase, House, PartyPopper, Presentation } from 'lucide-react';

/** Each occasion links to the menu tab that fits it best (handled by CateringMenu via the URL hash). */
const occasions = [
    {
        title: 'Office lunches',
        text: 'Individually packed boxes, one per person. No serving, no mess, everyone gets their own.',
        photo: '/images/boxes.jpg',
        Icon: Briefcase,
        pick: 'Baba Box',
        tab: 'baba-box'
    },
    {
        title: 'Corporate meetings',
        text: 'A wrap, golden fries and a drink in one box. Easy to grab between agenda points.',
        photo: '/images/sandwich-tall.jpg',
        Icon: Presentation,
        pick: 'Wrap Combos',
        tab: 'wrap-combos'
    },
    {
        title: 'Family gatherings',
        text: 'Complete family-style feasts with rice, salad, dips and grilled favourites for 10.',
        photo: '/images/feast.jpg',
        Icon: House,
        pick: 'Baba Feasts',
        tab: 'feasts'
    },
    {
        title: 'Celebrations',
        text: 'Little bites, mezze and wrap platters that keep the party going. Made to share.',
        photo: '/images/spread.jpg',
        Icon: PartyPopper,
        pick: 'Sharing Platters',
        tab: 'platters'
    }
];

export function Occasions() {
    return (
        <section className='bg-pink relative overflow-hidden text-white' aria-labelledby='occasions-title'>
            <div className='mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28'>
                <h2
                    id='occasions-title'
                    className='font-display mb-8 text-4xl leading-[0.95] sm:mb-12 sm:text-6xl'>
                    Made for every kind of table.
                </h2>

                <ul className='-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden'>
                    {occasions.map(({ title, text, photo, Icon, pick, tab }, i) => (
                        <li
                            key={title}
                            className={`w-[80%] shrink-0 snap-start sm:w-auto ${i % 2 === 1 ? 'xl:translate-y-8' : ''}`}>
                            <a
                                href={`#menu-${tab}`}
                                className='group relative block aspect-[3/4] sm:aspect-[4/3] xl:aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[8px_8px_0_rgba(0,0,0,0.12)] transition duration-300 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none sm:hover:-translate-y-1.5'>
                                <Image
                                    src={photo}
                                    alt=''
                                    fill
                                    sizes='(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 80vw'
                                    quality={85}
                                    className='object-cover transition duration-700 group-hover:scale-105'
                                />
                                {/* soft fade so the card edge reads cleanly */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />

                                <span className='text-pink-deep absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md'>
                                    <Icon className='h-5 w-5' aria-hidden />
                                </span>

                                <div className='bg-cream text-ink absolute inset-x-3 bottom-3 rounded-[1.5rem] p-4 shadow-lg sm:p-5'>
                                    <h3 className='font-display text-pink-deep text-2xl leading-none sm:text-[1.7rem]'>
                                        {title}
                                    </h3>
                                    <p className='text-ink/70 mt-1.5 text-xs leading-relaxed'>{text}</p>
                                    <span className='bg-pink mt-3 inline-flex items-center gap-1.5 rounded-full whitespace-nowrap py-1.5 pr-3 pl-3.5 text-xs text-white transition group-hover:gap-2.5'>
                                        Our pick: <span className='font-medium'>{pick}</span>
                                        <ArrowRight className='h-3.5 w-3.5' aria-hidden />
                                    </span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
