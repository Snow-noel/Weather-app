import { getuser } from "./user";
import { fetchData } from "./api";
export function display(){
    const userdata=getuser();
    const Input=userdata.input;
    const Main=userdata.main;
    const Form=userdata.form;
    const Button=userdata.button
    const section=document.createElement('div')
    Form.addEventListener("submit", async(e)=>{
        e.preventDefault();
        const data= await fetchData(
            `https://api.openweathermap.org/data/2.5/weather?q=${Input.value}&appid=c4add2ec4a881e84e17e786284428d40&units=metric`
        )
    if(data.cod!=200){

        Input.value=""
        section.innerHTML=""
        section.remove();
        const massage=document.createElement('h2');
        massage.textContent="Error: City not found!"
        massage.style.color="red";
        Main.append(massage)

        setTimeout(()=>{
            massage.remove();
        },5000)
    
    }
    else{
    section.innerHTML=""
    const City=document.createElement('h1')
    const Temperature=document.createElement('h2')
    const Humidity=document.createElement('h2')
    const Description=document.createElement('h3')
    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description; 
    icon.style.cssText=`
    height:100px;
    width:100px;
    `
    City.textContent=Input.value;
    Temperature.textContent=`Temperature: ${Math.round(data.main.temp)}\u00B0C`;
    Humidity.textContent=`Humidity: ${Math.round(data.main.humidity)}%`;
    Description.textContent=data.weather[0].description;
    section.classList.add('display');
    Main.append(section)
    section.append(City,Temperature,Humidity,icon,Description)
    Input.value=""
    }


    })
}
