'use client';

import { useState } from 'react';

import Image from 'next/image';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { X } from 'lucide-react';

export type MarqueeItem = {
    src: string;
    alt: string;
    /** Width / height of the original photo or video, so nothing gets cropped. */
    ratio: number;
    video?: string;
};

/**
 * Endlessly scrolling strip of photos and videos. Every tile keeps the original aspect ratio;
 * clicking a tile opens it enlarged in a lightbox (videos play there with sound and controls).
 */
export function PhotoMarquee({ items }: { items: MarqueeItem[] }) {
    const [open, setOpen] = useState<MarqueeItem | null>(null);

    return (
        <>
            <section className='overflow-hidden py-3' aria-label='Photos and videos of Little Baba catering'>
                <div className='flex w-max animate-[marquee_110s_linear_infinite] gap-3 motion-reduce:animate-none'>
                    {[...items, ...items].map((item, i) => {
                        const duplicate = i >= items.length;

                        return (
                            <button
                                key={i}
                                type='button'
                                onClick={() => setOpen(item)}
                                tabIndex={duplicate ? -1 : 0}
                                aria-hidden={duplicate}
                                aria-label={`Enlarge: ${item.alt}`}
                                style={{ aspectRatio: item.ratio }}
                                className='focus-visible:ring-pink/40 relative h-80 shrink-0 cursor-zoom-in overflow-hidden rounded-[1.75rem] focus-visible:ring-4 focus-visible:outline-none sm:h-[30rem]'>
                                {item.video ? (
                                    <video
                                        src={item.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload='auto'
                                        className='absolute inset-0 h-full w-full object-cover'
                                    />
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt=''
                                        fill
                                        sizes='(min-width: 640px) 720px, 480px'
                                        loading='eager'
                                        className='object-cover'
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>

            <DialogPrimitive.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className='data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/85' />
                    <DialogPrimitive.Content
                        onClick={() => setOpen(null)}
                        aria-describedby={undefined}
                        className='data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center p-4 outline-none sm:p-10'>
                        <DialogPrimitive.Title className='sr-only'>{open?.alt}</DialogPrimitive.Title>
                        {open &&
                            (open.video ? (
                                <video
                                    key={open.video}
                                    src={open.video}
                                    autoPlay
                                    controls
                                    loop
                                    playsInline
                                    onClick={(e) => e.stopPropagation()}
                                    className='max-h-full max-w-full cursor-auto rounded-2xl'
                                />
                            ) : (
                                <div
                                    className='relative max-h-full w-full'
                                    style={{
                                        aspectRatio: open.ratio,
                                        maxWidth: `calc((100svh - 5rem) * ${open.ratio})`
                                    }}>
                                    <Image
                                        src={open.src}
                                        alt={open.alt}
                                        fill
                                        sizes='100vw'
                                        className='rounded-2xl object-contain'
                                    />
                                </div>
                            ))}
                        <DialogPrimitive.Close
                            aria-label='Close'
                            className='text-ink absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none'>
                            <X className='h-5 w-5' aria-hidden />
                        </DialogPrimitive.Close>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </>
    );
}
