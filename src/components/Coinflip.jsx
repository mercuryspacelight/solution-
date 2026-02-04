import { useState, useRef } from "react"
import coinImg from "../assets/coin.png"
import tokenImg from "../assets/token.png"

export default function Coinflip() {
  const [side, setSide] = useState(coinImg)
  const [result, setResult] = useState("")
  const flippingRef = useRef(false)

  function flipCoin() {
    if (flippingRef.current) return
    flippingRef.current = true

    setResult("")

    let showHead = true

    // 🔄 быстрое "вращение"
    const interval = setInterval(() => {
      setSide(showHead ? coinImg : tokenImg)
      showHead = !showHead
    }, 80) // скорость вращения

    // ⏱ остановка и выбор результата
    setTimeout(() => {
      clearInterval(interval)

      const isHead = Math.random() < 0.5
      const finalSide = isHead ? coinImg : tokenImg

      setSide(finalSide)
      setResult(isHead ? "HEAD" : "TAIL")

      flippingRef.current = false
    }, 1200) // длительность флипа
  }

  return (
    <div className="coinflip">
      <img
        src={side}
        className="coin"
        onClick={flipCoin}
        alt="coin"
      />

      {result && (
      <div className={`result ${result === "TAIL" ? "tail" : "coin"}`}>
        {result}
      </div>
      )}

      <div className="hint">Click the coin</div>
    </div>
  )
}
