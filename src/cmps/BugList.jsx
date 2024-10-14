import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
	return <ul className="bug-list">
        {bugs.map(bug => (
            <li key={bug._id}>
                <BugPreview bug={bug} />

                <section className="actions">
                    <button onClick={() => onRemoveBug(bug._id)}>x</button>
                    <button onClick={() => onEditBug(bug)}>Edit</button>
                    <Link to={`/bug/${bug._id}`}><button>Details</button></Link>
                </section>
                
            </li>
        ))}
    </ul>
}
