import Observable from "zen-observable";

const coordinates = {
    rightBottom: {
        latitude:33.5612511914536,
        longitude:130.43050800462294
    },
    leftTop: {
        latitude:33.56201138816174,
        longitude:130.42951424618292
    }
};

export default new Observable(observer => {
    navigator.geolocation.watchPosition(function(e) {
        const current = e.coords;
        const px = (current.latitude - coordinates.leftTop.latitude) / (coordinates.rightBottom.latitude - coordinates.leftTop.latitude);
        const py = (current.longitude - coordinates.rightBottom.longitude) / (coordinates.leftTop.longitude - coordinates.rightBottom.longitude);

        observer.next({
            x: -py + 1,
            y: px
        });

    }, null, { enableHighAccuracy: true });
});