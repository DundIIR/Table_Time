import { motion } from 'framer-motion'
import type { Card } from '../types/card'

type GameCardProps = {
	card: Card
	onClick?: () => void
	dragEnabled?: boolean
}

export default function GameCard({ card, onClick, dragEnabled = false }: GameCardProps) {
	const isOpen = true

	return (
		<motion.div
			onClick={onClick}
			onDrag={() => {}}
			className={`h-26 w-40 rounded-lg shadow-md cursor-grab ${isOpen ? 'bg-white' : 'bg-blue-500'}`}
			whileHover={dragEnabled ? { scale: 1.05 } : {}}
			whileTap={dragEnabled ? { scale: 0.95 } : {}}>
			<div className="flex h-full w-full items-center justify-center">
				{isOpen ? (
					<span className="text-lg font-medium px-2 text-center">{card.word}</span>
				) : (
					<span className="text-white text-lg"></span>
				)}
			</div>
		</motion.div>
	)
}
