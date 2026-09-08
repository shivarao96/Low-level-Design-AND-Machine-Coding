export class VirtualListUsingScrollEvent {
    constructor(container, options = {}){
        this.container = container;
        this.itemHeight = options.itemHeight || 50;
        this.buffer = options.bufferSize || 5;
        this.items = options.items;
        this.renderItem = options.renderItem || ((item, index) => `<div>${item}</div>`);
        this.content = null;
        this.init();
    }


    init() {
        this.container.style.position = "relative";
        this.container.style.overflow = "auto";
        this.container.style.height = this.container.style.height || "400px";

        this.content = document.createElement("div");
        this.content.style.position = "absolute";
        this.content.style.width = "100%"
        this.content.style.top = "0";
        this.content.style.height = `${this.items.length * this.itemHeight}px`;
        this.container.appendChild(this.content);


        this.adjustBufferAsPerContainerHeight();
        this.generateItems();
        this.container.addEventListener("scroll", () => this.generateItems());
    }

    adjustBufferAsPerContainerHeight() {
        const containerHeight = this.container.clientHeight;
        const maxItems = Math.floor(containerHeight / this.itemHeight);
        if (this.buffer < maxItems) {
            this.buffer = maxItems;
        }
    }

    generateItems() {
        this.content.innerHTML = "";
        const scrollTop = this.container.scrollTop;
        const containerHeight = this.container.clientHeight;

        const indexPosition = Math.floor(
            (scrollTop + containerHeight) / this.itemHeight
        )

        const bufferRange = this.buffer;

        const startIndex = Math.max(0, indexPosition - bufferRange);

        const endIndex = Math.min(
            indexPosition + bufferRange,
            this.items.length - 1
        );

        const fragment = document.createDocumentFragment();
        for(let i = startIndex; i <= endIndex; i++) {
            const itemWrapper = document.createElement("div");
            const item = this.items[i];
            itemWrapper.style.cssText = `
                position: absolute;
                width: 100%;
                height: ${this.itemHeight}px;
                top: ${(i * this.itemHeight)}px;
                background: peachpuff;
                margin-bottom: 2px;
            `;
            itemWrapper.innerHTML = this.renderItem(item, i);
            fragment.appendChild(itemWrapper);
        }
        this.content.appendChild(fragment);
    }

    destroy() {
        this.container.removeEventListener("scroll", () => this.generateItems());
        this.container.innerHTML = "";
    }
}
