let cred = {
    awsAccessKeyId: "QUtJQTJYRVAyNTdQRFJGQ0lRSDQ=",
    awsSecretAccessKey: "RTFkeWVWdk1sRmZOSjRFREd3VDhRUitZZS85cFdGd2dWeFpCVDhmaA=="
};
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = 'us-east-2';
  AWS.config.credentials = new AWS.Credentials(atob(cred.awsAccessKeyId), atob(cred.awsSecretAccessKey));
function printName(){
    let form = document.getElementById("nameForm")
   let firstName = form.fname.value;
   let lastName = form.lname.value;
   console.log(form)
   console.log(firstName)
   console.log(lastName)
   let output = document.getElementById("textEntry")
   output.value = `Hello ${firstName} ${lastName}. Hope you're well.`
   translateAndSpeak()
  }

 

        // Function invoked by button click
        // function speakText() {
        //   speakParticularText(document.getElementById("textEntry").value)
        // }
          function speakParticularText(text){
// Create the JSON parameters for getSynthesizeSpeechUrl
var speechParams = {
                OutputFormat: "mp3",
                SampleRate: "16000",
                Text: "",
                TextType: "text",
                VoiceId: "Matthew"
            };
            speechParams.Text = text;
             // Create the Polly service object and presigner object
             var polly = new AWS.Polly({apiVersion: '2016-06-10'});
            var signer = new AWS.Polly.Presigner(speechParams, polly)

            // Create presigned URL of synthesized speech file
            signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
            if (error) {
                document.getElementById('result').innerHTML = error;
            } else {
                document.getElementById('audioSource').src = url;
                document.getElementById('audioPlayback').load();
                document.getElementById('result').innerHTML = "Translation ready to play.";
            }
          });
          }
        
function translateAndSpeak(){
  let text = document.getElementById("textEntry").value
  let language = document.getElementById("language").value
  var translate = new AWS.Translate();

var params = {
  SourceLanguageCode: 'auto',
  TargetLanguageCode: language,
  Text: text
};

translate.translateText(params, function (err, data) {
  if (err) console.log(err, err.stack); 
  else     speakParticularText(data['TranslatedText']);
});
}