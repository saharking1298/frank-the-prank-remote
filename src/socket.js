import { io } from 'socket.io-client';

// Production URL: https://api.saharscript.dev/projects/ftp-dev
const URL = "http://localhost:3000";
const socket = io(URL, {autoConnect: false});

export default socket;