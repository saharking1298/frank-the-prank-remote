<template>
    <div id="wrapper">
        <div class="flexbox">
            <input type="text" placeholder="Enter a path here..." v-model="pathInput" @keydown.enter="updatePath" class="textbox">
            <i class="fas fa-home icon" @click="onHomeClick"></i>
            <i class="fas fa-sync-alt icon" @click="refresh"></i>
        </div>
        <div class="file-browser">
             <p class="file-browser-label"> {{ label }} </p>
            <file-list :files="files"> </file-list>
        </div>
        <div v-if="path === '' && favorites.files.length > 0">
            <p class="file-browser-label"> Quick access: </p>
            <file-list :files="favorites.files"> </file-list>
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
            favorites: {paths: [], files: {}},
        }
    },
    provide() {
        return {
           onFileClick: this.onFileClick,
           onStarClick: this.onStarClick, 
        }
    },
    methods: {
        async refresh() {
            this.setFavorites(await this.directTalk("files.getFavorites"));
            this.files = [];
            this.fetchFiles(this.path);
        },
        onHomeClick() {
            if(this.path !== '') {
                this.fetchFiles();
            }
        },
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
            this.favorites.paths = [];
            for (let entry of entries) {
                this.favorites.paths.push(entry.path);
                if (entry.type !== 'unknown') {
                    favorites.push({
                        name: this.getBaseName(entry.path),
                        path: entry.path,
                        type: entry.type,
                        favorite: true 
                    });
                }
            }
            this.favorites.files = favorites;
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
                    if(this.favorites.paths.includes(fullPath)) {
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
                    this.favorites.paths.push(file.path);
                    this.favorites.files.push(file);
                }
                else {
                    file.favorite = false;
                    this.favorites.paths.splice(this.favorites.paths.indexOf(file.path), 1);
                    this.favorites.files.splice(this.favorites.files.findIndex(entry => entry.path === file.path), 1);
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
    background: rgb(197, 206, 214);
    color: rgb(139, 139, 139);
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
.flexbox {
    display: flex;
    width: 100%;
}
.icon {
    margin-left: 8px;
    cursor: pointer;
    min-width: 16px;
    font-size: 1.1em;
    margin-top: 5px;
}
</style>