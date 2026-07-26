'use client'

import React from "react"
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"

interface Alert {
  type: string
  message: string
}

interface DashboardAlertsProps {
  alerts: Alert[]
}

export default function DashboardAlerts({
  alerts,
}: DashboardAlertsProps) {
  if (!alerts || alerts.length === 0) return null

  return (
    <div className="mb-8 space-y-4">
      {alerts.map((alert, index) => {
        let bg = ""
        let border = ""
        let text = ""
        let icon = null

        if (alert.type === "warning") {
          bg = "bg-yellow-50"
          border = "border-yellow-200"
          text = "text-yellow-700"
          icon = <AlertTriangle size={22} />
        }

        else if (alert.type === "success") {
          bg = "bg-green-50"
          border = "border-green-200"
          text = "text-green-700"
          icon = <CheckCircle2 size={22} />
        }

        else {
          bg = "bg-blue-50"
          border = "border-blue-200"
          text = "text-blue-700"
          icon = <Info size={22} />
        }

        return (
          <div
            key={index}
            className={`flex items-center gap-4 rounded-2xl border ${border} ${bg} px-5 py-4 shadow-sm`}
          >
            <div className={text}>
              {icon}
            </div>

            <p className={`font-medium ${text}`}>
              {alert.message}
            </p>
          </div>
        )
      })}
    </div>
  )
}