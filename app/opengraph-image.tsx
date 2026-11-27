import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Sofía Albornoz — Fotografía y contenido audiovisual";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/home-hero.jpg"));
  const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f4efe4", color: "#0d2b2a" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "65%", padding: "72px" }}>
          <div style={{ fontSize: 20, letterSpacing: 5, textTransform: "uppercase" }}>Portafolio visual</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 35, fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
            <span>SOFÍA</span><span>ALBORNOZ</span>
          </div>
          <div style={{ width: 88, height: 6, marginTop: 36, background: "#e4b6a6" }} />
          <div style={{ marginTop: 30, fontSize: 23, lineHeight: 1.4 }}>Fotografía &amp; contenido audiovisual</div>
          <div style={{ marginTop: 20, fontSize: 17, letterSpacing: 2, textTransform: "uppercase" }}>Tucumán, Argentina</div>
        </div>
        <div style={{ display: "flex", width: "35%", height: "100%", backgroundImage: `url(${photoUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", display: "flex", bottom: 0, left: 0, width: "100%", height: 12 }}>
          <div style={{ width: "50%", background: "#8f9d82" }} /><div style={{ width: "50%", background: "#e4b6a6" }} />
        </div>
      </div>
    ),
    size,
  );
}
