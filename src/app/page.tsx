import BackgroundAnimation from '@/components/BackgroundAnimation'
import Header from '@/components/Header'
import VolumeSection from '@/components/VolumeSection'
import ControlsSection from '@/components/ControlsSection'
import InfoSection from '@/components/InfoSection'

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <div className="container">
        <Header />
        <VolumeSection />
        <ControlsSection />
        <InfoSection />
      </div>
    </>
  )
}