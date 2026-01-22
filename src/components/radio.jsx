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

      {/* SPOTIFY */}
      <div className="radio-spotify">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6"
          width="300"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen"
        />
      </div>

    </div>
  )
}
