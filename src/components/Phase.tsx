import { useState } from 'react'

import GameBoard from './GameBoard'

interface PhaseProps {
	nouns: string[]
	adjectives: string[]
	onSubmit: (result: [string, string][]) => void
}

export default function Phase({ nouns, adjectives, onSubmit }: PhaseProps) {
	const [containerItems, setContainerItems] = useState<Record<string, string | null>>(
		nouns.reduce((acc, noun) => ({ ...acc, [noun]: null }), {}),
	)

	const isComplete = Object.values(containerItems).every(Boolean)

	const handleSubmit = () => {
		if (!isComplete) return

		const result: [string, string][] = Object.entries(containerItems)
			.filter(([, adj]) => adj !== null)
			.map(([noun, adj]) => [noun, adj!] as [string, string])

		onSubmit(result)
	}

	return (
		<div className="text-center">
			<GameBoard nouns={nouns} adjectives={adjectives} containerItems={containerItems} setContainerItems={setContainerItems} />

			<button
				disabled={!isComplete}
				onClick={handleSubmit}
				className={`mt-10 font-bold py-3 px-6 rounded-lg transition-colors ${
					isComplete ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
				}`}>
				Подтвердить выбор
			</button>
		</div>
	)
}
