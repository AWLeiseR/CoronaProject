const fetchUBS = async (url) => {

    let data

    await fetch(url, {method:"get", headers: {
        'User-Agent': 'Web/2.0',
        'Accept': 'application/json'
        }}).then((response) => {
        response.json().then((osmData) => {
            
            data = osmData

            console.log(data)

        }).catch((e) => console.log(e))

    }).catch((e) => {
        console.log(e)
    })

    return data

}

/**
 * Recebe a latitude e longitude do usuario
 * e retorna os pontos de UBS da cidade da pessoa
 * @param {number} latitude 
 * @param {number} longitude 
 */
const getUBSList = async (latitude, longitude) => {

    let UBS1, UBS2
    let UBSLink1, UBSLink2

    await fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&format=json`,
        {method:"get", headers: {
        'User-Agent': 'Web/2.0',
        'Accept': 'application/json'
        }}).then((response) => {
        response.json().then((osmData) => {
            
            const userCity = osmData.address.city
            const userState = osmData.address.state

            UBSLink1 = `https://nominatim.openstreetmap.org/search.php?q=unidade+básica+de+saúde+${userCity}+${userState}&format=json`
            UBSLink2 = `https://nominatim.openstreetmap.org/search.php?q=ubs+${userCity}+${userState}&format=json`


        }).catch((e) => console.log(e))

    }).then(async () => {

        await fetchUBS(UBSLink1).then((data) => UBS1 = data)
        await fetchUBS(UBSLink2).then((data) => UBS2 = data)

    })

    return UBS1.concat(UBS2)

}

export default getUBSList