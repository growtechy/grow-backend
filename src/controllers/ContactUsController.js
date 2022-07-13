const sendMail = require('../mailer/mails');
const ContactusForm = require('../models/ContactUsForm');
const contactUs = async (req, res) => {
    try {

        const data = await ContactusForm(req.body).save();

        const mailInfo = {
            from: 'GrowNG <info@growng.company>',
            to: 'support@growng.company',
            subject: 'Mail from ' + req.body.fullname,
            template: 'regular',
            'h:X-Mailgun-Variables': JSON.stringify({
                message: `<p>Hello Admin,</p><p>There is a mail from ${req.body.fullname}.</p><p>Below is the content of their request.</p><hr><p>${req.body.message}</p><p> Reply to them on <a href="mailto:${req
                    .body.email}">${req.body.email}</a></p>`
            }),
            'h:Reply-To': 'no-reply@growng.company'
        };

        await sendMail(mailInfo);


        return res.status(200).json({
            data,
            message: 'Message sent successfully',
            status: 'success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

module.exports = { contactUs };
