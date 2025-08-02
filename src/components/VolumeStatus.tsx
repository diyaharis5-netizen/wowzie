'use client'

export default function VolumeStatus() {
  return (
    <div className="volume-status">
      <div className="status-text silence-status active" id="silenceStatus">
        Perfect Silence
      </div>
      <div className="status-text getting-loud-status" id="gettingLoudStatus">
        Hmm... Getting Loud
      </div>
      <div className="status-text too-loud-status" id="tooLoudStatus">
        TOO LOUD!
      </div>
    </div>
  )
}