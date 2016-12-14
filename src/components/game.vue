<template>
    <div>
        <div v-show="!punishment" class="form-group">
            <label>???: {{ current.description }}</label>
            <input @keyup.enter="submit" class="form-control" placeholder="command">
        </div>

        <div v-show="punishment">
            <div class="form-group">
                <label>{{ current.command }}: {{ current.description }}</label>
                <input :value="keyboard.input" class="form-control" placeholder="command" disabled>
            </div>
            <vue-keyboard :position="keyboard.position" :isShow="punishment"></vue-keyboard>
        </div>
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

    function swalPromise(options) {
        return new Promise(function(resolve) {
            swal(options, resolve);
        });
    }

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
                            this.keyboard.input = "";
                            swal({
                                title: "Okay！",
                                type: "success"
                            });
                        }
                        break;
                    
                    case "\b":
                        this.keyboard.input = input.substr(0, input.length - 1);
                        break;
                    
                    case " ":
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
            async submit(e) {
                const $input = e.target;

                const value = $input.value;
                const correct = this.current.command;

                if(value === correct) {

                    this.commands.shift();
                    await swalPromise({
                        title: "正解！",
                        type: "success"
                    });

                } else {

                    this.punishment = true;
                    await swalPromise({
                        title: "間違え！",
                        text: `答えは ${ correct } でした！`,
                        type: "error"
                    });
                    

                }

                $input.value = "";
            }
        },

        mounted() {
            window.game = this;
        },

        beforeDestoroy() {
            this.subscription.unsubscribe();
            if(this.punishment) {
                jumpTarget.removeEventListener("jump", this.keyboard.jumpHandler);
            }
        }
    }
</script>