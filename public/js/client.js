let form=document.getElementById('myForm');
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    weatherFunction();
})
let weatherFunction=async()=>{
    try{
        const address=document.getElementById('location').value
        const res=await fetch('http://localhost:3000/weather?address='+address)
        const data=await res.json();
        console.log(data)
        if(data.error){
            document.getElementById('error').innerText=data.error;
            document.getElementById('address').innerText='';
            document.getElementById('forecast').innerText='';
        }
        else{
        document.getElementById('error').innerText='';
        document.getElementById('address').innerText=`Do You Ask About ${data.location} Temperature !`;
        document.getElementById('forecast').innerText=data.forecast;
            }    }
    catch(e){
        console.log(e)
    }
}
