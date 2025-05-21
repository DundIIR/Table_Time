import { DndContext, type DragEndEvent, closestCorners, type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Card } from '../types/card'
import SortableCard from './SortableCard'
import DropZone from './DropZone'
import { useState } from 'react'

type GameBoardProps = {
	adjectives: Card[]
	matches: Card[]
	nouns: Card[]
	onDragEnd: (event: DragEndEvent) => void
}

import { Droppable } from './drop'
import { Draggable } from './drag'

export default function GameBoard({ adjectives, matches, nouns, onDragEnd }: GameBoardProps) {
	// const [active, setActive] = useState<DragEvent | null>(null)

	const droppableContainers: UniqueIdentifier[] = ['A', 'B', 'C', 'D', 'E']
	const draggableItems: UniqueIdentifier[] = ['1', '2', '3', '4', '5']

	// Состояние для хранения информации о том, куда сброшен каждый элемент
	const [containerItems, setContainerItems] = useState<Record<UniqueIdentifier, UniqueIdentifier | null>>(
		droppableContainers.reduce((acc, id) => ({ ...acc, [id]: null }), {}),
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		console.log('Актив ', active)
		console.log('Овер ', over)

		// Если перетащили не на контейнер - сбрасываем элемент
		if (!over || !droppableContainers.includes(over.id)) {
			// Освобождаем контейнер, если элемент был в каком-то контейнере
			setContainerItems(prev =>
				Object.fromEntries(
					Object.entries(prev).map(([containerID, itemID]) => [containerID, itemID == active.id ? null : itemID]),
				),
			)
			return
		}

		// Если контейнер уже занят - ничего не делаем
		// if (containerItems[over.id] !== active.id) {
		// 	// Освобождаем контейнер, если элемент был в каком-то контейнере
		// 	setContainerItems(prev => ({ ...prev, [over.id]: active.id }))
		// }

		// Освобождаем предыдущий контейнер, если элемент уже был в каком-то контейнере
		setContainerItems(prev => {
			const newState = { ...prev }
			for (const containerId in newState) {
				if (newState[containerId] === active.id) {
					newState[containerId] = null
				}
			}
			// Занимаем новый контейнер
			newState[over.id] = active.id
			return newState
		})
	}

	const availableItems = draggableItems.filter(itemId => !Object.values(containerItems).includes(itemId))

	return (
		<div className="p-4 flex gap-2">
			<DndContext onDragEnd={handleDragEnd}>
				{/* Отображаем draggable элементы, которые еще не в контейнерах */}
				<div className="flex gap-4 mb-4">
					<SortableContext items={draggableItems}>
						<Droppable id="adj">
							{availableItems.map(id => (
								<Draggable key={id} id={id}>
									Элемент {id}
								</Draggable>
							))}
						</Droppable>
					</SortableContext>
				</div>

				{/* Области для сброса */}
				<div className="flex gap-4">
					<Droppable id="mat">
						{droppableContainers.map(containerId => (
							<Droppable key={containerId} id={containerId.toString()}>
								{containerItems[containerId] ? (
									<>
										<span className="text-gray-500">Drop here</span>
										<Draggable key={containerItems[containerId]} id={containerItems[containerId]!}>
											Элемент {containerItems[containerId]}
										</Draggable>
									</>
								) : (
									<span className="text-gray-500">Drop here</span>
								)}
							</Droppable>
						))}
					</Droppable>
				</div>
			</DndContext>
		</div>
	)

	return (
		<div className="flex gap-8 h-full min-h-[400px]">
			<DndContext
				collisionDetection={closestCorners}
				onDragEnd={onDragEnd}
				onDragStart={({ active }) => setActive(active)}
				onDragCancel={() => setActive(null)}>
				{/* Колонка с прилагательными */}
				<SortableContext items={adjectives} strategy={verticalListSortingStrategy}>
					<div className="space-y-4">
						{adjectives.map(card => (
							<SortableCard key={card.id} card={card} />
						))}
					</div>
				</SortableContext>
				<div className="w-40 bg-gray-100 p-4 rounded-lg">
					<h3 className="font-bold mb-4">Прилагательные</h3>
				</div>

				{Array.from({ length: 5 }).map((_, index) => (
					<DropZone key={index} id={`match-${index}`} position={index} activeId={active?.id}>
						{matches.find(c => c.position === index) && <SortableCard card={matches.find(c => c.position === index)!} />}
					</DropZone>
				))}
				{/* Колонка для сопоставления */}
				<div className="w-40 bg-blue-50 p-4 rounded-lg">
					<h3 className="font-bold mb-4">Соответствия</h3>
					<div className="space-y-4"></div>
				</div>
			</DndContext>

			{/* Колонка с существительными */}
			<div className="w-40 bg-gray-100 p-4 rounded-lg">
				<h3 className="font-bold mb-4">Существительные</h3>
				<div className="space-y-4">
					{nouns.map(card => (
						<div key={card.id} className="bg-white p-3 rounded shadow">
							{card.word}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
