export const EvidenceTag = ({ evidence }) => {
  return (
    <span
      className={'tag is-medium' + (evidence.selected ? ' is-success' : '')}
      title={evidence.name}
    >
      <span class="icon">
        <i class={'fa fa-' + evidence.icon}></i>
      </span>
    </span>
  )
}
