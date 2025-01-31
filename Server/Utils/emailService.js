import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "mockninjaorg@gmail.com",
    pass: "aniqjvjiizsgpdmi"
  }
})

export const sendEmail = async(to, subject, message) => {
  const mailOptions = {
    from: "mockninjaorg@gmail.com",
    to,
    subject,
    html:message
  }
  try {
    await transporter.sendMail(mailOptions)
    // console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email:', error)
  }
}