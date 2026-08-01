import React from 'react';

/* Pixel-drawn glyphs for the Win95 kit. crispEdges keeps them sharp. */

type SvgProps = { size?: number; className?: string };

// --- window control glyphs (dark ink on chrome) ---
export const GlyphMinimize = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges">
    <rect x="1" y="6" width="6" height="2" fill="currentColor" />
  </svg>
);

export const GlyphMaximize = () => (
  <svg width="9" height="9" viewBox="0 0 9 9" shapeRendering="crispEdges">
    <rect
      x="0.5"
      y="0.5"
      width="8"
      height="8"
      fill="none"
      stroke="currentColor"
    />
    <rect x="0.5" y="0.5" width="8" height="2" fill="currentColor" />
  </svg>
);

export const GlyphClose = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges">
    <path
      d="M0 0h2v1h1v1h2V1h1V0h2v2H7v1H6v2h1v1h1v2H6V7H5V6H3v1H2v1H0V6h1V5h1V3H1V2H0z"
      fill="currentColor"
    />
  </svg>
);

// --- titlebar app icon: little CRT terminal ---
export const AppIcon = ({ size = 16 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
    <rect x="1" y="2" width="14" height="10" fill="#c3c7cb" />
    <rect x="1" y="2" width="14" height="10" fill="none" stroke="#000" />
    <rect x="2" y="3" width="12" height="8" fill="#050805" />
    <rect x="3" y="4" width="2" height="1" fill="#33ff7a" />
    <rect x="6" y="4" width="4" height="1" fill="#33ff7a" />
    <rect x="3" y="6" width="6" height="1" fill="#33ff7a" />
    <rect x="3" y="8" width="1" height="1" fill="#33ff7a" />
    <rect x="6" y="13" width="4" height="1" fill="#868a8e" />
    <rect x="4" y="14" width="8" height="1" fill="#000" />
  </svg>
);

// --- desktop icon glyphs (32px, limited palette) ---
export const IconAbout = ({ size = 32 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
    <rect x="4" y="5" width="24" height="22" fill="#fffef2" stroke="#000" />
    <rect x="4" y="5" width="24" height="4" fill="#000080" />
    <circle cx="12" cy="16" r="4" fill="#f2c9a0" stroke="#000" />
    <rect x="7" y="21" width="10" height="4" fill="#3f7d92" stroke="#000" />
    <rect x="19" y="13" width="6" height="2" fill="#555" />
    <rect x="19" y="17" width="6" height="2" fill="#555" />
    <rect x="19" y="21" width="4" height="2" fill="#555" />
  </svg>
);

export const IconResume = ({ size = 32 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
    <path d="M7 3h13l6 6v20H7z" fill="#fffef2" stroke="#000" />
    <path d="M20 3v6h6" fill="#dcdccb" stroke="#000" />
    <rect x="10" y="13" width="12" height="2" fill="#ca2124" />
    <rect x="10" y="17" width="12" height="2" fill="#555" />
    <rect x="10" y="21" width="9" height="2" fill="#555" />
    <rect x="10" y="25" width="12" height="2" fill="#555" />
  </svg>
);

export const IconGithub = ({ size = 32 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
    <rect x="3" y="6" width="26" height="19" fill="#c3c7cb" stroke="#000" />
    <rect x="5" y="8" width="22" height="15" fill="#050805" />
    <rect x="12" y="26" width="8" height="2" fill="#868a8e" />
    <rect x="9" y="28" width="14" height="2" fill="#000" />
    <text
      x="16"
      y="19"
      fill="#33ff7a"
      fontSize="11"
      fontFamily="monospace"
      textAnchor="middle"
    >
      {'</>'}
    </text>
  </svg>
);

export const IconLinkedin = ({ size = 32 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="#0a66c2" stroke="#000" />
    <rect x="8" y="13" width="3" height="9" fill="#fff" />
    <rect x="8" y="9" width="3" height="3" fill="#fff" />
    <rect x="14" y="13" width="3" height="9" fill="#fff" />
    <rect x="17" y="16" width="3" height="6" fill="#fff" />
    <rect x="14" y="15" width="6" height="2" fill="#fff" />
  </svg>
);

export const IconProjects = ({ size = 32 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
    <path d="M3 8h9l3 3h14v16H3z" fill="#d7b94a" stroke="#000" />
    <path d="M3 12h26v15H3z" fill="#f2d977" stroke="#000" />
    <rect x="8" y="17" width="16" height="2" fill="#a8862a" />
    <rect x="8" y="21" width="11" height="2" fill="#a8862a" />
  </svg>
);
