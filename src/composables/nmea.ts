class NMEAGPSMessage 
{
/*/ NMEA GPS Message Class 
 *  
 *  Basic Standards:
 *  ----------------
 *  1. Messages start with $ and end with <CR><LF>
 *  2. The first 2 chars after $ are the 'talker type'
 *  3. The three chars after the talker are the message type
 *  4. The information between the type and the * is the data
 *  5. The data is comma delimited
 *  6. The number after the * is the checksum for message validation
/*/

    message: string      = ''
    messageArray: string[] = []
    talker: string       = '$GP' // $GPGGA -- $GP is talker, GGA is type
    type: string         = ''    //

    constructor(message: string) 
    {
        this.validateMessage(message)
        this.message      = message
        this.messageArray = this.message.split(',')
        this.type         = this.messageArray[0].substring(3, 6)
    }


    /* Validate the message against NMEA Standards */
    private validateMessage(message: string): void
    {         
        if (!message.startsWith(this.talker))
        {
            console.log(
                'Error invalid talker: ' + this.talker
            )
            throw 'Invalid NMEA GPS Talker! Message does not start with $GP:\n' + message
        }

        if (message.length > 82)
        {
            console.log(
                'Error invalid length: ' + message.length + ' ' + message
            )
            throw 'Invalid NMEA GPS Length! Message is longer than 82 characters:\n' + message
        }

    
        /*/ Checksum Validation 
         *  -------------------
         *  The checksum value occurs after the * at the end of the message
         *  Every char after $ and before * must be XOR'd and must be equal to the checksum
        /*/
        let checksum = message.split('*')[1]
        let chars    = message.split('*')[0].substring(1) 

        if (checksum == '')
            throw 'Invalid NMEA GPS Message! Message has no checksum:\n' + message
    
        let char: number = chars.charCodeAt(0)
        for (let i = 1; i < chars.length; i++) 
        {
            char = char ^ chars.charCodeAt(i);
        }

        let charStr: string = char.toString(16)
        charStr = charStr.toUpperCase()
        if (charStr.length == 1) charStr = '0'.concat(charStr)
        
        if (charStr !== checksum)
            throw `Corrupted NMEA GPS Message! Checksum is ${checksum} but calculated ${charStr} for message:\n` + message
    }
}


class GPGLL extends NMEAGPSMessage
{
/*/ GLL Message Standard:
 *  --------------------- 
 *  $GPGLL,     -- 00 - Position Fix
 *  3723.2475,  -- 01 - Latitude            -- 37  degrees 23.2475 minutes
 *  N,          -- 02 - Latitude Direction  -- N (or S)
 *  12158.3416, -- 03 - Longitude           -- 121 degress 58.3416 minutes
 *  W,          -- 04 - Longitude Direction -- W (or E)
 *  161229.487, -- 05 - Timestamp
 *  A,          -- 06 - Status: A is Data Valid, V is Data Invalid
 *  A           -- 07 - Mode: A is Automonous, D is DGPS, E is DR
 *  *41         -- 07 - Checksum
/*/
    type: string = 'GLL';

    lat: string = '0000.00000';
    latitude: number = 0;
    latDirection: string = '';
    lon: string = '00000.00000';
    longitude: number = 0;
    lonDirection: string = '';
    timestamp: number = 0;
    utc: string = 'HH:MM:SS.SS';
    validity: string = '';
    mode: string = '';

    constructor(message: string)
    {
        super(message)
        
        this._setTime(5)
        this._setLatitude(1)
        this._setLongitude(3)

        this.validity = this.messageArray[6]
        this.mode     = this.messageArray[7].split('*')[0]
    }

    _setLatitude(index: number): void 
    {
        this.lat          = this.messageArray[index]
        this.latDirection = this.messageArray[index + 1]
        let degrees       = Number(this.lat.substring(0, 2))
        let minutes       = Number(this.lat.substring(2))
        this.latitude     = degrees + minutes / 60
    }

    _setLongitude(index: number): void
    {
        this.lon          = this.messageArray[index]
        this.lonDirection = this.messageArray[index + 1]
        let degrees       = Number(this.lon.substring(0, 3))
        let minutes       = Number(this.lon.substring(3))
        this.longitude    = degrees + minutes / 60
    }

    _setTime(index: number): void
    {
        let time = this.messageArray[index]
        this.utc = `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4)}UTC` // HH:MM:SS.SS
        this.timestamp = Number(time)
    }

    latString(): string 
    {
        return `${this.latitude.toPrecision(10)}${this.latDirection}`
    }

    lonString(): string
    {
        return `${this.longitude.toPrecision(10)}${this.lonDirection}`
    }

    toString(): string
    {
        return  `Latitude:   ${this.latString()}\n` +
                `Longitude:  ${this.lonString()}\n` +
                `Time:       ${this.utc}`
    }
}


