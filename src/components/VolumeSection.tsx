'use client'

import VolumeMeter from './VolumeMeter'
import VolumeStatus from './VolumeStatus'

export default function VolumeSection() {
  return (
    <section className="volume-section">
      <div className="volume-meter-container">
        <VolumeMeter />
      </div>
      <VolumeStatus />
    </section>
  )
}