import { useEffect, useMemo, useRef, useState } from "react";
import { useSelectContext } from "../providers/SelectContext";

export const VirtualizedList = ({
    options,
    renderOption,
    containerHeights = 340,
    buffer = 5
}) => {

    const { itemHeight, highlightedIndex, value } = useSelectContext();
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);

    const visibleRange = useMemo(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.ceil((scrollTop + containerHeights) / itemHeight);
        return {
            start: Math.max(0, startIndex - buffer),
            end: Math.min(options.length, endIndex + buffer)
        }
    }, [scrollTop, itemHeight, options.length, containerHeights, buffer]);

    const visibleOptions = useMemo(() => {
        return options.slice(visibleRange.start, visibleRange.end);
    }, [visibleRange, options])

    const totalHeight = options.length * itemHeight;
    const offsetY = visibleRange.start * itemHeight;

   

    useEffect(() => {
        if (highlightedIndex >= 0 && containerRef.current) {
            const itemTop = highlightedIndex * itemHeight;
            const itemBottom = itemTop + itemHeight;
            const scrollBottom = scrollTop + containerHeights;

            if (itemTop < scrollTop) {
                containerRef.current.scrollTop = itemTop;
            } else if (itemTop > scrollBottom) {
                containerRef.current.scrollTop = itemBottom - containerHeights;
            }
        }
    }, [highlightedIndex, itemHeight, scrollTop, containerHeights])

    

     const selectedValIndex = useMemo(() => {
        const val = Array.isArray(value) && value.length > 0 ? value[0] : value;
        return options.findIndex((e) => e.value === val);
    }, [options, value]);

    useEffect(() => {
        if (selectedValIndex > -1 && containerRef?.current) {
            containerRef.current.scrollTop = selectedValIndex * itemHeight
        }
    }, [selectedValIndex, itemHeight]);

    return (
        <div
            ref={containerRef}
            onScroll={(e) => setScrollTop(e.target.scrollTop)}
            className="overflow-y-auto"
            style={{ maxHeight: containerHeights }}
        >
            <div style={{ height: `${totalHeight}px`, position: "relative" }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleOptions.map((option, idx) =>
                    renderOption(option, visibleRange.start + idx)
                )}
                </div>
            </div>
        </div>
    )

}