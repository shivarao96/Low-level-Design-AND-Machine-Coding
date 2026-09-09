import { useAccordionItem } from "../hooks/AccordionItemContext"
import { FaChevronDown } from "react-icons/fa";

export const AccordionTrigger = ({ children, className = "", ...props }) => {
    const {
        isOpen,
        toggle,
        disabled
    } = useAccordionItem();

    return (
        <>
            <button
                className={`accordion-trigger ${className}`}
                onClick={toggle}
                disabled={disabled}
                aria-expanded={isOpen}
                style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: isOpen ? "#f8f9fa" : "white",
                    border: "none",
                    textAlign: "left",
                    cursor: disabled ? "not-allowed" : "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                }}
                {...props}
            >
                <span>{children}</span>
                <span
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                    }}  
                >
                    <FaChevronDown/>
                </span>
            </button>
        </>
    );
}