import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGoBtn = onGoBtn
window.onDeleteBtn = onDeleteBtn

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

function renderLocationsTable(locs) {
    let strHTML = `<table><tr>
        <th>Name</th>
        <th>Lat</th>
        <th>Lng</th>
    </tr>`
    strHTML += locs.map((loc) => {
        return ` <tr>
        <td>
        ${loc.name}
        </td>
        <td>
        ${loc.lat}
        </td>
        <td>
        ${loc.lng}
        </td>
        <td>
        <button class="btn btn-go" onclick="onGoBtn( ${loc.lat}, ${loc.lng})">Go</button>
        </td>
        <td>
        <button class="btn btn-go" onclick="onGoBtn(  ${loc.lat}, ${loc.lng})">delet</button>
        </td>
    </tr>`
    }).join('')
    strHTML += `</table>`


    const elLocationTable = document.querySelector('.locations-table')
    elLocationTable.innerHTML = strHTML
}
// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 }) // TODO: add a promise that you recieve from the service
        .then(() => {
            console.log('TODO')
        })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            renderLocationsTable(locs)
            console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}
function onGoBtn(lat, lng) {
    mapService.panTo(lat,lng)

}

function onDeleteBtn(locId){
    locService.removeLoc(locId)
}
function onGetUserPos() {
    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}