import { cacheLife } from 'next/cache'
import { z } from 'zod'
import { env } from '@/env'
import { fetchData } from './fetch'

const photoAssetSchema = z.object({
  url: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const photoManifestSchema = z.object({
  photos: z.array(
    z.object({
      title: z.string().min(1),
      takenAt: z.string().datetime({ offset: true }),
      original: photoAssetSchema,
      thumbnail: photoAssetSchema,
    }),
  ),
})

type PhotoManifest = z.infer<typeof photoManifestSchema>

export type GalleryPhoto = {
  title: string
  location: string
  takenAt: string
  originalSrc: string
  thumbnailSrc: string
  width: number
  height: number
}

const photoManifestUrl = new URL(env.PHOTO_MANIFEST_URL)
export const photoGalleryUrl = env.GALLERY_URL

const resolveAssetUrl = (assetUrl: string) =>
  new URL(assetUrl, photoManifestUrl).toString()

const getPhotoLocation = (assetUrl: string) => {
  const segment = assetUrl.split('/')[1] ?? ''
  const match = /^\d{8}-(.+)$/.exec(segment)
  return match?.[1] ?? segment
}

async function getPhotoManifest(): Promise<PhotoManifest> {
  'use cache'
  cacheLife('hours')

  const json = await fetchData<unknown>(env.PHOTO_MANIFEST_URL, {
    headers: {
      Accept: 'application/json',
    },
  })

  return photoManifestSchema.parse(json)
}

export async function getLatestGalleryPhotos(
  limit = 3,
): Promise<GalleryPhoto[]> {
  try {
    const manifest = await getPhotoManifest()

    return manifest.photos
      .slice(-limit)
      .map((photo) => ({
        title: photo.title,
        location: getPhotoLocation(photo.original.url),
        takenAt: photo.takenAt,
        originalSrc: resolveAssetUrl(photo.original.url),
        thumbnailSrc: resolveAssetUrl(photo.thumbnail.url),
        width: photo.thumbnail.width,
        height: photo.thumbnail.height,
      }))
      .reverse()
  } catch (error) {
    console.error('Failed to load photo manifest', error)
    return []
  }
}
