class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    }


    addItem(item) {
        this._container.prepend(item);
    }

    renderAll() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    renderCard() {
        this._renderer(this.cardData);
    }
}

export default Section;