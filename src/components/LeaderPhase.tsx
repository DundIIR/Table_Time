import { useState } from 'react'
import type { Card } from '../types/card'
import GameBoard from './GameBoard'

interface LeaderPhaseProps {
	nouns: Card[]
	adjectives: Card[]
	onSubmit: (order: Card[]) => void
}

export default function LeaderPhase({ nouns, adjectives, onSubmit }: LeaderPhaseProps) {
	const [localAdjectives, setLocalAdjectives] = useState<Card[]>(adjectives.map(a => ({ ...a, column: 'adjectives' })))
	const [matches, setMatches] = useState<Card[]>([])

	const handleDragEnd = (event: any) => {
		const { active, over } = event

		if (!over) return

		// Если перетаскиваем в зону соответствий
		if (over.id.toString().startsWith('match-')) {
			const position = parseInt(over.id.split('-')[1])
			const draggedCard = localAdjectives.find(c => c.id === active.id) || matches.find(c => c.id === active.id)

			if (!draggedCard) return

			setMatches(prevMatches => {
				// Находим карточку, которая уже занимает эту позицию
				const existingCard = prevMatches.find(c => c.position === position)

				// Создаем новый массив matches без карточки, которая была на этой позиции (если была)
				const newMatches = prevMatches.filter(c => c.position !== position)

				// Если карточка перемещается из matches в другую позицию
				if (draggedCard.column === 'matches') {
					// Удаляем её из текущей позиции
					const withoutDragged = newMatches.filter(c => c.id !== draggedCard.id)
					// Добавляем на новую позицию
					return [...withoutDragged, { ...draggedCard, position }]
				}

				// Если карточка перемещается из adjectives
				// Добавляем новую карточку в указанную позицию
				const updatedMatches = [
					...newMatches,
					{
						...draggedCard,
						column: 'matches' as const,
						position,
					},
				]

				// Если была карточка на этой позиции - возвращаем её в adjectives
				if (existingCard) {
					setLocalAdjectives(prev =>
						[
							...prev,
							{
								...existingCard,
								column: 'adjectives' as const,
								position: undefined,
							},
						].sort((a, b) => a.word.localeCompare(b.word)),
					)
				}

				return updatedMatches
			})

			// Удаляем карточку из adjectives, если она оттуда
			if (draggedCard.column === 'adjectives') {
				setLocalAdjectives(prev => prev.filter(c => c.id !== active.id).sort((a, b) => a.word.localeCompare(b.word)))
			}
		}
	}

	const handleSubmit = () => {
		onSubmit(matches)
	}

	return (
		<div className="text-center">
			<GameBoard adjectives={localAdjectives} matches={matches} nouns={nouns} onDragEnd={handleDragEnd} />

			<button
				onClick={handleSubmit}
				className="mt-10 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
				Подтвердить выбор
			</button>
		</div>
	)
}
