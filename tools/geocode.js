const request=require('request')
    const geoCode=(country,callBackFun)=>{
    let geoCodeUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+country+'.json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw';
    
    request({url:geoCodeUrl,json:true},(geocodeError,response)=>{
        if(geocodeError){

            callBackFun('Error Happened',undefined)

        }
        
        else if(response.body.message){

            callBackFun(response.body.message,undefined)

        }

        else if(response.body.features.length==0){

            callBackFun('Country Is Not Defined',undefined)

        }   
        else{

            callBackFun(undefined,
                {
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1]
                
                })
        }
    })
    }


module.exports=geoCode;