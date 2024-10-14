export function BugPreview({ bug }) {

    return <article className="bug-preview">
        <h2>{bug.title}</h2>
        <p>Severity: <span>{bug.severity}</span></p>
    </article>
}