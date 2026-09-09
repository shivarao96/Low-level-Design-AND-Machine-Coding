import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AccordionItem } from "./AccordionItemContext";
import { AccordionContent } from "../components/AccordionContent";
import { AccordionTrigger } from "../components/AccordionTrigger";

const AccordionContext = createContext();

export const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion compound components must be used within Accordion.");
    }
    return context;
}

export const Accordion = ({
    children,
    allowedMultiple = false,
    defaultValue = allowedMultiple ? [] : null
}) => {
    const [openItems, setOpenItems] = useState(
        allowedMultiple ? (Array.isArray(defaultValue) ? [defaultValue] : []) : defaultValue
    )

    const toggleItems = useCallback((value) => {
        if (allowedMultiple) {
            setOpenItems((prev) => {
                return prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value];
            })
        } else {
            setOpenItems(prev => prev === value ? null : value);
        }
    }, [setOpenItems, allowedMultiple])

    const isToggleItemOpened = useCallback((value) => {
        return allowedMultiple ? openItems.includes(value) : openItems === value;
    }, [openItems, allowedMultiple])

    const value = useMemo(() => ({
        openItems,
        toggleItems,
        isToggleItemOpened
    }), [openItems, toggleItems, isToggleItemOpened]);

    return (
        <>
            <AccordionContext.Provider value={value}>
                <div className="accordion">
                    {children}
                </div>
            </AccordionContext.Provider>
        </>
    );
}

Accordion.Item = AccordionItem;
Accordion.Content = AccordionContent;
Accordion.Trigger = AccordionTrigger;
