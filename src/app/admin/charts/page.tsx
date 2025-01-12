'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Layout from '@/components/Layout'

export default function AdminChartsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [weekDate, setWeekDate] = useState('')
  const [chartType, setChartType] = useState('TOP_100')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !weekDate) {
      toast.error('Please fill in all required fields')
      return
    }

    const loadingToast = toast.loading('Uploading chart...')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('weekDate', weekDate)
      formData.append('chartType', chartType)

      const response = await fetch('/api/charts/import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      toast.success(data.message || 'Chart uploaded successfully')
      router.refresh()
      
      // Reset form
      setFile(null)
      setWeekDate('')
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload chart')
    } finally {
      setLoading(false)
      toast.dismiss(loadingToast)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Chart</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chart Type
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              disabled={loading}
            >
              <option value="TOP_100">Top 100</option>
              <option value="TOP_ALBUM">Top Album</option>
              <option value="TOP_VINYL">Top Vinyl</option>
              <option value="TOP_50_GENRE">Top 50 Genre</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Week Date
            </label>
            <input
              type="date"
              value={weekDate}
              onChange={(e) => setWeekDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excel File
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full p-2"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Chart'}
          </button>
        </form>
      </div>
    </Layout>
  )
} 