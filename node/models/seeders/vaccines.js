const vaccine = require('../vaccine');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);

connect(
  'mongodb+srv://bincyjacob:bincyjacob@cluster0.q6nbp9s.mongodb.net/patient_management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

(async () => {
  try {
    const vaccines = [
      {
        name: 'Sinovac COVID-19 Vaccine',
        disease: 'COVID-19',
        antigen: 'Inactivated SARS-CoV-2 virus',
      },
      {
        name: 'Mumps Vaccine',
        disease: 'Mumps',
        antigen: 'Mumps antigen',
      },
      {
        name: 'Measles-Mumps-Rubella (MMR) Vaccine',
        disease: 'Measles, Mumps, Rubella',
        antigen: 'Measles, Mumps, Rubella antigens',
      },
      {
        name: 'Hepatitis B Vaccine',
        disease: 'Hepatitis B',
        antigen: 'Hepatitis B surface antigen',
      },
      {
        name: 'Polio Vaccine',
        disease: 'Polio',
        antigen: 'Poliovirus antigens',
      },
      {
        name: 'Tetanus Vaccine',
        disease: 'Tetanus',
        antigen: 'Tetanus toxoid',
      },
    ];

    await vaccine.deleteMany({});
    await vaccine.insertMany(vaccines);
    console.log(`Vaccine created successfully`);
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
})();
