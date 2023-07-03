import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'fruverSanMarco@gmail.com',
        pass: 'bsylzfshvpjpgaol'
    }
});

transporter.verify().then(() => {
    console.log("Listo para enviar emails");
});