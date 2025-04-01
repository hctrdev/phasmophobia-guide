import { anyVisibleGhostWithEvidence } from '../../utils/filtering'
import { getUserList } from '../../utils/history'
import { useContext } from 'react'
import { SyncContext } from '../../context/SyncContext'
import { SelectionContext } from '../../context/SelectionContext'
import { LocalSelectionContext } from '../../context/LocalSelectionContext'
import {
  ObservationToggle,
  ReactiveSyncStatusButton,
  ResetButton,
  ToggleTipsButton,
} from '../../components'

export const EvidenceSelectorPanel = ({
  evidence,
  ghosts,
  toggleSyncModal,
}) => {
  const { isSyncFeatureEnabled, room, isConnected, history } =
    useContext(SyncContext)
  const {
    getIsEvidenceSelected,
    toggleEvidenceSelected,
    getIsEvidenceRejected,
    toggleEvidenceRejected,
    selectedEvidence,
    rejectedEvidence,
    reset: resetGlobalSelection,
  } = useContext(SelectionContext)

  const {
    reset: resetLocalSelection,
    isTipsVisible,
    toggleIsTipsVisible,
  } = useContext(LocalSelectionContext)

  const onReset = () => {
    resetLocalSelection()
    resetGlobalSelection()
  }

  return (
    <>
      <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">
        Observations
      </h2>

      {evidence.map((e) => {
        return (
          <ObservationToggle
            key={e.id}
            id={e.id}
            name={e.name}
            longName={e.longName}
            icon={e.icon}
            isSelected={getIsEvidenceSelected(e.id)}
            toggleSelection={() => toggleEvidenceSelected(e.id)}
            isRejected={getIsEvidenceRejected(e.id)}
            toggleRejection={() => toggleEvidenceRejected(e.id)}
            isAvailable={anyVisibleGhostWithEvidence(
              ghosts,
              selectedEvidence,
              rejectedEvidence,
              e.id,
            )}
          />
        )
      })}

      <div className="buttons is-centered mt-6">
        <ResetButton reset={onReset} />
        <ToggleTipsButton
          isTipsVisible={isTipsVisible}
          toggleIsTipsVisible={toggleIsTipsVisible}
        />
        {isSyncFeatureEnabled && (
          <ReactiveSyncStatusButton
            isConnected={isConnected}
            toggleSyncModal={toggleSyncModal}
            roomId={room}
          />
        )}
      </div>

      {isSyncFeatureEnabled && isConnected && (
        <div className="columns is-mobile is-centered is-multiline mt-1">
          {getUserList(history).map((u) => {
            return (
              <span className="column is-narrow" key={u}>
                {u}
              </span>
            )
          })}
        </div>
      )}
    </>
  )
}
