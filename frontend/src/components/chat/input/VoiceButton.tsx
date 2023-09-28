import {AudioRecorder} from "react-audio-voice-recorder";
import { useState } from "react";
import axios from "axios";

const VoiceButton = () => {
  const handleRecordingComplete = async (blob: any) => {
    console.log(blob);
    await axios.post("http://localhost:3001/api/voice", {blob}).then((res) => {
      console.log(res.data.stt);
    });
  };
  
  return (
    <AudioRecorder
      onRecordingComplete={handleRecordingComplete}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadOnSavePress={false}
      downloadFileExtension="wav" />
  );
};

export default VoiceButton;