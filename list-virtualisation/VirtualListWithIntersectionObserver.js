export class VirtualListWithIntersectionObserver {
    constructor(container, options = {}) {
        this.container = container;
        this.itemHeight = options.itemHeight || 50;
        this.chunkSize = options.chunkSize || 20;
        this.items = options.items || [];
        this.originalItems = options.items || []; //
        this.renderItem =
            options.renderItem || ((item, index) => `<div>${item}</div>`);

        this.chunks = new Map();
        this.observer = null;

        this.init();
    }

    init() {
        this.container.style.position = "relative";
        this.container.style.overflow = "auto";
        this.container.style.height = this.container.style.height || "400px";

        this.content = document.createElement("div");
        this.content.style.position = "initial";
        this.content.style.width = "100%";
        this.content.style.height = `${this.items.length * this.itemHeight}px`;
        this.content.style.top = 0
        this.container.appendChild(this.content);

        this.setupObserver();
        this.createChunks();
    }

    get totalChunks() {
        return Math.ceil(this.items.length / this.chunkSize);
    }

    createChunks() {
        for (let i = 0; i < this.totalChunks; i++) {
            const startIndex = i * this.chunkSize;
            const chunkHeight =
                Math.min(this.chunkSize, this.items.length - startIndex) *
                this.itemHeight;

            const chunkElement = document.createElement("div");
            chunkElement.className = "virtual-chunk";
            chunkElement.dataset.chunk = i;
            chunkElement.style.cssText = `
                position: absolute;
                top: ${startIndex * this.itemHeight}px;
                left: 0;
                right: 0;
                height: ${chunkHeight}px;
            `;
            this.content.appendChild(chunkElement);
            this.chunks.set(i, { element: chunkElement, mounted: false });
            this.observer.observe(chunkElement);
        }
    }

    setupObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const chunkIndex = parseInt(entry.target.dataset.chunk);
                    if (entry.isIntersecting) {
                        this.mountChunk(chunkIndex);
                    } else {
                        this.unmountChunk(chunkIndex);
                    }
                });
            },
            {
                root: this.container,
                rootMargin: "200px 0px",
                threshold: 0
            }
        )
    }

    mountChunk(chunkIndex) {
        const chunk = this.chunks.get(chunkIndex);
        if (!chunk || chunk.mounted) return;

        const startIndex = chunkIndex * this.chunkSize;
        const endIndex = Math.min(startIndex + this.chunkSize, this.items.length);

        let html = "";
        for (let i = startIndex; i < endIndex; i++) {
            html += `
                <div class="virtual-list-item" style="height: ${this.itemHeight}px;">
                    ${this.renderItem(this.items[i], i)}
                </div>
            `;
        }
        chunk.element.innerHTML = html;
        chunk.mounted = true;
    }

    unmountChunk(chunkIndex) {
        const chunk = this.chunks.get(chunkIndex);
        if (!chunk || !chunk.mounted) return;

        chunk.element.innerHTML = "";
        chunk.mounted = false;
    }

    // scrollToIndex(index) {
    //     const targetTop = (index - 1) * this.itemHeight;
    //     this.container.scrollTop = targetTop;
    // }

    sort(order, key) {
        this.destroy();

        this.items = this.items.sort((a, b) => {
            if (order === "asc") {
                return a[key] - b[key];
            }

            return b[key] - a[key];
        });

        this.init();
    }

    filter(key, val) {
        this.destroy();

        if (key === "name") {
            this.items = this.items.filter((item) => item.name.includes(val));
        }

        this.init();
    }


    destroy() {
        this.observer?.disconnect();
        this.container.innerHTML = "";
        this.chunks.clear();
    }


}