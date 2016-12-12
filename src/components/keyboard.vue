<template>
    <div class="wrapper">
        <img class="keyboard" src="img/keyboard.jpg" alt="キーボード" ref="keyboard">
        <img class="cursor" src="img/cursor.png" alt="カーソル" :style="cursor">
    </div>
</template>

<style scoped>
    .wrapper {
        position: relative;
    }

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
    function isNormalized(num) {
        return num >= 0 && num <= 1;
    }

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
                x: {
                    type: Number,
                    default: 0,
                    validator: isNormalized
                },
                y: {
                    type: Number,
                    default: 0,
                    validator: isNormalized
                }
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            isShow(val) {
                if(val)
                    this.changeCursor();
            },

            ["position.x"]() {
                this.changeCursor();
            }
        },

        methods: {
            changeCursor() {
                const $keyboard = this.$refs.keyboard;

                if($keyboard && this.isShow) {
                    this.cursor.left = ($keyboard.width * this.position.x - 13) + "px";
                    this.cursor.top = ($keyboard.height * this.position.y - 3) + "px";
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