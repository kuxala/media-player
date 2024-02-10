import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const play = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="73"
    height="73"
    viewBox="0 0 73 73"
    fill="none"
  >
    <g clip-path="url(#clip0_44_34)">
      <path
        d="M73 36.5C73 46.1804 69.1545 55.4643 62.3094 62.3094C55.4643 69.1545 46.1804 73 36.5 73C26.8196 73 17.5357 69.1545 10.6906 62.3094C3.84553 55.4643 0 46.1804 0 36.5C0 26.8196 3.84553 17.5357 10.6906 10.6906C17.5357 3.84553 26.8196 0 36.5 0C46.1804 0 55.4643 3.84553 62.3094 10.6906C69.1545 17.5357 73 26.8196 73 36.5ZM30.9794 23.2368C30.6383 22.9939 30.2369 22.8497 29.8192 22.8197C29.4016 22.7898 28.9837 22.8754 28.6115 23.0672C28.2392 23.259 27.927 23.5495 27.7089 23.907C27.4908 24.2644 27.3753 24.675 27.375 25.0938V47.9062C27.3753 48.325 27.4908 48.7356 27.7089 49.093C27.927 49.4505 28.2392 49.741 28.6115 49.9328C28.9837 50.1246 29.4016 50.2102 29.8192 50.1803C30.2369 50.1503 30.6383 50.0061 30.9794 49.7632L46.9481 38.3569C47.2438 38.1459 47.4849 37.8673 47.6512 37.5443C47.8175 37.2213 47.9043 36.8633 47.9043 36.5C47.9043 36.1367 47.8175 35.7787 47.6512 35.4557C47.4849 35.1327 47.2438 34.8541 46.9481 34.6431L30.9794 23.2368Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_44_34">
        <rect width="73" height="73" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const VideoStyled = styled.video`
  display: flex;
  margin: 0 auto;
  width: 80%;
  margin-top: 100px;
  border: 3px solid black;
`;

const ControlsDiv = styled.div`
  display: flex;
`;
const BodyDiv = styled.div`
  min-height: 100vh;
  background-color: gray;
`;

const ControlElements = styled.div`
  display: flex;
  flex-direction: column;
`;
const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 28px;
  gap: 10px;
  align-items: center;
`;
const LowerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;
const ProgressBar = styled.div`
  width: 100%;
  opacity: 0.7;
  background: #fff;
  height: 6px;
`;
function App() {
  const videoRef = useRef<any>(false);
  const [duration, setDuration] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [button, setButton] = useState<any>(false);
  const [renderCount, setRenderCount] = useState<number>(0);
  // console.log(setRenderCount(prevRenderCount => prevRenderCount + 1));

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };
  useEffect(() => {
    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  function CheckPlaying() {
    if (videoRef.current.paused) {
      return play;
    } else {
      return <img src="./assets/pauses.png" width="60px" height="60px" />;
    }
  }
  CheckPlaying();

  const handleClick = () => {
    {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //progressBarWidth = (currentTime / duration) * 100 es aris progress bar formula

  return (
    <BodyDiv>
      <ControlsDiv>
        <VideoStyled ref={videoRef} onLoadedMetadata={handleLoadedMetadata}>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </VideoStyled>
      </ControlsDiv>

      <ControlElements>
        <UpperDiv>
          <div>{formatTime(currentTime)}</div>
          <ProgressBar></ProgressBar>
          <div>{formatDuration(duration)}</div>
        </UpperDiv>

        <LowerDiv>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="53"
              viewBox="0 0 53 53"
              fill="none"
            >
              <path
                opacity="0.9"
                d="M26.5 0C11.8879 0 0 11.8879 0 26.5C0 41.1121 11.8879 53 26.5 53C41.1147 53 53 41.1121 53 26.5C53 11.8879 41.1147 0 26.5 0ZM37.1 37.1L21.2 26.5V37.1H15.9V15.9H21.2V26.5L37.1 15.9V37.1Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              handleClick();
              setButton(true);
            }}
          >
            {CheckPlaying()}
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="53"
              viewBox="0 0 53 53"
              fill="none"
            >
              <path
                opacity="0.9"
                d="M26.5 0C11.8879 0 0 11.8879 0 26.5C0 41.1121 11.8879 53 26.5 53C41.1121 53 53 41.1121 53 26.5C53 11.8879 41.1121 0 26.5 0ZM37.1 37.1H31.8V26.5L15.9 37.1V15.9L31.8 26.5V15.9H37.1V37.1Z"
                fill="white"
              />
            </svg>
          </div>
        </LowerDiv>
      </ControlElements>
    </BodyDiv>
  );
}

export default App;
