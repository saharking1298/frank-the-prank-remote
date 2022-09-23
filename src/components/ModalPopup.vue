<template>
    <div class="fullscreen"></div>
    <div class="custom-modal">
        <h4> {{ modal.title }} </h4>
        <p v-if="modal.text"> {{ modal.text }}</p>
        <input type="text" class="form-control" v-if="modal.input" v-model="input" :placeholder="modal.input.placeholder" @keydown.enter="onEnter" ref="modalInput">
        <div class="flexbox" v-if="modal.buttons.length > 0">
            <div class="action-btn" v-for="(item, index) in modal.buttons" :key="index" @click="onClick(item)">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modal: {
            type: Object,
            required: true
        }
    },
    data() {
        let input = '';
        if(this.modal.input) {
            input = this.modal.input.text;
        }
        return {
            input,
        };
    },
    mounted() {
        if (this.$refs.modalInput) {
            this.$refs.modalInput.focus();
        }
    },
    methods: {
        onEnter() {
            if(this.modal.input) {
                for (let item of this.modal.buttons) {
                    if (item.type === 'confirm') {
                        this.onClick(item);
                    }
                }
            }
            return () => {};
        },
        onClick(item) {
            const modal = this.modal;
            if (modal.input) {
                modal.input.text = this.input;
            }
            item.click(modal);
        },
    }
}
</script>

<style scoped>
.action-btn {
    width: 110px;
    border: 2px solid rgb(107, 107, 107);
    background: gray;
    color: rgb(197, 206, 214);
    margin-left: 4px;
    margin-right: 4px;
}
.action-btn:hover {
    background: rgb(197, 206, 214);
    color: gray;
}
h4 {
    text-align: center;
}
.custom-modal {
    position: absolute;
    z-index: 10;
    width: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(197, 206, 214);
    padding: 5px;
    border: 2px solid gray;
    border-radius: 8px;
}
.fullscreen {
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
}
.flexbox {
    display: flex;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
}
</style>