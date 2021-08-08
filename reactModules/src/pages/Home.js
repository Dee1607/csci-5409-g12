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

    imageChange = (images, pictureUrls) => {
        images.forEach((image, index) => {
            this.convertToBase64(images, index)
        })
    };

    convertToBase64(imageArray, index) {
        let reader = new FileReader();
        reader.readAsDataURL(imageArray[index])

        reader.onload = (event) => {
            imageArray[index] = reader.result;
            this.setPictures(imageArray)
        }

    }

    audioChange = (image, pictureUrls) => {
        let reader = new FileReader();
        let url = reader.readAsDataURL(image[image.length - 1]);

        reader.onload = (event) => {
            this.setAudio(reader.result)
        }
    }

    setPictures(base64Image) {
        this.setState({ pictures: base64Image })
    }

    setAudio(base64Audio) {
        this.setState({ audio: base64Audio })
    }

    sendNotificationMessage = (event) => {
        event.preventDefault()
        let postData = {}
        postData['username'] = localStorage.getItem('user')
        postData['email'] = localStorage.getItem('email')
        let httpURL = "https://ms0lqkisrd.execute-api.us-east-1.amazonaws.com/default/snsVMaker?username=" + postData['username'] + "&email=" + postData['email'];

        axios.post(httpURL).then(response => {
            console.log(response)
        })
    }

    uploadToS3 = (event) => {
        event.preventDefault();
        let postData = {}
        postData['images'] = this.state.pictures;
        postData['audio'] = this.state.audio;
        postData['userName'] = localStorage.getItem('user');

        const URL = "http://localhost:8080/create";
        axios({
            method: 'post',
            url: URL,
            data: postData
        })
            .then((response) => {
                console.log(response);
                alert("Successful..")
                this.sendNotificationMessage(event)
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
                        <div className="upload-container">
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
                                    accept="audio/*"
                                    maxFileSize={5242880}
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <Button onClick={this.uploadToS3}>Upload</Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Home);