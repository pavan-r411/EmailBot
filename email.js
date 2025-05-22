const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const schedule = require('node-schedule');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to_address, recipientName) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADDRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
    console.log("Sending Mail to:", to_address);
    const mailOptions = {
  from: `"Pavan Kumar Ramesh" <${GMAIL_ADDRESS}>`,
  to: to_address,
  subject: "Applying for Student Worker Position",
  text: "This is a fallback for non-HTML email clients.",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Hi ${recipientName},</p>
      <p>I hope you're doing well. I'm writing to express my interest in the student worker position. With strong organizational skills, attention to detail, and experience in administrative and technical tasks, I believe I'd be a great fit for your team. My background in the IT industry includes customer support, documentation, and client service, 
      and I'm eager to contribute these skills to your organization.</p>

      <p>Currently, I'm pursuing a Master's in Computer Science at the University of Southern California 
      and am keen to gain hands-on experience while supporting your team. At SAP Labs India, I served as a lead engineer in a customer-focused engineering team, where I honed my communication, problem-solving, and multitasking abilities while directly engaging with end-users. This role also strengthened my teamwork and leadership skills—qualities I'm confident will benefit your organization.</p>
      
      <p>Beyond academics and work, I've participated in hackathons and corporate social responsibility (CSR) initiatives, further developing my collaborative and adaptive mindset. As a volunteer with IEEE UVCE, I mentored students from underserved communities, which deepened my commitment to teamwork and mentorship.</p>
      
      <p>I'd love the opportunity to discuss how my background aligns with your needs. Feel free to reach me at pkumarr@usc.edu or +1 (213) 574-6746. I've also attached my resume for your review.</p>

      <p>Thank you for your time and consideration—I look forward to hearing from you!</p>
      <p>--</p>
    
    <p>
      <strong>Thanks and Regards,</strong><br />
      Pavan Kumar Ramesh<br />
      <a href="mailto:pkumarr@usc.edu">pkumarr@usc.edu</a><br />
      +1 (213) 574-6746
    </p>
    </div>
  `,
  attachments: [
    {
      filename: "Ramesh_PavanKumar.pdf",
      path: "./Ramesh_PavanKumar.pdf",
      contentType: "application/pdf"
    }
  ]
};

    const result = await transport.sendMail(mailOptions);

    console.log("Email sent:", result.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


let cnt = 0;
const emailList = [
  "r.pavann411@gmail.com",
  "pavanramesh4561@gmail.com"
]
const corrName = [
  "Pavan",
  "Pavan"
]
if(emailList.length == corrName.length){
  console.log("Email list and corresponding names are proper!")
  console.log("Starting the email sending....")
  
  async function sendEmailsWithDelay() {
    for(let i = 0; i < emailList.length; i++) {
      await sendMail(emailList[i], corrName[i]);
      console.log(`Email ${i + 1} sent to ${emailList[i]}`);
      
      if (i < emailList.length - 1) {  // Don't wait after the last email
        console.log("Waiting 10 seconds before sending next email...");
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
      cnt++;
    }
    console.log("Job Completed without any errors and total emails sent:", cnt);
  }

  sendEmailsWithDelay().catch(error => {
    console.error("Error in email sending process:", error);
  });
} else {
  console.log("Sending Failed because email Length is ", emailList.length);
  console.log("And Names List Length is ", corrName.length);
}


