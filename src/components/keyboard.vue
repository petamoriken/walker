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
        top: -1px;
        left: -24px;
        transition: transform 0.3s ease-out;
        opacity: 0.8;
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
                    transform: "translate3d(0, 0, 0)"
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
                    const left = $keyboard.width * this.position.x + "px";
                    const top = $keyboard.height * this.position.y + "px";
                    this.cursor.transform = `translate3d(${ left }, ${ top }, 0)`;
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