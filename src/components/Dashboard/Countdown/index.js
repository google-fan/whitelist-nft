import { useState, useEffect } from "react"
import { getTimeLeft } from "helpers/countdown"
import "./style.scss"

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <div className="countdown grid">
      <div className="countdown-item flex-column bordered-sm shadowed">
        <div className="grid">
          <span>{timeLeft.days[0]}</span>
          <span>{timeLeft.days[1]}</span>
        </div>
        <span className="bordered-xs">day</span>
      </div>
      <div className="countdown-item flex-column bordered-sm shadowed">
        <div className="grid">
          <span>{timeLeft.hours[0]}</span>
          <span>{timeLeft.hours[1]}</span>
        </div>
        <span className="bordered-xs">hur</span>
      </div>
      <div className="countdown-item flex-column bordered-sm shadowed">
        <div className="grid">
          <span>{timeLeft.minutes[0]}</span>
          <span>{timeLeft.minutes[1]}</span>
        </div>
        <span className="bordered-xs">min</span>
      </div>
      <div className="countdown-item flex-column bordered-sm shadowed">
        <div className="grid">
          <span>{timeLeft.seconds[0]}</span>
          <span>{timeLeft.seconds[1]}</span>
        </div>
        <span className="bordered-xs">sec</span>
      </div>
    </div>
  )
}

export default Countdown
