var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail'
    , auth: {
        user: 'ndivyam14@gmail.com'
        , pass: 'cody143simpson.'
    }
});
module.exports = {
    transporter: transporter
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
});