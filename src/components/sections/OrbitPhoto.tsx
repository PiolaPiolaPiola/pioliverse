import photo from '../../assets/aleja.jpg';
import { orbitRings } from '../../data/stack';
import './orbit.css';

/*
 * Foto con anillos estilo Saturno.
 * Cada anillo es una elipse inclinada; los íconos viajan por ella con offset-path.
 * La mitad trasera del anillo se dibuja detrás de la foto y la delantera encima,
 * y los íconos cambian de z-index a mitad de vuelta para pasar por detrás y por delante.
 */
const RINGS = {
  outer: { rx: 215, ry: 62, rot: -14, front: 'M438.6 178 A215 62 -14 0 1 21.4 282' },
  inner: { rx: 190, ry: 92, rot: 20, front: 'M408.5 295 A190 92 20 0 1 51.5 165' },
};

export function OrbitPhoto({ alt }: { alt: string }) {
  return (
    <div className="orbit">
      <svg aria-hidden="true" width="460" height="460" viewBox="0 0 460 460" className="orbit__back">
        <ellipse cx="230" cy="230" rx={RINGS.outer.rx} ry={RINGS.outer.ry} transform={`rotate(${RINGS.outer.rot} 230 230)`} className="orbit__ring" strokeWidth="3" />
        <ellipse cx="230" cy="230" rx={RINGS.inner.rx} ry={RINGS.inner.ry} transform={`rotate(${RINGS.inner.rot} 230 230)`} className="orbit__ring" strokeWidth="2" strokeDasharray="6 9" />
      </svg>

      <div className="orbit__photo">
        <div className="orbit__halo spin-slow" />
        <img src={photo} alt={alt} width={274} height={274} />
      </div>

      <svg aria-hidden="true" width="460" height="460" viewBox="0 0 460 460" className="orbit__front">
        <path d={RINGS.outer.front} strokeWidth="3" />
        <path d={RINGS.inner.front} strokeWidth="2" strokeDasharray="6 9" />
      </svg>

      {orbitRings.outer.map((o) => (
        <div key={o.name} className="orbit__item orbit__item--outer" style={{ animationDelay: o.delay }}>
          <img src={o.icon} alt={o.name} />
        </div>
      ))}
      {orbitRings.inner.map((o) => (
        <div key={o.name} className="orbit__item orbit__item--inner" style={{ animationDelay: o.delay }}>
          <img src={o.icon} alt={o.name} />
        </div>
      ))}
    </div>
  );
}
