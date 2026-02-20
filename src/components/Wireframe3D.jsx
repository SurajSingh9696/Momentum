import React, { useEffect, useRef } from 'react';

/**
 * Wireframe3D — Universal 3D canvas renderer.
 * Shapes: 'icosahedron' | 'torus' | 'octahedron' | 'sphere' | 'cube'
 *
 * Props:
 *   shape    — which shape to draw (default: 'icosahedron')
 *   color    — hex color string  (default: '#4ade80')
 *   speed    — rotation speed multiplier (default: 1)
 *   size     — hint for particle count / resolution
 *   opacity  — base opacity 0–1 (default: 1)
 */
const Wireframe3D = ({
    shape = 'icosahedron',
    color = '#4ade80',
    speed = 1,
    opacity = 1,
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;
        let ax = 0, ay = 0, az = 0;

        // ── colour helper ──────────────────────────────────────────
        const hexToRgb = (hex) => {
            const h = hex.replace('#', '');
            return [
                parseInt(h.slice(0, 2), 16),
                parseInt(h.slice(2, 4), 16),
                parseInt(h.slice(4, 6), 16),
            ];
        };
        const [cr, cg, cb] = hexToRgb(color);
        const rgba = (a) => `rgba(${cr},${cg},${cb},${Math.min(1, a * opacity)})`;

        // ── rotation matrices ──────────────────────────────────────
        const rotX = ([x, y, z], a) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
        const rotY = ([x, y, z], a) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
        const rotZ = ([x, y, z], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
        const rotate = (v) => rotZ(rotY(rotX(v, ax), ay), az);

        // ── perspective project ────────────────────────────────────
        const project = ([x, y, z], cx, cy, r) => {
            const fov = 4;
            const s = fov / (fov + z);
            return [cx + x * r * s, cy + y * r * s, s];
        };

        // ── shape builders ─────────────────────────────────────────

        // Icosahedron
        const buildIcosahedron = () => {
            const phi = (1 + Math.sqrt(5)) / 2;
            const raw = [
                [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
                [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
                [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
            ];
            const len = Math.sqrt(1 + phi * phi);
            const verts = raw.map(([x, y, z]) => [x / len, y / len, z / len]);
            const faces = [
                [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
                [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
                [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
                [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
            ];
            const edgeSet = new Set();
            const edges = [];
            faces.forEach(([a, b, c]) =>
                [[a, b], [b, c], [c, a]].forEach(([i, j]) => {
                    const k = i < j ? `${i}-${j}` : `${j}-${i}`;
                    if (!edgeSet.has(k)) { edgeSet.add(k); edges.push([i, j]); }
                })
            );
            return { verts, edges };
        };

        // Octahedron
        const buildOctahedron = () => {
            const verts = [
                [0, 1, 0], [0, -1, 0],
                [1, 0, 0], [-1, 0, 0],
                [0, 0, 1], [0, 0, -1],
            ];
            const edges = [
                [0, 2], [0, 3], [0, 4], [0, 5],
                [1, 2], [1, 3], [1, 4], [1, 5],
                [2, 4], [4, 3], [3, 5], [5, 2],
            ];
            return { verts, edges };
        };

        // Cube
        const buildCube = () => {
            const s = 0.7;
            const verts = [
                [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
                [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
            ];
            const edges = [
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
            return { verts, edges };
        };

        // Torus
        const buildTorus = () => {
            const R = 0.55, r = 0.28;
            const uSegs = 24, vSegs = 14;
            const verts = [];
            for (let u = 0; u < uSegs; u++) {
                for (let v = 0; v < vSegs; v++) {
                    const ua = (u / uSegs) * Math.PI * 2;
                    const va = (v / vSegs) * Math.PI * 2;
                    verts.push([
                        (R + r * Math.cos(va)) * Math.cos(ua),
                        (R + r * Math.cos(va)) * Math.sin(ua),
                        r * Math.sin(va),
                    ]);
                }
            }
            const edges = [];
            for (let u = 0; u < uSegs; u++) {
                for (let v = 0; v < vSegs; v++) {
                    const i = u * vSegs + v;
                    const ni = ((u + 1) % uSegs) * vSegs + v;
                    const nv = u * vSegs + ((v + 1) % vSegs);
                    edges.push([i, ni]);
                    edges.push([i, nv]);
                }
            }
            return { verts, edges };
        };

        // Sphere (lat/lon wireframe)
        const buildSphere = () => {
            const latSegs = 10, lonSegs = 16;
            const verts = [];
            for (let lat = 0; lat <= latSegs; lat++) {
                for (let lon = 0; lon < lonSegs; lon++) {
                    const phi = (lat / latSegs) * Math.PI;
                    const theta = (lon / lonSegs) * Math.PI * 2;
                    verts.push([
                        Math.sin(phi) * Math.cos(theta),
                        Math.cos(phi),
                        Math.sin(phi) * Math.sin(theta),
                    ]);
                }
            }
            const edges = [];
            for (let lat = 0; lat <= latSegs; lat++) {
                for (let lon = 0; lon < lonSegs; lon++) {
                    const i = lat * lonSegs + lon;
                    if (lat < latSegs) edges.push([i, (lat + 1) * lonSegs + lon]);
                    edges.push([i, lat * lonSegs + ((lon + 1) % lonSegs)]);
                }
            }
            return { verts, edges };
        };

        // Pick shape
        const builders = {
            icosahedron: buildIcosahedron,
            octahedron: buildOctahedron,
            cube: buildCube,
            torus: buildTorus,
            sphere: buildSphere,
        };
        const { verts, edges } = (builders[shape] || buildIcosahedron)();

        // ── speeds by shape ────────────────────────────────────────
        const rotSpeeds = {
            icosahedron: [0.004, 0.007, 0.002],
            octahedron: [0.006, 0.009, 0.003],
            cube: [0.005, 0.008, 0.004],
            torus: [0.000, 0.010, 0.004],
            sphere: [0.003, 0.006, 0.001],
        };
        const [sX, sY, sZ] = rotSpeeds[shape] || [0.004, 0.007, 0.002];

        // ── resize ─────────────────────────────────────────────────
        const resize = () => {
            canvas.width = canvas.offsetWidth || 400;
            canvas.height = canvas.offsetHeight || 400;
        };

        // ── draw loop ──────────────────────────────────────────────
        const draw = () => {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            const cx = W / 2, cy = H / 2;
            const radius = Math.min(W, H) * 0.36;

            const rotated = verts.map(rotate);
            const projected = rotated.map(v => project(v, cx, cy, radius));

            // Back→front edge sort
            const sorted = [...edges].sort((a, b) => {
                const za = (projected[a[0]][2] + projected[a[1]][2]) / 2;
                const zb = (projected[b[0]][2] + projected[b[1]][2]) / 2;
                return za - zb;
            });

            sorted.forEach(([i, j]) => {
                const [x1, y1, s1] = projected[i];
                const [x2, y2, s2] = projected[j];
                const avg = (s1 + s2) / 2;
                const a = 0.10 + avg * 0.60;

                // Glow layer
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = rgba(a * 0.35);
                ctx.lineWidth = 5;
                ctx.stroke();

                // Core line
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = rgba(a);
                ctx.lineWidth = 1.4;
                ctx.stroke();
            });

            // Vertex dots (only for low-vertex shapes — skip torus/sphere)
            if (verts.length <= 12) {
                projected.forEach(([x, y, s]) => {
                    const a = 0.3 + s * 0.7;
                    const r = 2 + s * 3;
                    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
                    g.addColorStop(0, rgba(a * 0.7));
                    g.addColorStop(1, rgba(0));
                    ctx.beginPath();
                    ctx.arc(x, y, r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
                    ctx.fillStyle = rgba(a);
                    ctx.fill();
                });
            }

            ax += sX * speed;
            ay += sY * speed;
            az += sZ * speed;

            animId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        const onResize = () => { resize(); };
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
    }, [shape, color, speed, opacity]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block', willChange: 'transform' }}
        />
    );
};

export default Wireframe3D;
