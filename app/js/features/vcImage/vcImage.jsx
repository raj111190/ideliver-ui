import React from 'react';
import Proptypes from 'prop-types';
import FileInputComponent from 'react-file-input-previews-base64';
import cx from 'classnames';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Folder from '@material-ui/icons/Folder';
import { REST_API_PATHNAME } from '../../paths';
import styles from './vcImage.scss';

const calculateAspectRatio = (video, canvas) => {
  const videoAspectRatio = video.videoWidth / video.videoHeight;
  const canvasAspectRatio = canvas.width / canvas.height;
  let renderableHeight, renderableWidth, xStart, yStart;
  const AspectRatio = {};
  // If video's aspect ratio is less than canvas's we fit on height
  // and place the video centrally along width
  if (videoAspectRatio < canvasAspectRatio) {
    renderableHeight = canvas.height;
    renderableWidth = video.videoWidth * (renderableHeight / video.videoHeight);
    xStart = (canvas.width - renderableWidth) / 2;
    yStart = 0;
  } else if (videoAspectRatio > canvasAspectRatio) {
    // If video's aspect ratio is greater than canvas's we fit on width
    // and place the video centrally along height
    renderableWidth = canvas.width;
    renderableHeight = video.videoHeight * (renderableWidth / video.videoWidth);
    xStart = 0;
    yStart = (canvas.height - renderableHeight) / 2;
  } else {
    // keep aspect ratio
    renderableHeight = canvas.height;
    renderableWidth = canvas.width;
    xStart = 0;
    yStart = 0;
  }
  AspectRatio.renderableHeight = renderableHeight;
  AspectRatio.renderableWidth = renderableWidth;
  AspectRatio.startX = xStart;
  AspectRatio.startY = yStart;
  return AspectRatio;
};

class VcImage extends React.Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.videoElement = React.createRef();
    this.canvasElement = React.createRef();
    this.state = {
      videoSrc: '',
      displayCanvas: false,
      displayImage: true,
      videoError: false,
    };
    this.mainStream = null;
  }

  saveImage = data => {
    this.props.onChange(data);
  };

  startVideo = () => {
    this.setState({ displayCanvas: false, displayImage: false });
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: { facingMode: 'environment' } },
        this.handleVideo,
        this.videoError
      );
    }
  };
  handleVideo = stream => {
    // Update the state, triggering the component to re-render with the correct stream
    this.mainStream = stream;
    this.mainStream.stop = function stop() {
      this.getAudioTracks().forEach(track => {
        track.stop();
      });
      this.getVideoTracks().forEach(track => {
        track.stop();
      });
    };
    this.setState({
      videoSrc: window.URL.createObjectURL(stream),
      videoError: false,
    });
    this.videoElement.current.play();
  };
  videoError = error => {
    this.setState({ videoError: true });
  };

  capturePicture = () => {
    this.setState({ displayCanvas: true }, () => {
      const video = this.videoElement.current;
      const canvas = this.canvasElement.current;
      const ar = calculateAspectRatio(video, canvas);
      canvas.width = ar.renderableWidth;
      canvas.height = ar.renderableHeight;
      const context = this.canvasElement.current.getContext('2d');
      context.drawImage(video, 0, 0, ar.renderableWidth, ar.renderableHeight);

      video.pause();
      this.mainStream.stop();

      this.setState({ videoSrc: '' });
      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      this.saveImage(dataURL.substr(dataURL.indexOf(',') + 1));
    });
  };

  render() {
    const canvasEl = (
      <canvas
        id="canvas"
        width="180"
        height="280"
        className={styles.canvas}
        ref={this.canvasElement}
      />
    );
    const video = (
      <video
        id="video"
        className={styles.video}
        src={this.state.videoSrc}
        autoPlay="true"
        ref={this.videoElement}
      />
    );
    return (
      <div
        className={cx(this.props.className, styles.container)}
        style={{
          backgroundImage: `url(${this.props.img})`,
          backgroundSize: '100% 100%',
        }}
      >
        {this.props.personId && this.state.displayImage ? (
          <img
            className={styles.image}
            src={`${window.location.origin}${REST_API_PATHNAME}personimage/${this.props.personId}`}
            alt=""
          />
        ) : null}
        {this.state.videoSrc === '' ? null : video}
        {this.state.displayCanvas ? canvasEl : null}
        <div className={styles.buttonsMask} />
        <div
          className={styles.button}
          onClick={this.state.videoSrc ? this.capturePicture : this.startVideo}
        >
          {this.state.videoError ? <VideocamOff /> : <Videocam />}
        </div>
        {this.state.videoSrc === '' ? (
          <FileInputComponent
            ref={this.fileUpload}
            labelStyle={{ display: 'none' }}
            buttonComponent={
              <div className={styles.fileButton}>
                <Folder />
              </div>
            }
            multiple={false}
            parentStyle={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            imageContainerStyle={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
            }}
            imageStyle={{
              margin: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              position: 'absolute',
            }}
            callbackFunction={data => {
              this.setState(
                { videoSrc: '', displayCanvas: false, displayImage: false },
                () => {
                  this.saveImage(
                    data.base64.substr(data.base64.indexOf(',') + 1)
                  );
                }
              );
            }}
            accept="image/*"
          />
        ) : null}
      </div>
    );
  }
}

VcImage.propTypes = {
  /** callback function for the onChange */
  onChange: Proptypes.func,
};

VcImage.defaultProps = {};
export default VcImage;
