import { Card, CardContent, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ComplaintMap({ reports }) {
  const getLocation = (location) => {
    if (!location) return null;

    // Firestore Array
    if (Array.isArray(location)) {
      return [location[0], location[1]];
    }

    // Firestore GeoPoint
    if (
      typeof location === "object" &&
      location.latitude !== undefined
    ) {
      return [location.latitude, location.longitude];
    }

    // String format
    if (typeof location === "string") {
      const match = location.match(/([\d.]+).*?([\d.]+)/);

      if (match) {
        return [
          parseFloat(match[1]),
          parseFloat(match[2]),
        ];
      }
    }

    return null;
  };

  const center =
    getLocation(reports[0]?.location) || [
      21.1458,
      79.0882,
    ];

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          🗺️ Live Complaint Map
        </Typography>

        <MapContainer
          center={center}
          zoom={12}
          style={{
            height: "500px",
            width: "100%",
            borderRadius: "15px",
          }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reports.map((report) => {
            const pos = getLocation(report.location);

            if (!pos) return null;

            return (
              <Marker
                key={report.id}
                position={pos}
              >
                <Popup>
                  <b>{report.title}</b>

                  <br />

                  {report.type}

                  <br />

                  Status :
                  {" "}
                  {report.status === 0
                    ? "Pending"
                    : report.status === 1
                    ? "In Progress"
                    : "Completed"}

                  <br />

                  {report.userName}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </CardContent>
    </Card>
  );
}