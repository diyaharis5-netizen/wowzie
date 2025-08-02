'use client'

export default function ControlsSection() {
  const handleStartMonitoring = () => {
    // TODO: Implement microphone access and audio monitoring
    console.log('Start monitoring clicked')
  }

  const handleStopMonitoring = () => {
    // TODO: Implement stop monitoring functionality
    console.log('Stop monitoring clicked')
  }

  return (
    <section className="controls-section">
      <div className="control-panel">
        <button 
          className="control-btn start-btn" 
          id="startBtn"
          onClick={handleStartMonitoring}
        >
          <span className="btn-icon">🎤</span>
          Start Monitoring
        </button>
        <button 
          className="control-btn stop-btn" 
          id="stopBtn"
          onClick={handleStopMonitoring}
        >
          <span className="btn-icon">⏹️</span>
          Stop Monitoring
        </button>
      </div>
    </section>
  )
}