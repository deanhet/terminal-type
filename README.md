Terminal Type
-------
####About
Terminal Type is a project born from my development of [deanhet.com](http://www.deanhet.com). It's a novel way for the user to interact with the site and get information by emulating a terminal/command line/chat interface. This plugin is designed to provide the framework and essentials to get started. It presumes you will deal with the styling/how it looks.

All interaction happens within a textbox where the user can also input commands (and submit then with return). If a command is recognised then a canned response is given. If it isn't, a random error message is chosen.

Likely to leave further development but I'll definitely consider addtional features if there's enough demand for them.

####Demo
A tricked out super angularfied version of this plugin can be found at [deanhet.com](http://www.deanhet.com). This plugin is more recent (and better) than the code on the site so I would only use what's there as an example of the cool applications it can be used for.

####Installation
Include jQuery then before closing your ```<body>``` tag, add:
````
<script type="text/javascript" src="jquery.terminalType.js"></script>
````

####Quick Example
You can quickly get Terminal Type up and running but it's only really useful with some configuration. Start by defining the textarea where all the magic happens:
```
<textarea class="example-terminal"></textarea>
```
Then you can invoke the script with:
```
$(".example-terminal").terminalType();
```
Further options are available below, for example if you wanted to configure introduction text, commands and error messages:
```
$(".example-terminal").terminalType({
    introText: "Welcome to this amazing plugin! Type hi to see what I can do!",
    validCommands: {
        hi : "Hello to you too!, have you tried typing cookies?",
        cookies: "OMNOMNOMNOMNOMNOMNOM"
    },
    error: [
        "Command not recognised",
        "Cookies, cookies?, COOKIES!
    ]
});
```
####Callbacks
You can listen for and attach functions for when commands fail and succeed. To trigger a function for when a command is recognised:
```
$(".example-terminal").terminalType().onTerminalSuccess(function(){
    console.log("woohoo, it worked! Your command was recognised.");
});
```
For a failure/ user input not recognised:
```
$(".example-terminal").terminalType().onTerminalFailure(function(){
    console.log("I'm only shown when the command isn't recognised.");
});
```
You can also retrieve user input for your own use:
```
$(".example-terminal").terminalType().onTerminalSuccess(function(userInput){
    console.log("The user typed " + userInput);
});
```
####Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
introText | string | "Hello, I'm some introduction test"| Text first displayed to the user when the plugin is initialised
typeText | boolean | true | Enable/Disable the typing effect
prependUser | boolean | true | Enable/Disable prepended text to the user input
prependTerminal | boolean | true | Enable/Disable prepended text to terminal output
prependUserText | string | "> " | Text shown at the beginning of each line of user input
prependTerminalText | string | "$ " | Text shown at the beginning of each line of terminal output
focusOnFinish | boolean | true | Focus on the textarea after a command has been shown.
validCommands | object | { hello: "Hi there buddy! You checked the docs?" } | Object containing a list of valid commands to the terminal and the response that should be given when a command is matched.
error | array (strings) | ["I AM AN ERROR"] | Array containing errors to be shown if a command isn't matched. If there are multiple errors, the terminal will choose one at random to show.