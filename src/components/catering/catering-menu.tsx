'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    type Diet,
    type ItemOption,
    type MenuItem,
    categories,
    dishImages,
    itemKey,
    variantLabel
} from '@/components/catering/menu-data';
import { useOrder } from '@/components/catering/order-context';
import { OrderBar } from '@/components/catering/order-summary';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { Carrot, Download, Leaf, Milk, Minus, Plus, Wheat, X, ZoomIn } from 'lucide-react';

const diets: Record<Diet, { label: string; Icon: typeof Leaf }> = {
    VG: { label: 'Vegan', Icon: Leaf },
    V: { label: 'Vegetarian', Icon: Carrot },
    GF: { label: 'Gluten-free', Icon: Wheat },
    DF: { label: 'Dairy-free', Icon: Milk }
};

/** Icon-only badge in the menu (label shown on hover + for screen readers); the legend passes withLabel. */
function DietIcon({ t, withLabel = false }: { t: Diet; withLabel?: boolean }) {
    const { label, Icon } = diets[t];
    const badge = (
        <span
            title={label}
            className='bg-pink-soft text-pink-deep ring-pink/25 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1'>
            <Icon className='h-4 w-4' strokeWidth={2.25} aria-hidden />
            {!withLabel && <span className='sr-only'>{label}</span>}
        </span>
    );

    if (!withLabel) return badge;

    return (
        <span className='text-ink/80 inline-flex items-center gap-2 text-xs'>
            {badge}
            {label}
        </span>
    );
}

function Stepper({ id, name }: { id: string; name: string }) {
    const { quantities, setQty } = useOrder();
    const qty = quantities[id] ?? 0;
    const btn =
        'flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none';

    if (qty === 0) {
        return (
            <button
                type='button'
                onClick={() => setQty(id, 1)}
                aria-label={`Add ${name}`}
                className={`${btn} border-pink text-pink-deep hover:bg-pink border-2 hover:text-white`}>
                <Plus className='h-4 w-4' aria-hidden />
            </button>
        );
    }

    return (
        <div className='bg-pink flex items-center rounded-full text-white'>
            <button
                type='button'
                onClick={() => setQty(id, qty - 1)}
                aria-label={`Remove one ${name}`}
                className={`${btn} hover:bg-white/20`}>
                <Minus className='h-4 w-4' aria-hidden />
            </button>
            <input
                type='number'
                inputMode='numeric'
                min={0}
                value={qty}
                onChange={(e) => setQty(id, e.target.valueAsNumber)}
                aria-label={`Quantity of ${name}`}
                className='w-9 [appearance:textfield] bg-transparent text-center text-sm tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none'
            />
            <button
                type='button'
                onClick={() => setQty(id, qty + 1)}
                aria-label={`Add one more ${name}`}
                className={`${btn} hover:bg-white/20`}>
                <Plus className='h-4 w-4' aria-hidden />
            </button>
        </div>
    );
}

function Row({ categoryId, item, compact = false }: { categoryId: string; item: MenuItem; compact?: boolean }) {
    const { quantities } = useOrder();
    const id = itemKey(categoryId, item.name);
    const selected = (quantities[id] ?? 0) > 0;

    return (
        <li
            className={`-mx-3 flex items-center gap-3 rounded-xl px-3 transition ${compact ? 'py-1.5' : 'py-2.5'} ${selected ? 'bg-pink-soft/35' : ''}`}>
            <ItemInfo item={item} image={dishImages[id]} compact={compact} />
            <Stepper id={id} name={item.name} />
        </li>
    );
}

