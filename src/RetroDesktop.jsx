import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Jobs from "./components/jobs"
import Assets from "./components/assets"
import Watch from "./components/watch"
import Radio from "./components/radio"
import Testing from "./components/testing"
import Mystarybox from "./components/mystarybox"
import Coinflip from "./components/Coinflip"

import jobsIcon from "./assets/jobs.png"
import coinIcon from "./assets/coin.png"
import assetsIcon from "./assets/assets.png"
import watchIcon from "./assets/watch.png"
import radioIcon from "./assets/radio.png"
import testingIcon from "./assets/testing.png"
import mystaryboxIcon from "./assets/mystarybox.png"
import shopIcon from "./assets/shop.png"
import world from "./assets/gleb-icon_small.png"

export default function RetroDesktop() {
  const navigate = useNavigate()

  const desktopRef = useRef(null)
  const topRef = useRef(null)

  const [openApp, setOpenApp] = useState(null)
  const [popupStyle, setPopupStyle] = useState({})
  const [openMenu, setOpenMenu] = useState(null)

  /* ===== CLICK OUTSIDE FOR TOP MENU ===== */
  useEffect(() => {
    function handleClickOutside(e) {
      if (topRef.current && !topRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  /* ===== APPS ===== */
  const appComponents = {
    coin: { id: Coinflip, icon: coinIcon, label: "Coinflip" },
    jobs: { id: Jobs, icon: jobsIcon, label: "Jobs" },
    assets: { id: Assets, icon: assetsIcon, label: "Assets" },
    watch: { id: Watch, icon: watchIcon, label: "Watch" },
    radio: { id: Radio, icon: radioIcon, label: "Radio" },
    testing: { id: Testing, icon: testingIcon, label: "Testing" },
    mystarybox: { id: Mystarybox, icon: mystaryboxIcon, label: "Mystarybox" },
    shop: { icon: shopIcon, label: "Shop" },
  }

  const apps = Object.entries(appComponents).map(([key, value]) => ({
    id: key,
    icon: value.icon,
    label: value.label,
  }))

  /* ===== OPEN APP ===== */
  function openIcon(appId, e) {
    if (appId === "shop") {
      window.open("https://www.nobody.solutions/", "_blank")
      return
    }

    const desktop = desktopRef.current
    if (!desktop) return

    const desktopRect = desktop.getBoundingClientRect()
    const iconRect = e.currentTarget.getBoundingClientRect()

    setPopupStyle({
      left: iconRect.left - desktopRect.left,
      top: iconRect.top - desktopRect.top,
      width: 0,
      height: 0,
      opacity: 0,
      position: "absolute",
      transition: "none",
    })

    setOpenApp(appId)

    requestAnimationFrame(() => {
      setPopupStyle({
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        opacity: 1,
        position: "absolute",
        transition: "all 0.45s cubic-bezier(.2,.8,.2,1)",
      })
    })
  }

  /* ===== CLOSE APP ===== */
  function closeApp() {
    setPopupStyle(prev => ({
      ...prev,
      width: 0,
      height: 0,
      opacity: 0,
    }))

    setTimeout(() => {
      setOpenApp(null)
      setPopupStyle({})
    }, 450)
  }

  const currentApp = openApp ? appComponents[openApp] : null
  const AppComponent = currentApp?.id

  return (
    <div className="wrap">
      <div className="window">
        {/* ===== TOP BAR ===== */}
        <div className="top" ref={topRef}>
          <div className="solution">
            <span
              onClick={() => setOpenMenu(null)}
              style={{ cursor: "pointer", display: "inline-block" }}
            >
              <img src={world} alt="World" style={{ width: 20, height: 20 }} />
            </span>
          </div>

          <div className="file">
            <span onClick={() => setOpenMenu(openMenu === "file" ? null : "file")}>
              File
            </span>
          </div>

          {openMenu === "file" && (
            <div className="dropdown">
              <div
                className="dropdown-item"
                onClick={() => {
                  setOpenMenu(null)
                  navigate("/character")
                }}
              >
                New Folder
              </div>
            </div>
          )}
          <div className="view">
            <span onClick={() => setOpenMenu(openMenu === "view" ? null : "view")}>
              View
            </span>
          </div>

          {openMenu === "view" && (
            <div className="dropdown">
              <div className="dropdown-first" onClick={() => setOpenMenu(null)}>
                <span>Terms of Service</span>
              </div>
              <div className="dropdown-second" onClick={() => setOpenMenu(null)}>
                Return & Refund Policy
              </div>
              <div className="dropdown-three" onClick={() => setOpenMenu(null)}>
                About
              </div>
            </div>
          )}
          <div className="special">
            <span>Special</span>
          </div>
          <div className="cart">
            <span>Cart</span>
          </div>
        </div>

        {/* ===== DESKTOP ===== */}
        <div className="desktop" ref={desktopRef}>
          {apps.map(app => (
            <div
              key={app.id}
              className="icon"
              onClick={(e) => openIcon(app.id, e)}
            >
              <div className="pixel">
                <img src={app.icon} alt={app.label} />
              </div>
              <div className="label">{app.label}</div>
            </div>
          ))}

          {/* ===== POPUP APP ===== */}
          {openApp && currentApp && (
              <div className="popupBody" style={popupStyle}>
                <div className="popupTop">
                < span>{currentApp.label}</span>
                  <span onClick={closeApp} className="close-btn">✕</span>
                </div>

                <div className="popupBody">
                  {AppComponent && <AppComponent />}
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  )
}
