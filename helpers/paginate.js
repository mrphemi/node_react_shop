/**
 * Gets offset and page limit info for pagination
 *
 * @param {Number} pageNo  currentPage page number to get
 * @param {Number} pageLimit  number of items per page
 *
 *
 * @return {Object}
 */
export const getOffsetAndLimit = (pageNo, pageLimit = 20) => {
  const offset = (pageNo ? parseInt(pageNo) - 1 : 0) * parseInt(pageLimit);
  const limit = Number(pageLimit);
  return { offset, limit };
};

/**
 * Returns Pagination meta information
 *
 * @param {Number} pageNo  currentPage page number to get
 * @param {Number} totalResults  total number of items in db
 * @param {Array} results   total number of items for query after pagination
 * @param {Number} pageLimit   number of items per page
 *
 *
 * @return {Object}
 */
export const paginatedResults = (
  pageNo,
  totalResults,
  results,
  pageLimit = 20
) => {
  const meta = {
    page_no: parseInt(pageNo) || 1,
    total_pages: Math.ceil(totalResults / parseInt(pageLimit)),
    page_size: results.length,
    total_results: totalResults
  };
  return meta;
};
