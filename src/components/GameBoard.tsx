import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { SortableContainer } from './SortableContainer'
import SortableCard from './SortableCard'

interface GameBoardProps {
	nouns: string[]
	adjectives: string[]
	containerItems: Record<string, string | null>
	setContainerItems: React.Dispatch<React.SetStateAction<Record<string, string | null>>>
}

export default function GameBoard({ nouns, adjectives, containerItems, setContainerItems }: GameBoardProps) {
	const [activeId, setActiveId] = useState<string | null>(null) // Элемент который сейчас перемещается (активный item)

	const [availableItems, setAvailableItems] = useState<string[]>(adjectives) // Массив элементов в главном контейнере

	function handleDragStart(event: DragStartEvent) {
		setActiveId(event.active.id as string)

		// Удаляем активный item из всех контейнеров временно
		const id = event.active.id as string

		setAvailableItems(prev => prev.filter(item => item !== id))

		setContainerItems(prev => {
			const newState = { ...prev }
			for (const key in newState) {
				if (newState[key] === id) {
					newState[key] = null
				}
			}
			return newState
		})
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		setActiveId(null)

		// Если перетащили в пустоту - возвращаем элемент в главный контейнер
		if (!over || !nouns.includes(over.id.toString())) {
			setAvailableItems(prev => [...prev, active.id.toString()])
			return
		}

		const activeId = active.id as string
		const overId = over.id as string

		// Если возвращаем в главный контейнер
		if (overId === 'available') {
			if (!availableItems.includes(activeId)) {
				setAvailableItems(prev => [...prev, activeId])
			}
			return
		}

		const prevId = containerItems[overId]

		// Перетаскиваем в новый контейнер, если в нем был элемент, возвращаем его в главный
		setContainerItems(prev => {
			const newState = { ...prev }
			newState[overId] = activeId
			return newState
		})

		if (prevId) {
			setAvailableItems(prev => [...prev, prevId])
		}
	}

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="flex md:flex-col md:gap-y-10 gap-4 justify-center items-center">
				{/* Первая колонка: доступные элементы */}
				<SortableContainer id="available" items={availableItems} />

				{/* Остальные контейнеры */}
				<div className="flex flex-col md:flex-row gap-2 md:items-end">
					{nouns.map(noun => (
						<SortableContainer key={noun} id={noun} word={noun} items={containerItems[noun] ? [containerItems[noun]!] : []} />
					))}
				</div>

				<DragOverlay>{activeId ? <SortableCard id={activeId} word={activeId} overlay /> : null}</DragOverlay>
			</div>
		</DndContext>
	)
}
