<template>
    <div>input: {{ str }}</div>
</template>

<script>
    import { key as dataStore } from "../js/dataStore";

    window.dataStore = dataStore;

    export default {
        data() {
            return {
                str: ""
            }
        },

        mounted() {
            dataStore.on("send", datum => {
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
        },

        beforeDestroy() {
            dataStore.off("send");
        }
    }
</script>