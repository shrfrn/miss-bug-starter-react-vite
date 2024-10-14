import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        loadBug()
    }, [])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch (err) {
            showErrorMsg('Cannot load bug')
        }
    }

    if (!bug) return <h1>loading....</h1>
    return <div className="bug-details">
        <h2>Bug Details</h2>
        <h3>{bug.title}</h3>
        <p>Severity: <span>{bug.severity}</span></p>
        <Link to="/bug"><button>Back to List</button></Link>
    </div>

}

