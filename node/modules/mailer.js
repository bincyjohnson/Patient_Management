const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const { mail } = require('../config');
const ejs = require('ejs');
const { successMessage, errorMessage } = require('../helpers/cred');

exports.sendMail = async (filter, res) => {
  const { to, content, subject, cc, html, logindata } = filter;
  // await emailExistence.check(to, async (error, response) => {
  // if (response) {
  try {
    const transporter = nodemailer.createTransport({
      service: mail.service,
      auth: {
        user: mail.email,
        pass: mail.pass,
      },
    });
    if (html) {
      ejs.renderFile(html, logindata, async (err, data) => {
        if (err) {
          console.log('ERROR', err);
        } else {
          transporter.sendMail(
            {
              from: mail.email,
              to: to,
              // cc: cc,
              bcc: 'bincy@spericorn.com',
              subject: subject,
              text: content,
              html: data,
            },
            (error, info) => {
              if (error) {
                return console.log(error);
              } else {
                console.log('Message sent: %s', info.messageId);
                // return true;
                return successMessage(
                  res,
                  'Successfull. Please check your mail'
                );
              }
            }
          );
        }
      });
    } else {
      console.log('bincy');
      await transporter.sendMail({
        from: mail.email,
        to: to,
        // cc: cc,
        bcc: 'bincy@spericorn.com',
        subject: subject,
        text: content,
      });
      return successMessage(res, 'Successfull');
    }
  } catch (error) {
    console.log('ERROR', error);
    return errorMessage(res, error.message);
    // res.json({
    //   success: false,
    //   message: error.message,
    // });
  }
  // } else {
  //   console.log('Email doesnot exist');
  //   return errorMessage(res, 'Provided Email doesnot exist');
  // }
  // });
};
