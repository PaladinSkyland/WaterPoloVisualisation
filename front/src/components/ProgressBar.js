import React, { Component } from 'react';
import '../css/ProgressBar.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isPlaying: false,
      };
    this.progressBarRef = React.createRef();
  }

  handleClick = (e) => {
    const { minTime, maxTime, handleChange } = this.props;
    const progressWidth = this.progressBarRef.current.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newProgress = offsetX / progressWidth * (maxTime - minTime) + minTime;
    handleChange(newProgress);
  }

  togglePlayPause = () => {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying
    }), () => {
      console.log(this.state.isPlaying ? 'Play' : 'Pause');
    });
  }


  render() {
    const { minTime, maxTime, progress } = this.props;
    const { isPlaying } = this.state;
    const percentage = ((progress - minTime) / (maxTime - minTime)) * 100;
    
    
    return (
        <div className="progress-bar-parent">
        <div className="progress-bar-container">
        <button className="pause-button" onClick={this.togglePlayPause}>
            <img
              src={process.env.PUBLIC_URL + (isPlaying ? '/assets/pause-icon.svg' : '/assets/play-icon.svg')}
              alt={isPlaying ? 'Pause' : 'Play'}
            />
          </button>
          <div className="progress-bar-wrapper" ref={this.progressBarRef} onClick={this.handleClick}>
            <div className="progress-bar" style={{ width: `${percentage}%` }}>
              <div className="progress-label" style={{ left: `${percentage}%` }}>{progress.toFixed(2)}</div>
              <div className="progress-circle" style={{ left: `${percentage}%` }}></div>
            </div>
          </div>
          <div className="max-time-label">{maxTime.toFixed(2)}</div>
        </div>
        
      </div>
    );
  }
}

export default ProgressBar;