exports.tracker = function(req, res) {
    var mood = req.body.mood;

    // Send the mood straight back to acknowledge
    // it was received from the server
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(mood);
}