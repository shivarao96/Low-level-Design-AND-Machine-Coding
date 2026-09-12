import { useEffect, useMemo, useRef, useState } from "react";
import { SelectTrigger } from "../components/SelectTrigger"
import { SelectSearch } from "../components/SelectSearch"
import { SelectDropdown } from "../components/SelectDropdown"
import { SelectList } from "../components/SelectList"

import {
    createContext,
    useContext,
} from "react";

const SelectContext = createContext(null);

export const useSelectContext = () => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error("Select compound components must be used within Select");
    }
    return context;
};

export const Select = ({
    children,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    multiple = false,
    virtualized = false,
    itemHeight = 40
}) => {


    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItemList, setFilteredItemList] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const searchInputRef = useRef();
    const listRef = useRef();
    const dropdownContainerRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearchQuery("");
                setFilteredItemList([]);
                setHighlightedIndex(-1);
            }
        }
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [])

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const contextValue = useMemo(() => ({
        isOpen, setIsOpen,
        searchQuery, setSearchQuery,
        filteredItemList, setFilteredItemList,
        highlightedIndex, setHighlightedIndex,
        disabled, value, placeholder, multiple, virtualized,
        searchInputRef, itemHeight, onChange, listRef
    }), [
        isOpen, setIsOpen,
        searchQuery, setSearchQuery,
        filteredItemList, setFilteredItemList,
        highlightedIndex, setHighlightedIndex,
        disabled, value, placeholder, multiple, virtualized,
        searchInputRef, itemHeight, onChange, listRef
    ]);

    return (
        <SelectContext.Provider value={contextValue}>
            <div ref={dropdownContainerRef} className="relative w-full">
                {children}
            </div>
        </SelectContext.Provider>
    )
}

Select.Trigger = SelectTrigger;
Select.Search = SelectSearch;
Select.Dropdown = SelectDropdown;
Select.List = SelectList;