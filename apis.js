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
      /* JS comes here */
      (function() {
  
          var width = 320; // We will scale the photo width to this
          var height = 0; // This will be computed based on the input stream
  
          var streaming = false;
  
          var video = null;
          var canvas = null;
          var photo = null;
          var startbutton = null;
  
          function startup() {
              video = document.getElementById('video');
              canvas = document.getElementById('canvas');
              photo = document.getElementById('photo');
              startbutton = document.getElementById('startbutton');
  
              navigator.mediaDevices.getUserMedia({
                      video: true,
                      audio: false
                  })
                  .then(function(stream) {
                      video.srcObject = stream;
                      video.play();
                  })
                  .catch(function(err) {
                      console.log("An error occurred: " + err);
                  });
  
              video.addEventListener('canplay', function(ev) {
                  if (!streaming) {
                      height = video.videoHeight / (video.videoWidth / width);
  
                      if (isNaN(height)) {
                          height = width / (4 / 3);
                      }
  
                      video.setAttribute('width', width);
                      video.setAttribute('height', height);
                      canvas.setAttribute('width', width);
                      canvas.setAttribute('height', height);
                      streaming = true;
                  }
              }, false);
  
              startbutton.addEventListener('click', function(ev) {
                  takepicture();
                  ev.preventDefault();
              }, false);
  
              clearphoto();
          }
  
  
          function clearphoto() {
              var context = canvas.getContext('2d');
              context.fillStyle = "#AAA";
              context.fillRect(0, 0, canvas.width, canvas.height);
  
              var data = canvas.toDataURL('image/png');
              photo.setAttribute('src', data);
          }
  
          function takepicture() {
              var context = canvas.getContext('2d');
              if (width && height) {
                  canvas.width = width;
                  canvas.height = height;
                  context.drawImage(video, 0, 0, width, height);
  
                  var data = canvas.toDataURL('image/png');
                  photo.setAttribute('src', data);
              } else {
                  clearphoto();
              }
              try {
          var image = localStorage.setItem("context", data);
          
      }
      catch (e) {
          console.log("Storage failed: " + e);
      }
      ProcessImage();
          }
  
          window.addEventListener('load', startup, false);
      })();
  
      
      //Calls DetectFaces API and shows estimated ages of detected faces
      function DetectFaces(imageData) {
        AWS.region = "us-east-2";
        var rekognition = new AWS.Rekognition();
        var params = {
          Image: {
            Bytes: imageData
          },
          Attributes: [
            'ALL',
          ]
        };
        rekognition.detectFaces(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            // show each face and build out estimated age table
            console.log(data)
    
 
            document.getElementById("emotion").innerHTML = data.FaceDetails[0].Emotions[0].Type;
            document.getElementById("gender").innerHTML = data.FaceDetails[0].Gender.Value;
            document.getElementById("smile").innerHTML = data.FaceDetails[0].Smile.Value;
            document.getElementById("beard").innerHTML = data.FaceDetails[0].Beard.Value;
            document.getElementById("Mustache").innerHTML = data.FaceDetails[0].Mustache.Value;
            document.getElementById("lower-age-range").innerHTML = data.FaceDetails[0].AgeRange.Low;
            document.getElementById("higher-age-range").innerHTML = data.FaceDetails[0].AgeRange.High;

          }
        });
      }
      //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
      function ProcessImage() {
        // Load base64 encoded image 

            // var img = document.createElement('img');
            var img = document.getElementById("photo");

            var image = null;
            // img.src = e.target.result;
            var jpg = true;
            try {
              image = atob(img.src.split("data:image/jpeg;base64,")[1]);
    
            } catch (e) {
              jpg = false;
            }
            if (jpg == false) {
              try {
                image = atob(img.src.split("data:image/png;base64,")[1]);
              } catch (e) {
                alert("Not an image file Rekognition can process");
                return;
              }
            }
            //unencode image bytes for Rekognition DetectFaces API 
            var length = image.length;
            imageBytes = new ArrayBuffer(length);
            var ua = new Uint8Array(imageBytes);
            for (var i = 0; i < length; i++) {
              ua[i] = image.charCodeAt(i);
            }
            //Call Rekognition  
            DetectFaces(imageBytes);
          };
 
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