class GPGGA extends GPGLL 
{
/*/ GGA Message Standard:
 *  ---------------------
 *  $GPGGA,         -- 00 - Global Positioning System Fix Data
 *  075909.00,      -- 01 - Timestamp
 *  6451.53390,     -- 02 - Latitude            -- 64  degrees, 51.53390 minutes
 *  N,              -- 03 - Latitude Direction
 *  14749.78748,    -- 04 - Longitude           -- 147 degrees, 49.78748 minutes
 *  W,              -- 05 - Longitude Directions
 *  1,              -- 06 - Fix Quality (0 is invalid, 1 is GPS, 2 is DGPS)
 *  04,             -- 07 - Satellite Count
 *  8.23,           -- 08 - Horizontal Dilution of Precision
 *  149.4,          -- 09 - Altitude
 *  M,              -- 10 - Altitude unit: meters
 *  5.8,            -- 11 - Height of geoid above WGS84 ellipsoid
 *  M,              -- 12 - Geoid height unit: meters
 *  ...,            -- 13 - Time since last DGPS update (can leave blank)
 *  ...             -- 14 - DGPS reference station id   (can leave blank)
 *  *75             -- 14 - Checksum (same array position as last piece.)
/*/

    type: string = 'GGA';

    altitude: number = 0;
    satellites: number = 0;
    quality: number = 0;
    dilution: number = 0;
    geoidHeight: number = 0;

    constructor(message: string) 
    {        
        super(message)

        this._setTime(1)
        this._setLatitude(2)
        this._setLongitude(4)

        this.quality      = Number(this.messageArray[6])
        this.satellites   = Number(this.messageArray[7])
        this.dilution     = Number(this.messageArray[8])
        this.altitude     = Number(this.messageArray[9])
        this.geoidHeight  = Number(this.messageArray[11])
    }

    altString(): string
    {
        return `${this.altitude}${this.messageArray[10]}`
    }

    geoidString(): string 
    {
        return `${this.geoidHeight}${this.messageArray[12]}`
    }

    toString(): string 
    {
        return  `Latitude:   ${this.latString()}\n` +
                `Longitude:  ${this.lonString()}\n` +
                `Altitude:   ${this.altString()}\n` +
                `Satellites: ${this.satellites}\n` +
                `Time:       ${this.utc}`
    }

    toStringVerbose(): string 
    {
        return  `Latitude:   ${this.latString()}\n` +
                `Longitude:  ${this.lonString()}\n` +
                `Altitude:   ${this.altString()}\n` +
                `GEOID:      ${this.geoidString()}\n` +
                `Satellites: ${this.satellites}\n` +
                `Quality:    ${this.quality}\n` +
                `Dilution:   ${this.dilution}\n` + 
                `Time:       ${this.utc}`
    }
}


class GPGSA extends NMEAGPSMessage 
{
/*/ GSA Message Standard:
 *  ---------------------
 *  $GPGSA, -- 00 - GPS DOP and active satellites
 *  A,      -- 01 - Mode: 'M' is Manual 2D or 3D, 'A' is Automatic 2D and 3D
 *  3,      -- 02 - Mode: '1' is Fix not Available, '2' is 2D, '3' is 3D 
 *  27,     -- 03 - SVID: GPS is 1..32, SBAS is 33..64, GLO is 65..96
 *  23,     -- 04 - SVID: null if unused
 *  10,     -- 05 - SVID: ...
 *  15,     -- 06 - SVID: ...
 *  18,     -- 07 - SVID: ...
 *  16,     -- 08 - SVID: ...
 *  ...,    -- 09 - SVID: ...
 *  ...,    -- 10 - SVID: ...
 *  ...,    -- 11 - SVID: ...
 *  ...,    -- 12 - SVID: ...
 *  ...,    -- 13 - SVID: ...
 *  ...,    -- 14 - SVID: ...
 *  2.25,   -- 15 - PDOP: Positional Dilution of Precision
 *  1.82,   -- 16 - HDOP: Horizontal Dilution of Precision
 *  1.33    -- 17 - VDOP: Vertical Dilution of Precision
 *  *02     -- 17 - Checksum
/*/

    type: string = 'GSA';

