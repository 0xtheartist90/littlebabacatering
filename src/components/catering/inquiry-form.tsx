'use client';

import { type FormEvent, useState } from 'react';

import { MIN_INDIVIDUAL_MEALS, formatCents } from '@/components/catering/menu-data';
import { useOrder } from '@/components/catering/order-context';

import { toast } from 'sonner';

const CATERING_EMAIL = 'info@littlebaba.com';

const fieldClass =
    'w-full rounded-2xl border-2 border-pink/40 bg-white px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition focus:border-pink focus:ring-4 focus:ring-pink/20';
const labelClass = 'mb-1.5 block text-xs font-medium tracking-widest text-pink-deep uppercase';

/** Earliest bookable date: 48 hours from now (catering lead time). */
const minDate = () => {
    const d = new Date(Date.now() + 48 * 60 * 60 * 1000);

    return d.toISOString().slice(0, 10);
};

export function InquiryForm() {
    const [service, setService] = useState<'Pickup' | 'Delivery'>('Delivery');
    const { order } = useOrder();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const get = (k: string) => String(data.get(k) ?? '').trim();

        const body = [
            `Name: ${get('name')}`,
            `Company: ${get('company') || '—'}`,
            `Email: ${get('email')}`,
            `Phone: ${get('phone') || '—'}`,
            `Event date: ${get('date')}`,
            `Event time: ${get('time')}`,
            `Number of guests: ${get('guests')}`,
            `Occasion: ${get('occasion')}`,
            `Pickup or delivery: ${service}`,
            '',
            get('message'),
            ...(order.itemCount > 0
                ? [
                      '',
                      '--- My selection ---',
                      ...order.lines.map(
                          (l) =>
                              `${l.qty} x ${l.name}${l.variant ? ` [${l.variant}]` : ''} (${l.categoryTitle}): ${formatCents(l.lineCents)}`
                      ),
                      '',
                      `Subtotal: ${formatCents(order.subtotalCents)}`,
                      `HST (13%): ${formatCents(order.hstCents)}`,
                      `Estimated total: ${formatCents(order.totalCents)} (excl. delivery)`
                  ]
                : [])
        ].join('\n');

        if (order.belowMinimum) {
            toast.error(
                `Individual lunches need a minimum of ${MIN_INDIVIDUAL_MEALS} meals. You have ${order.individualMeals}.`
            );

            return;
        }

        const subject = `Catering inquiry – ${get('occasion')} – ${get('date')} ${get('time')} (${get('guests')} guests)`;

        window.location.href = `mailto:${CATERING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        toast.success('Your email app is opening with your request — just hit send!');
    };

    return (
        <form onSubmit={onSubmit} className='grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-5'>
            <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='name' className={labelClass}>
                    Name *
                </label>
                <input id='name' name='name' required autoComplete='name' className={fieldClass} />
            </div>
            <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='company' className={labelClass}>
                    Company
                </label>
                <input id='company' name='company' autoComplete='organization' className={fieldClass} />
            </div>
            <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='email' className={labelClass}>
                    Email *
                </label>
                <input id='email' name='email' type='email' required autoComplete='email' className={fieldClass} />
            </div>
            <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='phone' className={labelClass}>
                    Phone
                </label>
                <input id='phone' name='phone' type='tel' autoComplete='tel' className={fieldClass} />
            </div>
            <div>
                <label htmlFor='date' className={labelClass}>
                    Event date *
                </label>
                <input id='date' name='date' type='date' required min={minDate()} className={fieldClass} />
            </div>
            <div>
                <label htmlFor='time' className={labelClass}>
                    Event time *
                </label>
                <input id='time' name='time' type='time' required step={900} className={fieldClass} />
            </div>
            <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='guests' className={labelClass}>
                    Guests *
                </label>
                <input id='guests' name='guests' type='number' required placeholder='e.g. 25' className={fieldClass} />
            </div>
            <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='occasion' className={labelClass}>
                    Occasion
                </label>
                <select
                    id='occasion'
                    name='occasion'
                    className={`${fieldClass} select-chevron`}
                    defaultValue='Office lunch'>
                    <option>Office lunch</option>
                    <option>Corporate meeting</option>
                    <option>Family gathering</option>
                    <option>Celebration / party</option>
                    <option>Something else</option>
                </select>
            </div>
            <fieldset className='col-span-2'>
                <legend className={labelClass}>Pickup or delivery</legend>
                <div className='border-pink/40 grid grid-cols-2 gap-2 rounded-full border-2 bg-white p-1'>
                    {(['Delivery', 'Pickup'] as const).map((opt) => (
                        <label
                            key={opt}
                            className={`has-[:focus-visible]:ring-pink/30 cursor-pointer rounded-full py-2.5 text-center text-sm transition has-[:focus-visible]:ring-4 ${
                                service === opt ? 'bg-pink text-white' : 'text-ink/70 hover:text-pink-deep'
                            }`}>
                            <input
                                type='radio'
                                name='service'
                                value={opt}
                                checked={service === opt}
                                onChange={() => setService(opt)}
                                className='sr-only'
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            </fieldset>
            <div className='col-span-2'>
                <label htmlFor='message' className={labelClass}>
                    Tell us about your event
                </label>
                <textarea
                    id='message'
                    name='message'
                    rows={4}
                    placeholder='Favourite dishes, dietary needs (vegan, gluten-free…), delivery address, timing…'
                    className={`${fieldClass} resize-y`}
                />
            </div>
            <div className='col-span-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-ink/60 text-xs'>Orders need at least 48 hours notice.</p>
                {order.itemCount > 0 ? (
                    <button
                        type='submit'
                        className='bg-pink focus-visible:ring-pink/30 rounded-full px-6 py-3.5 text-sm whitespace-nowrap text-white shadow-[0_4px_0_var(--baba-pink-deep)] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_var(--baba-pink-deep)] focus-visible:ring-4 focus-visible:outline-none sm:px-8 sm:text-base'>
                        Request order · {formatCents(order.totalCents)} →
                    </button>
                ) : (
                    // Nothing picked yet: send people to the menu first instead of submitting an empty request.
                    <a
                        href='#menu'
                        className='border-pink text-pink-deep hover:bg-pink focus-visible:ring-pink/30 rounded-full border-2 px-6 py-3.5 text-center text-sm whitespace-nowrap transition hover:text-white focus-visible:ring-4 focus-visible:outline-none sm:px-8 sm:text-base'>
                        Build your spread first ↑
                    </a>
                )}
            </div>
        </form>
    );
}
