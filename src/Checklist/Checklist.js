import React, { useState, useCallback } from 'react'

import './Styles.css'

const Sintomas = [
    {
        titulo: "Febre",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Febre alta",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Tosse",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Congestão nasal",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Dificuldade para respirar",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Dificuldade para engolir",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Dor de garganta",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Fadiga",
        score: 0,
        isChecked: false,
        type: "normal"
    },
    {
        titulo: "Estive presente ou moro em um local com caso suspeito e/ou confirmado da doença",
        score: 0,
        isChecked: false,
        type: "large"
    },
    {
        titulo: "Tive contato próximo com alguém que estava com caso suspeito ou confirmado da doença",
        score: 0,
        isChecked: false,
        type: "large"
    },
]

function CheckButton({ name, action, isChecked, checkItem, peso, array, index, type }){

    const largeButton = type === "large"? {width: "95%", height: "80px"}:null

    const __onClick_check = () => {
        checkItem(index)
    }

    if(!isChecked)
        return(
            <div className="CheckButton" onClick={__onClick_check} style={largeButton}>
                {name}
            </div>
        )
    else
        return(
            <div className="CheckButton check" onClick={__onClick_check} style={largeButton}>
                {name}
            </div>
        )

}

const Resultado = {
    sem_evidencia: {
        main: "NÃO HÁ SINTOMAS QUE CARACTERIZAM A COVID-19",
        sub: "Você não entra na definição de doença por contágio de corona vírus. Mesmo assim é necessário seguir as recomendações abaixo e manter a prevenção."
    },
    suspeito: {
        main: "CASO SUSPEITO DE CORONA VÍRUS",
        sub: "Seus sintomas podem caracterizar um caso de corona vírus. Fique atento caso novos sintomas apareçam, siga as recomendações abaixo e mantenha a prevenção."
    },  
    provavel: {
        main: "CASO PROVÁVEL DE CORONA VÍRUS",
        sub: "Você pode estar infectado com corona vírus. Procure uma unidade de saúde próxima para mais informações."
    },
    suspeito_assintomatico: {
        main: "CASO SUSPEITO DE CORONA VÍRUS",
        sub: "Mesmo não apresentando nenhum sintoma, você teve contato direto com algum caso suspeito ou confirmado da doença. Fique atento caso novos sintomas apareçam e siga as recomendações abaixo."
    },
    se_sintomatico: {
        main: "NÃO HÁ SINTOMAS QUE CARACTERIZAM A COVID-19",
        sub: "Mesmo com alguns sintomas, eles não são suficientes para caracterizar um caso de corona vírus. Fique atento caso eles se agravem e siga as recomendações abaixo."
    }
}

function Checklist(){

    const [sintomasArray, setSintomasArray] = useState(Sintomas)
    const [resultado, setResultado] = useState(Resultado.sem_evidencia)
    const [background, setBackground] = useState("green")

    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])

    const getScore = (array) => {

        const reducer = (currentValue, value) => {
            if(currentValue === true)
                return true
            else
                return value
        }

        const countReducer = (accumulator, currentValue) => {
            if(currentValue === true)
                return accumulator + 1
            else
                return accumulator
        }

        const slicedArray = array.slice(2, 7)

        const final = slicedArray.reduce(reducer)
        const countFinal = slicedArray.reduce(countReducer, 0)

        console.log(countFinal)

        if(countFinal > 2 && array[8]){
            setResultado(Resultado.provavel)
            setBackground("red")
            return
        }

        if(array[1]){
            if((final && array[8] )|| array[9]){
                setResultado(Resultado.provavel)
                setBackground("red")
                return
            }
        }

        if(array[0]){
            if(final && array[9]){
                setResultado(Resultado.provavel)
                setBackground("red")
                return
            }
            if((final && array[8])){
                setResultado(Resultado.suspeito)
                setBackground("yellow")
                return
            }
        } 

        if(countFinal > 1 && array[8]){
            setResultado(Resultado.suspeito)
            setBackground("yellow")
            return
        }

        if(final && array[9]){
            setResultado(Resultado.provavel)
            setBackground("red")
            return
        }

        if(final){
            setResultado(Resultado.se_sintomatico)
            setBackground("green")
            return
        }

        if(array[9]){
            setResultado(Resultado.suspeito_assintomatico)
            setBackground("yellow")
            return
        }

        setResultado(Resultado.sem_evidencia)
        setBackground("green")

    }

    const modifyArray = (index) => {

        let aux = sintomasArray.copyWithin()

        aux[index].isChecked = !aux[index].isChecked

        if(index === 0){
            if(aux[0].isChecked === true && aux[1].isChecked === true)
                aux[1].isChecked = false
        }
        
        if(index === 1){
            if(aux[0].isChecked === true && aux[1].isChecked === true)
                aux[0].isChecked = false
        }

        setSintomasArray(aux)
        update()

        getScore(aux.map(item => item.isChecked))
    }

    const getGBAnim = () => {

        if(background === "red" || background === "yellow")
            return "fadeOut"
        else
            return "fadeIn"

    }

    const getYBAnim = () => {

        if(background === "red")
            return "fadeOut"
        else
            return "fadeIn"

    }

    return(
        <div className={`ChecklistContainer`}>

            <div className={`Background BackgroundGreen ${getGBAnim()}`}></div>
            <div className={`Background BackgroundYellow ${getYBAnim()}`}></div>
            <div className="Background BackgroundRed"></div>

            <div className="ChecklistInfoArea">

                <div className="ResultadoArea">

                    <h3>Utilize a ferramenta de checklist ao lado do <i>Eu estou com Corona Vírus?</i> para descobrir em qual grupo de suspeita da doença você se enquadra</h3>
                    <h4>O resultado é atualizado automaticamente enquanto você preenche os sintomas</h4>

                    <div className="horizontalSeparator"/>
                    <div style={{height: "30vh"}}>

                        <p><i>resultado</i></p>
                        <h1>{resultado.main}</h1>
                        <p>{resultado.sub}</p>

                        <p><i>recomendações</i></p>
                        <div>

                        </div>

                    </div>

                    <h6>Os dados para a realização desse teste foram obtidos no site oficial do <a href="https://coronavirus.saude.gov.br/sobre-a-doenca#casossuspeito" target="_blank">Ministério da Saúde</a>. Este teste não substitui o exame laboratorial que confirma presença a doença.</h6>

                </div>

                <div className="ButtonsArea">

                    {sintomasArray.map((sintoma, index) => {
                        return <CheckButton key={sintoma.titulo} name={sintoma.titulo} isChecked={sintoma.isChecked} index={index} checkItem={modifyArray} type={sintoma.type}/>
                    })}

                </div>
                
            </div>

        </div>
    )

}

export default Checklist