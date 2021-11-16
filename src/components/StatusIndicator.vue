<template>
    <div class="indicator" :class="status"> </div>
</template>

<script>
export default {
    props: {
        status: {
            type: String,
            required: true,
            validator(value) {
                return ["offline", "online", "unconnected"].includes(value);
            }
        }
    }
}
</script>

<style scoped>
.indicator{
    position: relative;
    right: 60px;
    top: 12px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 1px solid black;
}
.offline{
    background-color: #d31212;
}
.online{
    background-color: #07af69;
}
.unconnected{
    background-color: #d4d4d4;
}
</style>