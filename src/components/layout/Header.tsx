import { useEffect, useState } from 'react'

export const Header = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (s: number) => {
    const hrs = String(Math.floor(s / 3600)).padStart(2, '0')
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
    const secs = String(s % 60).padStart(2, '0')
    return `${hrs}:${mins}:${secs}`
  }

  return (
    <header className="w-full flex justify-between items-start px-6 py-4 bg-white">
      <div className="flex flex-col items-start gap-2">
        <div className="text-md font-semibold">
          Timer: {formatTime(seconds)}
        </div>
        <div className="text-md">
          Stage: <strong>ANALYSIS</strong>
        </div>
        <div className="text-sm text-gray-500">
          Next Stage: STRUCTURING - 1 hour
        </div>
      </div>

      <div className="text-right flex flex-col items-center gap-2">
        <div className="text-md font-semibold">John Doe</div>
        <button className="!text-black !border !border-2 !border-gray-200 !bg-white">
          Logout
        </button>
      </div>
    </header>
  )
}
