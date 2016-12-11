<template>
    <div>
        <div>{{ current.description }} {{ punishment ? current.command : "" }}</div>
        <input v-show="!punishment" @keyup.enter="submit" placeholder="input answer">

        <vue-keyboard v-show="punishment" :position="keyboard.position"></vue-keyboard>
        <div v-show="punishment">input: {{ keyboard.input }}</div>
    </div>
</template>

<script>
    import commands from "../data/commands.csv";
    import shuffle from "../js/shuffle";

    import keyboardComponent from "./keyboard.vue";
    import positionObservable from "../js/position";
    import getKey from "../js/getKey";

    import jumpTarget from "../js/jump";

    commands.shuffle = shuffle.bind(commands);

    export default {
        
        components: {
            "vue-keyboard": keyboardComponent
        },

        data() {
            const subscription = positionObservable.subscribe({
                next: (pos) => {
                    this.keyboard.position.x = pos.x;
                    this.keyboard.position.y = pos.y;
                }
            });

            const jumpHandler = () => {
                const key = getKey(this.keyboard.position);
                const input = this.keyboard.input;

                switch(key) {
                    case "\n":
                        if(this.current.command === this.keyboard.input) {
                            this.punishment = false;
                        }
                        break;
                    
                    case "\b":
                        this.keyboard.input = input.substr(0, input.length - 1);
                        break;
                    
                    default:
                        this.keyboard.input = input + key;
                }
            };

            return {
                commands: commands.shuffle(),
                punishment: false,

                keyboard: {
                    position: {
                        x: 0,
                        y: 0
                    },
                    subscription,
                    jumpHandler,
                    input: ""
                }
            }
        },

        computed: {
            current() {
                return this.commands[0];
            }
        },

        watch: {
            punishment(flag) {
                if(flag) {
                    jumpTarget.addEventListener("jump", this.keyboard.jumpHandler);
                } else {
                    jumpTarget.removeEventListener("jump", this.keyboard.jumpHandler);
                }
            }
        },

        methods: {
            submit(e) {
                const $input = e.target;

                const value = $input.value;
                const correct = this.current.command;

                if(value === correct) {
                    alert("正解！");
                    this.commands.shift();
                } else {
                    alert(`間違い！ 答えは${ correct }でした！`);
                    this.punishment = true;
                }

                $input.value = "";
            }
        },

        beforeDestoroy() {
            this.subscription.unsubscribe();
            if(this.punishment) {
                jumpTarget.removeEventListener("jump", this.keyboard.jumpHandler);
            }
        }
    }
</script>