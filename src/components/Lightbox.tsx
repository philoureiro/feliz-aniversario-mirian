import { content } from "../config/content";
import { asset, isVideo } from "../lib/text";
import type { LightboxItem } from "../lib/types";

export function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  if (!item) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="close" onClick={onClose}>{content.fechar}</button>
      <div className="pol" onClick={(e) => e.stopPropagation()}>
        {isVideo(item.src)
          ? <video src={asset(item.src)} controls autoPlay playsInline />
          : <img src={asset(item.src)} alt={item.caption} onError={(e) => (e.currentTarget.style.display = "none")} />}
        <span className="cap">{item.caption}</span>
      </div>
    </div>
  );
}
