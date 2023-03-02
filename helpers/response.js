exports.createResponse = (status, data = null) => {
  return {
    status,
    data,
  };
};

exports.success = (res, data) => {
  return res.status(200).json({
    success: true,
    data: data,
  });
};

exports.error = (res, err, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error: err,
  });
};
