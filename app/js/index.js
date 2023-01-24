const createRandomId = (length) => {
    const result = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < length; i += 1) {
        result.push(chars.charAt(Math.floor(Math.random() * charsLength)));
    }
    return result.join('');
};

const createConfetti = (x ,y, numOfItems) => {
    const colors = [ '#2162ff', '#9e21ff', '#21a9ff', '#a9ff21', '#ff2184' ]
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    const makeId = createRandomId(10);
    confetti.dataset.id = makeId;
    let confettiHtml = '';
    const initialX = x;
    const initialY = y;

    for (let i = 0; i < numOfItems; i += 1) {
        const color = Math.floor(Math.random() * colors.length);
        confettiHtml += `<div 
            class="confetti-item" 
            style="background-color: ${colors[color]}" 
            data-angle="${Math.random()}"
            data-speed="${Math.random()}"></div>`;
        confettiHtml += `<div 
            class="confetti-item reverse" 
            style="background-color: ${colors[color]}" 
            data-angle="${Math.random()}"
            data-speed="${Math.random()}"></div>`;
        confetti.style.position = 'absolute';
        confetti.style.top = `${y}px`;
        confetti.style.left = `${x}px`;
        confetti.innerHTML = confettiHtml;
        document.body.appendChild(confetti);
    }

    const gravity = 90;
    const maxSpeed = 10500;
    const minSpeed = 65000;
    let t = 0;
    const maxAngle = 1500;
    const minAngle = 400;
    let opacity = 1;
    let rotateAngle = 0;

    let interval = setInterval(function() {
        document.querySelectorAll(`[data-id="${makeId}"] .confetti-item`).forEach(function(item) {
            let modifierX = 1;
            let modifierY = 1;
            if(item.classList.contains('reverse')) {
                modifierX = -1;
            }
            item.style.opacity = opacity;
            let randomNumber = parseFloat(item.dataset.angle);
            let otherRandom = parseFloat(item.dataset.speed);
            let newRotateAngle = randomNumber * rotateAngle;
            let angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
            let speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;

            let x = speed * t * Math.cos(angle) + (50 * otherRandom * t);
            let y = speed * t * Math.sin(angle) - (0.5 * gravity * Math.pow(t, 2))  + (50 * otherRandom * t);
            if (x + initialX > document.documentElement.clientWidth - 10) x = document.documentElement.clientWidth - initialX - 10;
            // console.log(y, initialY, document.documentElement.scrollHeight);
            if (Math.abs(initialY - y + 10) > document.documentElement.scrollHeight) console.log(y, initialY, document.documentElement.scrollHeight, );
            /*if (y < 0) y = 2;*/
            item.style.transform = `translate3d(${x * modifierX}px, ${y * -1 * modifierY}px, 0) rotateY(${newRotateAngle}deg) scale(${1})`;
        })
        t += 0.1;
        rotateAngle += 3;
        opacity -= 0.02;
        if(t >= 6) {
            t = 0.1;
            if(document.querySelector(`[data-id="${makeId}"]`) !== null) {
                document.querySelector(`[data-id="${makeId}"]`).remove();
            }
            clearInterval(interval);
        }
    }, 33.33);
}

document.addEventListener('DOMContentLoaded', function(e) {
    document.body.addEventListener('pointerdown', function(evt) {
      createConfetti(evt.pageX, evt.pageY, 20);
    });
});