import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email,verificationToken) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
        console.log("Email sent successfully" , response);
    }catch(error){
        console.error("Error", error);
        throw new Error("Error sending verification email ", error);
    }
}

export const sendWelcomeEmail = async (email,name) => {
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            template_uuid: "9d334ff6-ee8e-4091-9e05-9b842b47413d",
            template_variables: {
            company_info_name : "AUTH COMPANY",
            name: name,
            },
        });
        console.log("Welcome Email Sent Succesfully", response);  
    }catch(error){
        throw new Error(`Error sending Welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send({
            from : sender,
            to: recipient,
            subject: "Reset Your Password",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category : "Password reset",
        });
        console.log("Password Reset email sent successfully", response);

    }catch(error){
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Password Reset Successful",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password reset",
        })
        console.log("Password reset email sent successfully", response);
    }catch(error){
        console.log("Error sending password reset success email", error);
        throw new Error(`Error sending password reset success email : ${error}`);
    }
}