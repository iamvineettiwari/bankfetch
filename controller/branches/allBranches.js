const db = require("../../config/client");
const responses = require("../../helpers/responseHelpers");

const queryText = (q) =>
  q
    ? `SELECT * FROM branches WHERE to_tsvector(ifsc || ' ' || branch || '' || address || '' || city || '' || district || '' || state) @@ to_tsquery('${q}') ORDER BY ifsc`
    : "SELECT * FROM branches ORDER BY ifsc";

module.exports = async (req, res, next) => {
  try {
    const { q = "", limit, offset } = req.query;

    let searchFor = queryText(escape(q.trim()));

    if (limit && limit.trim()) {
      if (!isNaN(Number(limit))) {
        searchFor += ` LIMIT ${parseInt(limit)}`;
      } else {
        return res
          .status(400)
          .json(responses.errorResponse("Invalid limit provided"));
      }
    }

    if (offset && offset.trim()) {
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
