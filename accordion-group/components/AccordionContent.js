import { useAccordionItem } from "../hooks/AccordionItemContext";

export const AccordionContent = ({ children, className = "", ...props }) => {

    const { isOpen } = useAccordionItem();

    return (
        <div
            className={`accordion-content ${className}`}
            style={{
                maxHeight: isOpen ? "1000px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
            }}
            {...props}
        >
            <div style={{ padding: "16px", borderTop: "1px solid #e5e5e5" }}>
                {children}
            </div>
        </div>
    );
}