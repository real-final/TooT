import {AudioRecorder} from "react-audio-voice-recorder";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const voiceUrl = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=kor";
const clientId = "7afyncj76v";
const voiceSecretKey = "WYU5H0LRUMtXV5IitCzLvLhBXV17F4zf1M40cWS0";

const VoiceButton = () => {
  const [audioData, setAudioData] = useState<any>(null);
  // const addAudioElement = (blob:any) => {
  //   const url = URL.createObjectURL(blob);
  //   const audio = document.createElement("audio");
  //   audio.src = url;
  //   audio.controls = true;
  //   document.body.appendChild(audio);
  // };

  const handleRecordingComplete = async (blob: any) => {
    await setAudioData(blob);
    await axios.post(voiceUrl,{
      "image": blob,
    }, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": voiceSecretKey,
        "Content-Type": "application/octet-stream",
      }
    }).then((res) => {
      console.log(res);
    });
  };
  
  return (
    // <div className="w-5 h-5 flex justify-center items-center mr-2.5 text-slate-600">
    //   <FontAwesomeIcon className="hover:cursor-pointer" icon={faMicrophone} />
    // </div>
    <AudioRecorder
      onRecordingComplete={handleRecordingComplete}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadOnSavePress={false}
      downloadFileExtension="mp3" />
  );
};

export default VoiceButton;