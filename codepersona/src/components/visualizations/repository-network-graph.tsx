'use client'

import * as d3 from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Repository } from '@/types'

// Define a more specific type for the nested source repository
interface SourceRepository {
  full_name: string
}

interface EnrichedRepository extends Repository {
  source?: SourceRepository | null
}

interface RepositoryNode extends d3.SimulationNodeDatum {
  id: string
  name: string
  size: number
  isFork: boolean
}

interface RepositoryLink extends d3.SimulationLinkDatum<RepositoryNode> {
  source: string | RepositoryNode
  target: string | RepositoryNode
}

interface RepositoryNetworkGraphProps {
  data: {
    repositories: EnrichedRepository[]
  }
}

export function RepositoryNetworkGraph({ data }: RepositoryNetworkGraphProps) {
  const ref = useRef<SVGSVGElement>(null)
  const [nodes, setNodes] = useState<RepositoryNode[]>([])
  const [links, setLinks] = useState<RepositoryLink[]>([])

  useEffect(() => {
    if (!data || !data.repositories || data.repositories.length === 0) return

    const repoNodes: RepositoryNode[] = data.repositories.map((repo) => ({
      id: repo.full_name,
      name: repo.name,
      size: repo.size || 10,
      isFork: repo.fork,
      x: 0,
      y: 0,
    }))

    const repoLinks: RepositoryLink[] = data.repositories
      .filter((repo) => repo.fork && repo.source)
      .map((repo) => ({
        source: repo.full_name,
        target: repo.source!.full_name,
      }))

    const nodeIds = new Set(repoNodes.map((n) => n.id))
    const validLinks = repoLinks.filter((link) =>
      nodeIds.has(link.target as string)
    )

    setNodes(repoNodes)
    setLinks(validLinks)
  }, [data])

  useEffect(() => {
    if (nodes.length === 0 || !ref.current) return

    const width = ref.current.parentElement?.clientWidth || 500
    const height = 384

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    svg.selectAll('*').remove()

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink<RepositoryNode, RepositoryLink>(links)
          .id((d) => d.id)
          .distance(70)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(0, 0))

    const link = svg
      .append('g')
      .attr('stroke', 'hsl(var(--muted-foreground))')
      .attr('stroke-opacity', 0.5)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5)

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => Math.max(5, Math.log(d.size + 1) * 2.5))
      .attr('fill', (d) =>
        d.isFork ? 'hsl(var(--secondary))' : 'hsl(var(--primary))'
      )
      .attr('stroke', 'hsl(var(--background))')
      .attr('stroke-width', 2)

    node.append('title').text((d) => d.name)

    const dragHandler = d3
      .drag<SVGCircleElement, RepositoryNode>()
      .on(
        'start',
        function (
          event: d3.D3DragEvent<SVGCircleElement, RepositoryNode, any>,
          d: RepositoryNode
        ) {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        }
      )
      .on(
        'drag',
        function (
          event: d3.D3DragEvent<SVGCircleElement, RepositoryNode, any>,
          d: RepositoryNode
        ) {
          d.fx = event.x
          d.fy = event.y
        }
      )
      .on(
        'end',
        function (
          event: d3.D3DragEvent<SVGCircleElement, RepositoryNode, any>,
          d: RepositoryNode
        ) {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }
      )

    ;(
      node as d3.Selection<
        SVGCircleElement,
        RepositoryNode,
        SVGGElement,
        unknown
      >
    ).call(dragHandler)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as RepositoryNode).x!)
        .attr('y1', (d) => (d.source as RepositoryNode).y!)
        .attr('x2', (d) => (d.target as RepositoryNode).x!)
        .attr('y2', (d) => (d.target as RepositoryNode).y!)

      node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!)
    })
  }, [nodes, links])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository Network Graph</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center p-0">
        {nodes.length > 0 ? (
          <svg ref={ref}></svg>
        ) : (
          <p className="text-center text-muted-foreground">
            Not enough repository data to display a network graph.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
