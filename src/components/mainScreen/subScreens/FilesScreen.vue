<template>
    <div id="wrapper">
        <input type="text" placeholder="Enter a path here..." onclick="this.select()" v-model="pathInput" @keydown.enter="updatePath">
        <p> {{ label }} </p>
        <ul>
            <li v-for="(item, index) in items" :key="index" @click="onItemClick(index)" :class="index % 2 == 0 ? 'li-dark' : 'li-light'">
                <i :class="item.styleClass"></i>
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    inject: ["directTalk"],
    data() {
        return {
            pathInput: "",
            path: "",
            pathBackup: "",
            labels: {
                driveSelection: "Select a drive:",
                folderSelection: "Select a folder:"                
            },
            label: "",
            items: [],
        }
    },
    methods: {
        updatePath() {
            this.pathInput = this.pathInput.trim();
            if (this.pathInput !== this.path) {
                this.fetch(this.pathInput);
            }
        },
        async fetch(path) {
            this.pathBackup = this.path;
            this.path = path;
            this.pathInput = this.path;
            if (this.path === ''){
                this.label = this.labels.driveSelection;
            }
            else {
                this.label = this.labels.folderSelection;
            }
            const items = await this.directTalk("files.listDir", this.path);
            if (items !== "Error") {
                if(this.path !== "") {
                    items.unshift({title: "..", type: "back"});
                }
                for (let item of items) {
                    if (item.type.startsWith(".")) {
                        item.styleClass = "far fa-file";
                    }
                    switch (item.type) {
                        case "folder":
                        case "back":
                            item.styleClass = "far fa-folder";
                            break;
                        case "drive":
                            item.styleClass = "far fa-hdd";
                            break;
                    }
                }
                this.items = items;
            }
            else {
                this.fetch(this.pathBackup);
            }
        },
        async onItemClick(index) {
            const item = this.items[index];
            let path = this.path;
            if (item.type.startsWith(".")) {
                return;
            }
            if(item.type === 'back') {
                if (path.endsWith("\\")) {
                    path = path.slice(0, -1);
                }
                path = path.split("\\");
                path.pop();
                path = path.join("\\");
                if (path.endsWith(":")) {
                    path += "\\";
                }
            }
            else {
                if (path !== '' && !path.endsWith('\\')) {
                    path += '\\';
                }
                path += item.title;
            }
            this.fetch(path); 
        }
    },
    async created() {
        this.label = this.labels.driveSelection;
        this.fetch("");
    },
}
</script>

<style scoped>
#wrapper{
    margin-top: 60px;
    margin-bottom: 40px;
}
ul {
    list-style: none;
    margin-right: 20px;
    /* padding: 0; */
}
li {
    padding-left: 10px;
    cursor: pointer;
}
.li-light{
    background: rgb(197, 206, 214);
    color: rgb(139, 139, 139);
}
.li-dark{
    color: rgb(197, 206, 214);
    background: rgb(153, 153, 153);
}
</style>