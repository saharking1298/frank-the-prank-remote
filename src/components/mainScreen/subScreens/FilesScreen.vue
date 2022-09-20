<template>
    <div id="wrapper">
        <input type="text" placeholder="Enter a path here..." v-model="pathInput" @keydown.enter="updatePath" class="textbox">
        <div class="file-browser">
             <p class="file-browser-label"> {{ label }} </p>
            <file-list :files="files"> </file-list>
        </div>
        <div v-if="path === '' && favorites.length > 0">
            <p class="file-browser-label"> Quick access: </p>
            <file-list :files="favorites"> </file-list>
        </div>
    </div>
</template>

<script>
import FileList from './files-screen/FileList.vue';
export default {
    components: { FileList },
    inject: ["directTalk"],
    data() {
        return {
            pathInput: "",
            path: "",
            pathBackup: "",
            labels: {
                driveSelection: "Select a drive:",
                fileSelection: "Select a file:"                
            },
            label: "",
            files: [],
            favorites: [],
        }
    },
    provide() {
        return {
           onFileClick: this.onFileClick,
           onStarClick: this.onStarClick, 
        }
    },
    methods: {
        updatePath() {
            this.pathInput = this.pathInput.trim();
            if (this.pathInput !== this.path) {
                this.fetchFiles(this.pathInput);
            }
        },
        getFullPath(path) {
            const root = this.path;
            let result;
            if(root === ''){
                result = path;
            }
            else if(root.endsWith("\\")) {
                result = root + path;
            }
            else {
                result = root + "\\" + path;
            }
            return result;
        },
        getBaseName(path) {
            if (path.endsWith("\\")) {
                path = path.slice(0, -1);
            }
            if (path.endsWith(":") && path.length == 2) {
                return path + "\\";
            }
            path = path.split("\\");
            path = path[path.length - 1];
            return path;
        },
        getBaseDir(path) {
            if (path.endsWith("\\")) {
                path = path.slice(0, -1);
            }
            path = path.split("\\");
            path.pop();
            path = path.join("\\");
            if (path.endsWith(":")) {
                path += "\\";
            }
            return path;
        },
        setFavorites(entries) {
            const favorites = [];
            for (let entry of entries) {
                favorites.push({
                    name: this.getBaseName(entry.path),
                    path: entry.path,
                    type: entry.type,
                    favorite: true 
                })
            }
            this.favorites = favorites;
        },
        async fetchFiles(path="") {
            let fullPath;
            this.pathBackup = this.path;
            this.path = path;
            this.pathInput = this.path;
            if (this.path === ''){
                this.label = this.labels.driveSelection;
            }
            else {
                this.label = this.labels.fileSelection;
            }
            const files = await this.directTalk("files.listDir", this.path);
            if (files !== "Error") {
                if(this.path !== "") {
                    files.unshift({name: "..", type: "back"});
                }
                for (let file of files) {
                    fullPath = this.getFullPath(file.name);
                    file.path = fullPath;
                    if(this.favorites.find(file => file.path === fullPath)) {
                        file.favorite = true;
                    }
                }
                this.files = files;
            }
            else {
                this.fetchFiles(this.pathBackup);
            }
        },
        async onFileClick(file) {
            let path = this.path;
            if (file.type.startsWith(".")) {
                return;
            }
            if(file.type === 'back') {
                path = this.getBaseDir(path);
            }
            else {
                path = file.path;
            }
            this.fetchFiles(path); 
        },
        async onStarClick(file) {
            const response = await this.directTalk("files.toggleFavorite", file.path);
            if(response.success) {
                if(response.isFavorite) {
                    file.favorite = true;
                    this.favorites.push(file);
                }
                else {
                    file.favorite = false;
                    this.favorites.splice(this.favorites.findIndex(entry => entry.path === file.path), 1);
                }
            }
            console.log(this.favorites);
        },
    },
    async created() {
        this.setFavorites(await this.directTalk("files.getFavorites"));
        this.fetchFiles();
    },
}
</script>

<style scoped>
p {
    margin-bottom: 8px;
}
#wrapper{
    margin-top: 60px;
    margin-bottom: 40px;
    margin-right: 12px;
    padding-left: 12px;
}
.file-browser {
    margin-bottom: 8px;
}
.textbox {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
}
.file-browser-label {
    color: gray;
}
</style>