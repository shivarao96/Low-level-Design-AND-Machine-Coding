import { useCallback, useEffect, useMemo } from "react";
import { useSelectContext } from "../providers/SelectContext";
import { Check } from "lucide-react";
import {VirtualizedList} from "./VirtualizedList"

export const SelectList = ({
    options,
    filterFn,
    emptyMessage = "No options found !"
}) => {

    const {
        setIsOpen,
        searchQuery,
        setFilteredItemList,
        highlightedIndex, setHighlightedIndex,
        value,  multiple, onChange, listRef, virtualized
    } = useSelectContext();

    const filtered = useMemo(() => {
        if (!searchQuery) return options;
        const query = searchQuery.toLowerCase();
        return options.filter((opt) => {
            return filterFn ? filterFn(opt, query) : opt.label?.toLowerCase().includes(query) || opt.value?.toString().toLowerCase().includes(query)
        })
    }, [options, searchQuery, filterFn]);

    useEffect(() => {
        setFilteredItemList(filtered)
    }, [filtered, setFilteredItemList])

    const handleSelect = useCallback((option) => {
        if (multiple) {
            const newValues = Array.isArray(value) ? value : [];
            const exists = newValues.some((v) => v === option.value);
            onChange(
                exists ? newValues.filter((v) => v !== options) : [...newValues, option.value]
            );
        } else {
            onChange(option.value);
            setIsOpen(false);
        }
    }, [multiple, onChange, setIsOpen, options, value])

    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filtered.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
                    handleSelect(filtered[highlightedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                break;
        }
    }, [filtered, handleSelect, highlightedIndex, setHighlightedIndex, setIsOpen])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const isSelected = useCallback(
        (option) => {
            if (multiple) {
                return Array.isArray(value) && value.includes(option.value);
            }
            return value === option.value;
        },
        [value, multiple]
    );

    const renderOption = (option, idx) => {
        const selected = isSelected(option);
        const highlighted = idx === highlightedIndex;

        return (
            <div
                key={option.value}
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`px-4 py-2 cursor-pointer flex items-center justify-between
          ${highlighted ? "bg-blue-50" : ""}
          ${selected ? "bg-blue-100" : "hover:bg-gray-50"}`}
            >
                <span className="truncate">{option.label}</span>
                {selected && (
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                )}
            </div>
        );
    };

    if (filtered.length === 0) {
        return (
            <div className="px-4 py-8 text-center text-gray-500">{emptyMessage}</div>
        );
    }

    return (
        <div
            ref={listRef}
            role="listbox"
            aria-multiselectable={multiple}
            className="overflow-y-auto"
        >
            {virtualized ? (
                <VirtualizedList options={filtered} renderOption={renderOption} />
            ) : (
                filtered.map((option, idx) => renderOption(option, idx))
            )}
        </div>
    )
}