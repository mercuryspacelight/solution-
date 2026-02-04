export default function Radio() {
  return (
    <div className="radio-root">

      {/* VIDEO */}
      <video
        className="radio-bg"
        src="/src/assets/video-s-desktop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* DARK OVERLAY */}
      <div className="radio-dark" />
    </div>
  )
}
