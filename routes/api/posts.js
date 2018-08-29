var keystone = require('keystone');

var Post = keystone.list('Post');

exports.list = function (req, res) {

  // Added this section to add filter to query
  const title = req.query.title
  const categories = req.query.categories
  const query = {}

  if (title) {

    query.title = title

  } else if (categories) {

    query.categories = categories
  }
  // End of filter section

  //Post.model.find(function (err, items) // Without filter query applied
  Post.model.find(query, function (err, items) {  // Filter applied here
    if (err) return res.json({ err: err });
    res.json({
      Post: items
    });
  });
};

// Get Post by ID
exports.get = function(req, res) {
  Post.model.findById(req.params.id).exec(function (err, item) {
    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');
    res.json({
      Post: item
    });
  });
};
