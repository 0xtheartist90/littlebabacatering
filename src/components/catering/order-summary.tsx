'use client';

import { MIN_INDIVIDUAL_MEALS, formatCents } from '@/components/catering/menu-data';
import { useOrder } from '@/components/catering/order-context';

import { ArrowUp, ShoppingBag, TriangleAlert, X } from 'lucide-react';

/** Sticky bar under the menu: live item count + total, with a jump to the quote form. */
export function OrderBar() {
    const { order } = useOrder();
    if (order.itemCount === 0) return null;

    return (
        <div className='sticky bottom-4 z-30 mt-5'>
            <div className='border-pink/30 text-ink flex w-full items-center justify-between gap-3 rounded-3xl border-2 bg-white p-2.5 pl-3 shadow-[0_12px_32px_rgba(239,80,138,0.25)] sm:p-3 sm:pl-4'>
                <div className='flex min-w-0 items-center gap-3' aria-live='polite'>
                    <span className='bg-pink-soft text-pink-deep relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'>
                        <ShoppingBag className='h-5 w-5' aria-hidden />
                        <span className='bg-pink absolute -top-1 -right-1 min-w-5 rounded-full px-1 text-center text-[10px] leading-5 text-white tabular-nums'>
                            {order.itemCount}
                        </span>
                    </span>
                    <span className='min-w-0 leading-tight'>
                        <span className='text-pink-deep block text-base font-medium tabular-nums sm:text-lg'>
                            {formatCents(order.totalCents)}
                        </span>
                        <span className='text-ink/55 block truncate text-[11px] sm:text-xs'>
                            {order.belowMinimum ? (
                                <span className='text-pink-deep inline-flex items-center gap-1'>
                                    <TriangleAlert className='h-3.5 w-3.5' aria-hidden /> Min. {MIN_INDIVIDUAL_MEALS}{' '}
                                    lunches
                                </span>
                            ) : (
                                <>
                                    {order.itemCount} item{order.itemCount === 1 ? '' : 's'} · incl. HST
                                </>
                            )}
                        </span>
                    </span>
                </div>
                <a
                    href='#quote'
                    className='bg-pink focus-visible:ring-pink/40 shrink-0 rounded-full px-4 py-2.5 text-sm text-white transition hover:brightness-110 focus-visible:ring-4 focus-visible:outline-none sm:px-6 sm:py-3'>
                    <span className='sm:hidden'>Request →</span>
                    <span className='hidden sm:inline'>Request this order →</span>
                </a>
            </div>
        </div>
    );
}

/** Full breakdown of the selection, shown next to the quote form. */
export function OrderSummary() {
    const { order, setQty, clear } = useOrder();

    // Nothing selected: the BuildFirstPrompt banner at the top of the quote section takes over.
    if (order.itemCount === 0) return null;

    return (
        <div className='bg-cream text-ink rounded-2xl p-5'>
            <div className='flex items-center justify-between'>
                <h3 className='font-display text-pink-deep text-2xl'>Your selection</h3>
                <button
                    type='button'
                    onClick={clear}
                    className='text-ink/50 hover:text-pink-deep text-xs underline underline-offset-4'>
                    Clear
                </button>
            </div>
            <ul className='divide-ink/10 mt-3 divide-y text-sm'>
                {order.lines.map((l) => (
                    <li key={l.key} className='flex items-start gap-2 py-2'>
                        <span className='text-pink-deep w-8 shrink-0 tabular-nums'>{l.qty}×</span>
                        <span className='flex-1'>
                            {l.name}
                            <span className='text-ink/50 block text-[11px]'>
                                {l.categoryTitle}
                                {l.variant && ` · ${l.variant}`}
                            </span>
                        </span>
                        <span className='tabular-nums'>{formatCents(l.lineCents)}</span>
                        <button
                            type='button'
                            onClick={() => setQty(l.key, 0)}
                            aria-label={`Remove ${l.name}${l.variant ? ` (${l.variant})` : ''}`}
                            className='text-ink/40 hover:text-pink-deep mt-0.5'>
                            <X className='h-3.5 w-3.5' aria-hidden />
                        </button>
                    </li>
                ))}
            </ul>
            <dl className='border-ink/15 mt-2 space-y-1 border-t-2 pt-3 text-sm'>
                <div className='flex justify-between'>
                    <dt className='text-ink/70'>Subtotal</dt>
                    <dd className='tabular-nums'>{formatCents(order.subtotalCents)}</dd>
                </div>
                <div className='flex justify-between'>
                    <dt className='text-ink/70'>HST (13%)</dt>
                    <dd className='tabular-nums'>{formatCents(order.hstCents)}</dd>
                </div>
                <div className='text-pink-deep flex justify-between pt-1 text-base font-medium'>
                    <dt>Total</dt>
                    <dd className='tabular-nums'>{formatCents(order.totalCents)}</dd>
                </div>
            </dl>
            <p className='text-ink/50 mt-2 text-[11px] leading-relaxed'>
                Estimate in CAD. Delivery fees depend on location and are confirmed with your quote.
            </p>
            {order.belowMinimum && (
                <p className='bg-pink-soft/60 text-ink mt-3 flex gap-2 rounded-xl p-3 text-xs leading-relaxed'>
                    <TriangleAlert className='text-pink-deep mt-0.5 h-4 w-4 shrink-0' aria-hidden />
                    Individual lunches (Baba Box and Wrap Combos) have a minimum of {MIN_INDIVIDUAL_MEALS} meals. You
                    have {order.individualMeals}.
                </p>
            )}
        </div>
    );
}

/** Big banner at the top of the quote section while nothing is selected: build your spread first. */
export function BuildFirstPrompt() {
    const { order } = useOrder();
    if (order.itemCount > 0) return null;

    return (
        <div className='bg-cream text-ink mb-8 flex flex-col gap-5 rounded-[2rem] border-[3px] border-white p-6 shadow-[8px_8px_0_rgba(255,255,255,0.45)] sm:mb-12 sm:p-8 md:flex-row md:items-center md:gap-8 lg:p-10'>
            <span className='bg-pink-soft text-pink-deep flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl lg:h-20 lg:w-20'>
                <ShoppingBag className='h-8 w-8 lg:h-10 lg:w-10' aria-hidden />
            </span>
            <div className='flex-1'>
                <p className='text-pink-deep text-xs tracking-[0.2em] uppercase'>Step 1 of 2</p>
                <h3 className='font-display text-pink-deep mt-1 text-3xl leading-none sm:text-5xl'>
                    First, build your spread
                </h3>
                <p className='text-ink/70 mt-3 max-w-xl text-sm leading-relaxed sm:text-base'>
                    Pick your boxes, platters and sides from the menu. Your total shows up here and is sent along with
                    your request.
                </p>
            </div>
            <a
                href='#menu'
                className='bg-pink focus-visible:ring-pink/30 inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-4 text-white shadow-[0_4px_0_var(--baba-pink-deep)] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_var(--baba-pink-deep)] focus-visible:ring-4 focus-visible:outline-none sm:text-lg'>
                <ArrowUp className='h-5 w-5' aria-hidden />
                Build your spread
            </a>
        </div>
    );
}
