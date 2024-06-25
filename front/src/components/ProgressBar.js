import React, { Component } from 'react';
import '../css/ProgressBar.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isPlaying: true,
      };
    this.progressBarRef = React.createRef();
    this.sliderRef = React.createRef();
  }

  handleClick = (e) => {
    this.props.pause();
    this.props.handleChange(e.target.value);
    if (!this.state.isPlaying) {
      this.setState({
        isPlaying: true,
      });
    }
  }

  togglePlayPause = () => {
    const { play, pause } = this.props;
    if (this.state.isPlaying) {
      pause();
    } else {
      play();
    }
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  }


  render() {
    const { minTime, maxTime, progress } = this.props;
    const { isPlaying } = this.state;
    
    
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
          <div id="progress-track-container">
              <input id="progress-track" type="range" min={minTime} max={maxTime} step='0.1' value={progress} onChange={this.handleClick} />
            </div>
            <input id="progress-thumb" type="range" min={minTime} max={maxTime} step='0.1' value={progress} onChange={this.handleClick} />
            <input id="progress-label" type="range" min={minTime} max={maxTime} step='0.1' value={progress} readOnly
              style={{"--bg-image": `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='11px' width='22px'><text text-anchor='middle' x='11' y='11' fill='black' font-size='5' font-family='Sans,Arial'>${progress.toFixed(2)}</text></svg>")`}}
            />
          </div>
          <div className="max-time-label">{maxTime.toFixed(2)}</div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;