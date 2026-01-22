import { Routes, Route } from "react-router-dom"
import RetroDesktop from "./RetroDesktop"
import CharacterPage from "./components/Character3D"
import Coinflip from "./components/Coinflip"
import Jobs from "./components/jobs"
import Assets from "./components/assets"
import Watch from "./components/watch"
import Radio from "./components/radio"
import Testing from "./components/testing"
import Mystarybox from "./components/mystarybox"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RetroDesktop />} />
      <Route path="/character" element={<CharacterPage />} />
      <Route path="/coin" element={<Coinflip />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/radio" element={<Radio />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/mystarybox" element={<Mystarybox />} />
    </Routes>
  )
}
