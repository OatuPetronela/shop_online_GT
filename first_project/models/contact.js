import mongoose from "mongoose";

const contactForm = new mongoose.Schema({
    name: String,
    prenume: String,
    email: String,
    subject_message: String,
    message: String
});
const ContactUsers = mongoose.model('ContactUsers', contactForm );

export default ContactUsers;