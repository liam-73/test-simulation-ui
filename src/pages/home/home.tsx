import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const initialState = {
  ebitda: 10,
  interestRate: 20,
  multiple: 10,
  factorScore: 2,
  companyName: 'ABC Corp.',
  description: "This is the company's description. This company is #1!",
}

const COLORS = ['#415a77', '#6c757d']

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y - 5}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const Home = () => {
  const isTeam1 = true // Replace with actual logic to determine team

  const [form, setForm] = useState(initialState)
  const [toggles, setToggles] = useState({
    ebitda: false,
    interestRate: false,
    multiple: false,
    factorScore: false,
    companyName: false,
    description: false,
  })

  // State to manage first-time guidance visibility
  const [showGuidance, setShowGuidance] = useState(true)

  // Collapse first-time guidance after first view
  useEffect(() => {
    const seen = localStorage.getItem('seenGuidance')
    if (seen) setShowGuidance(false)
  }, [])

  const handleInputChange = (
    field: keyof typeof form,
    value: string | number
  ) => {
    if (!isTeam1) return // Only allow changes for Team 1

    setForm((prev) => ({ ...prev, [field]: value }))
    setToggles((prev) => ({ ...prev, [field]: false })) // Reset toggle to TBD
  }

  const handleToggle = (field: keyof typeof toggles) => {
    if (!isTeam1) return // Only allow toggling for Team 1

    setToggles((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const valuation = form.ebitda * form.multiple * form.factorScore

  const pieData = [
    { name: 'Interest Rate', value: form.interestRate },
    { name: 'Other', value: 100 - form.interestRate },
  ]

  return (
    <div className="bg-white px-6 w-full">
      <div className="flex flex-col lg:flex-row p-4 gap-6 w-full border border-1 border-gray-300 rounded-lg bg-background">
        <div className="w-full lg:w-2/3 space-y-4">
          {showGuidance && (
            <div className="border p-4 rounded shadow">
              <div
                className="font-semibold cursor-pointer mb-2 flex justify-between items-center"
                onClick={() => {
                  setShowGuidance(false)
                  localStorage.setItem('seenGuidance', 'true')
                }}
              >
                First Time Guidance <span>▼</span>
              </div>
              <p>
                Welcome! Use this form to simulate your negotiation terms. You
                can fill in financial values and see instant valuation changes.
                Team 2 will approve or reject your values using toggles.
              </p>
            </div>
          )}

          {[
            { label: 'EBITDA ($ million)', key: 'ebitda' },
            { label: 'Interest Rate (%)', key: 'interestRate' },
            { label: 'Multiple (x)', key: 'multiple' },
          ].map((field) => (
            <div key={field.key} className="flex items-center gap-2">
              <label className="w-48">{field.label}</label>
              <input
                type="number"
                className="border px-2 py-1 rounded w-40"
                value={form[field.key as keyof typeof form]}
                disabled={!isTeam1}
                onChange={(e) =>
                  handleInputChange(
                    field.key as keyof typeof form,
                    Number(e.target.value)
                  )
                }
              />
              <button
                disabled={!isTeam1}
                className={`px-3 py-1 rounded ${
                  !toggles[field.key as keyof typeof toggles]
                    ? 'bg-gray-300'
                    : 'bg-green-400'
                }`}
                onClick={() => handleToggle(field.key as keyof typeof toggles)}
              >
                {toggles[field.key as keyof typeof toggles] ? 'OK' : 'TBD'}
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <label className="w-48">Factor Score:</label>
            <div className="flex items-center gap-4 relative">
              {[1, 2, 3, 4, 5].map((score, index) => (
                <div className="flex flex-col items-center" key={score}>
                  <div
                    key={score}
                    className="relative z-10 cursor-pointer"
                    onClick={() => {
                      if (!isTeam1) return // Only allow changes for Team 1

                      handleInputChange('factorScore', score)
                    }}
                  >
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        form.factorScore === score
                          ? 'w-6 h-6 bg-primary'
                          : 'w-4 h-4 border-2 border-primary bg-white'
                      }`}
                    ></div>
                    {index < 4 && (
                      <div className="absolute left-full top-1/2 w-4 h-0.5 bg-primary -translate-y-1/2"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-center mt-1">{score}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              disabled={!isTeam1}
              className={`px-3 py-1 rounded ${
                !toggles.factorScore ? 'bg-gray-300' : 'bg-green-400'
              }`}
              onClick={() => handleToggle('factorScore')}
            >
              {toggles.factorScore ? 'OK' : 'TBD'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-48">Company Name:</label>
            <input
              disabled={!isTeam1}
              type="text"
              className="border px-2 py-1 rounded w-60"
              value={form.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
            <button
              disabled={!isTeam1}
              className={`px-3 py-1 rounded ${
                !toggles.companyName ? 'bg-gray-300' : 'bg-green-400'
              }`}
              onClick={() => handleToggle('companyName')}
            >
              {toggles.companyName ? 'OK' : 'TBD'}
            </button>
          </div>

          <div className="flex items-start gap-2">
            <label className="w-48 pt-2">Description:</label>
            <textarea
              disabled={!isTeam1}
              className="border px-2 py-1 rounded w-80 h-20"
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <button
              disabled={!isTeam1}
              className={`px-3 py-1 rounded ${
                !toggles.description ? 'bg-gray-300' : 'bg-green-400'
              }`}
              onClick={() => handleToggle('description')}
            >
              {toggles.description ? 'OK' : 'TBD'}
            </button>
          </div>

          <button
            disabled={!isTeam1}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center justify-start p-4 border rounded shadow">
          <div className="mb-4 text-xl font-semibold">
            Valuation: ${valuation} million
          </div>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  )
}
