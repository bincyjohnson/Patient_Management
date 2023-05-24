exports.successData = (res, data) => {
  return res.send({
    success: true,
    data,
  });
};

exports.successMessage = (res, message) => {
  console.log('!!!!!!!! SUCCESS !!!!!!\n', message);
  return res.json({
    success: true,
    message,
  });
};

exports.errorMessage = (res, message, status) => {
  console.log('\n************** ERROR *************\n', message, '\n');
  return res.json({
    success: false,
    message,
  });
};

exports.findOneData = async (model, filter) => {
  let data = await model.findOne(filter);
  return data;
};

exports.getAllData = async (model, pages, offsets) => {
  let page = parseInt(pages) || 1;
  let offset = parseInt(offsets) || 10;
  let skip = (page - 1) * offset;

  const data = await model
    .find()
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(offset);
  return data;
};

exports.readAllPopulate = async (model, filters, references) => {
  const data = await model.find(filters).populate(references).exec();
  return data;
};

exports.postData = async (model, data) => {
  await model.create(data);
  return true;
};

exports.updateData = async (model, id, data) => {
  await model.updateOne({ _id: id }, { $set: data });
  return true;
};

exports.removeData = async (model, id) => {
  await model.deleteOne({ _id: id });
  return true;
};
