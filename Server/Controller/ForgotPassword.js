import UserRegisterSchema from "../Models/userRegisterSchema.js"
import OtpSchema from "../Models/optSchema.js"
import { sendEmail } from "../Utils/emailService.js";
import bcrypt from "bcryptjs"

// -------------- FUNCTION FOR SENDING MAIL --------------

const mailSender = async(email, otpCode) => {
  try {
    const mailmessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background: linear-gradient(135deg, #f9f9f9, #ffffff); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
  <h2 style="text-align: center; color: #4CAF50; font-size: 28px; margin-bottom: 10px;">
    🚀 Mock Ninja - OTP Verification
  </h2>
  <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 20px;">
    Your AI-Driven Interview Platform
  </p>
  <p style="font-size: 16px; color: #333;">
    Hello there, 👋
  </p>
  <p style="font-size: 16px; color: #333;">
    You’ve requested to verify your account or reset your password on <strong>Mock Ninja</strong>. Use the One-Time Password (OTP) below to proceed:
  </p>
  <div style="text-align: center; margin: 30px 0;">
    <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #4CAF50; padding: 15px 30px; border: 2px solid #4CAF50; border-radius: 12px; background-color: #f0faf0;">
      ${otpCode}
    </span>
  </div>
  <p style="font-size: 16px; color: #333;">
    ⏳ This OTP is valid for the next <strong>5 minutes</strong>. If you didn’t request this, please ignore this email or contact our support team immediately.
  </p>
  <p style="font-size: 16px; color: #333;">
    Best regards,<br/>
    <strong>Team Mock Ninja</strong> 🚀
  </p>
  <footer style="text-align: center; font-size: 14px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
    Need help? Contact us at <a href="mailto:support@mockninja.com" style="color: #4CAF50; text-decoration: none;">mockninjaorg@gmail.com</a>.
  </footer>
</div>`;
  
  await sendEmail(email, "Password Reset OTP", mailmessage)
  
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
  }
}

// -------------- FOR OTP SENDING (POST REQUEST) --------------

export const ForgotPasswordEmailSend = async(req, res) => {
  const { email } = req.body

  try {
    const emailExist = await UserRegisterSchema.findOne({
      $or: [
        {candidateEmail: email},
        {expertOrgEmail: email }
      ]
    })

    if(!emailExist){
      return res.status(404).json({message:"User not found"})
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000);
    const otpData = new OtpSchema({
      name:emailExist.candidateName || emailExist.expertName,
      email:email,
      code:otpCode,
      expireIN: Date.now() + 60*1000
    })

    await otpData.save()
    mailSender(email,otpCode)

    return res.status(200).json({message:"Please check your mail"})
  } catch (error) {
    return res.status(500).json({message:"Something went wrong! Please try again later"})
  }
}

// ------------------ FOR OTP VERIFYING (POST REQUEST) --------------

export const OTPverification = async(req, res) => {
  const {email, code} = req.body

  try {
    const otpRecord = await OtpSchema.findOne({email,code})

    if(!otpRecord){
      return res.status(404).json({message:"Invalid OTP"})
    }
    
    const currentTime = Date.now()
    if(otpRecord.expireIN < currentTime){
      return res.status(400).json({message:"OTP is expired!"})
    }

    return res.status(200).json({message:"OTP Verified"})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong! Please try again later" });
  }
}

// ------------------ FOR PASSWORD CHANGE (POST REQUEST) --------------

export const PasswordChange = async(req, res) => {

  const { email, password } = req.body

  if(!email){
    return res.status(400).json({message:"Check your connection! Try Later"})
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await UserRegisterSchema.findOne({
      $or: [
        {candidateEmail: email},
        {expertOrgEmail: email }
      ]
    })

    if (user.candidateEmail === email) {
      user.candidatePassword = hashedPassword;
    } else if (user.expertOrgEmail === email) {
      user.expertPassword = hashedPassword;
    }

    await user.save()

    await OtpSchema.deleteMany({email})

    return res.status(200).json({message:"Password changed successfully"})
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong! Please try again later" });
  }
}