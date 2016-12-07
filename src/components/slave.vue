<template>
    <div>
        <img class="keyboard" src="img/keyboard.jpg" alt="キーボード" ref="keyboard">
        <img class="cursor" src="img/cursor.png" alt="カーソル" :style="cursor">
        <div>{{ output }}</div>
    </div>
</template>

<style scoped>
    .keyboard {
        max-width: 100%;
    }

    .cursor {
        size: 34px 44px;
        position: relative;
        top: 0;
        left: 0;
        pointer-events: none;
    }
</style>

<script>
    import jumpTarget from "../js/jump";
    import positionObservable from "../js/position";

    import getKey from "../js/getKey";

    export default {
        data() {
            return {
                cursor: {
                    left: 0 + "px",
                    top: 0 + "px"
                },
                output: ""
            }
        },

        mounted() {
            const position = {
                x: 0.5,
                y: 0.5
            };

            let searchText = "";

            const changeCursorPosition = () => {
                const cursor = this.cursor;
                const $keyboard = this.$refs.keyboard;
                cursor.left = ($keyboard.width * position.x - 13) + "px";
                cursor.top = ($keyboard.height * (position.y - 1) - 3) + "px";
            };

            window.addEventListener("resize", changeCursorPosition, false);
            if(window.onorientationchange) {
                window.addEventListener("orientationchange", changeCursorPosition, false);
            }

            positionObservable.subscribe({
                next(pos) {
                    position.x = pos.x;
                    position.y = pos.y;
                    changeCursorPosition();
                }
            });

            jumpTarget.addEventListener("jump", () => {
                const key = getKey(position);

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
        }
    };
</script>