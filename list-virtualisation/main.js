import { VirtualListUsingScrollEvent } from "./VirtualList.js";
import { VirtualListWithIntersectionObserver } from "./VirtualListWithIntersectionObserver.js";

// const { VirtualList } = require("./VirtualList");

// const VirtualList = require("./VirtualList");

const items = new Array(3000).fill().map((_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`
}));

const virtualList = new VirtualListWithIntersectionObserver(
    document.getElementById("list-container"),
    {
        items,
        itemHeight: 60,
        bufferSize : 10,
        chunkSize: 20,
        renderItem: (item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;height: 100%; padding: 0 10px;">
            <strong>${item.name}</strong>
            <span style="color: #666;">${item.description}</span>
        </div>
        `
    }
)