export class CreateNewElement {
    constructor(elmnt, tag = 'div', className) {
        this.elmnt = elmnt;
        this.tag = tag;
        this.className = className || null;
        this.newElement = null;
        this.createElmt = this.createElmt.bind(this);
    }

    createElmt() {
        this.newElement = document.createElement(this.tag);
        if (this.className) this.newElement.classList.add(this.className)
        this.elmnt.append(this.newElement);
        
        return this.newElement;
    }

    destroyElmt() {
        this.newElement.remove();
        this.newElement = null;
    }

    insertText(text) {
        this.newElement.innerHTML = '';
        this.newElement.insertAdjacentHTML('beforeend', text);
    }

    setAttribute(atrName,atrValue) {        
        this.newElement.setAttribute(atrName, atrValue);
    } 
}


// проверяем поле на соответстве правилу для типов (здесь указаны только поля, используемые в квизе)
    // при необходимости можно дополнить любыми другими полями
    const checkType = (field) => {
        let booleanItem;
        const re = /^[a-zA-Zа-яА-ЯЁё ]*$/;
        switch(field.type) {
            case 'number':
                booleanItem = !isNaN(parseFloat(field.value));
                break;
            case 'text':
                booleanItem = field.value.length > 2 && re.test(field.value);
                break;
            case 'tel':
                booleanItem= true;
                break;
            case 'checkbox':
                booleanItem = field.checked === true;
                break;
        }
        return booleanItem;
    };


// проверяем поле на непустое и на соответствие правилу для типов
export const checkField = (fields) => {
    let mistakes = 0;
    fields.forEach(field => {
        if (field.closest('label').classList.contains('mistake')) field.closest('label').classList.remove('mistake');
        if (field.value === '' || !checkType(field)) {
            field.closest('label').classList.add('mistake');
            mistakes++;
        }                 
    })
    return mistakes === 0;
}
