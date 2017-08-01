var router = require("express").Router();
var db = require('./fakeData');

router.get('/getCustomers', function (req, res) {
    var list = db.data;
    list = list.filter(v => v.name.indexOf(req.query.keyword) !== -1);
    res.json(list);
});
router.get('/customer/:id', function (req, res) {
    var list = db.data;
    var obj = list.filter(v=> v.id == req.params.id)[0];
    res.json(obj);
})
module.exports = router;