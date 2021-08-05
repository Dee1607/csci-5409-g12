import React, { Component, useState } from 'react';
import ImageUploader from 'react-images-upload';
import PageHeader from "../components/PageHeader";
import "../styles/button_style.scss";
import "../styles/Home.scss";
import { withRouter } from "react-router";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import './Credits.css';

export class Credits extends Component {

    addCredit = (credit) => {
        if(credit ===30 )
            this.state.isOrdered30 = true;
        else if(credit === 50)
            this.state.isOrdered50 = true;
        else if(credit === 100)
            this.state.isOrdered100 = true;

        const creditData = credit;
        const URL = " https://d5ug4od3oi.execute-api.us-east-1.amazonaws.com/default/addcredit";
        axios.get(URL)
        .then((response) => {
            this.setState({ isOrdered: response.data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    constructor(props) {
        super(props);
        this.state = { isOrdered30: false, isOrdered50: false, isOrdered100: false };
        //this.getFromS3();
    }

    render() {
        return (
            <div className="page-container to-do-list-container">
                <div className="page-header-container">
                    <PageHeader title="Add Credits" subtitle="" />
                </div>
                <div className="page-content-container">
                    <div className="page-content">
                    <center>
                    {
                        this.state.isOrdered30 ?  <p><button  className= {"button"} style={{backgroundColor: "#2EE59D" , color : "#ffffff" , border : "#2EE59D"}}  onClick={(e) => this.addCredit(30)} >30 Credits Added</button></p>
                        :  <p><button  className= {"button"} style={{backgroundColor: "rgb(42, 82, 190)" , color : "#ffffff" , border : "rgb(42, 82, 190)"}}  onClick={(e) => this.addCredit(30)} >Add 30 Credis</button></p> 
                    }

                    {
                        this.state.isOrdered50 ?  <p><button  className= {"button"} style={{backgroundColor: "#2EE59D" , color : "#ffffff" , border : "#2EE59D"}}  onClick={(e) => this.addCredit(50)} >50 Credits Added</button></p>
                        :  <p><button  className= {"button"} style={{backgroundColor: "rgb(42, 82, 190)" , color : "#ffffff" , border : "rgb(42, 82, 190)"}}  onClick={(e) => this.addCredit(50)} >Add 50 Credis</button></p> 
                    }

                    {  
                        this.state.isOrdered100 ?  <p><button  className= {"button"} style={{backgroundColor: "#2EE59D" , color : "#ffffff" , border : "#2EE59D"}}  onClick={(e) => this.addCredit(100)} >100 Credits Added</button></p>
                        :  <p><button  className= {"button"} style={{backgroundColor: "rgb(42, 82, 190)" , color : "#ffffff" , border : "rgb(42, 82, 190)"}}  onClick={(e) => this.addCredit(100)} >Add 100 Credis</button></p> 
                    }
                    </center>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Credits);