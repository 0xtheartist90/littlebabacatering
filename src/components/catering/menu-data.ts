/**
 * Little Baba catering menu data. Content mirrors the official catering menu PDF
 * (LittleBaba_CateringMenu_NB.pdf). Prices in CAD, excl. HST, delivery and serviceware.
 */

export type Diet = 'VG' | 'V' | 'DF' | 'GF';
export type MenuItem = { name: string; price: string; tags?: Diet[]; desc?: string };
export type Group = { title?: string; items: MenuItem[] };
/** A per-item choice the guest makes, e.g. base or dip for a Baba Box. Doesn't change the price. */
export type ItemOption = { label: string; choices: string[] };
export type Category = {
    id: string;
    tab: string;
    title: string;
    /** How this category is priced: answers "per person or per group?" at a glance. */
    unit: string;
    intro: string;
    photo: string;
    photoAlt: string;
    /** Optional looping video shown instead of the photo (photo is used as poster). */
    video?: string;
    groups: Group[];
    columns?: 1 | 2;
    /** Choices every item in this category needs (each combination becomes its own order line). */
    options?: ItemOption[];
};

export const categories: Category[] = [
    {
        id: 'baba-box',
        tab: 'Baba Box',
        title: 'Baba Box',
        unit: 'Price per person · min. 10 meals',
        intro: 'Individual lunches, packed one person at a time in labelled boxes, so every guest grabs their own. Every box comes with pickles; pick a base and a dip for each one. Mix and match across your order.',
        options: [
            { label: 'Base', choices: ['Baba rice', 'Fattoush salad'] },
            { label: 'Dip', choices: ['Hummus', 'Baba ghanoush'] }
        ],
        photo: '/images/box-in-hand.jpg',
        photoAlt: 'A Little Baba Baba Box',
        video: '/videos/baba-box.mp4',
        groups: [
            {
                items: [
                    {
                        name: 'Chicken Shawarma',
                        price: '19.95',
                        desc: 'Marinated chicken thighs slow-roasted on a traditional vertical spit, thinly shaved with crisp, caramelized edges. With garlic toum.'
                    },
                    {
                        name: 'Chicken Tawook',
                        price: '19.95',
                        desc: 'Marinated chicken thighs seared on a sizzling flat-top, chopped to order for crisp edges and juicy flavour. With garlic toum.'
                    },
                    {
                        name: 'Kefta Beef & Lamb',
                        price: '19.95',
                        desc: 'Beef and lamb kefta seared until juicy and caramelized. With tahini.'
                    },
                    {
                        name: 'Falafel',
                        price: '14.95',
                        tags: ['VG'],
                        desc: 'Five fresh falafel, crisp outside and tender within. With tahini.'
                    },
                    {
                        name: 'Fried Cauliflower',
                        price: '15.95',
                        tags: ['V'],
                        desc: 'Golden-brown cauliflower with crisp edges. With tahini.'
                    }
                ]
            }
        ]
    },
    {
        id: 'wrap-combos',
        tab: 'Wrap Combos',
        title: 'Wrap Combos',
        unit: 'Price per person · min. 10 meals',
        intro: 'Individual lunches, each packed in its own labelled box: the wrap, golden fries and a soda or water. Mix and match across your order.',
        photo: '/images/sandwich-tall.jpg',
        photoAlt: 'Little Baba wraps',
        groups: [
            {
                items: [
                    { name: 'Chicken Shawarma', price: '19.95' },
                    { name: 'Chicken Tawook', price: '20.95' },
                    { name: 'Kefta Beef & Lamb', price: '20.95' },
                    { name: 'Falafel', price: '17.50', tags: ['VG'] },
                    { name: 'Fried Cauliflower', price: '18.50', tags: ['V'] }
                ]
            }
        ]
    },
    {
        id: 'platters',
        tab: 'Platters',
        title: 'Sharing Platters',
        unit: 'Price per platter',
        intro: 'Generous platters to share, arranged for effortless boardroom, meeting or reception service.',
        photo: '/images/wrap-platter-tall.jpg',
        photoAlt: 'Wrap party platter with sambousek, olives and dips',
        groups: [
            {
                title: 'Appetizers · feeds 10',
                items: [
                    {
                        name: 'Little Bites Platter',
                        price: '89.95',
                        desc: 'Truffle rakakat, cheese and beef sambousek, spinach fatayer and falafel.'
                    },
                    {
                        name: 'Mezze Platter',
                        price: '64.95',
                        tags: ['VG'],
                        desc: 'Hummus, baba ghanoush, tangy pickles and pita.'
                    }
                ]
            },
            {
                title: 'Baba’s Wrap Party Platters',
                items: [
                    {
                        name: 'Platter for 5–6',
                        price: '84.95',
                        desc: 'Shawarma wraps sliced into bite-sized portions, arranged around a generous serving of golden fries.'
                    },
                    {
                        name: 'Platter for 10',
                        price: '119.95',
                        desc: 'Chicken shawarma and falafel wraps, sliced and arranged with garlic toum and tahini.'
                    }
                ]
            }
        ]
    },
    {
        id: 'feasts',
        tab: 'Baba Feasts',
        title: 'Baba Feasts',
        unit: 'Price per feast · feeds 10',
        intro: 'Complete family-style feasts, with hot and cold components packed separately for easy service. Every feast comes with Baba rice, fattoush, hummus, baba ghanoush, garlic toum, tahini, pickles and pita. Group-order discount built in.',
        photo: '/images/feast.jpg',
        photoAlt: 'A Baba Feast with grilled meats, rice and mezze',
        groups: [
            {
                items: [
                    { name: 'Classic Baba Feast', price: '194.95', desc: 'Shaved chicken shawarma and falafel.' },
                    {
                        name: 'Mixed Grill Baba Feast',
                        price: '209.95',
                        desc: 'Chicken tawook, beef and lamb kefta and falafel.'
                    }
                ]
            }
        ]
    },
    {
        id: 'sides',
        tab: 'Salads, Dips & Sides',
        title: 'Salads, Dips & Sides',
        unit: 'Price per tray · serves 5',
        intro: 'Add-ons to complete your table. Each is portioned for 5 guests and priced with a built-in group-order discount.',
        photo: '/images/salad.jpg',
        photoAlt: 'Fresh Lebanese salads and dips',
        columns: 2,
        groups: [
            {
                title: 'Salads',
                items: [
                    { name: 'Fattoush', price: '38.50', tags: ['VG', 'GF'] },
                    { name: 'Chickpea', price: '41.50', tags: ['V', 'GF'] }
                ]
            },
            {
                title: 'Dips',
                items: [
                    { name: 'Hummus', price: '16.95', tags: ['VG', 'GF'] },
                    { name: 'Baba Ghanoush', price: '24.95', tags: ['VG', 'GF'] },
                    { name: 'Toum', price: '7.50', tags: ['VG', 'GF'] },
                    { name: 'Tahini Sauce', price: '7.50', tags: ['VG', 'GF'] }
                ]
            },
            {
                title: 'Sides',
                items: [
                    { name: 'Baba Rice', price: '19.95', tags: ['GF'] },
                    { name: 'Golden Fries', price: '19.95', tags: ['VG'] },
                    { name: '10 Falafel w/ Tahini', price: '17.50', tags: ['VG'] },
                    { name: 'Pickles & Turnips', price: '9.95', tags: ['VG', 'GF'] },
                    { name: '10 Pieces of Pita', price: '6.50', tags: ['VG'] }
                ]
            },
            {
                title: 'Drinks & Desserts',
                items: [
                    { name: '5 Sodas or Waters', price: '11.50' },
                    { name: 'Cookies', price: '24.95' }
                ]
            }
        ]
    }
];

