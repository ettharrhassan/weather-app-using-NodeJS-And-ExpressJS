const express = require('express')
const port = process.env.PORT || 3000;
const app = express()
const hbs=require('hbs');
const path=require('path');
const partialPath=path.join(__dirname,'../t/partials')
const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../t/views')
const geocode=require('../tools/geocode')
const forecast=require('../tools/forecast')

//static
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');
app.set('views',viewPath)

app.get('/weather',(req,res)=>{

    if(!(req.query.address)){
        return res.send({  
            Error:"Not Found",
        })
    }
    // http://localhost:3000/weather?address=italy&temp=22  (&&req.query.temp) test case
    //     res.send({
    //     forecast:"Windy",
    //     location:req.query.address,
    //     temp:req.query.temp
    // })
    geocode(req.query.address,(geocodeError,data)=>{
        if(geocodeError){
            return res.send({error:geocodeError})
        }
        console.log(data)
        forecast(data.latitude,data.longitude,(errorCallBack,dataCallBack)=>{
            if(errorCallBack){
                console.log('here')
                return res.send({error:errorCallBack})
            }
            res.send({
                forecast:dataCallBack,
                location:req.query.address
            })
        })
    })
})





//dynamic

hbs.registerPartials(partialPath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'home page',
        name:'Ahmed',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Yassen',
    })
})

app.get('/helpview',(req,res)=>{
    res.render('helpview',{
        title:'help page',
        name:'Riham',
    })
})

 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


