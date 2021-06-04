require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');

class MailService {
  constructor() {
    this.path = 'https://dashboard-go-it.herokuapp.com';
    this.sgMail = sgMail;
    this.mailgen = Mailgen;
  }
  #CREATE_TEMPLATE(verifyToken, name = 'User') {
    const mailGenerator = new this.mailgen({
      theme: 'default',
      product: {
        name: 'Tasks Dashboard',
        link: this.path,
      },
    });
    const template = {
      body: {
        name,
        intro:
          "Welcome to Tasks Dashboard! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with Tasks Dashboard, please verify your account by clicking at link:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.path}/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const templateBody = mailGenerator.generate(template);
    return templateBody;
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#CREATE_TEMPLATE(verifyToken, name);
    this.sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'vova.buzz@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      html: emailBody,
    };
    await this.sgMail.send(msg);
  }
}

module.exports = { MailService };
