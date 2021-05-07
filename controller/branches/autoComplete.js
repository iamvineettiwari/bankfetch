const db = require("../../config/client");
const responses = require("../../helpers/responseHelpers");

const queryText = (q) =>
  `SELECT * FROM branches WHERE branch LIKE '%${q}%' ORDER BY ifsc`;

module.exports = async (req, res, next) => {
  try {
    const { q, limit, offset } = req.query;

    if (!q) {
      return res.status(400).json(responses.errorResponse("Invalid request"));
    }

    let searchFor = queryText(escape(q.trim()));

    if (limit) {
      if (!isNaN(Number(limit))) {
        searchFor += ` LIMIT ${parseInt(limit)}`;
      } else {
        return res
          .status(400)
          .json(responses.errorResponse("Invalid limit provided"));
      }
    }

    if (offset) {
      if (!isNaN(Number(offset))) {
        searchFor += ` OFFSET ${parseInt(offset)}`;
      } else {
        return res
          .status(400)
          .json(responses.errorResponse("Invalid offset provided"));
      }
    }

    const result = await db.query(searchFor);

    if (result && result.rowCount) {
      return res.json(responses.successResponse(result));
    }

    return res.status(404).json(responses.errorResponse("Not Found"));
  } catch (error) {
    return res.status(500).json(responses.errorResponse(error.message));
  }
};