/** Ontario HST. Catering prices on the menu exclude it. */
export const HST_RATE = 0.13;

/** Individual lunches (Baba Box + Wrap Combos) need at least this many meals in total. */
export const MIN_INDIVIDUAL_MEALS = 10;
export const INDIVIDUAL_CATEGORY_IDS = ['baba-box', 'wrap-combos'];

const VARIANT_SEP = '|';

/** Order key for an item, optionally with its chosen options (e.g. "Baba rice · Hummus"). */
export const itemKey = (categoryId: string, itemName: string, variant?: string) =>
    `${categoryId}/${itemName}${variant ? `${VARIANT_SEP}${variant}` : ''}`;

const splitKey = (key: string) => {
    const [base, variant] = key.split(VARIANT_SEP);

    return { base, variant: variant || undefined };
};

/** Human label for a set of choices, also used as the variant part of the key. */
export const variantLabel = (choices: string[]) => choices.join(' · ');

export type OrderLine = {
    key: string;
    categoryId: string;
    categoryTitle: string;
    name: string;
    /** Chosen options, e.g. "Baba rice · Hummus". */
    variant?: string;
    qty: number;
    unitCents: number;
    lineCents: number;
};

const toCents = (price: string) => Math.round(parseFloat(price) * 100);

/** Flat lookup of every orderable item, keyed by itemKey(). */
const catalog = new Map(
    categories.flatMap((c) =>
        c.groups.flatMap((g) =>
            g.items.map(
                (it) => [itemKey(c.id, it.name), { category: c, item: it, unitCents: toCents(it.price) }] as const
            )
        )
    )
);

export function buildOrder(quantities: Record<string, number>) {
    const lines: OrderLine[] = [];
    for (const [key, qty] of Object.entries(quantities)) {
        const { base, variant } = splitKey(key);
        const entry = catalog.get(base);
        if (!entry || qty <= 0) continue;
        lines.push({
            key,
            categoryId: entry.category.id,
            categoryTitle: entry.category.title,
            name: entry.item.name,
            variant,
            qty,
            unitCents: entry.unitCents,
            lineCents: entry.unitCents * qty
        });
    }
    // Keep menu order.
    const order = [...catalog.keys()];
    lines.sort(
        (a, b) =>
            order.indexOf(splitKey(a.key).base) - order.indexOf(splitKey(b.key).base) ||
            (a.variant ?? '').localeCompare(b.variant ?? '')
    );

    const subtotalCents = lines.reduce((sum, l) => sum + l.lineCents, 0);
    const hstCents = Math.round(subtotalCents * HST_RATE);
    const individualMeals = lines
        .filter((l) => INDIVIDUAL_CATEGORY_IDS.includes(l.categoryId))
        .reduce((n, l) => n + l.qty, 0);

    return {
        lines,
        itemCount: lines.reduce((n, l) => n + l.qty, 0),
        subtotalCents,
        hstCents,
        totalCents: subtotalCents + hstCents,
        individualMeals,
        /** True when some individual lunches are ordered but fewer than the minimum. */
        belowMinimum: individualMeals > 0 && individualMeals < MIN_INDIVIDUAL_MEALS
    };
}

export type Order = ReturnType<typeof buildOrder>;

export const formatCents = (cents: number) =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', currencyDisplay: 'narrowSymbol' }).format(
        cents / 100
    );
