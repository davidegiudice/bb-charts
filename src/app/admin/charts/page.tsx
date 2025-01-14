'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { ChartType, InputChangeEvent, SelectChangeEvent, FormSubmitEvent } from '@/types'

export default function AdminChartsPage() {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [weekDate, setWeekDate] = useState<string>('')
  const [chartType, setChartType] = useState<ChartType>('TOP_100')
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileChange = (e: InputChangeEvent) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault()
    if (!file || !weekDate || !chartType) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('weekDate', weekDate)
    formData.append('chartType', chartType)

    try {
      const response = await fetch('/api/charts/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload chart')
      }

      toast.success('Chart uploaded successfully')
      router.refresh()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload chart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Charts</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-card rounded-xl p-6 space-y-6">
        <div>
          <label htmlFor="file" className="form-label">
            Chart XML File
          </label>
          <input
            id="file"
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="weekDate" className="form-label">
            Week Date
          </label>
          <input
            id="weekDate"
            type="date"
            value={weekDate}
            onChange={(e: InputChangeEvent) => setWeekDate(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="chartType" className="form-label">
            Chart Type
          </label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e: SelectChangeEvent) => setChartType(e.target.value as ChartType)}
            className="form-select"
            required
          >
            <option value="TOP_100">Hot 100 Italia</option>
            <option value="TOP_ALBUM">Album Top 100</option>
            <option value="TOP_VINYL">Vinyl Top 20</option>
            <option value="TOP_ROCK">Top 50 Rock</option>
            <option value="TOP_ELECTRONIC">Top 50 Electronic</option>
            <option value="TOP_HIPHOP">Top 50 Hip-Hop</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Uploading...' : 'Upload Chart'}
        </button>
      </form>
    </div>
  )
} 