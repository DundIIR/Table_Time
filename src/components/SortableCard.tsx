import { useDraggable } from '@dnd-kit/core'
// import { useSortable } from '@dnd-kit/sortable'

export default function SortableCard(props: { id: string; word?: string; overlay?: boolean }) {
	const { id, word, overlay } = props
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		cursor: overlay ? 'grabbing' : 'grab',
		scale: overlay ? '1.03' : undefined,
		opacity: overlay ? 0.9 : 1,
		touchAction: 'none',
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="min-w-40 h-22 p-2 bg-blue-500 rounded-2xl text-white font-bold  flex justify-center items-center uppercase tracking-wide shadow">
			{word}
		</div>
	)
}
