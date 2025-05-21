import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Draggable(props: any) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: props.id,
	})
	const style = {
		transform: CSS.Transform.toString(transform),
		cursor: isDragging ? 'grabbing' : 'grab',
		scale: isDragging ? '1.03' : undefined,
		opacity: isDragging ? 0.9 : 1,
		touchAction: 'none',
		transition,
	}

	return (
		<button
			className="w-40 h-22 bg-blue-500 rounded-2xl text-white cursor-grabbing shadow"
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}>
			{props.children}
		</button>
	)
}
