import { useDroppable } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import SortableCard from './SortableCard'

export function SortableContainer(props: { id: string; word?: string; items: string[] }) {
	const { id, items, word } = props

	const { isOver, setNodeRef } = useDroppable({
		id,
	})

	return (
		<SortableContext id={id} items={items} strategy={horizontalListSortingStrategy}>
			<div
				className={`min-w-40 min-h-26 p-2 border-2 border-dashed  ${
					isOver ? 'border-gray-400' : 'border-gray-300'
				} rounded-2xl p-1 flex flex-col md:flex-row gap-2 items-center justify-center transition-colors ${
					id == 'available' && 'h-[550px] md:min-w-[850px] md:h-auto '
				} ${word && 'md:!flex-col font-bold uppercase tracking-wide'}`}
				ref={setNodeRef}>
				{word ? word : null}
				{items.map(item => (
					<SortableCard key={item} id={item} word={item} />
				))}
			</div>
		</SortableContext>
	)
}
