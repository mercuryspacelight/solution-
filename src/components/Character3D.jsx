import { useNavigate } from "react-router-dom"
import ThreeScene from "./threeScene"

export default function CharacterPage() {
  const navigate = useNavigate()

  return (
    <div className="character-page">
      <button className="backBtn" onClick={() => navigate("/")}>
        ← Take me back
      </button>

      <ThreeScene />
    </div>
  )
}