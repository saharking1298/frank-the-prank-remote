export const featureCategories = [
    {
        name: "All Categories",
        id: "all"
    },
    {
        name: "Mouse & Keyboard",
        id: "mouseKeyboard"
    },
    {
        name: "Multimedia",
        id: "multimedia"
    },
    {
        name: "Power Control",
        id: "power"
    },
    {
        name: "Trickshots",
        id: "tricks"
    },
    {
        name: "Loops",
        id: "loops"
    },
    {
        name: "Advanced Control",
        id: "control"
    }
];

export const allFeatures = [
    {
        name: 'click',
        categoryId: 'mouseKeyboard',
        description: 'Clicks the mouse in a certain loaction on the screen',
        arguments: [{
            id: 'button',
            dataType: 'choice',
            title: 'The button to press',
            choices: ['Left', 'Right', 'Middle'],
            manipulator: (choice) => {
                return choice.toLowerCase()
            }
        }]
    },
    {
        name: 'type',
        categoryId: 'mouseKeyboard',
        description: 'Sends a virtual input to the keyboard',
        arguments: [{
            id: 'text',
            dataType: 'string',
            title: 'The text to write'
        }]
    },
    {
        name: 'move',
        categoryId: 'mouseKeyboard',
        description: 'Moves the mouse cursor to specific screen coordinates',
        arguments: [{
            id: 'xPos',
            dataType: 'int',
            title: 'The X position'
        }, {
            id: 'yPos',
            dataType: 'int',
            title: 'The Y position'
        }]
    },
    {
        name: 'mup',
        categoryId: 'mouseKeyboard',
        description: 'Moves the mouse cursor up X amount of pixels',
        arguments: [{
            id: 'numOfPixels',
            dataType: 'int',
            title: 'The number of pixels to go up'
        }]
    },
    {
        name: 'mdown',
        categoryId: 'mouseKeyboard',
        description: 'Moves the mouse cursor down X amount of pixels',
        arguments: [{
            id: 'numOfPixels',
            dataType: 'int',
            title: 'The number of pixels to go down'
        }]
    },
    {
        name: 'mright',
        categoryId: 'mouseKeyboard',
        description: 'Moves the mouse cursor right X amount of pixels',
        arguments: [{
            id: 'numOfPixels',
            dataType: 'int',
            title: 'The number of pixels to go right'
        }]
    },
    {
        name: 'mleft',
        categoryId: 'mouseKeyboard',
        description: 'Moves the mouse cursor left X amount of pixels',
        arguments: [{
            id: 'numOfPixels',
            dataType: 'int',
            title: 'The number of pixels to go left'
        }]
    },
    {
        name: 'url',
        categoryId: 'multimedia',
        description: "Opens a specific URL in the host's browser",
        arguments: [{
            id: 'url',
            dataType: 'string',
            title: 'The URL to open'
        }]
    },
    {
        name: 'say',
        categoryId: 'multimedia',
        description: 'Activates a text to speech on the host computer',
        arguments: [{
            dataType: 'string',
            id: 'textToSay',
            title: 'The text to say'
        }]
    },
    {
        name: 'msgbox',
        categoryId: 'multimedia',
        description: 'Displays a message box on the screen',
        arguments: [{
            id: 'title',
            dataType: 'string',
            title: 'Message box title'
        }, {
            id: 'content',
            dataType: 'string',
            title: 'Message box content'
        }]
    },
    {
        name: 'play',
        categoryId: 'multimedia',
        description: 'Plays a track in Ftp media player',
        arguments: [{
            id: 'file',
            title: 'a sound file',
            dataType: 'dynamic',
            fetch: 'media.sounds.all'
        }]
    },
    {
        name: 'pause',
        categoryId: 'multimedia',
        description: 'Pauses a track in Ftp media player'
    },
    {
        name: 'stop',
        categoryId: 'multimedia',
        description: 'Stops the current track in Ftp media player'
    },
    {
        name: 'cd',
        categoryId: 'tricks',
        description: "Opens or close the host's CD-ROM drive"
    },
    {
        name: 'crazy',
        categoryId: 'tricks',
        description: 'Causing the mouse to look like it is haunted',
        arguments: [{
            id: 'status',
            dataType: 'choice',
            title: 'Crazy state',
            choices: ['On', 'Off'],
            manipulator: (choice) => {
                return choice.toLowerCase()
            }
        }]
    },
    {
        name: 'cmd',
        categoryId: 'control',
        description: "Executes a script on the command prompmt",
        arguments: [{
            id: 'cmd',
            dataType: 'string',
            title: 'The command to excecute'
        }]
    },
    {
        name: 'reset',
        categoryId: 'control',
        description: "Relaunch Ftp Host app on the host computer"
    },
    {
        name: 'exit',
        categoryId: 'control',
        description: "Exits Ftp app on the host computer. You won't be able to bring it back on until you do it manually!"
    },
    {
        name: 'timed',
        categoryId: 'control',
        description: "Set a timer to send an action"
    },
    {
        name: 'window',
        categoryId: 'control',
        description: "Open, close, resize or manipulate an open window",
        arguments: [
            {
                id: 'processID',
                dataType: 'dynamic',
                title: 'a target window',
                fetch: 'windows.open.all'
            },
            {
                id: 'action',
                dataType: 'choice',
                title: 'a window action',
                choices: ['Focus', 'Close', 'Min', 'Max', 'Enable', 'Disable', 'Flash'],
                manipulator: (choice) => {
                    return choice.toLowerCase()
                }
            }
        ]
    },
    {
        name: 'setvol',
        categoryId: 'control',
        description: "Sets the host sound volume (0 - 100)",
        arguments: [{
            id: 'volume',
            dataType: 'int',
            title: 'The volume to set (0 - 100)',
            min: 0,
            max: 100
        }]
    },
    {
        name: 'volup',
        categoryId: 'control',
        description: "Increase the volume of the host compuer",
        arguments: [{
            id: 'volume',
            dataType: 'int',
            title: 'The volume to increase (1 - 100)',
            min: 1,
            max: 100
        }]
    },
    {
        name: 'voldown',
        categoryId: 'control',
        description: "Decrease the volume of the host compuer",
        arguments: [{
            id: 'volume',
            dataType: 'int',
            title: 'The volume to decrease (1 - 100)',
            min: 1,
            max: 100
        }]
    },
    {
        name: 'screen',
        categoryId: 'control',
        description: 'Switch the display settings to the choosen mode',
        arguments: [{
            id: 'screen',
            dataType: 'choice',
            title: 'The screen mode to set',
            choices: ['Main', 'Second', 'Duplicate', 'Extend']
        }]
    },
    {
        name: 'back',
        categoryId: 'control',
        description: "Launch alt + f4 to exit all kinds of focused applications"
    },
    {
        name: 'wait',
        categoryId: 'control',
        description: "A building-block to create a delay between two actions in a cloud function"
    },
    {
        name: 'loop',
        categoryId: 'loops',
        description: "Loop a certain feature or cloud function a certain number of times"
    },
    {
        name: 'tloop',
        categoryId: 'loops',
        description: "Loop a certain feature or cloud function until the timer stops"
    },
    {
        name: 'shutdown',
        categoryId: 'power',
        description: "Shutting down the host computer"
    },
    {
        name: 'restart',
        categoryId: 'power',
        description: "Restarts the host computer. Ftp might not be there when it is back up!"
    },
    {
        name: 'sleep',
        categoryId: 'power',
        description: "Sets the host computer to sleep mode"
    },
];

// Frank The Prank features version 
export const version = "1.4.1";