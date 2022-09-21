<template>
    <div class="file-view">
        <div class="flexbox">
            <i class="fas fa-arrow-left icon" @click="back"> </i>
            <h2 class="title"> File Details: </h2>
        </div>
        <div v-if="details">
            <p>
                <strong> File Root: </strong> {{ details.root }}
                <br>
                <strong> File Name: </strong> {{ file.name }}
                <br>
                <strong> File Size: </strong> {{ details.size }}
                <br>
                <strong> Last Modified: </strong> {{ details.lastModified }}
            </p>
            <h3> Actions </h3>
            <div class="action-btn" @click="fileAction('play')" v-if="details.format.format === 'audio'"> Play </div>
            <div class="action-btn" @click="fileAction('edit')" v-if="details.format.plain"> Edit </div>
            <div class="action-btn" @click="fileAction('launch')"> Launch File </div>
            <div class="action-btn" @click="fileAction('rename')"> Rename File </div>
            <div class="action-btn" @click="fileAction('delete')"> Delete File </div>
            <div class="action-btn" @click="fileAction('move')"> Move File </div>
        </div>
    </div>
</template>

<script>
import { getFileSize, getLastModified, getBaseDir, getFileFormat } from '../../../../scripts/FileManager.js';
export default {
    data() {
        return {
            details: undefined,
        }
    },
    props: {
        file: {
            type: Object,
            required: true
        },
    },
    inject: ["directTalk", "setSubScreen", "showToast"],
    methods: {
        async fetchFileDetails() {
            const response = await this.directTalk("files.getDetails", this.file.path);
            const details = {root: getBaseDir(this.file.path), format: getFileFormat(this.file.type)};
            if (response && response.success && response.details) {
                details.size = getFileSize(response.details.size);
                details.lastModified = getLastModified(response.details.lastModified);
            }
            this.details = details;
        },
        back() {
            this.setSubScreen('file-browser');
        },
        fileAction(action) {
            const actions = ['play', 'edit', 'launch', 'move', 'delete', 'rename'];
            if (actions.includes(action)) {
                const response = this.directTalk('files.' + action, this.file.path);
                response;
                this.showToast({message: 'Sent file action: ' + action, duration: 3, style: 'fit-style'});
                this.back();
            }
        }
    },
    created() {
        this.fetchFileDetails();
    },
}
</script>

<style scoped>
.file-view {
    color: rgb(116, 115, 115);
}
.title {
    text-align: center;
    flex: 1;
    font-size: 1.15em;
    font-weight: bold;
}
.icon {
    font-size: 1.1em;
}
h3 {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
}
.action-btn {
    font-size: 1.03em;
    font-weight: bold;
    border: 2px solid rgb(107, 107, 107);
    background: gray;
    color: rgb(197, 206, 214);
    border-radius: 15px;
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 1px;
}
</style>