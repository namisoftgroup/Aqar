import { formatRecordingTime } from "../../utils/helper";

export default function RecordingControls({
  isRecording,
  startRecording,
  stopRecording,
  recordingTime,
}) {
  return (
    <>
      {isRecording ? (
        <label className="files-input" onClick={stopRecording}>
          <i className="fa-solid fa-microphone-slash"></i>
        </label>
      ) : (
        <label className="files-input" onClick={startRecording}>
          <i className="fa-solid fa-microphone"></i>
        </label>
      )}
      {recordingTime > 0 && <span>{formatRecordingTime(recordingTime)}</span>}
    </>
  );
}
