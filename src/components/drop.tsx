import React from 'react'
import { useDroppable } from '@dnd-kit/core'

interface DroppableProps {
	id: string
	children: React.ReactNode
}

export function Droppable({ id, children }: DroppableProps) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	})

	return (
		<div
			className={`min-w-40 min-h-26 border-2 border-dashed  ${
				isOver ? 'border-gray-400' : 'border-gray-300'
			} rounded-2xl p-1 flex flex-col gap-2 items-center transition-colors`}
			ref={setNodeRef}>
			{children}
		</div>
	)
}
