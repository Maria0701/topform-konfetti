export const menuOpener = () => {
    const menuToggler = document.querySelector('[data-action="menu-open"]');
    const menu = document.querySelector('.js-menu');
    let subMenuTogglers;
    let activeSubMenu = null;
    let backItem = null;

    const closeSubMenu = () => {
        activeSubMenu.classList.remove('opened');
        menu.classList.remove('sub-opened');
        activeSubMenu = null;
    }

    const closeMenuHandler = () => {
        if (activeSubMenu) closeSubMenu();
        document.querySelector('header').classList.remove('opened');
        menuToggler.removeEventListener('click', closeMenuHandler);
        menuToggler.addEventListener('click', openMenuHandler);
        subMenuTogglers.forEach(item => item.removeEventListener('click', subMenuHandler));
    }

    const subMenuHandler = (evt) => {
        evt.preventDefault();
        if (activeSubMenu) closeSubMenu();
        activeSubMenu = evt.target.closest('.menu-service__item').querySelector('.menu-service__list-sub');
        if (!activeSubMenu) return;
        backItem = menu.querySelector('.js-back');
        menu.classList.add('sub-opened');        
        activeSubMenu.classList.add('opened');
        backItem.addEventListener('click', closeSubMenu);
    }

    const outOfAreaHandler = (evt) => {
        if (menu.contains(evt.target) || menuToggler.contains(evt.target)) return;
        closeMenuHandler();
    }

    const openMenuHandler = (evt) => {
        evt.preventDefault();
        document.querySelector('header').classList.add('opened');
        subMenuTogglers = menu.querySelectorAll('.js-subopener');
        subMenuTogglers.forEach(item => item.addEventListener('click', subMenuHandler));
        menuToggler.removeEventListener('click', openMenuHandler);
        menuToggler.addEventListener('click', closeMenuHandler);
        document.addEventListener('click', outOfAreaHandler);
    }

    menuToggler.addEventListener('click', openMenuHandler);
}