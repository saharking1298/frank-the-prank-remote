<template>
    <ul>
        <li v-for="(file, index) in files" :key="index" :class="index % 2 == 0 ? 'li-dark' : 'li-light'">
            <span class="li-left" @click="onFileClick(file)">
                <i :class="getIconClass(file)" class="file-icon"></i>
                <span class="cursor-pointer file-name"> {{ file.name }} </span>
            </span>
            <span class="li-right" @click="onStarClick(file)">
                <i class="fa-star cursor-pointer" :class="file.favorite ? 'fas favorite' : 'far'" v-if="file.type !== 'back'"></i>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'FileList',
    props: {
        files: {
            type: Object,
            required: true
        }
    },
    methods: {
        getIconClass(file) {
            let styleClass;
            if (file.type.startsWith(".")) {
                styleClass = "far fa-file";
            }
            switch (file.type) {
                case "folder":
                case "back":
                    styleClass = "far fa-folder";
                    break;
                case "drive":
                    styleClass = "far fa-hdd";
                    break;
                case "unknown":
                    styleClass = "fas fa-question"
                    break;
            }
            return styleClass;
        }
    },
    inject: ["onFileClick", "onStarClick"]
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
li {
    padding-left: 10px;
    font-size: 1.05em;
    display: flex;
}
.li-light{
    background: rgb(197, 206, 214);
    color: rgb(139, 139, 139);
}
.li-dark{
    color: rgb(197, 206, 214);
    background: rgb(153, 153, 153);
}
.li-left {
    flex: 1;
}
.li-right {
    flex: 1;
    max-width: 30px;
}
.favorite {
    color: rgb(255, 212, 34);
}
.cursor-pointer {
    cursor: pointer;
}
.file-icon {
    margin-right: 8px;
    cursor: pointer;
}
.file-name {
    overflow-wrap: anywhere;
}
</style>