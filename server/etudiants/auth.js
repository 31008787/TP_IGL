var router = require("express").Router();
var axios = require("axios");

function isAuthenticated(cookie) {

    return axios.post(process.env.AUTH_IP+":"+process.env.AUTH_PORT+"/isAuth", {
        cookie
    });
}

router.post("*", (req, res) => {
    isAuthenticated(req.cookies)
    .then(json => {
        if(!json.isAuth)
        {
            res.send({type: "error", msg: "You're not authenticated!"});
        } else {
            next();
        }
    })
    .catch(function (err){
        if(!err.status)
            res.send({type: "error", msg: "server not responding!"});
        else
            res.send({type: "error", msg: "unknown error"});
    });
});

module.exports = router;