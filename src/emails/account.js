const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "ryan.j.dev@gmail.com",
        subject: "Thanks for joining in!",
        text: `Welcome to the app, ${name}. I hope you love it as much as I do. 
        
        If you have any questions, please don't hesitate to contact me.`

    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ryan.j.dev@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}