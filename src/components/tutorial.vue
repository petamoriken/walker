<template>
    <div>
        <div class="form-group">
            <label>{{ stage === 0 ? "???" : "alias" }}: コマンドの別名を登録</label>
            <input class="form-control" placeholder="command">
        </div>

        <vue-keyboard :position="keyboard.position" :isShow="stage === 1"></vue-keyboard>
    </div>
</template>

<script>
    import keyboardComponent from "./keyboard.vue";

    export default {
        
        components: {
            "vue-keyboard": keyboardComponent
        },

        data() {
            return {
                stage: 0,

                keyboard: {
                    position: {
                        x: 0.5,
                        y: 0.5
                    }
                }
            };
        }

    }
</script>