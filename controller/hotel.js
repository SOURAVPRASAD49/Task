const https = require('https');
const Hotel = require("../model/hotel");
let url = "https://random-data-api.com/api/restaurant/random_restaurant";

module.exports.saveData = (req, res, next) => {
    https.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                const hotel = new Hotel({
                    id : json.id,
                    uid: json.uid,
                    name: json.name,
                    type: json.type,
                    description: json.description,
                    review: json.review,
                    logo: json.logo,
                    phone_number: json.phone_number,
                    hours : json.hours,
                })
                hotel.save((err, result)=> {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('Data saved successfully')
                    }
                })
               
            } catch (error) {
                console.error(error.message);
            };
        });
    }).on("error", (error) => {
        console.error(error.message);
    });
    res.send({
        message: "Data saved successfully",
    });
};


module.exports.fetchData = async (req, res, next) => {
    let type = req.query.type;
    let data = await Hotel.find({type: type})
    const d = new Date();
    let dayInInt = d.getDay();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let time = "";
    let day;
    if(hours>12){
        let n = hours-12;
        time += n.toString();
        time += ':';
        time += minutes.toString();
        time += " PM";
    }
    else{
        let n = hours;
        time += n.toString();
        time += ':';
        time += minutes.toString();
        time += " AM";
    }
    if(dayInInt==0){
       day = 'sunday';
    }
    if(dayInInt==1){
        day = 'monday';
    }
    if(dayInInt==2){
        day = 'tuesday';
    }
    if(dayInInt==3){
        day = 'wednesday';
    }
    if(dayInInt==4){
        day = 'thursday';
    }
    if(dayInInt==5){
        day = 'friday';
    }
    if(dayInInt==6){
        day = 'saturday';
    }
    let hotelData = [];
    for(let i=0;i<data.length;i++){
        for(let p in data[i].hours){
            if(p==day){
                if(data[i].hours[p].is_closed==false){
                    if((data[i].hours[p].opens_at > time) && (time < data[i].hours[p].closes_at)){
                        hotelData.push(data[i]);
                    }
                }
            }
        }
    }
    res.send(hotelData);
}



