import React, { useEffect, useState } from 'react'

interface SettingsProps {
	totalRounds: number
	setTotalRounds: (value: number) => void
	wordsPerRound: number
	setWordsPerRound: (value: number) => void
	onClose: () => void
}

export default function SettingsPanel({ totalRounds, setTotalRounds, wordsPerRound, setWordsPerRound, onClose }: SettingsProps) {
	const [rounds, setRounds] = useState(totalRounds)
	const [words, setWords] = useState(wordsPerRound)

	// Синхронизируем локальное состояние при открытии панели
	useEffect(() => {
		setRounds(totalRounds)
		setWords(wordsPerRound)
	}, [totalRounds, wordsPerRound])

	const handleRoundsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = parseInt(e.target.value)
		if (value < 3) value = 3
		if (value > 15) value = 15
		setRounds(value)
	}

	const handleWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = parseInt(e.target.value)
		if (value < 4) value = 4
		if (value > 8) value = 8
		setWords(value)
	}

	const handleSave = () => {
		setTotalRounds(rounds)
		setWordsPerRound(words)
		onClose()
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-4">
			<h2 className="text-xl font-bold text-gray-800">Настройки игры</h2>

			<div className="flex flex-col gap-2">
				<label htmlFor="rounds" className="text-gray-700 font-medium">
					Количество раундов (3-15)
				</label>
				<input
					type="number"
					id="rounds"
					value={rounds}
					onChange={handleRoundsChange}
					min={3}
					max={15}
					className="border rounded px-3 py-2"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="words" className="text-gray-700 font-medium">
					Слов в раунде (4-8)
				</label>
				<input
					type="number"
					id="words"
					value={words}
					onChange={handleWordsChange}
					min={4}
					max={8}
					className="border rounded px-3 py-2"
				/>
			</div>

			<div className="flex justify-end gap-3 pt-2">
				<button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-lg">
					Отмена
				</button>
				<button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
					Сохранить
				</button>
			</div>
		</div>
	)
}
