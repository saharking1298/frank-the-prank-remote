<template>
    <div class="file-view">
        <div class="flexbox">
            <i class="fas fa-arrow-left icon" @click="back"> </i>
            <h2 class="title"> {{ pageTitle }} </h2>
        </div>
        <div v-if="details">
            <div v-if="subScreen === 'file-view'">
                <table class="file-details">
                    <tr>
                        <td> File Root: </td>
                        <td> {{ details.root }} </td>
                    </tr>
                    <tr>
                        <td> File Name: </td>
                        <td> {{ file.name }} </td>
                    </tr>
                    <tr>
                        <td> File Size: </td>
                        <td> {{ details.size }} </td>
                    </tr>
                    <tr>
                        <td> Last Modified: </td>
                        <td> {{ details.lastModified }} </td>
                    </tr>
                </table>
                <h3> Actions </h3>
                <div class="action-btn" @click="fileAction('play')" v-if="details.format.format === 'audio'"> Play </div>
                <div class="action-btn" @click="actionEdit" v-if="details.format.plain"> Edit </div>
                <div class="action-btn" @click="fileAction('launch')"> Launch File </div>
                <div class="action-btn" @click="fileAction('rename')"> Rename File </div>
                <div class="action-btn" @click="fileAction('delete')"> Delete File </div>
                <div class="action-btn" @click="fileAction('move')"> Move File </div>
            </div>
            <div v-if="subScreen === 'file-edit'">
                <textarea class="form-control text-input" id="listContent" name="listContent" rows="19" v-model="fileText" @input="fileChanged = true"></textarea>
                <div class="action-btn" @click="actionEdit"> Save </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFileSize, getLastModified, getBaseDir, getFileFormat } from '../../../../scripts/FileManager.js';
export default {
    data() {
        return {
            subScreen: 'file-view',
            details: undefined,
            fileText: '',
            fileChanged: false,
            response: {},
        };
    },
    props: {
        file: {
            type: Object,
            required: true
        },
    },
    computed: {
        pageTitle() {
            if (this.subScreen === 'file-view') {
                return 'File Details:';
            }
            else if (this.subScreen === 'file-edit') {
                return 'File Edit:';
            }
            return '';
        },
    },
    inject: ["directTalk", "setSubScreen", "showToast", "showModal", "hideModal", "refresh"],
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
            if (this.subScreen === 'file-view') {
                this.setSubScreen('file-browser');
                setTimeout(() => {
                    this.refresh();
                }, 25);
                
            }
            else {
                this.subScreen = 'file-view';
            }
        },
        trigger(res) {
            const response = res || this.response;
            if (response) {
                if (response.talk) {
                    this.directTalk('files.' + response.action, {file: this.file.path});
                }
                if (response.toast) {
                    this.showToast({message: 'Sent file action: file.' + response.action, duration: 3});
                }
                if (response.back) {
                    this.hideModal();
                    this.back();
                }
            }
        },
        async fileAction(action) {
            const defaultResponse =  {
                talk: true,
                toast: true,
                back: true,
                action
            };
            this.response = {};
            let modal;
            switch (action) {
                case 'edit':
                    this.actionEdit();
                    break;
                case 'rename':
                    modal = {
                        title: 'Rename a file',
                        text: 'Enter a new filename:',
                        input: {
                            text: this.file.name,
                            placeholder: 'Enter new file name...'
                        },
                        buttons: [
                            {text: 'Rename', click: this.actionRename, type: 'confirm'},
                            {text: 'Cancel', click: this.hideModal},
                        ]
                    };
                    this.showModal(modal);
                    break;
                case 'delete':
                    modal = {
                        title: 'Delete a file',
                        text: 'Are you sure you want to delete this file?',
                        buttons: [
                            {text: 'Yes', type: 'confirm', click: () => {
                                this.trigger(defaultResponse);
                            }},
                            {text: 'No', click: this.hideModal},
                        ]
                    };
                    this.showModal(modal);
                    break;
                case 'move':
                    modal = {
                        title: 'Move a file',
                        text: 'Enter the path to move this file into:',
                        input: {
                            text: '',
                            placeholder: 'Enter destination directory...'
                        },
                        buttons: [
                            {text: 'Move', click: this.actionMove, type: 'confirm'},
                            {text: 'Cancel', click: this.hideModal},
                        ]
                    };
                    this.showModal(modal);
                    break;
                case 'launch':
                case 'fetch':
                    this.trigger(defaultResponse);
                    break;
            }
        },
        actionRename(modal) {
            if (modal.input.text.trim() !== '') {
                this.directTalk('files.rename', {src: this.file.path, dst: modal.input.text});
                this.trigger({toast: true, back: true, action: 'rename'});
            }
        },
        actionMove(modal) {
            if (modal.input.text.trim() !== '') {
                this.directTalk('files.move', {src: this.file.path, dst: modal.input.text});
                this.trigger({toast: true, back: true, action: 'move'});
            }
        },
        async actionEdit() {
            if (this.subScreen === 'file-view') {
                const response = await this.directTalk('files.fetch', this.file.path);
                if (response) {
                    if (response.success && response.file) {
                        if ("TextDecoder" in window) {
                            this.fileText = new TextDecoder("utf-8").decode(response.file);
                            this.subScreen = 'file-edit';
                        }
                        else {
                            console.log("Browser doesn't support text encoder");
                        }
                    }
                    else {
                        const addition = response.error || 'Unknown error';
                        const message = 'Failed to edit file. Error: ' + addition;
                        this.showToast({message, duration: 3});
                    }
                }
            }
            else {
                this.showToast({message: 'Sent file action: file.edit', duration: 3});
                if (this.fileChanged) {
                    await this.directTalk('files.edit', {path: this.file.path, content: this.fileText});
                }
                this.fileChanged = false;
                this.fetchFileDetails();
                this.subScreen = 'file-view';
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
    border: 2px solid rgb(107, 107, 107);
    background: gray;
    color: rgb(197, 206, 214);
    width: 110px;
    margin-left: auto;
    margin-right: auto;
}
.action-btn:hover {
    background: rgb(197, 206, 214);
    color: gray;
}
table {
    table-layout: fixed;
    margin-bottom: 12px;
    margin-right: auto;
    margin-left: auto;
}
table, th, td {
  border: 1px solid;
  padding-left: 3px;
  padding-right: 3px;
}
td {
    word-wrap: break-word;
}
.text-input {
    font-family: arial;
    font-size: 1.05em;
    margin-bottom: 12px;
}
@media screen and (max-width: 420px) {
    table {
        width: 94vw;
    }
    tr td:nth-child(1) {
        width: 30%;
    }
}
</style>