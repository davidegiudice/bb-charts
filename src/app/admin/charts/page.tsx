'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import { getTrackImage } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

interface Chart {
  id: string
  title: string
  artist: string
  weekDate: string
  chartType: string
  imageUrl: string | null
}

export default function AdminChartsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login'
    },
  })

  const [file, setFile] = useState<File | null>(null)
  const [weekDate, setWeekDate] = useState('')
  const [chartType, setChartType] = useState('TOP_100')
  const [loading, setLoading] = useState(false)
  const [refreshingImages, setRefreshingImages] = useState(false)
  const router = useRouter()

  // Show loading state while session is being fetched
  if (status === "loading") {
    return <Loading />
  }

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
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload chart')
    } finally {
      setLoading(false)
      toast.dismiss(loadingToast)
    }
  }

  const refreshSpotifyImages = async () => {
    setRefreshingImages(true)
    const loadingToast = toast.loading('Refreshing Spotify images...')
    
    try {
      const response = await fetch('/api/charts/refresh-images', {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Failed to refresh images')
      }
      
      toast.success('Images refreshed successfully')
      router.refresh()
    } catch (error) {
      console.error('Error refreshing images:', error)
      toast.error('Failed to refresh images')
    } finally {
      setRefreshingImages(false)
      toast.dismiss(loadingToast)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestione Classifiche</h1>
          <button
            onClick={refreshSpotifyImages}
            disabled={refreshingImages}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {refreshingImages ? 'Aggiornamento...' : 'Aggiorna Immagini Spotify'}
          </button>
        </div>

        {/* Upload Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Carica Nuova Classifica</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo Classifica
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                disabled={loading}
              >
                <option value="TOP_100">Hot 100 Italia</option>
                <option value="TOP_ALBUM">Album Top 100 Italia</option>
                <option value="TOP_VINYL">Vinyl Top 20 Italia</option>
                <option value="TOP_50_ROCK">Top 50 Rock</option>
                <option value="TOP_50_DANCE">Top 50 Electronic & Dance</option>
                <option value="TOP_50_HIPHOP">Top 50 Hip-Hop</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data Settimana
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
                File XML
              </label>
              <input
                type="file"
                accept=".xml"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full p-2"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Caricamento...' : 'Carica Classifica'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
} 