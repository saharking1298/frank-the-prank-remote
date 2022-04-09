import { io } from 'socket.io-client';
import config from './config';

// Production URL: https://api.saharscript.dev/projects/ftp-dev
const URL = config.production ? "https://saharscript.dev/frankThePrank" : "http://localhost:3000/frankThePrank";
// const URL = "http://192.168.43.30:3000";
// const URL = "http://api.saharscript.dev/:3000";
const socket = io(URL, {autoConnect: false});

export default socket;