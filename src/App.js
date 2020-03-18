import React, { useState } from 'react';

import './Styles.css'
import telefone from './images/phone.png'

import Checklist from './Checklist/Checklist'
import MapUbs from './MapUbs/MapUbs'
const PaginasApp = {

    Home: 1,
    SobreADoenca: 2,
    Prevencao: 3,
    Mapa: 4,
    FakeNews: 5

}

function MenuItem({nome, action, style}){

    return(
        <div className="MenuItem" onClick={action} style={style}>
            <p>{nome}</p>
        </div>
    )

}

function Menu({ changePage, currentPage }){

    const customStyle = {fontWeight: "bold"}

    return(
        <header>
            <MenuItem nome="Estou com Corona Vírus?" action={() => changePage(PaginasApp.Home)} style={currentPage===PaginasApp.Home? customStyle:null}/>
            <MenuItem nome="Sobre a doença" action={() => changePage(PaginasApp.SobreADoenca)} style={currentPage===PaginasApp.SobreADoenca? customStyle:null}/>
            <MenuItem nome="Prevenção" action={() => changePage(PaginasApp.Prevencao)} style={currentPage===PaginasApp.Prevencao? customStyle:null}/>
            <MenuItem nome="Mapa de UBS" action={() => changePage(PaginasApp.Mapa)} style={currentPage===PaginasApp.Mapa? customStyle:null}/>
            <MenuItem nome="Fake News" action={() => changePage(PaginasApp.FakeNews)} style={currentPage===PaginasApp.FakeNews? customStyle:null}/>
        </header>
    )

}

function Footer(){
    
    return(
        <footer>
            <div className="DisqueSaude">
                <img src={telefone} alt="Ícone de telefone"/>
                <p>Disque Saúde - 136</p>
            </div>

            <div className="FooterLinks">
                <MenuItem nome="Sobre a página"/>
                <MenuItem nome="Aviso legal"/>
                <MenuItem nome="Links úteis"/>
            </div>

        </footer>
    )

}

function App() {

    const [paginaAtual, mudarPagina] = useState(PaginasApp.Home)

    const setPage = () => {

        switch(paginaAtual){
            case PaginasApp.Home:
                return <Checklist/>
            case PaginasApp.SobreADoenca:
                return //Sobre
            case PaginasApp.Prevencao:
                return //Prevencao
            case PaginasApp.Mapa:
                return <MapUbs/>
            case PaginasApp.FakeNews:
                return //FakeNews
            default:
                return //Erro
        }

    }

    return (
        <div className="App">
        <Menu changePage={mudarPagina} currentPage={paginaAtual} />
            <div className="AppArea">

                {setPage()}

            </div>
        <Footer/>
        </div>
    );
}

export default App;
