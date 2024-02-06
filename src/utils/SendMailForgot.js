import nodeMailer from "nodemailer"
import 'dotenv/config'

const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

async function SendMailForgot(email, subject, text) {
    const AppName = process.env.APP_NAME

    const info = await transporter.sendMail({
        from: `${AppName} ${process.env.MAIL_USER}`,
        to: email,
        subject: subject,
        text: text
    })

    console.log("Email Has Ben Sent To: %s", info.accepted)
}

export default SendMailForgot