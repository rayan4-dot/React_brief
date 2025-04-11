// src/components/videos/VideoPlayer.jsx
function VideoPlayer({ video }) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <h4>{video.title}</h4>
      <video controls width="100%" style={{ maxWidth: '600px' }}>
        <source src={video.file_path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {video.description && <p>{video.description}</p>}
    </div>
  );
}

export default VideoPlayer;