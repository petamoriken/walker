<template>
    <div>
        <vue-keyboard :position="keyboardPosition"></vue-keyboard>
        <div class="output">input: {{ str }}</div>
    </div>
</template>

<style scoped>
    .output {
        font-size: 2em
    }
</style>

<script>
    import { key as keyDataStore, position as positionDataStore } from "../js/dataStore";

    export default {
        data() {
            return {
                keyboardPosition: {
                    x: 0.5,
                    y: 0.5
                },
                str: ""
            }
        },

        components: {
            "vue-keyboard": require("./keyboard.vue")
        },

        mounted() {
            window.positionDataStore = positionDataStore;

            keyDataStore.on("send", datum => {
                const key = datum.value.key;
                const str = this.str;

                switch(key) {
                    case "\n":
                        location.href = "https://www.google.co.jp/search?q=" + encodeURI(str);
                        break;
                    
                    case "\b":
                        this.str = str.substr(0, str.length - 1);
                        break;
                    
                    default:
                        this.str += key;  
                }
            });

            positionDataStore.on("send", datum => {
                const pos = datum.value;
                this.keyboardPosition.x = pos.x;
                this.keyboardPosition.y = pos.y;                
            })
        },

        beforeDestroy() {
            keyDataStore.off("send");
            positionDataStore.off("send");
        }
    }
</script>