const { initiateTask, startTask, stopTask } = require('./index');
const Consultation = require('../../models/consultation');
const Vaccination = require('../../models/vaccination');
const Web3 = require('web3');

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  const web3 = new Web3(process.env.METAMASK_URL);

  try {
    const allConsultations = await Consultation.find({
      paymentStatus: 'pending',
    })
      .populate('transactionId')
      .exec();

    for (const consult of allConsultations) {
      const response = await web3.eth.getTransactionReceipt(
        consult.transactionId.transactionHash
      );

      if (response?.status === true) {
        const updatedConsultation = await Consultation.findOneAndUpdate(
          { _id: consult._id },
          { paymentStatus: 'complted' },
          { new: true }
        );
        console.log(updatedConsultation);
      }
    }

    const allVaccination = await Vaccination.find({
      paymentStatus: 'pending',
    })
      .populate('transactionId')
      .exec();

    for (const consult of allVaccination) {
      const response = await web3.eth.getTransactionReceipt(
        consult.transactionId.transactionHash
      );

      if (response?.status === true) {
        const updatedConsultation = await Vaccination.findOneAndUpdate(
          { _id: consult._id },
          { paymentStatus: 'complted' },
          { new: true }
        );
        console.log(updatedConsultation);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}
