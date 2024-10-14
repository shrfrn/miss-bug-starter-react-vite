import { useState } from 'react'
import { useEffect } from 'react'

import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BugList } from '../cmps/BugList.jsx'

export function BugIndex() {
	const [bugs, setBugs] = useState([])

	useEffect(() => {
		loadBugs()
	}, [])

	async function loadBugs() {
        try {
            const bugs = await bugService.query()
            setBugs(bugs)
            showErrorMsg('Bugs loaded')
        } catch (err) {
			console.log('Error loading bugs ->', err)
			showErrorMsg('Cannot load bugs')
        }
	}

	async function onRemoveBug(bugId) {
		try {
			await bugService.remove(bugId)
			setBugs(prevBugs => prevBugs.filter(bug => bug._id !== bugId))
			showSuccessMsg('Bug removed')
		} catch (err) {
			console.log('Error from onRemoveBug ->', err)
			showErrorMsg('Cannot remove bug')
		}
	}

	async function onAddBug() {
		const bug = {
			title: prompt('Bug title?'),
			severity: +prompt('Bug severity?'),
		}
		try {
			const savedBug = await bugService.save(bug)
			setBugs(prevBugs => [...prevBugs, savedBug])
			showSuccessMsg('Bug added')
		} catch (err) {
			console.log('Error from onAddBug ->', err)
			showErrorMsg('Cannot add bug')
		}
	}

	async function onEditBug(bug) {
		const severity = +prompt('New severity?')
        if (!severity) return

		const bugToSave = { ...bug, severity }
		try {
			const savedBug = await bugService.save(bugToSave)
			setBugs(prevBugs => prevBugs.map(currBug => (currBug._id === savedBug._id ? savedBug : currBug)))
			showSuccessMsg('Bug updated')
		} catch (err) {
			console.log('Error from onEditBug ->', err)
			showErrorMsg('Cannot update bug')
		}
	}

	return <main className="bug-index">
        <header>
            <h2>Your Bug List</h2>
            <button onClick={onAddBug}>Add a Bug</button>
        </header>
        <main>
            <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        </main>
    </main>
}
