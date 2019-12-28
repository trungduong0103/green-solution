import React, { Component } from "react"
import Dropzone from "react-dropzone-uploader"
import 'react-dropzone-uploader/dist/styles.css'
class ImageDropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: ""
        }
    }

    getUploadParams = ({ meta }) => {
        const url = `https://httpbin.org/post`;
        return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    };

    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    };

    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        allFiles.forEach(f => f.remove())
    };


    render() {
        return(
            <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                onSubmit={this.handleSubmit}
                accept="image/*"
                maxFiles={1}
                inputContent={(files, extra) => (extra.reject ? 'Chỉ nhận file hình' : 'Kéo thả logo vào đây')}
                styles={{
                    dropzone: {
                        border: ".5px dashed black",
                        overflow: "hidden"
                    },
                    inputLabel: {
                        fontFamily: 'Quicksand, sans-serif',
                        color: "rgb(99,151,68)",
                    },
                    preview: {
                        width: "100%",
                        height: "100%",
                        padding: 10
                    },
                    submitButton: {
                        fontFamily: 'Quicksand, sans-serif',
                        outline: "none",
                        border: "1px solid #DDDDDD",
                        backgroundColor: "black",
                        padding: "10px 20px",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        transition: "all 350mx ease-in-out",
                        marginTop: "10px",
                        color: "white"
                    }

                }}
            />
        )
    }
}

export default ImageDropZone
