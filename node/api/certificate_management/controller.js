const mongoose = require('mongoose');
const Consultation = require('../../models/consultation');
const ConsultCertificate = require('../../models/consultCertificate');
const Vaccination = require('../../models/vaccination');
const VaccineCertificate = require('../../models/vaccineCertificate');

const {
  findOneData,
  postData,
  successMessage,
  errorMessage,
  successData,
} = require('../../helper/cred');

module.exports = {
  issueConsultationCertificate: async (req, res, next) => {
    try {
      let { id, decodedData } = req.body;
      await Consultation.updateOne(
        { _id: id },
        { certificateStatus: 'issued' }
      );
      await ConsultCertificate.create(decodedData);

      successMessage(res, 'Certificate Issued successfull');
      // generatePDF(req.body);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  issueVaccinationCertificate: async (req, res, next) => {
    try {
      let { id, decodedData } = req.body;
      await Vaccination.updateOne({ _id: id }, { certificateStatus: 'issued' });
      await VaccineCertificate.create(decodedData);

      successMessage(res, 'Certificate Issued successfull');
      // generatePDF(req.body);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },
};

async function generatePDF(data) {
  // Load the background image
  // const backgroundImage = await fs.promises.readFile(
  //   path.join(__dirname, '../../images/images.jpeg')
  // );

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the background image
  const image = await pdfDoc.embedJpg(backgroundImage);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    opacity: 0.5, // Adjust the opacity of the background image
    rotate: degrees(0), // Adjust the rotation of the background image if needed
  });

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(12);

  // Set the content on the page
  const x = 50;
  let y = page.getHeight() - 50;

  const drawText = (text, color = rgb(0, 0, 0), spacing = 20) => {
    page.drawText(text, { x, y, color });
    y -= spacing;
  };

  drawText(`Certificate Number: ${data.certificateNumber}`, rgb(0.2, 0.4, 0.6));
  drawText(`Patient Name: ${data.patientName}`);
  drawText(`Patient UUID: ${data.patientUUID}`);
  drawText(`Patient Registration ID: ${data.patientRegId}`);
  drawText(`Vaccine Name: ${data.vaccineName}`);
  drawText(`Vaccine Taken Datetime: ${data.vaccineTakenDatetime}`);
  drawText(`Disease: ${data.disease}`);
  drawText(`Antigen: ${data.antigen}`);
  drawText(`Issuer Name: ${data.issuerName}`, rgb(0.8, 0.2, 0.2));
  drawText(`Issuer ID: ${data.issuerId}`);
  drawText(`Issued Datetime: ${data.issuedDateTime}`);

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailto:midhun@spericorn.com',
      pass: 'Midhun@2000',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'mailto:midhun@spericorn.com',
    to: 'mailto:bincy@spericorn.com',
    subject: 'Certificate',
    html: `
  <h1>Certificate of Consultation</h1>
  <p>Please find the certificate attached.</p>
  `,
    attachments: [
      {
        filename: 'output.pdf',
        content: pdfBytes,
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  console.log('Email sent successfully.');
}
