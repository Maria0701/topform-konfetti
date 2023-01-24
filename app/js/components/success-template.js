export const successTemplate = (successMessage) => {
    const successText = successMessage === 'success'
        ? `Спасибо за обращение.
        <br/>Наш менеджер свяжется с вами в ближайшее время`
        : `Пожалуйста, свяжитесь с ними по телефонам
				<a href="tel:88003455678" title="позвонить " class="phone-link">8 800 345 56 78</a>`;
    const successName = successMessage === 'success'
    ? `заявка отправлена!`
    : `ошибка отправки!`;

    return `
    <div class="popup-overlay opened" data-popup="${successMessage}">
    <section class="popup popup--success opened">
        <div class="popup__wrapper">
            <button class="btn popup__close js-close">
                <svg width="24" height="24">
                    <use xlink:href="img/sprite.svg#close2"></use>
                </svg>
            </button>
            <div class="popup__body">
                <p class="popup__img">
                    <img src="../img/${successMessage}.svg" alt="success" width="100" height="100">
                </p>
                <p class="popup__name">${successName}</p>
                <p class="popup__message">${successText}</p>
                <button class="btn btn--small popup__btn" data-action="js-close">ХОРОШО</button>    
            </div>            
        </div>
    </section>
</div>
    `;
}