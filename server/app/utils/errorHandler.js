module.exports = (err, req, res, next) => {
    let message;

    if (err.code && (err.code === 11000 || err.code === 11001)) {  // duplicate entry mongodb error
        message = 'Entry already exists';
    } else if (err.errors) {  // mongodb validation errors
        var errorKeys = Object.keys(err.errors);
        message = err.errors[errorKeys[0]].message;
    } else if (err.message) {
      message = err.message;
    } else {
        message = 'An internal error occurred'
    }
    return res.status(500).send({message});
};
