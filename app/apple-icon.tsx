import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mirrors app/icon.svg — same crescent moon, scaled to 180×180
// SVG coords are 32×32, scale factor = 180/32 = 5.625
// Main circle: cx=16 cy=17 r=11  → top=34 left=28 size=124
// Cutout circle: cx=21 cy=13 r=9 → top=23 left=68 size=101
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0F172A",
          borderRadius: 39,
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient crescent — main circle */}
        <div
          style={{
            position: "absolute",
            width: 124,
            height: 124,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #60A5FA, #818CF8)",
            top: 34,
            left: 28,
          }}
        />
        {/* Dark overlay punches out the crescent */}
        <div
          style={{
            position: "absolute",
            width: 101,
            height: 101,
            borderRadius: "50%",
            background: "#0F172A",
            top: 23,
            left: 68,
          }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  );
}
