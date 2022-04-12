import { io } from 'socket.io-client';
import config from './config';

// Production URL: https://saharscript.dev/frankThePrank
const URL = config.production ? "https://saharscript.dev/frankThePrank" : "http://localhost:3000/frankThePrank";


export default function(auth={}) {
    return io(URL, {
        autoConnect: false,
        auth
    });
}