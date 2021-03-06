<template>
    <div>
        <div v-if="!punishment" class="form-group">
            <label>???: {{ current.description }}</label>
            <input @keypress.enter="submit" class="form-control" placeholder="command">
        </div>

        <div v-else class="form-group">
            <label>{{ current.command }}: {{ current.description }}</label>
            <input :value="keyboard.input" class="form-control" placeholder="command" disabled>
        </div>

        <vue-keyboard v-show="punishment" :position="keyboard.position" :isShow="punishment"></vue-keyboard>
    </div>
</template>

<script>
    import commands from "../data/commands.csv";
    import shuffle from "../js/shuffle";

    import keyboardComponent from "./keyboard.vue";
    
    import positionObservable from "../js/observables/position";
    import jumpObservable from "../js/observables/jump";
    
    import getKey from "../js/getKey";

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
            const positionSubscription = positionObservable.subscribe({
                next: (pos) => {
                        this.keyboard.position.x = pos.x;
                        this.keyboard.position.y = pos.y;
                }
            });

            const jumpObserver = {
                next: () => {
                    const key = getKey(this.keyboard.position);
                    const input = this.keyboard.input;

                    switch(key) {
                        case "\n":
                            if(this.current.command === this.keyboard.input) {
                                this.punishment = false;
                                this.keyboard.input = "";
                                swal({
                                    title: "次の問題へ",
                                    type: "success"
                                });
                            } else {
                                swal({
                                    title: "入力が間違っています！",
                                    type: "error"
                                })
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

                    input: ""
                },

                position: {
                    subscription: positionSubscription
                },

                jump: {
                    observer: jumpObserver,
                    subscription: null
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
                    this.jump.subscription = jumpObservable.subscribe(this.jump.observer);
                } else {
                    this.jump.subscription.unsubscribe();
                    this.jump.subscription = null;
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

        beforeDestoroy() {
            this.position.subscription.unsubscribe();
            if(this.jump.subscription) {
                this.jump.subscription.unsubscribe();
            }
        }
    }
</script>