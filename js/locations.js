// input and save csv location data
async function getLocation() {
    const response = await fetch('../data/csv/CV_SacPAS_Proj_LatLon.csv');
    const data = await response.text();
    const locations = data.split('\n').slice(1);
    const locationsInfo = locations.map(location => {
        const col = location.split(',');
        return {proj: col[0], name: col[1], basin: col[2], lat: col[3], lon: col[4]};
    });
    return locationsInfo;
}
// https://youtu.be/RfMkdvN-23o

const locationsList = () => {
    getLocation().then((locationsInfo) => {
        console.log(locationsInfo);
    });
};
//https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck

locationsList();