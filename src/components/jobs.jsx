import graphicIcon from "../assets/graphic.webp"
import clothingIcon from "../assets/clothing.webp"
import webIcon from "../assets/developer.webp"

const apps = [
  {
    id: "clothing",                    
    icon: clothingIcon,
    label: "Clothing\nDesigner"
  },
  {
    id: "graphic",
    icon: graphicIcon,
    label: "Graphic\nDesigner"
  },
  {
    id: "web",
    icon: webIcon,
    label: "Web Dev"
  }
]

export default function Jobs({ openApp }) {
  return (
    <div className="screen">
      {apps.map(app => (
        <div
          key={app.id}
          className="job-icon"
          onClick={() => openApp(app.id)}
        >
          <div className="pixel">
            <img src={app.icon} alt={app.label} />
          </div>

          <div className="label">
            {app.label.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
