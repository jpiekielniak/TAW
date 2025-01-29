import sendGridMail from '@sendgrid/mail';

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(data) {
    console.log(data)
        try {
            const msg = {
                to: data.recipient,
                from: 'movie.flow.api@gmail.com',
                subject: data.subject,
                text: data.message,
                html: `<strong>${data.message}</strong>`
            };
            await sendGridMail.send(msg);
            console.log('Email sent');
        } catch (error) {
            throw new Error(`Error sending email: ${error.message}`);
        }

        return {
            sendEmail : sendEmail
    }

}

export default {
    sendEmail: sendEmail
};
