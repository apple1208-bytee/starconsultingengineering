// Sanity environment configuration
// Set these values in your .env.local file:
//   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
//   NEXT_PUBLIC_SANITY_DATASET=production
//   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
