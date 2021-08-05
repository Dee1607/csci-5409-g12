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
        this.state = { pictures: [], audio: "" };
        this.onDrop = this.imageChange.bind(this);
    }

    imageChange = (image, pictureUrls) => {
        let reader = new FileReader();
        let url = reader.readAsDataURL(image[image.length - 1]);

        reader.onload = (event) => {
            this.setPictures(reader.result)
        };

    };

    audioChange = (image, pictureUrls) => {
        let reader = new FileReader();
        let url = reader.readAsDataURL(image[image.length - 1]);

        reader.onload = (event) => {
            this.setAudio(reader.result)
        }
    }

    setPictures(base64Image) {
        this.setState({ pictures: this.state.pictures.concat(base64Image) })
    }

    setAudio(base64Audio) {
        this.setState({ audio: base64Audio })
    }

    uploadToS3 = (event) => {
        event.preventDefault();
        console.log(this.state.pictures)
        let postData = {}
        postData['images'] = this.state.pictures;
        postData['audio'] = this.state.audio;
        postData['userName'] = localStorage.getItem('user');

        const URL = "https://g56ejolm77.execute-api.us-east-1.amazonaws.com/default/uploadtos3";
        axios({
            method: 'post',
            url: URL,
            data: postData,
            decompress : true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log(response);
                alert("Successful..")
            })
            .catch((error) => {
                console.log(error);
            });
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
                                withLabel={false}
                                buttonText='Choose images'
                                onChange={this.imageChange}
                                imgExtension={['.jpg', '.jpeg', '.png']}
                                maxFileSize={5242880}
                            />
                        </div>
                        <div className="upload-audio-container">
                            <ImageUploader
                                withIcon={true}
                                withPreview={false}
                                withLabel={false}
                                buttonText='Choose audio'
                                onChange={this.audioChange}
                                imgExtension={['.mp3']}
                                maxFileSize={5242880}
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={this.uploadToS3}>Upload to S3</Button>
            </div>
        )
    }
}

export default withRouter(Home);