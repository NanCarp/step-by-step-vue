/**
 * Created by Administrator on 2017/7/29.
 */
var express = require("express");

var customerRouter = require('./router/customers')

var app = express();

app.use(express.static('public'));


app.get('/portal',function(req,res){
    res.json({
        data:[
            {
                visits:12,
                clicks:100
            },
            {
                location:'BeiJing',
                total:17
            }
        ]
    })
})

app.use('/api', customerRouter);

app.listen(8110,function(){
    console.log("port 8110 is listenning!!!");
});
