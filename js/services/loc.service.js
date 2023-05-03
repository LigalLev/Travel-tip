import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
export const locService = {
    getLocs,
    removeLoc, 
    save
}
let gLoc

const LOC_KEY = 'locDB'
_creatLocations()
// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

function getLocs() {
    return storageService.query(LOC_KEY)
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(locs)
    //     }, 2000)
    // })
}
function removeLoc(locId) {
    return storageService.remove(LOC_KEY, locId)
}

function save(loc) {
    if (loc.id) {
        return storageService.put(LOC_KEY, loc)
    } else {
        return storageService.post(LOC_KEY, loc)
    }
}

function _creatLocations() {
    let locs = utilService.loadFromStorage(LOC_KEY)
    console.log('locs:', locs)
    if (!locs || !locs.length) {
      locs =  _createDemoLocations()
    }
    utilService.saveToStorage(LOC_KEY, locs)
}


function _createDemoLocations() {
    const locs = [
        _createLocation('Greatplace', 32.047104, 34.832384),
        _createLocation('Neveragain', 32.047201, 34.832581)
    ]
    return locs
}

function _createLocation(name, lat = null, lng = null, weather = null) {
    return {
        id: storageService._makeId(),
        name,
        lat,
        lng,
        weather,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

}