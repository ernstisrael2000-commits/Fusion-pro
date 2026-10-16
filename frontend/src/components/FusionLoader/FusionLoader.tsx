import './FusionLoader.css'

interface FusionLoaderProps {
  /** Compact inline variant (3 orbs only, no text) */
  inline?: boolean
  /** Text shown below the orbs. Defaults to "FusionCore réfléchit…" */
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function FusionLoader({
  inline = false,
  label = 'FusionCore réfléchit…',
  size = 'md',
}: FusionLoaderProps) {
  return (
    <div className={`fusion-loader fusion-loader--${size} ${inline ? 'fusion-loader--inline' : ''}`}>
      <div className="fusion-loader__orbs">
        <span className="fusion-loader__orb fusion-loader__orb--1" />
        <span className="fusion-loader__orb fusion-loader__orb--2" />
        <span className="fusion-loader__orb fusion-loader__orb--3" />
      </div>
      {!inline && <p className="fusion-loader__label">{label}</p>}
    </div>
  )
}
