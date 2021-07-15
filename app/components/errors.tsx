import {useMatches} from 'remix'
import * as React from 'react'
import type {MdxListItem} from 'types'
import {images} from '../images'
import {HeroSection} from './sections/hero-section'
import {BlogSection} from './sections/blog-section'

type BlogRecommendations = Array<MdxListItem>

function ErrorPage({
  title,
  subtitle,
  blogRecommendations,
}: {
  title: string
  subtitle: string
  blogRecommendations: BlogRecommendations
}) {
  return (
    <main>
      <HeroSection
        title={title}
        subtitle={subtitle}
        imageUrl={images.bustedOnewheel()}
        imageAlt={images.bustedOnewheel.alt}
        // arrowUrl={blogRecommendations.length ? "#articles" : null}
        // arrowLabel={blogRecommendations.length ? "But wait, there is more!" : null}
        arrowUrl="yo"
        arrowLabel={null}
      />

      <div id="articles" />
      <BlogSection
        articles={blogRecommendations}
        title="Looking for something to read?"
        description="Have a look at these articles."
      />
    </main>
  )
}

function FourOhFour({
  blogRecommendations,
}: {
  blogRecommendations: BlogRecommendations
}) {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      title="404 - Oh no, you found a page that's missing stuff."
      subtitle={`"${pathname}" is not a page on kentcdodds.com. So sorry.`}
      blogRecommendations={blogRecommendations}
    />
  )
}

function ServerError({
  blogRecommendations = [],
}: {
  blogRecommendations?: BlogRecommendations
}) {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      title="500 - Oh no, something did not go that well."
      subtitle={`"${pathname}" is currently not working. So sorry.`}
      blogRecommendations={blogRecommendations}
    />
  )
}

export {ErrorPage, ServerError, FourOhFour}
