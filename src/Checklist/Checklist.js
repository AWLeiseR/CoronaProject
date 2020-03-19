import React from 'react'

import './Styles.css'

import getUBSList from '../utils/fetchUBS'

function CheckButton({ name, action, isChecked }){

    return(
        <div className="CheckButton">
            {name}
        </div>
    )

}

function Checklist(){

    return(
        <div className="ChecklistContainer">

            <div className="ChecklistInfoArea">

                <div className="ResultadoArea">

                    <h3>Utilize a ferramenta de checklist do <i>Eu estou com Corona Vírus?</i> para descobrir em qual grupo de suspeita da doença você se enquadra</h3>
                    <h4>O resultado é atualizado automaticamente enquanto você preenche os sintomas.</h4>
                    <div style={{height: "30vh"}}>

                    </div>

                    <h6>Aviso: os dados para a realização desse teste foram obtidos pelo Ministério da Saúde e não substituem os exames biológicos que confirmam a doença.</h6>

                </div>

                <div className="ButtonsArea">

                    <CheckButton name="Febre"/>
                    <CheckButton name="Febre alta"/>
                    <CheckButton name="Tosse"/>
                    <CheckButton name="Congestão nasal"/>
                    <CheckButton name="Dificuldade para respirar"/>
                    <CheckButton name="Dificuldade para engolir"/>
                    <CheckButton name="Dor de garganta"/>
                    <CheckButton name="Coriza"/>
                    <CheckButton name="Náusea"/>
                    <CheckButton name="Fadiga"/>
                    <CheckButton name="Diarreia"/>
                    <CheckButton name="Vômito"/>

                </div>
                
            </div>

        </div>
    )

}

export default Checklist