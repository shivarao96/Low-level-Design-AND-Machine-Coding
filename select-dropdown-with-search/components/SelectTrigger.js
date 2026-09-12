import { useCallback } from "react";
import { useSelectContext } from "../providers/SelectContext";
import { ChevronDown } from "lucide-react";

export const SelectTrigger = ({ className }) => {

    const { isOpen, setIsOpen, disabled, value, placeholder, multiple } = useSelectContext()

    const isEmptyValue = useCallback(() => {
        if (Array.isArray(value) && value.length === 0) return true;
        if (!value) return true;
        return false;
    }, [value])

    const displayValue = useCallback(() => {
        if (isEmptyValue()) {
            return placeholder;
        }
        if (multiple && Array.isArray(value) && value.length) {
            return `${value.length} selected`;
        }
        return value;
    }, [isEmptyValue, multiple, value, placeholder])

    const handleKeyDownEvent = useCallback((e) => {
        if (disabled) return;
        switch (e.key) {
            case "Enter":
            case "Space":
            case "ArrowDown":
                e.preventDefault()
                setIsOpen(true);
                break;
            case "Escape":
                setIsOpen(false)
                break;
            default:
                break;
        }
    }, [disabled, setIsOpen])

    return (
        <button
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDownEvent}
            className={`w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg
        ${disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-gray-400 cursor-pointer"
                }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${className}`}
        >
            <span
                className={`truncate ${isEmptyValue(value) ? "text-gray-400" : "text-gray-900"
                    }`}
            >
                {displayValue()}
            </span>
            <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                    }`}
            />
        </button>
    )
}