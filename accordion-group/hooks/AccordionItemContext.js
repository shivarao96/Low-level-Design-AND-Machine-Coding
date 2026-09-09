import { createContext, useCallback, useContext, useMemo } from "react";
import { useAccordion } from "./AccordionContext";

const AccordionItemContext = createContext();

export const useAccordionItem = () => {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error("AccordionItem compound components must be used within AccordionItem.");
    }
    return context;
}

export const AccordionItem = ({
    children,
    value,
    disabled = false
}) => {

    const {
        toggleItems,
        isToggleItemOpened
    } = useAccordion();

    const isOpen = useMemo(() => isToggleItemOpened(value), [value, isToggleItemOpened])
    const toggle = useCallback(() => !disabled && toggleItems(value), [value, disabled, toggleItems]);

    const contextValue = useMemo(() => {
        return {
            value,
            isOpen,
            toggle,
            disabled
        }
    }, [value, isOpen, toggle, disabled]);

    return (
        <>
            <AccordionItemContext.Provider value={contextValue}>
                <div
                    className={`accordion-item ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
                    style={{
                        border: "1px solid #e5e5e5",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        overflow: "hidden",
                    }}
                >
                    {children}
                </div>
            </AccordionItemContext.Provider>
        </>
    );
}

