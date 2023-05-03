import { storageService } from './async-storage.service.js'
export const locService = {
    getLocs
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function _creatLocations (){
    const locs = [
        _createLocation('Greatplace', 32.047104, 34.832384 ), 
        _createLocation('Neveragain', 32.047201, 34.832581)
    ]
   
}

function _createLocation (name, lat = null, lng= null, weather= null){
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