import { useState } from "react"
import coinImg from "../assets/coin.png"

export default function Coinflip() {
  const [side, setSide] = useState("HEADS")
  const [flipping, setFlipping] = useState(false)

  function flip() {
    if (flipping) return
    setFlipping(true)

    setTimeout(() => {
      setSide(Math.random() > 0.5 ? "HEADS" : "TAILS")
      setFlipping(false)
    }, 700)
  }

  return (
    <div className="coinflip">
      <img
        src={coinImg}
        className={`coin ${flipping ? "spin" : ""}`}
        onClick={flip}
        draggable="false"
      />

      <div className="result">{side}</div>

      <div className="hint">
        Shake your cursor or click the coin to flip again
      </div>
    </div>
  )
}
