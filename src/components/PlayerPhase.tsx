import { useState } from 'react'
import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import type { Card } from '../types/card'
import SortableCard from './SortableCard'
import GameCard from './GameCard'

type PlayerPhaseProps = {
	nouns: Card[]
	adjectives: Card[]
	onSubmit: (playerOrder: number[]) => void
}

export default function PlayerPhase({ nouns, adjectives, onSubmit }: PlayerPhaseProps) {
	const [playerOrder, setPlayerOrder] = useState(
		adjectives.map(adj => ({
			...adj,
			isOpen: true, // Игрок всегда видит прилагательные
		})),
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over) return

		setPlayerOrder(items => {
			const oldIndex = items.findIndex(item => item.id === active.id)
			const newIndex = items.findIndex(item => item.id === over.id)
			return arrayMove(items, oldIndex, newIndex)
		})
	}

	const handleSubmit = () => {
		const order = playerOrder.map(adj => adjectives.findIndex(item => item.id === adj.id))
		onSubmit(order)
	}

	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold mb-6">Фаза игрока</h2>
			<div className="flex justify-center gap-8 mb-10">
				{nouns.map(noun => (
					<GameCard key={noun.id} card={noun} />
				))}
			</div>

			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={playerOrder}>
					<div className="flex justify-center gap-6">
						{playerOrder.map(adj => (
							<SortableCard key={adj.id} card={{ ...adj }} />
						))}
					</div>
				</SortableContext>
			</DndContext>

			<button
				onClick={handleSubmit}
				className="mt-10 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
				Завершить ход
			</button>
		</div>
	)
}
