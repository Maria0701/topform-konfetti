
export class PopupOpener {
    constructor({
        openElt, // элемент, по которому открываем попап
        overlayClass, // класс оверлея
        popupClass, //класс попапа
        closeBtnClass, // класс кнопки закрытия
        animationOpenClass,
        animationCloseClass,
    }) {
        this.openElt = openElt; // кнопка, по которой открывается попап
        this.overlayElt = document.querySelector(overlayClass); // выбираем элемент оверлея. В этом случае сам попап находится внутри элемента
        this.popupElt = this.overlayElt.querySelector(popupClass); // сам элемент popup. В этом случае можно его считаю от оверлея. Если оверлей отдельно от попапа - этот элемент переписать
        this.closeBtn = this.popupElt.querySelector(closeBtnClass); // находим кнопку закрытия
        this.animationOpenClass = animationOpenClass;
        this.animationCloseClass = animationCloseClass;
        this.closeHandler = this.closeHandler.bind(this);
        this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
        this.btnEnterCloseHandler = this.keyDownHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    open() {
        if (this.animationOpenClass){ 
            this.overlayElt.classList.add(this.animationOpenClass);
            this.popupElt.classList.add(this.animationOpenClass);
            this.overlayElt.addEventListener('animationend', this.animationEndHandler);
            this.popupElt.addEventListener('animationend', this.animationEndHandler);
        }        
        this.overlayElt.classList.add('opened');        
        this.popupElt.classList.add('opened');
        this.setCloseListeners();
    }

    setCloseListeners() {
        this.overlayElt.addEventListener('click', this.closeOverlayHandler);
        this.closeBtn.addEventListener('click', this.closeHandler);
        document.addEventListener('keydown', this.keyDownHandler);
        this.closeBtn.addEventListener('keydown', this.btnEnterCloseHandler);
    }

    closeHandler() {
        this.close();
    }

    close() {
        if (this.animationCloseClass) { 
            this.overlayElt.classList.add(this.animationCloseClass);
            this.popupElt.classList.add(this.animationCloseClass);
            this.overlayElt.addEventListener('animationend', this.animationEndHandler);
            this.popupElt.addEventListener('animationend', this.animationEndHandler);
        }
        this.popupElt.classList.remove('opened');
        this.overlayElt.classList.remove('opened');
        this.overlayElt.removeEventListener('click', this.closeOverlayHandler);
        this.closeBtn.removeEventListener('click', this.closeHandler);
        document.removeEventListener('keydown', this.keyDownHandler);
        this.closeBtn.removeEventListener('keydown', this.btnEnterCloseHandler);

        
    }

    closeOverlayHandler(evt) {
        if (this.popupElt.contains(evt.target)) return;
        this.closeHandler();
    }

    keyDownHandler(evt) {
        if (evt.key === 'Escape') {
            this.closeHandler();
        }
    }

    btnEnterCloseHandler(evt) {
        if (evt.key === 'Enter') {
            this.closHandler();  
        }
    }

    animationEndHandler(evt) {
        const animationName = evt.animationName;
        evt.target.classList.remove(animationName);

        if (evt.target === this.overlayElt) {
            this.overlayElt.removeEventListener('animationend', this.animationEndHandler);
        }

        if (evt.target === this.popupElt) {
            this.popupElt.removeEventListener('animationend', this.animationEndHandler);
        }
    }
}