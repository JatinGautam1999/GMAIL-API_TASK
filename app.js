// Client id-
// 596284446519-rjok7f04leefn7lr0u5e26r6mimj98cp.apps.googleusercontent.com
// Client secret-
// lK6FiN5rCv-SV71m7T-ZqxRj


//Requireing Nodemailer and Google from google APIs
const nodemailer = require("nodemailer");
const {google} = require("googleapis");


//Creating constants for Oauth2 Tokens
const CLIENT_ID = '875127489182-mftt2282mjgh7lp85hh2n4mpri4c16e6.apps.googleusercontent.com';
const CLIENT_SECRET = 'Qg5XnUXg_TS7Mfwxk4L4E-lg';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Va67CLVY25NCgYIARAAGAQSNwF-L9IrIff4gYvj2VnFPptZL7spX6yPO3B17LKDys7g3eDCGrZQv9sdB9BJeoOfKPTuVp83Gow';
//Not using the Access Token as it is valid for limited time period
//but generating it whenever it is required

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
//Setting the credentials
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})

//Function to send email
//Using the await, so I had made the function async
async function sendMail() {
  try{
    //Generating the access token
    const accessToken = await oAuth2Client.getAccessToken()
    //Using the nodemailer to transport the mail
    const transport = nodemailer.createTransport({
      service: 'gmail',
      //Auth Object
      auth: {
        type: 'OAuth2',
        user: 'jatingautam1999@gmail.com',
        clientId: CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

//Options for the email
    const mailOptions = {
      from: 'jatingautam1999@gmail.com>',
      to: 'jatin.gautam.16.11.99@gmail.com',
      subject: "Hello from gmail using API",
      text: "Hello from gmail, sending mail using API.",
      html: '<h1>Hello from gmail, sending mail using API</h1>'
    };

    const result = await transport.sendMail(mailOptions);
    return result;

  }
  catch (error) {
    return error;
  }
}

//Calling the sendmail function
sendMail()
.then(result => console.log('Email sent...', result))
.catch(error => console.log(error.message));
