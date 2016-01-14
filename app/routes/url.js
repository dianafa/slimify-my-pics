var url = [
    {"id": 0, "address": "google.com", "total_image_size": 54354, "result": 4},
    {"id": 1, "address": "dianafa.me", "total_image_size": 3232, "result": 0},
    {"id": 2, "address": "onet.pl", "total_image_size": 54232, "result": 0},
    {"id": 3, "address": "yahoo.com", "total_image_size": 545423, "result": 0},
];

exports.findAll = function (req, res, next) {
    var name = req.query.name;
    if (name) {
        res.send(url.filter(function(record) {
            return (record.address + ' ' + record.result).indexOf(name.toLowerCase()) > -1;
        }));
    } else {
        res.send(url);
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(url[id]);
};