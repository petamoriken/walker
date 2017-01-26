import Observable from "zen-observable";

const threshold = 8.0;
const duration = 800;

function hypotenuse(obj) {
    const { x, y, z } = obj;
    return Math.hypot(x, y, z);
}


export default new Observable(observer => {
    let startTime = null;

    function handler(e) {

        const hypot = hypotenuse(e.acceleration);
        const currentTime = e.timeStamp;

        if(!startTime) {
            startTime = currentTime;
        } else {

            if(hypot < threshold) {
                if(currentTime - startTime > duration) {
                    observer.next();
                }
                startTime = currentTime;
            }

        }
    }

    window.addEventListener("devicemotion", handler);

    return () => window.removeEventListener("devicemotion", handler);
});