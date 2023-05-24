const { initiateTask, startTask } = require('./index');
const Consultation = require('../../models/vaccineCertificate');
const Web3 = require('web3');

const changeVaccinationStatus = initiateTask('*/5 * * * * *', async () => {
  const web3 = new Web3(process.env.METAMASK_URL);

  try {
    const allConsultations = await Consultation.find({
      status: 'pending',
    }).exec();

    for (const consult of allConsultations) {
      const response = await web3.eth.getTransactionReceipt(
        consult.transactionHash
      );

      if (response?.status === true) {
        const updatedConsultation = await Consultation.findOneAndUpdate(
          { _id: consult._id },
          { status: 'completed' },
          { new: true }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeVaccinationStatus, 'changeVaccinationStatus');
}
