const inputArray: Item[] = [
  { 
    location: "Mountain View", 
    postalCode: "94039"
  }, 
  {
    location: "Chicago", 
    postalCode: "60007"
  }
]
const cityTimezones = require("city-timezones")
const zipcode_to_timezone = require( 'zipcode-to-timezone' )
const weather = require('weather-js')

index()

function index() {

  for (const item of inputArray) {

  let timezone: string
 
  timezone = zipcode_to_timezone.lookup(item.postalCode)

  let cityLookup: CityInfo[]

  if(!timezone){
    cityLookup = cityTimezones.lookupViaCity(item.location)
    timezone = cityLookup[0].timezone
  }

  let timeAtplace: any
  timeAtplace = new Date().toLocaleString("en-US", {timeZone: timezone})
  timeAtplace = new Date(timeAtplace)
  console.log('Current Time at ' + item.location + ": " + timeAtplace.toLocaleString())

  let weatherinfo: WeatherInfo

  weather.find({search: item.postalCode, degreeType: 'F'}, function(err: any, result: any) {
    if(err) {
      console.log(err)
    }
    weatherinfo = result[0].current
    if(weatherinfo) {
      printWeatherInfo(weatherinfo, item.location)
    }
    else {
      weather.find({search: item.location, degreeType: 'F'}, function(err: any, result: any) {
        if(err) {
          console.log(err, "Unable to find any weather information")
        }
        weatherinfo = result[0].current
        printWeatherInfo(weatherinfo, item.location)
      })
    }
  })
}

}
  

function printWeatherInfo(weatherinfo: WeatherInfo, location:string) {
  console.log('Here is the weather information for ' + location + '\n' +
  'Overview: ' + weatherinfo.skytext + '\n' +
  'humidity %: '+ weatherinfo.humidity +  '\n' + 
  'Temperature (in F): ' + weatherinfo.temperature + '\n' +
  'Wind speed: '+ weatherinfo.windspeed +  '\n')
}
interface Item {
  location: string;
  postalCode: string;
}

interface CityInfo {
  exactCity: string;
  timezone: string;
}

interface WeatherInfo {
  date: string;
  day: string;
  humidity: string;
  skytext: string;
  temperature: string;
  winddisplay: string;
  windspeed: string;
}

