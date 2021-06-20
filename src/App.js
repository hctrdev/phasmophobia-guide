import {Component} from "react";

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGhost: null,
            evidence: this.props.evidence,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        }

        this.onEvidenceToggle = this.onEvidenceToggle.bind(this)
        this.onEvidenceReset = this.onEvidenceReset.bind(this)
        this.onShowModal = this.onShowModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }

    calcPossibleGhosts(evidence) {
        let selectedEvidence = evidence.filter(e => e.selected)
        let rejectedEvidence = evidence.filter(e => e.rejected)

        if (selectedEvidence.length === 0 && rejectedEvidence.length === 0) {
            return this.props.ghosts
        }

        return this.props.ghosts.filter(ghost => {
            let ghostHasSelectedEvidence = selectedEvidence.length === 0
                || selectedEvidence.every(selected => ghost.evidence.some(ghostEvidence => ghostEvidence === selected.name))
            let ghostHasRejectedEvidence = rejectedEvidence.length > 0
                && rejectedEvidence.some(rejected => ghost.evidence.some(ghostEvidence => ghostEvidence === rejected.name))

            return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
        })
    }

    onEvidenceReset() {
        this.setState({
            evidence: this.props.evidence,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        })
    }

    onEvidenceToggle(evidence, field) {
        // state update inspired by: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        let selectedToggle = (el) => el.selected
        let rejectedToggle = (el) => el.rejected

        if (field === "selected") {
            selectedToggle = (el) => !el.selected
            rejectedToggle = () => false
        }
        if (field === "rejected") {
            selectedToggle = () => false
            rejectedToggle = (el) => !el.rejected
        }

        const updatedEvidence = this.state.evidence.map(
            el => el.name === evidence.name ? {
                ...el,
                selected: selectedToggle(el),
                rejected: rejectedToggle(el)
            }: el
        )

        this.setState({
            evidence: updatedEvidence,
            possibleGhosts: this.calcPossibleGhosts(updatedEvidence)
        })
    }

    onShowModal(ghost) {
        this.setState({selectedGhost: ghost})
    }

    onCloseModal() {
        this.setState({selectedGhost: null})
    }

    render() {
        return (
            <div className="container">
                <TopNav />
                { this.state.selectedGhost != null ? <GhostInfoModal ghost={this.state.selectedGhost} onCloseModal={this.onCloseModal} /> : "" }

                <div className="columns">
                    <div className="column is-4">
                        <LeftColumn evidence={this.state.evidence}
                                    onEvidenceToggle={this.onEvidenceToggle}
                                    onEvidenceReset={this.onEvidenceReset} />
                    </div>
                    <div className="column is-8">
                        <RightColumn evidence={this.state.evidence}
                                     ghosts={this.state.possibleGhosts}
                                     onShowModal={this.onShowModal}/>
                    </div>
                </div>
            </div>
        )
    }
}

