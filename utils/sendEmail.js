const nodemailer = require("nodemailer");
const nodemailerConfig = require('./nodemailerConfig')

/**
 * Send email general construct
 */
const sendEmail = async ({
   to,
   subject,
   html
}) => {
  // let testAccount = await nodemailer.createTestAccount();

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport(nodemailerConfig);

   // send mail with defined transport object
   return await transporter.sendMail({
      from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.SENDER_EMAIL}>`, // sender address
      to,
      subject,
      html
   }, (err, data) => {
      if (err) {
         console.log('an error occurred while sending the email: ' + err);
      }else{
         console.log('email is sent successfully');
      }
   });

}

module.exports = sendEmail