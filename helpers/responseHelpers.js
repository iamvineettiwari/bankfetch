exports.successResponse = (data) => ({
  branches: data.rows,
});

exports.errorResponse = (message) => ({
  success: false,
  message,
});
