export const tabsOpener = (className) => {
    const togglers = document.querySelectorAll(className);
    if (togglers.length === 0 ) return;
    const openHandler = (evt) => {
        evt.preventDefault();
        evt.target.closest(className).parentElement.classList.toggle('closed');
        evt.target.closest(className).parentElement.classList.toggle('opened');
    }

    togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
}

export const tabsOpenerOutOfArea = (className, elementClassName) => {
    const togglers = document.querySelectorAll(className);
    if (togglers.length === 0 ) return;
    let targetElement;
    let parent;
    let target;

    const closeHandler = () => {
        parent.classList.remove('opened');
        document.removeEventListener('click', clickCloseHandler);
        target.removeEventListener('click', closeHandler);
        document.removeEventListener('keyup', keyCloseHandler);
        togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
    }

    const clickCloseHandler = (evt) => {
        if (parent.contains(evt.target)) return;
        closeHandler();
    }

    const keyCloseHandler = (evt) => {
        if (evt.code === 'Escape') {
            closeHandler();
        }
    }

    const openHandler = (evt) => {
        evt.preventDefault();
        target = evt.target;
        parent = target.parentElement;
        targetElement = parent.querySelector(elementClassName);
        if (!targetElement) return;
        parent.classList.add('opened');
        togglers.forEach(toggler => toggler.removeEventListener('click', openHandler));
        document.addEventListener('click', clickCloseHandler);
        target.addEventListener('click', closeHandler);
        document.addEventListener('keyup', keyCloseHandler);
    }

    togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
}