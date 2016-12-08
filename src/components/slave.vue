<template>
    <div>
        <vue-keyboard :position="keyboardPosition"></vue-keyboard>
        <div>{{ output }}</div>
    </div>
</template>

<script>
    import jumpTarget from "../js/jump";
    import positionObservable from "../js/position";

    import getKey from "../js/getKey";

    import { key as keyDataStore, position as positionDataStore } from "../js/dataStore";

    export default {
        data() {
            return {
                output: "",
                keyboardPosition: {
                    x: 0.5,
                    y: 0.5
                },

                subscription: null
            }
        },

        components: {
            "vue-keyboard": require("./keyboard.vue")
        },

        mounted() {
            const position = this.keyboardPosition;

            let searchText = "";

            this.subscription = positionObservable.subscribe({
                next(pos) {
                    position.x = pos.x;
                    position.y = pos.y;
                    positionDataStore.send(pos);
                }
            });

            jumpTarget.addEventListener("jump", () => {
                const key = getKey(position);

                keyDataStore.send({
                    key
                });

                switch(key) {
                    case "\n":
                        location.href = "https://www.google.co.jp/search?q=" + encodeURI(searchText);
                        break;
                    
                    case "\b":
                        searchText = searchText.substr(0, searchText.length - 1);
                        break;
                    
                    default:
                        searchText += key;  
                }

                this.output = searchText.replace(" ", "_");
            }, false);
        },

        beforeDestroy() {
            this.subscription.unsubscribe();
        }
    };
</script>