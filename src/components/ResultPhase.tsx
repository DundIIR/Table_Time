interface ResultPhaseProps {
	leaderPairs: [string, string][]
	playerPairs: [string, string][]
	onNextRound: () => void
}

export default function ResultPhase({ leaderPairs, playerPairs, onNextRound }: ResultPhaseProps) {
	const getPlayerAdjective = (noun: string): string | null => {
		const match = playerPairs.find(([pNoun]) => pNoun === noun)
		return match ? match[1] : null
	}

	return (
		<div className="space-y-8 text-center">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
				{leaderPairs.map(([noun, adjective]) => {
					const playerAdj = getPlayerAdjective(noun)
					const isCorrect = playerAdj === adjective

					return (
						<div
							key={noun}
							className={`p-4 rounded-xl border text-lg font-medium flex justify-between items-center
								${isCorrect ? 'border-green-500 bg-green-100 text-green-800' : 'border-red-500 bg-red-100 text-red-800'}`}>
							<span>{noun}</span>
							<span className="text-xl flex flex-col">
								{!isCorrect && playerAdj ? <s className="mr-2 opacity-70">{playerAdj}</s> : null}
								{adjective}
							</span>
						</div>
					)
				})}
			</div>

			<button onClick={onNextRound} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
				Следующий раунд
			</button>
		</div>
	)
}
