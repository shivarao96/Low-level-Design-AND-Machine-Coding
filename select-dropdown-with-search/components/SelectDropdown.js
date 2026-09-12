import { useSelectContext } from "../providers/SelectContext";

export const SelectDropdown = ({ children, className = "" }) => {
    const { isOpen } = useSelectContext();
    if (!isOpen) return null;
    return (
        <div className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-100 overflow-hidden ${className}`}>
            {children}
        </div>
    )
}