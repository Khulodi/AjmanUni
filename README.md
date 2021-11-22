### Part 3
Part 3 of our challenge is to use AWS in your codebase to translate your greeting, and convert it from speech to text.
1. Add the arabic language to the list of translation options. Have a look at the aws documentation[https://docs.aws.amazon.com/translate/index.html] to find out the valid language code that needs to be added to the select dropdown.
2. Change the voiceId that's configured in apis.js to a different one using the aws documentation as reference[https://docs.aws.amazon.com/translate/index.html].  
`var speechParams = {
                OutputFormat: "mp3",
                SampleRate: "16000",
                Text: "",
                TextType: "text",
                VoiceId: "Matthew"
            };`