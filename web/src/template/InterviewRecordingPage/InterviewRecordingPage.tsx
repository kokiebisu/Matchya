import Webcam from 'react-webcam';

import matchyaSticker from '@/assets/matchya-sticker.png';
import { Button, Icons } from '@/components';
import { Question } from '@/types';

const VIDEO_CONSTRAINTS: boolean | MediaTrackConstraints | undefined = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const AUDIO_CONSTRAINTS: MediaTrackConstraints = {
  advanced: [
    {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  ],
};

interface InterviewRecordingPageTemplateProps {
  question: Question;
  isLoading: boolean;
  index: number;
  isRecording: boolean;
  webcamRef?: React.RefObject<Webcam>;
  videoFile: File | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onUploadVideo: () => void;
}

const InterviewRecordingPageTemplate = ({
  question,
  isLoading,
  index,
  isRecording,
  webcamRef,
  videoFile,
  onStartRecording,
  onStopRecording,
  onUploadVideo,
}: InterviewRecordingPageTemplateProps) => {
  if (isLoading) {
    return (
      <>
        <div className="w-full h-16 bg-macha-500 flex justify-between items-center px-10">
          <div className="flex items-center space-x-4 px-4 cursor-pointer">
            <img src={matchyaSticker} alt="logo" className="w-48" />
          </div>
        </div>
        <div className="w-full h-screen bg-macha-200 flex justify-center items-center">
          <Icons.spinner className="spinner w-10 h-10 mx-3" />
          <p className="text-xl font-bold">Receiving Interview Questions...</p>
        </div>
      </>
    );
  }

  if (!isLoading && !question) {
    return (
      <>
        <div className="w-full h-16 bg-macha-500 flex justify-between items-center px-10">
          <div className="flex items-center space-x-4 px-4 cursor-pointer">
            <img src={matchyaSticker} alt="logo" className="w-48" />
          </div>
        </div>
        <div className="w-full h-screen bg-macha-200 flex flex-col justify-center items-center">
          <p className="text-xl font-bold">404</p>
          <p className="text-xl font-bold">Interview not found.</p>
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-screen bg-macha-200 flex flex-col justify-between">
      <div>
        <Webcam
          className="hidden"
          audioConstraints={AUDIO_CONSTRAINTS}
          videoConstraints={VIDEO_CONSTRAINTS}
          audio={true}
          muted={true}
          ref={webcamRef}
        />
        {/* Header for Candidate Assessment Page */}
        <div className="w-full h-16 bg-macha-500 flex justify-between items-center px-10">
          <div className="flex items-center space-x-4 px-4 cursor-pointer">
            <img src={matchyaSticker} alt="logo" className="w-48" />
          </div>
          <div className="flex w-1/2 justify-around">
            <div className="ml-auto flex items-center space-x-4 hidden sm:block">
              <p className="text-lg">Welcome, Takeshi Hashimoto</p>
            </div>
            <div className="ml-auto flex items-center space-x-4 hidden sm:block">
              <p className="text-lg">Apple - SWE Test</p>
            </div>
          </div>
        </div>

        {/* Time and Question count */}
        <div className="flex items-center justify-center px-20 pt-4 border-b-4 border-macha-700 pb-4">
          <div className="w-1/2">
            <p className="text-2xl font-bold">3:38</p>
          </div>
          <div className="flex justify-end w-1/2">
            <p className="text-2xl font-bold text-right">
              Question. {index + 1}
            </p>
          </div>
        </div>
      </div>

      <div>
        {/* Question */}
        <div className="flex flex-col justify-center items-center pt-10 w-2/3 mx-auto">
          <div className="px-20">
            <p className="text-2xl font-bold text-center">{question.text}</p>
          </div>

          <div className="w-full flex flex-wrap justify-center items-center pt-10">
            {question.metrics?.map(metric => (
              <div
                key={metric.id}
                className="p-4 w-60 h-24 bg-orange-50 m-2 overflow-y-scroll"
              >
                <p className="text-md text-center"> {metric.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recording Button */}
      <div className="flex justify-center w-full items-center py-20">
        {videoFile ? (
          <Button
            className="bg-macha-200 hover:bg-macha-300 text-orange-300 font-bold py-8 px-10 text-xl rounded-full border-2 border-orange-300 ml-10"
            onClick={onUploadVideo}
          >
            Upload Video
          </Button>
        ) : (
          <Button
            className="bg-macha-200 hover:bg-macha-300 text-orange-300 font-bold py-8 px-10 text-xl rounded-full border-2 border-orange-300"
            onClick={isRecording ? onStopRecording : onStartRecording}
          >
            <Icons.circle className="h-6 w-6 mr-2" />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InterviewRecordingPageTemplate;
