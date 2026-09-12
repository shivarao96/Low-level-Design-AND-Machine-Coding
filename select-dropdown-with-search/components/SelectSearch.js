import { useSelectContext } from "../providers/SelectContext";
import { Search, X } from "lucide-react";

export const SelectSearch = ({ placeholder = "search ...", className = "" }) => {

    const { searchQuery, setSearchQuery, searchInputRef, setHighlightedIndex } = useSelectContext();

    const handleClear = () => {
        setSearchQuery("");
        setHighlightedIndex(-1);
        searchInputRef.current.focus();
    }

    return (
        <div className={`relative px-2 py-2 border-b border-gray-200 ${className}`}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    ref={searchInputRef}
                    type="text"
                    role="searchbox"
                    aria-label="Search options"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setHighlightedIndex(-1)
                    }}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {
                    searchQuery && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )
                }
            </div>
        </div>
    )
}