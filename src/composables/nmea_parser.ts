let lat_state   = 0
let lon_state   = 0
var map
interface Positioning {
     latitude: number;
     longitude: number;
     speed: number;
     course: number;
     time: number;
     date: string;
}

interface Quality {
     sat_count: number;
     quality: number;
     hdop: number;
     time: number;
}

let logs = {
     positioning: [] as Positioning[],
     quality: [] as Quality[]
}

async function checkBounds() {

    let bounds = map.getBounds()

    let passedNorth = Math.abs(lat_state) > Math.abs(bounds.getNorth()) - 0.0005
    let passedSouth = Math.abs(lat_state) < Math.abs(bounds.getSouth()) + 0.0005
    let passedEast  = Math.abs(lon_state) < Math.abs(bounds.getEast( )) + 0.0005
    let passedWest  = Math.abs(lon_state) > Math.abs(bounds.getWest( )) - 0.0005
    
    if (
        passedNorth || passedSouth || passedEast || passedWest
    ) {
        await map.setView(new L.LatLng(lat_state, -lon_state))
    }
}

/* Parse an NMEA GPS Sentence to get a more displayable format. */ 
async function parseNMEAMessage(data: string)
{
    try
    {
        let message
        switch (data.substring(0, 6))
        {
            case '$GPGGA':
                message = new GPGGA(data)
                if (message.satellites != 0)
                {
                    lat_state = message.latitude
                    lon_state = message.longitude
                    await checkBounds()
                }

                logs.quality.push(
                    {
                        sat_count: message.satellites,
                        quality: message.quality,
                        hdop: message.dilution,
                        time: message.timestamp
                    }
                )

                break
            case '$GPRMC':
                message = new GPRMC(data)

                logs.positioning.push(
                    {
                        latitude: message.latitude,
                        longitude: message.longitude,
                        speed: message.speed,
                        course: message.course,
                        time: message.timestamp,
                        date: message.date
                    }
                )

                break
            case '$GPGSA':
                message = new GPGSA(data)
                break
            case '$GPGLL':
                message = new GPGLL(data)
                break
            case '$GPVTG':
                message = new GPVTG(data)
                break
            default:
                message = null
                break
        }
        return message
    } catch (error) 
    {
        console.log(
            "Error Processing GPRMC Sentence: " + error.message
        )
        return null
    }
}
