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

    onDrop = (image, pictureUrls) => {  
        // let formattedImage = []
        // image.forEach(row => {
        //     let data = {}
        //     data.name = row.name;
        //     data.type = row.type;
        //     formattedImage.push(data)
        // })
        // this.setState({pictures: formattedImage})  
        let reader = new FileReader();
        let url = reader.readAsDataURL(image[image.length - 1]); 
    
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
          axios.post('http://localhost:8080/create', this.state.pictures).then(response => {
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

// import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';


// const S3_BUCKET ='YOUR_BUCKET_NAME';
// const REGION ='YOUR_REGION_NAME';
// const ACCESS_KEY ='YOUR_ACCESS_KEY';
// const SECRET_ACCESS_KEY ='YOUR_SECRET_ACCESS_KEY';

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     sessionToken: SESSION_TOKEN
// }

// const Home = () => {

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const handleUpload = async (file) => {
//         uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }

//     return <div>
//         <div>React S3 File Upload</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default Home;
