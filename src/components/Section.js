class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }


    addItem(item) {
        this._container.prepend(item);
    }

    renderAll(cards) {
        cards.forEach(item => {
            this._renderer(item);
        })
    }

    renderCard() {
        this._renderer(this.cardData);
    }
}

export default Section;