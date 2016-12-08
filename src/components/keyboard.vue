<template>
    <div>
        <img class="keyboard" src="img/keyboard.jpg" alt="キーボード" ref="keyboard">
        <img class="cursor" src="img/cursor.png" alt="カーソル" :style="cursor">
    </div>
</template>

<style scoped>
    .keyboard {
        max-width: 100%;
    }

    .cursor {
        size: 34px 44px;
        position: absolute;
        pointer-events: none;
    }
</style>

<script>
    export default {

        data() {
            return {
                cursor: {
                    left: "0px",
                    top: "0px"
                }
            }
        },

        props: {
            position: {
                x: Number,
                y: Number
            }
        },

        watch: {
            ["position.x"]() {
                this.changeCursor();
            }
        },

        methods: {
            changeCursor() {
                const x = this.position.x == null ? 0.5 : this.position.x;
                const y = this.position.y == null ? 0.5 : this.position.y;

                try {
                    const $keyboard = this.$refs.keyboard;
                    const rect = $keyboard.getBoundingClientRect();

                    
                    this.cursor.left = (rect.left + window.pageXOffset + $keyboard.width * this.position.x - 13) + "px";
                    this.cursor.top = (rect.top + window.pageYOffset + $keyboard.height * this.position.y - 3) + "px";
                    
                } catch(e) {
                    this.cursor.left = "0px";
                    this.cursor.top = "0px";
                }
            }
        },

        mounted() {
            window.addEventListener("resize", this.changeCursor, false);
            if(window.onorientationchange) {
                window.addEventListener("orientationchange", this.changeCursor, false);
            }
        },

        beforeDestroy() {
            window.removeEventListener("resize", this.changeCursor, false);
            if(window.onorientationchange) {
                window.removeEventListener("orientationchange", this.changeCursor, false);
            }
        }
    }

</script>