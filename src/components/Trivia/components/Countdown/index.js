import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Popup, Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
import "./count.css";
import tickingSound from "../../../../assets/ticking.mp3";
import backgroundMusic from "../../../../assets/background.mp3";
import { timeConverter } from "../../utils";

const Countdown = ({ countdownTime, timeOver, setTimeTaken }) => {
  const totalTime = countdownTime * 1000;
  const [timerTime, setTimerTime] = useState(totalTime);
  const { hours, minutes, seconds } = timeConverter(timerTime);
  const [isMuted, setIsMuted] = useState(false);
  const tickingAudioRef = useRef(new Audio(tickingSound));
  const backgroundAudioRef = useRef(new Audio(backgroundMusic));

  const defaultVolume = 0.5;

  useEffect(() => {
    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.volume = defaultVolume; 
    tickingAudioRef.current.volume = defaultVolume;

    const playAudio = (audioRef) => {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio play error:", error));
    };

    playAudio(backgroundAudioRef);
    playAudio(tickingAudioRef);

    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);
        tickingAudioRef.current.pause();
        backgroundAudioRef.current.pause();

        Swal.fire({
          icon: "info",
          title: `Oops! Time's up.`,
          text: "See how you did!",
          confirmButtonText: "Check Results",
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      tickingAudioRef.current.pause();
      backgroundAudioRef.current.pause();
      setTimeTaken(totalTime - timerTime + 1000);
    };
  }, [timerTime, totalTime, timeOver, setTimeTaken]);

  const handleMuteToggle = () => {
    if (isMuted) {
      backgroundAudioRef.current.volume = defaultVolume;
      tickingAudioRef.current.volume = defaultVolume;
    } else {
      backgroundAudioRef.current.volume = 0; 
      tickingAudioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="timer-container">
      <Button.Group size="massive" basic className="timer">
        <Popup
          content="Hours"
          trigger={<Button active>{hours}</Button>}
          position="bottom left"
        />
        <Popup
          content="Minutes"
          trigger={<Button active>{minutes}</Button>}
          position="bottom left"
        />
        <Popup
          content="Seconds"
          trigger={<Button active>{seconds}</Button>}
          position="bottom left"
        />
      </Button.Group>
      <Button icon onClick={handleMuteToggle} className="mute-button">
        <Icon name={isMuted ? "volume off" : "volume up"} />
      </Button>
    </div>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
