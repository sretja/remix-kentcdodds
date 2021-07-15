import * as React from 'react'
import type {LoaderFunction} from 'remix'
import {json, useRouteData} from 'remix'
import type {MdxListItem} from 'types'
import {getBlogRecommendations} from '../utils/blog.server'
import {ErrorPage} from '../components/errors'

type LoaderData = {
  blogRecommendations: Array<MdxListItem>
}

export const loader: LoaderFunction = async () => {
  const blogRecommendations = (await getBlogRecommendations()).slice(0, 3)
  const data: LoaderData = {
    // we show the seasons in reverse order
    blogRecommendations,
  }

  return json(data)
}

export function meta() {
  return {title: "Ain't nothing here"}
}

export default function NotFoundPage() {
  const data = useRouteData<LoaderData>()
  return (
    <ErrorPage
      title="404 - Oh no, how did you get here?"
      subtitle="This is not a page on kentcdodds.com. So sorry."
      blogRecommendations={data.blogRecommendations}
    />
  )
}
