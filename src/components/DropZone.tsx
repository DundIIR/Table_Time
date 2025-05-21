import { useDroppable } from '@dnd-kit/core'

type DropZoneProps = {
	id: string
	position: number
	children?: React.ReactNode
}

export default function DropZone({ id, position, children }: DropZoneProps) {
	const { setNodeRef } = useDroppable({
		id,
		data: {
			position,
			accepts: ['adjective'],
		},
	})

	return (
		<div ref={setNodeRef} className="min-h-[60px] border-2 border-dashed border-gray-300 rounded p-1">
			{children || <div className="h-full opacity-0">placeholder</div>}
		</div>
	)
}
