// Vue.component('app', {
//     template: '<div>my vue app</div>'
// })

new Vue({
    el : '#myApp',
    data : {
        latlon      : [],
        lat         : 0,
        lon         : 0,
        city        : '',
        fTemp       : 0,
        cTemp       : 0,
        condition   : '',
        clear : false,
        clouds : false,
        mist : false,
        rain : false
    },
    created(){
        this.$http.get('http://ipinfo.io').then(function(data){
            this.latlon = data.body.loc.split(',')
            this.lat = this.latlon[0]
            this.lon = this.latlon[1]
            this.city = data.body.city
            var url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=ff6076fe6e324066d55229e094b5528d`
            this.$http.get(url).then(function(weatherData){
                console.log(weatherData)
                this.fTemp = Math.floor((weatherData.body.main.temp * (9/5)) - 459.67)
                this.cTemp = Math.floor(weatherData.body.main.temp - 273.15)
                this.condition = weatherData.body.weather[0].main
                switch(condition){
                    case "Clouds":
                        this.clouds = true
                        break
                    case "Mist":
                        this.mist = true
                        break
                    case "Clear":
                        this.clear = true
                        break
                    case "Rain":
                        this.rain = true
                        break
                }
            })
        })
    }
    
})