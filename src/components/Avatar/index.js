import React from "react";
import ReactDom from "react-dom";
import AvatarEditor from "react-avatar-editor";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Slider from "material-ui/Slider";

class AvatarUpload extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.setEditorRef = this.setEditorRef.bind(this);
        this.handleZoomSlider = this.handleZoomSlider.bind(this);
        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.state = {
            cropperOpen: false,
            img: null,
            zoom: 2,
            rotate: 0,
            croppedImg:
                "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
        };
    }
    handleZoomSlider(event, value) {
        let state = this.state;
        state.zoom = value;
        this.setState(state);
    }

    handleFileChange(e) {
        window.URL = window.URL || window.webkitURL;
        let url = window.URL.createObjectURL(e.target.files[0]);
        ReactDom.findDOMNode(this.refs.in).value = "";
        let state = this.state;
        state.img = url;
        state.cropperOpen = true;
        this.setState(state);
    }
    handleSave(e) {
        if (this.editor) {
            const canvasScaled = this.editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
            let state = this.state;
            state.img = null;
            state.cropperOpen = false;
            state.croppedImg = croppedImg;
            this.setState(state);
        }
    }
    handleCancel() {
        let state = this.state;
        state.cropperOpen = false;
        this.setState(state);
    }
    setEditorRef(editor) {
        this.editor = editor;
    }

    rotateLeft() {
        let state = this.state;
        state.rotate = 0;
        this.setState({
            rotate: this.state.rotate - 90
        });
    }

    rotateRight() {
        this.setState({
            rotate: this.state.rotate + 90
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className='text-center'>
                    <Avatar src={this.state.croppedImg} size={100} />
                    <RaisedButton
                        label="Upload an Image"
                        labelPosition="before"
                        containerElement="label"
                    >
                        <input
                            ref="in"
                            type="file"
                            accept="image/*"
                            onChange={this.handleFileChange}
                        />
                    </RaisedButton>
                    {this.state.cropperOpen && (
                        <div
                            className="cropper-wrapper"
                            style={{
                                width: "100%",
                                height: "100%",
                                background: "rgba(0,0,0,0)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={this.state.img}
                                width={200}
                                height={200}
                                border={50}
                                color={[255, 255, 255, 0.6]} // RGBA
                                rotate={0}
                                scale={this.state.zoom}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <label
                                    style={{
                                        fontSize: 12,
                                        marginRight: 10,
                                        paddingBottom: 22,
                                        fontWeight: 600
                                    }}
                                >
                                    Zoom
                                </label>
                                <Slider
                                    min={1}
                                    max={10}
                                    step={0.1}
                                    value={this.state.zoom}
                                    onChange={this.handleZoomSlider}
                                    style={{ width: 200 }}
                                />
                            </div>

                            <div>
                                <RaisedButton
                                    label="CANCEL"
                                    labelPosition="before"
                                    containerElement="label"
                                    onClick={this.handleCancel}
                                />
                                <RaisedButton
                                    label="SAVE"
                                    labelPosition="before"
                                    containerElement="label"
                                    onClick={this.handleSave}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </MuiThemeProvider>
        );
    }
}
export default AvatarUpload

