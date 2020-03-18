import React from 'react'

// import './Styles.css'

import getUBSList from '../utils/fetchUBS'

function Checklist(){

    return(
        <div onClick={() => getUBSList(-23.313753, -51.164003).then(value=>console.log(value))}>
            Hello World! hora di mata o corouna vairus
        </div>
    )

}

export default Checklist