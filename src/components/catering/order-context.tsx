'use client';

import { type ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { type Order, buildOrder } from '@/components/catering/menu-data';

type OrderContextValue = {
    quantities: Record<string, number>;
    order: Order;
    setQty: (key: string, qty: number) => void;
    clear: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

const MAX_QTY = 999;

/** Holds the visitor's catering selection, shared by the menu, the live total and the quote form. */
export function OrderProvider({ children }: { children: ReactNode }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const setQty = useCallback((key: string, qty: number) => {
        const next = Math.max(0, Math.min(MAX_QTY, Math.floor(Number.isFinite(qty) ? qty : 0)));
        setQuantities((prev) => {
            const copy = { ...prev };
            if (next === 0) delete copy[key];
            else copy[key] = next;

            return copy;
        });
    }, []);

    const clear = useCallback(() => setQuantities({}), []);

    const value = useMemo(
        () => ({ quantities, order: buildOrder(quantities), setQty, clear }),
        [quantities, setQty, clear]
    );

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>');

    return ctx;
}