    mode: string = '';
    SVIDs: string[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
    PDOP: number = 0;
    HDOP: number = 0;
    VDOP: number = 0;

    constructor(message: string)
    {
        super(message)

        this.setSVIDs()    
        
        this.mode   = this.messageArray[1 ] + this.messageArray[2 ]
        this.PDOP   = Number(this.messageArray[15])
        this.HDOP   = Number(this.messageArray[16])
        this.VDOP   = Number(this.messageArray[17].split('*')[0])
    }

    private setSVIDs(): void
    {
        for(let i = 0; i < 12; i++)
        {
            this.SVIDs[i] = this.messageArray[i + 3]
        }
    }

    SVIDString(index: number): string
    {
        if (index + 3 < 3 || index + 3 > 14)
            throw `SVID Index Out of Bounds: ${index}`

        let svid  = this.messageArray[index + 3]
        if (svid != '')
        {
            if      (Number(svid) < 33) return `${svid} GPS`
            else if (Number(svid) < 65) return `${svid} SBAS`
            else if (Number(svid) < 97) return `${svid} GLO`
            else throw 'Invalid SVID Value'
        } else
        {
            return 'null'
        }
    }

    toString(): string
    {
        let svids = ``
        
        this.SVIDs.forEach(
            (_, index) => 
            {
                svids += 'SVID: ' + this.SVIDString(index) + '\n'
                index += 1
            }
        )
        
        return `Mode: ${this.mode}\n` +
                svids +
               `PDOP: ${this.PDOP}\n` +
               `HDOP: ${this.HDOP}\n` +
               `VDOP: ${this.VDOP}`
    }
}

class GPVTG extends NMEAGPSMessage
{
/*/ VTG Message Standard:
 *  --------------------- 
 *  $GPVTG, -- 00 - Speed and Course Information
 *  309.62, -- 01 - Course in Degrees
 *  T,      -- 02 - Course Reference: True
 *  ...,    -- 03 - Course in Degrees
 *  M,      -- 04 - Course Reference: Magnetic
 *  0.13,   -- 05 - Horizontal Speed
 *  N,      -- 06 - Unit: Knots
 *  0.2,    -- 07 - Horizontal Speed
 *  K,      -- 08 - Unit: Kilometers per hour
 *  A       -- 09 - Mode: A is Autonomous, D is DGPS, E is DR
 *  *23     -- 10 - Checksum
/*/

    type: string = 'VTG'

    mode: string           = ''
    courseTrue: number     = 0
    courseMagnetic: number = 0
    speedKnots: number     = 0
    speedKMH: number       = 0

    constructor(message: string)
    {
        super(message)

        this.courseTrue     = Number(this.messageArray[1])
        this.courseMagnetic = Number(this.messageArray[3])
        this.speedKnots     = Number(this.messageArray[5])
        this.speedKMH       = Number(this.messageArray[7])
        this.mode           = this.messageArray[9].split('*')[0]
    }

    toString(): string
    {
        return `Course (true): ${this.courseTrue}\n` +
               `Course (magnetic): ${this.courseMagnetic}\n` +
               `Speed  (knots): ${this.speedKnots}\n` +
               `Speed  (K/h): ${this.speedKMH}\n` +
               `Mode: ${this.mode}`
    }

}


class GPRMC extends GPGLL
{
/*/ RMC Message Standard
$GPRMC,     -- 00 - Position and Speed over Ground
161229.487, -- 01 - Timestamp UTC HHMMSS.SS
A,          -- 02 - A is valid data, v is invalid data
3723.2475,  -- 03 - Latitude 37 degrees 23.2475 minutes
N,          -- o4 - Latitude Direction N or S
12158.3416, -- 05 - Longitude 121 degrees 58.3416 minutes
W,          -- 06 - Longitude Direction W or E
0.13,       -- 07 - Speed over Ground (knots)
309.62,     -- 08 - Course over Ground (degrees)
120598,     -- 09 - Date DDYYMM
...,        -- 10 - Magnetic Variation, Degrees, E or W
...         -- 11 - Mode: A is Autonomous, D is DPGS, E is DR
*10         -- 11 - Checksum
/*/

    type: string = 'RMC'

    speed: number     = 0
    course: number    = 0
    variation: number = 0
    date: string      = 'ddyymm'

    constructor(message: string)
    {
        super(message)

        this._setTime(1)
        this._setLatitude(3)
        this._setLongitude(5)

        this.speed     = Number(this.messageArray[7])
        this.course    = Number(this.messageArray[8])
        this.date      = Number(this.messageArray[9]).toString()
        this.variation = Number(this.messageArray[10])
        this.mode      = this.messageArray[11]
    }

    toString(): string
    {
        return `Speed (knots): ${this.speed}\n` +
               `Course (degrees):${this.course}\n`
    }

    toStringVerbose(): string
    {
        return `Latitude: ${this.latString()}\n` +
               `Longitude: ${this.lonString()}\n` +
               `Speed (knots): ${this.speed}\n` +
               `Course (degrees): ${this.course}\n` + 
               `Time: ${this.utc}\n` +
               `Date: ${this.date}\n` +
               `Magnetic Variation: ${this.variation || '0'}\n` +
               `Mode: ${this.mode || 'null'}`
    }
}