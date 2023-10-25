var nodemailer = require("nodemailer");

export async function sendMail(from, subject, otpText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GPASS,
    },
  });

  var mailOptions = {
    from: process.env.GMAIL,
    to: process.env.GMAIL,
    subject: `${from} - ${subject}`,
    text: otpText,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err)
        console
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}