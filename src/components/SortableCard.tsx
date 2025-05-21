import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Card } from '../types/card'

type SortableCardProps = {
	card: Card
}

export default function SortableCard({ card }: SortableCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white p-3 rounded shadow cursor-move hover:bg-blue-50 transition-colors">
			{card.word}
		</div>
	)
}