/** Dish thumbnail; click to see the photo full size. */
function DishPhoto({ src, name, compact }: { src: string; name: string; compact: boolean }) {
    const [open, setOpen] = useState(false);

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger
                aria-label={`View photo of ${name}`}
                className={`group/photo bg-pink-soft/40 focus-visible:ring-pink/40 relative shrink-0 cursor-zoom-in overflow-hidden focus-visible:ring-4 focus-visible:outline-none ${
                    compact ? 'h-16 w-16 rounded-xl' : 'h-20 w-20 rounded-2xl sm:h-24 sm:w-24'
                }`}>
                <Image
                    src={src}
                    alt=''
                    fill
                    sizes='96px'
                    className='object-cover transition duration-300 group-hover/photo:scale-110'
                />
                <span className='bg-ink/0 group-hover/photo:bg-ink/25 absolute inset-0 flex items-center justify-center text-white opacity-0 transition group-hover/photo:opacity-100'>
                    <ZoomIn className='h-5 w-5' aria-hidden />
                </span>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className='data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/85' />
                {/* Click anywhere (photo, title or backdrop) to go back. */}
                <DialogPrimitive.Content
                    onClick={() => setOpen(false)}
                    aria-describedby={undefined}
                    className='data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-5 p-4 outline-none sm:p-10'>
                    <DialogPrimitive.Title className='font-display bg-cream text-pink-deep rounded-full px-7 py-2.5 text-3xl leading-none shadow-lg sm:text-4xl'>
                        {name}
                    </DialogPrimitive.Title>
                    <div className='relative aspect-square w-full max-w-[min(90vw,calc(100svh-10rem))] overflow-hidden rounded-[2rem] shadow-2xl'>
                        <Image
                            src={src}
                            alt={name}
                            fill
                            sizes='(min-width: 1024px) 900px, 90vw'
                            quality={90}
                            className='object-cover'
                        />
                    </div>
                    <DialogPrimitive.Close
                        aria-label='Close'
                        className='text-ink absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none'>
                        <X className='h-5 w-5' aria-hidden />
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

/** Header shared by plain rows and rows with options: name, diet icons, price and description. */
function ItemInfo({ item, image, compact = false }: { item: MenuItem; image?: string; compact?: boolean }) {
    return (
        <div className='flex min-w-0 flex-1 items-center gap-3'>
            {image && <DishPhoto src={image} name={item.name} compact={compact} />}
            <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-1'>
                    <span className='mr-0.5 text-[13px] font-medium tracking-wide uppercase'>{item.name}</span>
                    {item.tags?.map((t) => (
                        <DietIcon key={t} t={t} />
                    ))}
                    <span className='border-ink/20 mx-1 min-w-3 flex-1 border-b border-dotted' aria-hidden />
                    <span className='text-pink-deep text-[13px] font-medium tabular-nums'>${item.price}</span>
                </div>
                {item.desc && <p className='text-ink/60 mt-1 text-xs leading-relaxed'>{item.desc}</p>}
            </div>
        </div>
    );
}

/**
 * Row for items that need choices (Baba Box: base + dip). Guests pick a combination and a quantity,
 * then add it; each combination is its own order line with its own stepper.
 */
function OptionRow({ categoryId, item, options }: { categoryId: string; item: MenuItem; options: ItemOption[] }) {
    const { quantities, setQty } = useOrder();
    const [open, setOpen] = useState(false);
    const [picked, setPicked] = useState<string[]>(() => options.map((o) => o.choices[0]));
    const [qty, setLocalQty] = useState(1);

    const baseKey = itemKey(categoryId, item.name);
    const variants = Object.entries(quantities).filter(([k, q]) => k.startsWith(`${baseKey}|`) && q > 0);
    const selected = variants.length > 0;
    const panelId = `options-${baseKey.replace(/[^a-z0-9]+/gi, '-')}`;

    const add = () => {
        const key = itemKey(categoryId, item.name, variantLabel(picked));
        setQty(key, (quantities[key] ?? 0) + qty);
        setLocalQty(1);
        setOpen(false);
    };

    return (
        <li className={`-mx-3 rounded-xl px-3 py-2.5 transition ${selected || open ? 'bg-pink-soft/35' : ''}`}>
            <div className='flex items-center gap-3'>
                <ItemInfo item={item} />
                <button
                    type='button'
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={open ? `Close options for ${item.name}` : `Add ${item.name}`}
                    className={`focus-visible:ring-pink/30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition focus-visible:ring-4 focus-visible:outline-none ${
                        open
                            ? 'border-ink/20 text-ink/60 bg-white'
                            : 'border-pink text-pink-deep hover:bg-pink hover:text-white'
                    }`}>
                    {open ? <X className='h-4 w-4' aria-hidden /> : <Plus className='h-4 w-4' aria-hidden />}
                </button>
            </div>

            {open && (
                <div id={panelId} className='border-pink/30 mt-3 rounded-xl border-2 bg-white p-3'>
                    <div className='grid gap-3 sm:grid-cols-2'>
                        {options.map((o, i) => (
                            <div key={o.label} role='group' aria-label={o.label}>
                                <p className='text-pink-deep mb-1.5 text-[11px] tracking-widest uppercase'>{o.label}</p>
                                <div className='flex flex-wrap gap-1.5'>
                                    {o.choices.map((choice) => {
                                        const active = picked[i] === choice;

                                        return (
                                            <button
                                                key={choice}
                                                type='button'
                                                aria-pressed={active}
                                                onClick={() =>
                                                    setPicked((p) => p.map((v, j) => (j === i ? choice : v)))
                                                }
                                                className={`focus-visible:ring-pink/30 rounded-full border-2 px-3 py-1 text-xs transition focus-visible:ring-4 focus-visible:outline-none ${
                                                    active
                                                        ? 'bg-pink border-pink text-white'
                                                        : 'border-pink/30 text-ink/80 hover:border-pink'
                                                }`}>
                                                {choice}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-3 flex items-center justify-between gap-3'>
                        <div className='border-pink/30 flex items-center rounded-full border-2'>
                            <button
                                type='button'
                                onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                                aria-label='Fewer'
                                className='text-pink-deep flex h-7 w-7 items-center justify-center rounded-full'>
                                <Minus className='h-3.5 w-3.5' aria-hidden />
                            </button>
                            <input
                                type='number'
                                inputMode='numeric'
                                min={1}
                                value={qty}
                                onChange={(e) => setLocalQty(Math.max(1, Math.floor(e.target.valueAsNumber) || 1))}
                                aria-label={`Number of ${item.name} boxes to add`}
                                className='w-9 [appearance:textfield] bg-transparent text-center text-sm tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none'
                            />
                            <button
                                type='button'
                                onClick={() => setLocalQty((q) => q + 1)}
                                aria-label='More'
                                className='text-pink-deep flex h-7 w-7 items-center justify-center rounded-full'>
                                <Plus className='h-3.5 w-3.5' aria-hidden />
                            </button>
                        </div>
                        <button
                            type='button'
                            onClick={add}
                            className='bg-pink focus-visible:ring-pink/30 rounded-full px-4 py-2 text-xs text-white transition hover:brightness-110 focus-visible:ring-4 focus-visible:outline-none'>
                            Add {qty} box{qty === 1 ? '' : 'es'} · ${(parseFloat(item.price) * qty).toFixed(2)}
                        </button>
                    </div>
                </div>
            )}

            {selected && (
                <ul className='mt-2 space-y-1.5' aria-label={`${item.name} selections`}>
                    {variants.map(([key]) => {
                        const variant = key.split('|')[1];

                        return (
                            <li key={key} className='flex items-center justify-between gap-3 pl-3'>
                                <span className='text-ink/80 text-xs'>{variant}</span>
                                <Stepper id={key} name={`${item.name} (${variant})`} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

export function CateringMenu({ pdfHref }: { pdfHref: string }) {
    const { quantities } = useOrder();
    const [activeTab, setActiveTab] = useState(categories[0].id);

    // Links like "#menu-feasts" (e.g. from the occasion cards) open that tab and scroll to the menu.
    useEffect(() => {
        const openFromHash = () => {
            const id = window.location.hash.replace('#menu-', '');
            if (!window.location.hash.startsWith('#menu-') || !categories.some((c) => c.id === id)) return;
            setActiveTab(id);
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        // Clicking the same link twice doesn't fire hashchange, so also react to the click itself.
        const onClick = (e: MouseEvent) => {
            if ((e.target as Element | null)?.closest?.('a[href^="#menu-"]')) setTimeout(openFromHash, 0);
        };
        openFromHash();
        window.addEventListener('hashchange', openFromHash);
        document.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('hashchange', openFromHash);
            document.removeEventListener('click', onClick);
        };
    }, []);
    const countFor = (categoryId: string) =>
        Object.entries(quantities)
            .filter(([k]) => k.startsWith(`${categoryId}/`))
            .reduce((n, [, q]) => n + q, 0);

    return (
        <div>
            <TabsPrimitive.Root value={activeTab} onValueChange={setActiveTab}>
                {/* Category selector */}
                <TabsPrimitive.List
                    aria-label='Catering menu categories'
                    className='bg-cream/95 sticky top-[81px] z-20 -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 py-2.5 backdrop-blur [scrollbar-width:none] sm:static sm:mx-0 sm:mb-6 sm:flex-wrap sm:justify-center sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none [&::-webkit-scrollbar]:hidden'>
                    {categories.map((c) => {
                        const count = countFor(c.id);

                        return (
                            <TabsPrimitive.Trigger
                                key={c.id}
                                value={c.id}
                                className='group border-pink/40 text-pink-deep hover:border-pink data-[state=active]:bg-pink data-[state=active]:border-pink focus-visible:ring-pink/30 inline-flex shrink-0 items-center gap-2 rounded-full border-2 bg-white px-5 py-2 text-sm whitespace-nowrap transition outline-none focus-visible:ring-4 data-[state=active]:text-white'>
                                {c.tab}
                                {count > 0 && (
                                    <span className='bg-pink group-data-[state=active]:text-pink-deep min-w-5 rounded-full px-1.5 text-center text-[11px] leading-5 text-white tabular-nums group-data-[state=active]:bg-white'>
                                        {count}
                                        <span className='sr-only'> selected</span>
                                    </span>
                                )}
                            </TabsPrimitive.Trigger>
                        );
                    })}
                </TabsPrimitive.List>

                {/* All panels share one grid cell, so the frame keeps the height of the tallest
                    category and doesn't jump when switching tabs. Inactive panels stay invisible. */}
                <div className='grid grid-cols-[minmax(0,1fr)]'>
                    {categories.map((c) => (
                        <TabsPrimitive.Content
                            key={c.id}
                            value={c.id}
                            forceMount
                            inert={activeTab !== c.id}
                            className='min-w-0 outline-none [grid-area:1/1] data-[state=inactive]:hidden md:data-[state=inactive]:invisible md:data-[state=inactive]:block'>
                            <article
                                className={`border-pink/25 grid h-full grid-cols-1 overflow-clip rounded-3xl border-2 bg-white ${c.columns === 2 ? '' : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'}`}>
                                {c.columns !== 2 && (
                                    <div
                                        className={`relative md:sticky md:top-36 md:aspect-[3/4] md:self-start xl:relative xl:top-0 xl:aspect-auto xl:min-h-[440px] xl:self-stretch ${c.video ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                                        {c.video ? (
                                            <video
                                                src={c.video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                aria-label={c.photoAlt}
                                                className='absolute inset-0 h-full w-full object-cover'
                                            />
                                        ) : (
                                            <Image
                                                src={c.photo}
                                                alt={c.photoAlt}
                                                fill
                                                sizes='(min-width: 768px) 90vw, 100vw'
                                                quality={90}
                                                className='object-cover'
                                            />
                                        )}
                                    </div>
                                )}
                                <div className='min-w-0 p-5 sm:p-8'>
                                    <div className='flex flex-wrap items-center justify-between gap-3'>
                                        <h3 className='font-display text-pink-deep text-3xl leading-tight sm:text-4xl'>
                                            {c.title}
                                        </h3>
                                        <span className='bg-sage/50 text-ink rounded-full px-3 py-1 text-[11px] tracking-wider whitespace-nowrap uppercase'>
                                            {c.unit}
                                        </span>
                                    </div>
                                    <p className='text-ink/70 mt-2 text-xs leading-relaxed sm:text-[13px]'>{c.intro}</p>
                                    <div
                                        className={
                                            c.columns === 2
                                                ? 'mt-5 gap-x-10 md:columns-2 xl:columns-3'
                                                : 'mt-4 grid gap-y-5'
                                        }>
                                        {c.groups.map((g, i) => (
                                            <div
                                                key={g.title ?? i}
                                                className={c.columns === 2 ? 'mb-5 break-inside-avoid' : ''}>
                                                {g.title && (
                                                    <h4 className='text-pink-deep border-pink/25 mb-1 border-b-2 pb-1.5 text-xs font-medium tracking-[0.2em] uppercase'>
                                                        {g.title}
                                                    </h4>
                                                )}
                                                <ul>
                                                    {g.items.map((it) =>
                                                        c.options ? (
                                                            <OptionRow
                                                                key={it.name}
                                                                categoryId={c.id}
                                                                item={it}
                                                                options={c.options}
                                                            />
                                                        ) : (
                                                            <Row
                                                                key={it.name}
                                                                categoryId={c.id}
                                                                item={it}
                                                                compact={c.columns === 2}
                                                            />
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </TabsPrimitive.Content>
                    ))}
                </div>
            </TabsPrimitive.Root>

            {/* Live total */}
            <OrderBar />

            {/* One quiet line: dietary legend, price note and the PDF */}
            <div className='text-ink/60 mt-5 flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between'>
                <ul className='flex flex-wrap gap-x-5 gap-y-2' aria-label='Dietary labels'>
                    {(Object.keys(diets) as Diet[]).map((k) => (
                        <li key={k}>
                            <DietIcon t={k} withLabel />
                        </li>
                    ))}
                </ul>
                <p className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                    <span>Prices in CAD, excl. HST and delivery</span>
                    <span aria-hidden>·</span>
                    <a
                        href={pdfHref}
                        className='hover:text-pink-deep inline-flex items-center gap-1 underline underline-offset-4'>
                        <Download className='h-3.5 w-3.5' aria-hidden />
                        Menu PDF
                    </a>
                </p>
            </div>
        </div>
    );
}
