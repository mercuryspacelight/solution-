import { Popup } from "react-leaflet"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet";

const keyIcon = L.icon({
  iconUrl: "/video/key.png",
  iconSize: [66, 66],
  iconAnchor: [18, 36],
});

function FixMapSize({ center, zoom }) {
  const map = useMap()

  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize()
      map.setView(center, zoom)
    }, 100)

    return () => clearTimeout(t)
  }, [map, center, zoom])

  return null
}

export default function MysteryMap() {
  return (
    <div className="app-content">
      <div className="map">
        <MapContainer
          center={[59.33397666195559, 18.06486718420821]}
          zoom={11}
          dragging
          scrollWheelZoom
          doubleClickZoom
          touchZoom
          attributionControl={false}
          className="leaflet-map"
        >
          <FixMapSize />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          <Marker position={[59.33060330870904, 18.066429093505942]} icon={keyIcon}>
            <Popup>
              <div className="ip">
                <h3>Herkulesgatan St., 5</h3>
                <img src = "video/screen 1.png"/>
              </div>
            </Popup>
          </Marker>
          <Marker position={[59.34748832748987, 18.058013512810987]} icon={keyIcon}> 
            <Popup>
              <div className="ip">
                <h3>Torsgatan St., 39</h3>
                <img src = "video/screen 2.png"/>
              </div>
            </Popup>
          </Marker> 
          <Marker position={[59.34045634144938, 18.038303659245386]} icon={keyIcon}> 
            <Popup>
              <div className="ip">
                <h3>Frejgatan St.,25</h3>
                <img src = "video/screen 3.png"/>
              </div>
            </Popup>
          </Marker>
          <Marker position={[59.333698370043486, 18.073634660087322]} icon={keyIcon}>
              <Popup>
                <div className="ip">
                  <h3>Smalandsgatan 12</h3>
                  <img src = "video/screen 4.png"/>
                </div>
              </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
