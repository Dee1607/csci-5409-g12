import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import PageHeader from "../components/PageHeader";
import "../styles/button_style.scss";
import "../styles/Home.scss";
import { withRouter } from "react-router";
import axios from "axios";
import Button from 'react-bootstrap/Button'
export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop = (pictures, pictureUrls) => {    
        let reader = new FileReader();
        let url = reader.readAsDataURL(pictures[pictures.length - 1]); 
    
        reader.onload = (event) => {
            this.setPictures(reader.result)
        };
        
      };

      setPictures(base64Image) {
        this.setState({pictures: this.state.pictures.concat(base64Image)})
      }

      uploadToS3 = (event) => {
          event.preventDefault();
          console.log(this.state.pictures)
          axios.post('http://localhost:8000/create', this.state.pictures).then(response => {
              console.log(response)
          })
      }

        render() {
            return (
                <div className="page-container to-do-list-container">
                    <div className="page-header-container">
                        <PageHeader title="Create Video" subtitle="" />
                    </div>
                    <div className="page-content-container">
                        <div className="page-content">
                            <div className="upload-image-container">
                                <ImageUploader
                                    withIcon={true}
                                    withPreview={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </div>
                            <div className="upload-audio-container"></div>
                        </div>
                    </div>
                    <Button onClick={this.uploadToS3}>Upload to S3</Button>
                </div>
            )
        }
    }

    export default withRouter(Home);