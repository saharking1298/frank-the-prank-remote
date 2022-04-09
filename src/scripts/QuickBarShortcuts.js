/* Key Combination recognizer */
let nonSendKeys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
let midKeys = ['win', 'cmd']; // Feature names can be used in key combination with another non send key
let sendKeys = ['esc', 'escape', 'tab', 'ctrl', 'alt', 'shift', 'enter', 'windows', 'up', 'down', 'right',
                'left', 'bs', 'backspace', 'caps', 'capslock', 'del', 'delete', 'insert', 'ins'];

nonSendKeys = nonSendKeys.concat(['space']);

// add f1-12 to sendKeys array
for(let i = 0; i < 12; i++){
    sendKeys.push("f" + (i+1));
}

export function detectKeyCombination(text){
    const combination = {detected: true, keys: [], times: 1, sendActivator: false};
    const timesRegex = /\*\d+/;
    const numRegex = /^\d+$/;

    const disableCombination = () => {
        combination.sendActivator = false;
        combination.detected = false;
        combination.keys = [];
        combination.times = 0;
    };

    text = text.replace(/\+/g, ' ').replace(/\*/g, ' *').toLowerCase();
    const words = text.split(/ +/);
    let word;

    let midActivator = false;
    let nonActivator = false

    for(let i = 0; i < words.length; i++){
        word = words[i];
        if(sendKeys.includes(word)){
            combination.sendActivator = true;
            combination.keys.push(word.replace(/"/g, ""));
        }
        else if(nonSendKeys.includes(word)){
            combination.keys.push(word.replace(/"/g, ""));
            nonActivator = true;
            if(midActivator){
                combination.sendActivator = true;
            }
        }
        else if(midKeys.includes(word)){
            midActivator = true;
            combination.keys.push(word.replace(/"/g, ""));
            if(nonActivator){
                combination.sendActivator = true;
            }
        }
        else if(word.startsWith('*') && [words.length - 1, words.length - 2].includes(i)){
            if(i === words.length - 1 && timesRegex.test(word)){
                combination.times = parseInt(word.slice(1));
            }
            else if(i === words.length - 2 && word === '*' && numRegex.test(words[i + 1])){
                combination.times = parseInt(words[i + 1]);
                i++;
            }
            else{
                disableCombination();
                break;
            }
        }
        else{
            disableCombination();
            break;
        }
    }
    combination.detected = combination.sendActivator;
    return combination;
}