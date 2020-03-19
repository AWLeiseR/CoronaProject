const fetchUBS = async (url) => {

    return new Promise(resolve => {

        fetch(url, {method:"get", headers: {
            'User-Agent': 'Web/2.0',
            'Accept': 'application/json'
            }}).then((response) => {
            response.json().then((osmData) => {
                
                resolve(osmData)

            }).catch((e) => console.log(e))

        }).catch((e) => {
            console.log(e)
        })

    })

}

/**
 * Recebe a latitude e longitude do usuario
 * e retorna uma Promise com os pontos de UBS da cidade da pessoa
 * @param {number} latitude 
 * @param {number} longitude 
 */
const getUBSList = async (latitude, longitude) => {

    return new Promise(async resolve => {

        let UBS1 = []
        let UBS2 = []
        let UBSLink1, UBSLink2

        UBS1 = []
        UBS2 = []

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

                fetchUBS(UBSLink1).then((dataOne) => {
                    fetchUBS(UBSLink2).then((dataTwo) => {
                        resolve(dataOne.concat(dataTwo))
                    })
                })

            }).catch((e) => console.log(e))

        })
    })

}

export default getUBSList