class GhostInfoModal extends Component {
    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.onCloseModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.ghost.name}</p>
                        <button className="delete" aria-label="close" onClick={this.props.onCloseModal} />
                    </header>
                    <section className="modal-card-body has-text-centered">
                        <h2 className="is-size-5 is-uppercase has-letter-spacing">Description</h2>
                        <p>(TODO)</p>
                        <div className="my-5 columns">
                            <div className="column is-6-mobile">
                                <h2 className="is-size-6 is-uppercase has-letter-spacing">Strengths</h2>
                                <p>(TODO)</p>
                            </div>
                            <div className="column is-6-mobile">
                                <h2 className="is-size-6 is-uppercase has-letter-spacing">Weaknesses</h2>
                                <p>(TODO)</p>
                            </div>
                        </div>
                        <h2 className="has-text-centered is-size-5 is-uppercase has-letter-spacing">Evidence</h2>
                        <div className="my-5 columns">
                            {this.props.ghost.evidence.map((e) => {
                                return (
                                    <div key={e} className="column is-4-mobile has-text-centered">
                                        <span className="tag is-medium">{e}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <a className="button is-outlined is-info"
                           href="https://example.com"
                           target="_blank"
                           rel="noreferrer">
                            <span className="icon mr-3">
                                <i className="fa fa-book" />
                            </span>
                            wiki
                        </a>
                    </section>
                </div>
            </div>
        )
    }
}

class LeftColumn extends Component {
    maxSelected = 3

    countSelectedEvidence() {
        return this.props.evidence.filter(e => e.selected).length
    }
    countRejectedEvidence() {
        return this.props.evidence.filter(e => e.rejected).length
    }

    showWarning() {
        if (this.countSelectedEvidence() > this.maxSelected) {
            return (
                <span className="icon has-text-warning" title="Too many observations selected">
                    <i className="fa fa-2x fa-warning" />
                </span>
            )
        }
        return ""
    }

    render() {
        let selectedEvidenceCount = this.countSelectedEvidence()
        let rejectedEvidenceCount = this.countRejectedEvidence()
        let selectionCount = selectedEvidenceCount + rejectedEvidenceCount
        return (
            <div>
                <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">Observations</h2>

                {this.props.evidence.map((evidence) => {
                    return <ObservationToggle key={evidence.name} evidence={evidence} onToggle={this.props.onEvidenceToggle} />
                })}

                <div className="has-text-centered">
                    <button className={"button my-4 is-outlined" + (selectionCount > 0 ? " is-warning" : "")}
                            onClick={(e) => {this.props.onEvidenceReset(); console.log(e.target)}}
                            title="Reset all selected observations">reset</button>

                    <p className="heading mb-3">({selectedEvidenceCount} of {this.maxSelected})</p>
                    {this.showWarning()}
                </div>
            </div>
        )
    }
}

class RightColumn extends Component {
    renderGhostTable() {
        const ghosts = this.props.ghosts
        if (ghosts.length === 0) {
            return (
                <p>No ghosts found for selected evidence</p>
            )
        }
        return (
            <div>
                {ghosts.map((ghost) => {
                    return <GhostTableRow key={ghost.name}
                                          evidence={this.props.evidence}
                                          ghost={ghost}
                                          onShowModal={this.props.onShowModal} />
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="has-text-centered">
                <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Ghosts</h2>
                {this.renderGhostTable()}

                <MissingEvidence evidence={this.props.evidence} ghosts={this.props.ghosts} />
            </div>
        )
    }
}

class MissingEvidence extends Component {
    renderMissingEvidence(nonSelectedEvidence) {
        const missingEvidence = nonSelectedEvidence.filter(e => this.props.ghosts.some(g => g.evidence.some(ge => ge === e.name)))
        if (missingEvidence.length === 0) {
            return (
                <p>All evidence collected</p>
            )
        }
        return (
            <div className="columns is-mobile is-multiline is-centered">
                {missingEvidence.map((e) => {
                    return (
                        <div key={e.name} className="column is-4-mobile has-text-centered">
                            <span className="tag is-medium">{e.name}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        const nonSelectedEvidence = this.props.evidence.filter(e => !e.selected && !e.rejected)
        if (nonSelectedEvidence.length === this.props.evidence.length) {
            return ""
        }
        return (
            <div className="my-6">
                <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Missing Evidence</h2>
                {this.renderMissingEvidence(nonSelectedEvidence)}
            </div>
        );
    }
}

class GhostTableRow extends Component {
    isEvidenceSelected(evidence) {
        return this.props.evidence.filter(e => e.selected).some(e => e.name === evidence)
    }

    render() {
        return (
            <div>
                <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline">
                    <div className="column is-4-desktop is-12-mobile">
                        <p className="is-uppercase has-text-weight-light has-letter-spacing">
                            <a className="icon has-text-info mx-4" onClick={() => this.props.onShowModal(this.props.ghost)} href={`#${this.props.ghost.name}`}>
                                <i className="fa fa-info-circle" />
                            </a>
                            {this.props.ghost.name}
                        </p>
                    </div>
                    {this.props.ghost.evidence.map((e) => {
                        return (
                            <div key={e} className="column is-4-mobile has-text-centered">
                                <span className={"tag is-medium" + (this.isEvidenceSelected(e) ? " is-selected" : "")}>{e}</span>
                            </div>
                        )
                    })}
                </div>
                <hr className="my-3" />
            </div>

        )
    }
}

class ObservationToggle extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(field) {
        this.props.onToggle(this.props.evidence, field)
    }

    render() {
        return (
            <div className="columns is-mobile is-vcentered">
                <div className="column is-offset-2 is-narrow">
                    <div className="buttons has-addons">
                        <button className={"button" + (this.props.evidence.rejected ? " is-danger" : "")}
                                onClick={() => this.onChange("rejected")}>
                            <span className="icon is-small">
                                <i className="fa fa-times" />
                            </span>
                        </button>

                        <button className={"button" + (this.props.evidence.selected ? " is-success" : "")}
                                onClick={() => this.onChange("selected")}>
                            <span className="icon is-small">
                                <i className="fa fa-check" />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="column is-mobile">
                    <span>{this.props.evidence.name}</span>
                </div>
            </div>
        );
    }
}

class TopNav extends Component {
    render() {
        return (
            <div className="my-6 has-text-centered">
                <h1 className="title">Paranormal Guide</h1>
            </div>
        )
    }
}