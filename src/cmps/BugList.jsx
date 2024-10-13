import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
	return <ul className="bug-list">
        {bugs.map(bug => (
            <li className="bug-preview" key={bug._id}>
                <BugPreview bug={bug} />

                <section class="actions">
                    <button onClick={() => onRemoveBug(bug._id)}>x</button>
                    <button onClick={() => onEditBug(bug)}>Edit</button>
                </section>
                
                <Link to={`/bug/${bug._id}`}>Details</Link>
            </li>
        ))}
    </ul>
}
