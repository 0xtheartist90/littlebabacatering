'use client';

import { MIN_INDIVIDUAL_MEALS, formatCents } from '@/components/catering/menu-data';
import { useOrder } from '@/components/catering/order-context';

import { TriangleAlert, X } from 'lucide-react';

/** Sticky bar under the menu: live item count + total, with a jump to the quote form. */
export function OrderBar() {
    const { order } = useOrder();
    if (order.itemCount === 0) return null;

    return (
        <div className='sticky bottom-4 z-30 mt-6'>
            <div className='bg-ink mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] sm:py-2.5 sm:pr-2.5 sm:pl-6'>
                <div className='min-w-0 text-xs sm:text-sm' aria-live='polite'>
                    <span className='text-white/70'>
                        {order.itemCount} item{order.itemCount === 1 ? '' : 's'} ·{' '}
                    </span>
                    <span className='font-medium'>{formatCents(order.totalCents)}</span>
                    <span className='text-white/60'> incl. HST</span>
                    <br className='sm:hidden' />
                    {order.belowMinimum && (
                        <span className='text-pink-soft inline-flex items-center gap-1 text-[11px] sm:ml-2 sm:text-xs'>
                            <TriangleAlert className='h-3.5 w-3.5' aria-hidden /> min. {MIN_INDIVIDUAL_MEALS} lunches
                        </span>
                    )}
                </div>
                <a
                    href='#quote'
                    className='bg-pink focus-visible:ring-pink/40 shrink-0 rounded-full px-4 py-2.5 text-sm transition hover:brightness-110 focus-visible:ring-4 focus-visible:outline-none sm:px-5'>
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

    if (order.itemCount === 0) {
        return (
            <div className='rounded-2xl border-2 border-dashed border-white/50 p-5 text-sm text-white/90'>
                <p className='font-medium text-white'>No dishes selected yet</p>
                <p className='mt-1 text-xs leading-relaxed'>
                    Pick dishes in the menu above to see your total here, or just tell us about your event and we’ll
                    suggest a spread.
                </p>
                <a href='#menu' className='mt-3 inline-block text-xs underline underline-offset-4'>
                    Build your spread →
                </a>
            </div>
        );
    }

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
