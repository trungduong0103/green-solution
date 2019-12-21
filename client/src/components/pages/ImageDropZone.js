import React, { Component } from "react"
import Dropzone from "react-dropzone-uploader"
import 'react-dropzone-uploader/dist/styles.css'
class ImageDropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                accept="image/*,audio/*,video/*"
                inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                styles={{
                    dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                    inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                }}
            />
        )
    }
}

export default ImageDropZone
