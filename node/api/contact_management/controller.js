const Contact = require('../../models/contactUs');

const { errorMessage, successData } = require('../../helper/cred');

module.exports = {
  getAllMessages: async (req, res, next) => {
    try {
      let data = await Contact.find();
      return successData(res, data);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },

  viewMessages: async (req, res, next) => {
    try {
      let data = await Contact.findOne({ _id: req.params.id });

      await Contact.updateOne({ _id: req.params.id }, { status: 'read' });

      return successData(res, data);
    } catch (error) {
      return errorMessage(res, error.message);
    }
  },
};
