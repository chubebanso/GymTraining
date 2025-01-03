import { useLocation, useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";     
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Dữ liệu bài tập được truyền từ navigate
  const workout = location.state;

  // Nếu không có workout, hiển thị thông báo lỗi
  if (!workout) {
    return <p>No workout selected!</p>;
  }

  // Chuyển URL YouTube sang dạng embed
  const videoUrl = workout.videoUrl.replace("watch?v=", "embed/");

  return (
    <div className="video-player-container">
      {/* Nút quay lại */}
      <div className="video-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <div className="video-header-title">Back</div>
      </div>

      {/* Tiêu đề bài tập */}
      <h1 className="video-title">{workout.name}</h1>

      {/* Video và phần mô tả */}
      <div className="video-content">
        {/* Phần video */}
        <div className="video-frame">
          <iframe
            src={videoUrl}
            title={workout.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Phần mô tả */}
        <div className="video-description">
          <h3>Description</h3>
          <p>{workout.description}</p>
          <ul>
            <li>Duration: {workout.duration} min</li>
            <li>Level: {workout.difficultyLevel}</li>
            <li>Follow along on YouTube!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
