const eventTarget = document.createDocumentFragment();

const threshold = 3.0;
const times = 50;

let counter = 0;
let flag = false;

window.addEventListener("devicemotion", function(e) {
    const current = e.acceleration;
    const n = norm(current);

    if(n > threshold) {
        ++counter;
    } else {
        counter = 0;
        if(flag) {
            const event = new Event("jump");
            eventTarget.dispatchEvent(event);
        }

        flag = false;
    }

    if(counter > times) {
        flag = true;
    }
});

function norm(obj) {
    const x = obj.x, y = obj.y, z = obj.z;
    return Math.sqrt(x * x + y * y + z * z);
}

export default eventTarget;