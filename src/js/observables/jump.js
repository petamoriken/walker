import Observable from "zen-observable";

const threshold = 8.0;
const duration = 800;

function absolute(obj) {
    const { x, y, z } = obj;
    return Math.sqrt(x * x + y * y + z * z);
}


export default new Observable(observer => {
    let startTime = null;

    function handler(e) {

        const abs = absolute(e.acceleration);
        const currentTime = e.timeStamp;

        if(!startTime) {
            startTime = currentTime;
        } else {

            if(abs < threshold) {
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