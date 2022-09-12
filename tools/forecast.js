const request=require('request');
    const forecast=(latitude,longtitude,callBack)=>{

    let url='https://api.weatherapi.com/v1/current.json?key=fe534261666146b9af371403220809&q='+latitude +','+ longtitude;
        
    request({url,json:true},(error,response)=>{

        if(error){
        
            callBack('Error Happened',undefined)
        
        }
                
        else if(response.body.error){
        
            callBack(response.body.error.message,undefined)
        
        }

        else{
        
            callBack(undefined,'In '+response.body.location.country+' Temp Is '+response.body.current.temp_c)
            
        }
        })
    }
module.exports=forecast;
